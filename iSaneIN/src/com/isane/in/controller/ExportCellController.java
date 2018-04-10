package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.ExportCell;


@Controller
@RequestMapping(value = "/api/ExportCell")
public class ExportCellController extends RagdollControllerImpl<ExportCell> {

	@Override
	public ExportCell getEmptyEntity() {
		return new ExportCell();
	}

	@Override
	public Class<ExportCell> getEntityClass() {
		return ExportCell.class;
	}

}