package com.isane.in.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.persistent.entity.Operation;
import com.isane.ragdoll.persistent.type.DaoConst;
import com.isane.ragdoll.service.RagdollService;
import com.isane.ragdoll.web.Errors;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.RolePermission;


@Controller
@RequestMapping(value = "/api/RolePermission")
public class RolePermissionController extends RagdollControllerImpl<RolePermission> {

	@Override
	public RolePermission getEmptyEntity() {
		return new RolePermission();
	}

	@Override
	public Class<RolePermission> getEntityClass() {
		return RolePermission.class;
	}
	
	@PostMapping("addAndRemove")
	@ResponseBody
	public Operation addAndRemove(@RequestBody List<RolePermission> list) {
		//System.out.println(list);
		if ( list == null || list.size() == 0 ) {
			return null;
		}
		
		//1、将roleCode = list.get(0).roleCode 的数据都查出来 allList
		String roleCode = list.get(0).getRoleCode();
		int typeId = list.get(0).getTypeId();
		RagdollService<RolePermission> service = getService();
		RolePermission rp = new RolePermission();
		rp.setRoleCode(roleCode);
		rp.setTypeId(typeId);
		List<RolePermission> allList  = service.list(rp, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT);
		//2、 将参数list与allList进行比对,将list中没在allList中的数据放在insertList中，将allList中有但list中没有的数据放在removeList中
		List<RolePermission> insertList = new ArrayList<RolePermission>();
		List<RolePermission> removeList = new ArrayList<RolePermission>();
		
		List<RolePermission> tempList = new ArrayList<RolePermission>();
		List<RolePermission> tempAllList = new ArrayList<RolePermission>();
		
		if ( allList == null || allList.size() == 0 ) {
			insertList = list;
		}else{
			for(RolePermission item: list){
				for(RolePermission obj: allList){
					if(item.getChildCode().equalsIgnoreCase(obj.getChildCode())){
						//item.setId(obj.getId());//注意,让共同体保持一致
						tempList.add(item);
						tempAllList.add(obj);
						break;
					}
				}
			}
			
			list.removeAll(tempList);
			insertList = list;
			allList.removeAll(tempAllList);
			removeList = allList;
		}
		
		int insertCount = 0;
		if(insertList.size() > 0){
			insertCount = service.createMulti(RolePermission.class, insertList);
			logger.debug(String.format("增加成功%d个数据.", insertCount));
		}
		
		int removeCount = 0;
		if(removeList.size() > 0){
			removeCount = service.removeMulti(RolePermission.class, removeList);
			logger.debug(String.format("移除%d个数据.", removeCount));
		}		
		
		Operation op = new Operation();
		if(insertCount == insertList.size() && removeCount == removeList.size()) {
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage(String.format("增加成功%d个数据,移除%d个数据.", insertCount, removeCount));
			op.setObjJson("[]");
			op.setSuccess(true);
		} else {
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("保存失败.");
			op.setObjJson("[]");
			op.setSuccess(false);
		}

		return op;
	}	

}