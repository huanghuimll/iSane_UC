package com.isane.in.controller;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.persistent.entity.ListEntity;
import com.isane.ragdoll.persistent.entity.Operation;
import com.isane.ragdoll.persistent.type.DaoConst;
import com.isane.ragdoll.service.RagdollService;
import com.isane.ragdoll.web.Errors;
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
	
	@RequestMapping(value = "/queryUsersNotIn", method=RequestMethod.GET)
	@ResponseBody
	public ListEntity<RoleUser> queryUsersNotIn(RoleUser ru) {
		//System.out.println("USER IS:"+user);
		ListEntity<RoleUser> le = new ListEntity<RoleUser>();
		
		if(ru == null || ru.getRoleCode() == null){
			return le;
		}
		
		RagdollService<RoleUser> rus = getService();
		
		List<RoleUser> list = rus.listCustom(ru, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT, "queryUsersNotIn");
		if(list != null){
			le.setList(list);
		}
		
		int count = rus.countCustom(ru, "queryUsersNotInCount");
		if(count > 0){
			le.setTotalCount(count);
		}
		
		return le;
	}
	
	@RequestMapping(value = "/queryUsersIn", method=RequestMethod.GET)
	@ResponseBody
	public ListEntity<RoleUser> queryUsersIn(RoleUser ru) {
		//System.out.println("USER IS:"+user);
		ListEntity<RoleUser> le = new ListEntity<RoleUser>();
		
		if(ru == null || ru.getRoleCode() == null){
			return le;
		}
		
		RagdollService<RoleUser> rus = getService();
		
		List<RoleUser> list = rus.listCustom(ru, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT, "queryUsersIn");
		if(list != null){
			le.setList(list);
		}
		
		int count = rus.countCustom(ru, "queryUsersInCount");
		if(count > 0){
			le.setTotalCount(count);
		}
		
		return le;
	}
	
	@PostMapping("addRoleUsers")
	@ResponseBody
	public Operation addRoleUsers(@RequestBody List<RoleUser> list) {
		//System.out.println(list);
		if (list == null || list.size() == 0) {
			return null;
		}
		int total = 0;
		if (list.size() != 0) {
			total = getService().createMulti(RoleUser.class, list);
		}
		
		Operation op = new Operation();
		if(total == list.size()) {
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("增加多个成功.");
			op.setObjJson("[]");
			op.setSuccess(true);
		} else {
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("增加多个失败.");
			op.setObjJson("[]");
			op.setSuccess(false);
		}

		return op;
	}
	
	@PostMapping("deleteRoleUsers")
	@ResponseBody
	public Operation deleteRoleUsers(@RequestBody List<RoleUser> list) {
		System.out.println(list);
		if (list.size() == 0 || list == null) {
			return null;
		}
		
		if (list.size() == 0 || list == null) {
			return null;
		}
		int total = 0;
		if (list.size() != 0) {
			total = getService().removeMulti(RoleUser.class, list);
		}
		
		Operation op = new Operation();
		if(total == list.size()) {
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("删除多个成功.");
			op.setObjJson("[]");
			op.setSuccess(true);
		} else {
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("删除多个失败.");
			op.setObjJson("[]");
			op.setSuccess(false);
		}

		return op;
	}	
	
}