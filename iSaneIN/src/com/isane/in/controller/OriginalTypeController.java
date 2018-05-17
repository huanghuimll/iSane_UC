package com.isane.in.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.persistent.entity.Operation;
import com.isane.ragdoll.persistent.type.DaoConst;
import com.isane.ragdoll.utils.upload.PropertiesUtil;
import com.isane.ragdoll.web.Errors;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.OriginalType;
import com.isane.in.entity.User;
import com.isane.index.compute.core.IndexCompute;
import com.isane.index.entity.OriginalData;
import com.isane.index.service.OriginalDataService;

@Controller
@RequestMapping(value = "/api/OriginalType")
public class OriginalTypeController extends RagdollControllerImpl<OriginalType> {
	
	@Autowired
	private IndexCompute indexCompute;
	
	@Override
	public OriginalType getEmptyEntity() {
		return new OriginalType();
	}

	@Override
	public Class<OriginalType> getEntityClass() {
		return OriginalType.class;
	}

	@Autowired
	private OriginalDataService originalDataServer;

	@GetMapping("queryAll")
	@ResponseBody
	public List<OriginalType> queryAll(OriginalType originalType) {
		List<OriginalType> list = getService().listCustom(originalType, DaoConst.PAGE_DEFAULT_START,
				DaoConst.PAGE_DEFAULT_LIMIT, "selectByCode");
		
		return list;
	}

	@PostMapping("addAndUpdate")
	@ResponseBody
	public Operation addAndUpdate(@RequestBody List<OriginalType> pageList, @RequestParam String storeDate , HttpServletRequest request) {
		Operation op = new Operation();
		HttpSession session = request.getSession();
		if(session == null){
			throw new RuntimeException("====> session is null.");
		}		
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		//String inputDate = sdf.format(date);
		
		Date computeDate = null;
		try {
			computeDate = sdf.parse(storeDate);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		
		if (pageList.size() == 0 || pageList == null) {
			 op.setErrCode(Errors.ERROR_DB_ERROR);
			 op.setMessage("保存失败,数据为空。");
			 op.setSuccess(false);	
			 return op;	
		}
		
		//1.将这一时间段的所有数据都查出来
		OriginalType ot = new OriginalType();
		ot.setStoreDate(pageList.get(0).getStoreDate());
		List<OriginalType> tempList = getService().listCustom(ot, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT, "selectByDate");
		//2.进行比对,将已经存在的数据更新，不纯在的数据增加
		List<OriginalData> insertList = new ArrayList<OriginalData>();
		List<OriginalData> updateList = new ArrayList<OriginalData>();
		
		Boolean flag = false;
		for (OriginalType item : pageList) {
			OriginalData od = new OriginalData();
			od.setInputDate(date);
			od.setStoreDate(computeDate);
			if(tempList != null && tempList.size() > 0){
				for(OriginalType obj : tempList){
					if(item.getOriginalCode().equalsIgnoreCase(obj.getOriginalCode())){
						od.setDateType(item.getDateType());
						od.setOriginalCode(item.getOriginalCode());
						od.setOriginalValue(item.getOriginalValue());
						od.setOriginalDataVersion(obj.getOriginalDataVersion()+1);
						updateList.add(od);
						flag = false;
						break;
					}else{
						flag = true;
					}
				}
			}else{
				flag = true;
			}
			
			if(flag){
				od.setDateType(item.getDateType());
				od.setOriginalCode(item.getOriginalCode());
				od.setOriginalValue(item.getOriginalValue());
				od.setOriginalDataVersion(1);
				insertList.add(od);
			}
		}
		
		logger.debug("新增" + insertList.size());
		logger.debug("修改" + updateList.size());
		
		int countC = 0;
		int countM = 0;
		if (insertList.size() != 0) {
			countC = originalDataServer.createMulti(OriginalData.class, insertList);
		}
		if (updateList.size() != 0) {
			countM = originalDataServer.modifyMulti(OriginalData.class, updateList);
		}	
		
		boolean flg = false;
		if(countC > 0 || countM > 0){
			 op.setErrCode(Errors.ERROR_NO_ERROR);
			 op.setMessage("导入成功,新增"+countC+"条数据。修改了"+countM+"条数据,开始计算...");
			 op.setSuccess(true);	
			 flg = true;
		}else{
			 op.setErrCode(Errors.ERROR_DB_ERROR);
			 op.setMessage("导入失败");
			 op.setSuccess(false);	
		}	
		
		//判断是否需要计算
		if(flg){
			OriginalType od = pageList.get(0);
			boolean m = true;
			boolean d  = true;
			if(od.getDateType().equalsIgnoreCase("M")){
				m = true;
				d = false;
			}else if(od.getDateType().equalsIgnoreCase("D")){
				d = true;
				m = false;
			}else if(od.getDateType().equalsIgnoreCase("Y")){
				d = false;
				m = true;
			}
			
			User userSess = (User) session.getAttribute("USER");
			String computeCode = indexCompute.refreshIndexData(d, m, false, false, computeDate, pageList.get(0).getPlantCode(), "", userSess.getUserName(), false);
			logger.debug("===computeCode:"+computeCode);
		}
		
		return op;
	}
	
	@RequestMapping("/exportTemplate")
	public void exportTemplate(HttpServletResponse response, HttpServletRequest request, @RequestParam String fileName, @RequestParam String fileCode) {
		OutputStream out = null;
		InputStream  in = null;
		try {
			
			if(fileCode == null || fileCode.equals("")){
				throw new RuntimeException("没有找到模板.");
			}
			
			String url = PropertiesUtil.readAsString(PropertiesUtil.UPLOAD_PATH)+ "/template/"+fileCode;
			//System.out.println("====>"+url);
			String userAgent = request.getHeader("USER-AGENT");
			fileName = fileName + ".xlsx";
			if (StringUtils.contains(userAgent, "Mozilla")) {// 火狐浏览器
				response.setHeader("Content-disposition",
						"attachment; filename = " + new String(fileName.getBytes(), "ISO8859-1"));
			} else {// 其他浏览器
				response.setHeader("Content-disposition",
						"attachment; filename = " + URLEncoder.encode(fileName, "UTF-8"));
			}
			
			response.setContentType("application/octet-streem");	
			
			out = response.getOutputStream();
			
			in = new FileInputStream(new File(url));
			
		    byte[] b = new byte[1024];
		    int len = 0;
		    while((len = in.read(b)) != -1){
		      out.write(b, 0, len);
		    }
			
		} catch (Exception e) {
			throw new RuntimeException("下载模板失败。");
		}finally{
			try {
				in.close();
				out.flush();
				//out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		}
	}
	
}