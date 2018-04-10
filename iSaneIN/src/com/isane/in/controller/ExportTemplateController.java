package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.ExportTemplate;


@Controller
@RequestMapping(value = "/api/ExportTemplate")
public class ExportTemplateController extends RagdollControllerImpl<ExportTemplate> {

	@Override
	public ExportTemplate getEmptyEntity() {
		return new ExportTemplate();
	}

	@Override
	public Class<ExportTemplate> getEntityClass() {
		return ExportTemplate.class;
	}

}