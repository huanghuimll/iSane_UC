package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.RolePermission;


@Controller
@RequestMapping(value = "/api/RolePermission")
public class RolePermissionController extends RagdollControllerImpl<RolePermission> {

	@Override
	public RolePermission getEmptyEntity() {
		return new RolePermission();
	}

	@Override
	public Class<RolePermission> getEntityClass() {
		return RolePermission.class;
	}

}