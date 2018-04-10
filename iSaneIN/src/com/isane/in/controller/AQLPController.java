package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.AQLP;


@Controller
@RequestMapping(value = "/api/AQLP")
public class AQLPController extends RagdollControllerImpl<AQLP> {

	@Override
	public AQLP getEmptyEntity() {
		return new AQLP();
	}

	@Override
	public Class<AQLP> getEntityClass() {
		return AQLP.class;
	}
	
	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<AQLP> addAndUpdate(@RequestBody List<AQLP> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<AQLP> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<AQLP> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(AQLP.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(AQLP.class, updateList);
		}

		return null;
	}	

}