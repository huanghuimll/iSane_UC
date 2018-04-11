package com.isane.in.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.isane.ragdoll.persistent.type.DaoConst;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.OriginalType;
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
		//System.out.println(list.get(0));
		
		return list;
	}

	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<OriginalType> addAndUpdate(@RequestBody List<OriginalType> pageList, @RequestParam String storeDate ) {
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String inputDate = sdf.format(date);
		
		Date computeDate = null;
		try {
			computeDate = sdf.parse(storeDate);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<OriginalData> insertList = new ArrayList<OriginalData>();
		List<OriginalData> updateList = new ArrayList<OriginalData>();
		for (int i = 0; i < pageList.size(); i++) {
			OriginalType ot = pageList.get(i);
			OriginalData od = new OriginalData();

			od.setDateType(ot.getDateType());
			od.setOriginalCode(ot.getOriginalCode());
			od.setOriginalValue(ot.getOriginalValue());

			if (pageList.get(i).getDataId() == 0) {
				od.setOriginalDataVersion(1);
				try {
					od.setInputDate(sdf.parse(inputDate));
					od.setStoreDate(sdf.parse(storeDate));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				insertList.add(od);
			} else {
				od.setId(ot.getDataId());
				od.setOriginalDataVersion(ot.getOriginalDataVersion() + 1);
				try {
					od.setInputDate(sdf.parse(ot.getInputDate()));
					od.setStoreDate(sdf.parse(ot.getStoreDate()));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				updateList.add(od);
			}
		}
		if (insertList.size() != 0) {
			originalDataServer.createMulti(OriginalData.class, insertList);
		}
		if (updateList.size() != 0) {
			originalDataServer.modifyMulti(OriginalData.class, updateList);
		}
		
		indexCompute.refreshIndexData(true, true, false, true, computeDate, pageList.get(0).getPlantCode(), "", "admin", false);
		return null;
	}
}