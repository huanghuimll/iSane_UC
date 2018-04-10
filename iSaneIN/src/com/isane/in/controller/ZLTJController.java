package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.isane.in.entity.ZLTJ;
import com.isane.ragdoll.web.RagdollControllerImpl;

/****
 * 
 * 安全生产.科技管理.专利统计
 * @author HH
 *
 */

@Controller
@RequestMapping(value = "/api/ZLTJ")
public class ZLTJController extends RagdollControllerImpl<ZLTJ> {

	@Override
	public ZLTJ getEmptyEntity() {
		return new ZLTJ();
	}

	@Override
	public Class<ZLTJ> getEntityClass() {
		return ZLTJ.class;
	}
}