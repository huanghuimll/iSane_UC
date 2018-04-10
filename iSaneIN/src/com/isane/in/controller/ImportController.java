package com.isane.in.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
	public Operation importFile(@RequestParam(value = "uploadFile") MultipartFile mFile, Import importData) {
		logger.debug("===importData" + importData);
		logMsg = "导入";
		if (mFile.isEmpty()) {
			return null;
		}
		
		List<Import> dataList = importServer.listCustom(importData, DaoConst.PAGE_DEFAULT_START,
				DaoConst.PAGE_DEFAULT_LIMIT, "selectByType");

		if (dataList.size() == 0 || dataList == null) {
			return null;
		}
		List<OriginalData> list = importServer.importFile(mFile, dataList,importData);

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
		int countC = originalDataServer.createMulti(OriginalData.class, insertList);
		int countM = originalDataServer.modifyMulti(OriginalData.class, updateList);
		
//		HttpSession session = request.getSession();
//		User user = session.getAttribute("USER");
		String date = importData.getStoreDate();
		if(date != null && date != ""){
			int len = date.length();
			if(len == 7){
				date = date + "-01";
			}
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date storeDate = null;
			try {
				storeDate = sdf.parse(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			//参与计算
			String computeCode = remoteIndexComputeService.refreshIndexData(false, true, false, false, storeDate, importData.getPlantCode() , "", "admin", false);
			logger.debug("===computeCode:"+computeCode);
		}
		
		Operation op = new Operation();
		 if (countC > 0 || countM > 0) {
			 op.setErrCode(Errors.ERROR_NO_ERROR);
			 op.setMessage("导入成功");
			 op.setSuccess(true);
		 }else {
			 op.setErrCode(Errors.ERROR_DB_ERROR);
			 op.setMessage("导入失败");
			 op.setSuccess(false);
		 }
		return op;
	}
	
}