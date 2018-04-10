package com.isane.in.entity;

import com.isane.ragdoll.persistent.annotation.PinYin;
import com.isane.ragdoll.persistent.annotation.RogdallEntity;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
public class RoleUser implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private int userId; //$item.comment
	private int roleId; //$item.comment
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
		return String.format(" id:%s ,  userId:%s ,  roleId:%s  ", 
				 id ,  userId ,  roleId  );
	}
}
