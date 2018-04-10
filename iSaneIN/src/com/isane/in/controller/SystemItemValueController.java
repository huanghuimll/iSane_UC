package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.SystemItemValue;


@Controller
@RequestMapping(value = "/api/SystemItemValue")
public class SystemItemValueController extends RagdollControllerImpl<SystemItemValue> {

	@Override
	public SystemItemValue getEmptyEntity() {
		return new SystemItemValue();
	}

	@Override
	public Class<SystemItemValue> getEntityClass() {
		return SystemItemValue.class;
	}

}