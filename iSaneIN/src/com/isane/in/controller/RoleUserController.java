package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.RoleUser;


@Controller
@RequestMapping(value = "/api/RoleUser")
public class RoleUserController extends RagdollControllerImpl<RoleUser> {

	@Override
	public RoleUser getEmptyEntity() {
		return new RoleUser();
	}

	@Override
	public Class<RoleUser> getEntityClass() {
		return RoleUser.class;
	}

}