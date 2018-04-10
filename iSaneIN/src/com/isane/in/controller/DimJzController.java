package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.DimJz;

@Controller
@RequestMapping(value = "/api/DimJz")
public class DimJzController extends RagdollControllerImpl<DimJz> {

	@Override
	public DimJz getEmptyEntity() {
		return new DimJz();
	}

	@Override
	public Class<DimJz> getEntityClass() {
		return DimJz.class;
	}

	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<DimJz> addAndUpdate(@RequestBody List<DimJz> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<DimJz> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<DimJz> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(DimJz.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(DimJz.class, updateList);
		}

		return null;
	}

}