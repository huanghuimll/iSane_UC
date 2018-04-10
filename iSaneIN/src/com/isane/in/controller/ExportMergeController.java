package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.ExportMerge;


@Controller
@RequestMapping(value = "/api/ExportMerge")
public class ExportMergeController extends RagdollControllerImpl<ExportMerge> {

	@Override
	public ExportMerge getEmptyEntity() {
		return new ExportMerge();
	}

	@Override
	public Class<ExportMerge> getEntityClass() {
		return ExportMerge.class;
	}

}