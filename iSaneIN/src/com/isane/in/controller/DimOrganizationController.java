package com.isane.in.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.DimOrganization;

@Controller
@RequestMapping(value = "/api/DimOrganization")
public class DimOrganizationController extends RagdollControllerImpl<DimOrganization> {

	@Override
	public DimOrganization getEmptyEntity() {
		return new DimOrganization();
	}

	@Override
	public Class<DimOrganization> getEntityClass() {
		return DimOrganization.class;
	}

	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<DimOrganization> addAndUpdate(@RequestBody List<DimOrganization> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<DimOrganization> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<DimOrganization> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(DimOrganization.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(DimOrganization.class, updateList);
		}

		return null;
	}

}