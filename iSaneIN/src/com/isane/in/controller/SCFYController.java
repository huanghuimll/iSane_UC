package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.SCFY;


@Controller
@RequestMapping(value = "/api/SCFY")
public class SCFYController extends RagdollControllerImpl<SCFY> {

	@Override
	public SCFY getEmptyEntity() {
		return new SCFY();
	}

	@Override
	public Class<SCFY> getEntityClass() {
		return SCFY.class;
	}
	
	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<SCFY> addAndUpdate(@RequestBody List<SCFY> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<SCFY> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<SCFY> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(SCFY.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(SCFY.class, updateList);
		}

		return null;
	}	
}