package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.LYXS;


@Controller
@RequestMapping(value = "/api/LYXS")
public class LYXSController extends RagdollControllerImpl<LYXS> {

	@Override
	public LYXS getEmptyEntity() {
		return new LYXS();
	}

	@Override
	public Class<LYXS> getEntityClass() {
		return LYXS.class;
	}
	
	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<LYXS> addAndUpdate(@RequestBody List<LYXS> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<LYXS> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<LYXS> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(LYXS.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(LYXS.class, updateList);
		}

		return null;
	}		

}