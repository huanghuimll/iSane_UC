package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;
public class RolePermission implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private int roleId; //$item.comment
	private String roleCode;
	private int childId; //$item.comment
	private String childCode;
	private int typeId; //$item.comment
	private int isAdd; //$item.comment
	private int isDelete; //$item.comment
	private int isModify; //$item.comment
	private int isQuery; //$item.comment
	private int isSpecial; //$item.comment
	
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setRoleId (int roleId) {
		this.roleId = roleId;
	}
	public int getRoleId () {
		return roleId;
	}
	public String getRoleCode() {
		return roleCode;
	}
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
	public void setChildId (int childId) {
		this.childId = childId;
	}
	public int getChildId () {
		return childId;
	}
	public String getChildCode() {
		return childCode;
	}
	public void setChildCode(String childCode) {
		this.childCode = childCode;
	}
	public void setTypeId (int typeId) {
		this.typeId = typeId;
	}
	public int getTypeId () {
		return typeId;
	}
	public void setIsAdd (int isAdd) {
		this.isAdd = isAdd;
	}
	public int getIsAdd () {
		return isAdd;
	}
	public void setIsDelete (int isDelete) {
		this.isDelete = isDelete;
	}
	public int getIsDelete () {
		return isDelete;
	}
	public void setIsModify (int isModify) {
		this.isModify = isModify;
	}
	public int getIsModify () {
		return isModify;
	}
	public void setIsQuery (int isQuery) {
		this.isQuery = isQuery;
	}
	public int getIsQuery () {
		return isQuery;
	}
	public void setIsSpecial (int isSpecial) {
		this.isSpecial = isSpecial;
	}
	public int getIsSpecial () {
		return isSpecial;
	}

@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(roleId != 0) {
			return false;
		}
		if(childId != 0) {
			return false;
		}
		if(typeId != 0) {
			return false;
		}
		if(isAdd != 0) {
			return false;
		}
		if(isDelete != 0) {
			return false;
		}
		if(isModify != 0) {
			return false;
		}
		if(isQuery != 0) {
			return false;
		}
		if(isSpecial != 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "RolePermission";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  roleId:%s ,  childId:%s ,  typeId:%s ,  isAdd:%s ,  isDelete:%s ,  isModify:%s ,  isQuery:%s ,  isSpecial:%s  ", 
				 id ,  roleId ,  childId ,  typeId ,  isAdd ,  isDelete ,  isModify ,  isQuery ,  isSpecial  );
	}
}
