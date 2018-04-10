package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.in.entity.KJXM;
import com.isane.ragdoll.web.RagdollControllerImpl;

@Controller
@RequestMapping(value = "/api/KJXM")
public class KJXMController extends RagdollControllerImpl<KJXM> {

	@Override
	public KJXM getEmptyEntity() {
		return new KJXM();
	}

	@Override
	public Class<KJXM> getEntityClass() {
		return KJXM.class;
	}
}