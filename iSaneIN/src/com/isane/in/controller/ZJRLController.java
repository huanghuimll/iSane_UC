package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.ZJRL;


@Controller
@RequestMapping(value = "/api/ZJRL")
public class ZJRLController extends RagdollControllerImpl<ZJRL> {

	@Override
	public ZJRL getEmptyEntity() {
		return new ZJRL();
	}

	@Override
	public Class<ZJRL> getEntityClass() {
		return ZJRL.class;
	}
	
	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<ZJRL> addAndUpdate(@RequestBody List<ZJRL> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		
		List<ZJRL> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<ZJRL> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(ZJRL.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(ZJRL.class, updateList);
		}

		return null;
	}	
	

}