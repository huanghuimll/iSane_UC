package com.isane.in.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.isane.ragdoll.persistent.entity.Operation;
import com.isane.ragdoll.persistent.type.DaoConst;
import com.isane.ragdoll.web.Errors;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.Import;
import com.isane.in.entity.User;
import com.isane.in.service.ImportService;
import com.isane.index.compute.core.IndexCompute;
import com.isane.index.entity.OriginalData;
import com.isane.index.service.OriginalDataService;

@Controller
@RequestMapping(value = "/api/Import")
public class ImportController extends RagdollControllerImpl<Import> {

	@Override
	public Import getEmptyEntity() {
		return new Import();
	}

	@Override
	public Class<Import> getEntityClass() {
		return Import.class;
	}

	@Autowired
	private ImportService importServer;

	@Autowired
	private OriginalDataService originalDataServer;
	
	@Autowired
	private IndexCompute remoteIndexComputeService;

	@RequestMapping(value = "/in" , method = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST})
	@ResponseBody
	public Operation importFile(@RequestParam(value = "uploadFile") MultipartFile mFile, Import importData, HttpServletRequest request) {
		Operation op = new Operation();
		HttpSession session = request.getSession();
		if(session == null){
			throw new RuntimeException("====> session is null.");
		}
		logger.debug("===importData" + importData);
		logMsg = "导入";
		
		if (mFile.isEmpty()) {
			 op.setErrCode(Errors.ERROR_DB_ERROR);
			 op.setMessage("导入失败,File文件为NULL。");
			 op.setSuccess(false);	
			 return op;		
		}
		
		List<Import> dataList = importServer.listCustom(importData, DaoConst.PAGE_DEFAULT_START,
				DaoConst.PAGE_DEFAULT_LIMIT, "selectByType");

		if (dataList.size() == 0 || dataList == null) {
			 op.setErrCode(Errors.ERROR_DB_ERROR);
			 op.setMessage("导入失败,导入关系表为空。");
			 op.setSuccess(false);	
			 return op;			
		}
		
		List<OriginalData> list = importServer.importFile(mFile, dataList,importData);
		
		if(list == null || list.size() == 0){
			 op.setErrCode(Errors.ERROR_DB_ERROR);
			 op.setMessage("导入失败,导入数据为空。");
			 op.setSuccess(false);	
			 return op;
		}

		List<Import> objList = importServer.listCustom(importData, DaoConst.PAGE_DEFAULT_START,
				DaoConst.PAGE_DEFAULT_LIMIT, "selectByData");
		List<OriginalData> insertList = new ArrayList<OriginalData>();
		List<OriginalData> updateList = new ArrayList<OriginalData>();
		
		for (int i = 0; i < list.size(); i++) {
			String code = list.get(i).getOriginalCode();
			int count = 0;
			for (int j = 0; j < objList.size(); j++) {
				String sqlCode = objList.get(j).getOriginalCode();
				if (code.equalsIgnoreCase(sqlCode)) {
					list.get(i).setId(objList.get(j).getId());
					list.get(i).setOriginalDataVersion(objList.get(j).getOriginalDataVersion() + 1);
					updateList.add(list.get(i));
					count++;
					break;
				}
			}
			if (count == 0) {
				insertList.add(list.get(i));
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
			String date = importData.getStoreDate();
			Date storeDate = null;
			if(date != null && date != ""){
				int len = date.length();
				if(len == 7){
					date = date + "-01";
				}
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				try {
					storeDate = sdf.parse(date);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			User userSess = (User) session.getAttribute("USER");
			//参与计算
			//String computeCode = remoteIndexComputeService.refreshIndexData(false, true, false, false, storeDate, importData.getPlantCode() , "", userSess.getUserName(), false);
			//logger.debug("===computeCode:"+computeCode);
		}
		
		return op;
	}
	
}