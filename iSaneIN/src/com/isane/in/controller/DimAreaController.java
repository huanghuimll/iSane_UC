package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.DimArea;

@Controller
@RequestMapping(value = "/api/DimArea")
public class DimAreaController extends RagdollControllerImpl<DimArea> {

	@Override
	public DimArea getEmptyEntity() {
		return new DimArea();
	}

	@Override
	public Class<DimArea> getEntityClass() {
		return DimArea.class;
	}
	
	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<DimArea> addAndUpdate(@RequestBody List<DimArea> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<DimArea> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<DimArea> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(DimArea.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(DimArea.class, updateList);
		}

		return null;
	}
}