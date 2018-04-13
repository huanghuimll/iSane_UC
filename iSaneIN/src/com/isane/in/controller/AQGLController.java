package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.AQGL;

@Controller
@RequestMapping(value = "/api/AQGL")
public class AQGLController extends RagdollControllerImpl<AQGL> {

	@Override
	public AQGL getEmptyEntity() {
		return new AQGL();
	}

	@Override
	public Class<AQGL> getEntityClass() {
		return AQGL.class;
	}

	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<AQGL> addAndUpdate(@RequestBody List<AQGL> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		
		List<AQGL> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<AQGL> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(AQGL.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(AQGL.class, updateList);
		}

		return null;
	}

}