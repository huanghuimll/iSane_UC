package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;

public class RoleUser implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private int userId; //$item.comment
	private int roleId; //$item.comment
	private String userCode;
	private String userName;
	private String roleCode;
	private String roleName;
	private int userStatus;
	
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setUserId (int userId) {
		this.userId = userId;
	}
	public int getUserId () {
		return userId;
	}
	public void setRoleId (int roleId) {
		this.roleId = roleId;
	}
	public int getRoleId () {
		return roleId;
	}

	public String getUserCode() {
		return userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getRoleCode() {
		return roleCode;
	}
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public int getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(int userStatus) {
		this.userStatus = userStatus;
	}
	@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(userId != 0) {
			return false;
		}
		if(roleId != 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "RoleUser";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  userCode:%s ,  roleCode:%s  ", 
				 id ,  userCode ,  roleCode  );
	}
}
