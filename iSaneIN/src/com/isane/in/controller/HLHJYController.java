package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.in.entity.HLHJY;
import com.isane.ragdoll.web.RagdollControllerImpl;



@Controller
@RequestMapping(value = "/api/HLHJY")
public class HLHJYController extends RagdollControllerImpl<HLHJY> {

	@Override
	public HLHJY getEmptyEntity() {
		return new HLHJY();
	}

	@Override
	public Class<HLHJY> getEntityClass() {
		return HLHJY.class;
	}
}