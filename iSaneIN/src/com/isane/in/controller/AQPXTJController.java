package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.AQPXTJ;


@Controller
@RequestMapping(value = "/api/AQPXTJ")
public class AQPXTJController extends RagdollControllerImpl<AQPXTJ> {

	@Override
	public AQPXTJ getEmptyEntity() {
		return new AQPXTJ();
	}

	@Override
	public Class<AQPXTJ> getEntityClass() {
		return AQPXTJ.class;
	}
	
	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<AQPXTJ> addAndUpdate(@RequestBody List<AQPXTJ> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<AQPXTJ> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<AQPXTJ> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(AQPXTJ.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(AQPXTJ.class, updateList);
		}

		return null;
	}		

}