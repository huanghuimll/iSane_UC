package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.Role;


@Controller
@RequestMapping(value = "/api/Role")
public class RoleController extends RagdollControllerImpl<Role> {

	@Override
	public Role getEmptyEntity() {
		return new Role();
	}

	@Override
	public Class<Role> getEntityClass() {
		return Role.class;
	}

}