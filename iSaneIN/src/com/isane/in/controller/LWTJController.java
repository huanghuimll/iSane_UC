package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.isane.in.entity.LWTJ;
import com.isane.ragdoll.web.RagdollControllerImpl;



@Controller
@RequestMapping(value = "/api/LWTJ")
public class LWTJController extends RagdollControllerImpl<LWTJ> {

	@Override
	public LWTJ getEmptyEntity() {
		return new LWTJ();
	}

	@Override
	public Class<LWTJ> getEntityClass() {
		return LWTJ.class;
	}
}