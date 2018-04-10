package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.SystemItem;


@Controller
@RequestMapping(value = "/api/SystemItem")
public class SystemItemController extends RagdollControllerImpl<SystemItem> {

	@Override
	public SystemItem getEmptyEntity() {
		return new SystemItem();
	}

	@Override
	public Class<SystemItem> getEntityClass() {
		return SystemItem.class;
	}

}