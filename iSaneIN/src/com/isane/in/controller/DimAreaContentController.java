package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.DimAreaContent;

@Controller
@RequestMapping(value = "/api/DimAreaContent")
public class DimAreaContentController extends RagdollControllerImpl<DimAreaContent> {

	@Override
	public DimAreaContent getEmptyEntity() {
		return new DimAreaContent();
	}

	@Override
	public Class<DimAreaContent> getEntityClass() {
		return DimAreaContent.class;
	}
	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<DimAreaContent> addAndUpdate(@RequestBody List<DimAreaContent> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<DimAreaContent> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<DimAreaContent> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(DimAreaContent.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(DimAreaContent.class, updateList);
		}

		return null;
	}	

}