package com.isane.in.entity;

import com.isane.ragdoll.persistent.annotation.PinYin;
import com.isane.ragdoll.persistent.annotation.RogdallEntity;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
public class Role implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String roleCode; //$item.comment
	private String roleName; //$item.comment
	private String roleDesc; //$item.comment
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setRoleCode (String roleCode) {
		this.roleCode = roleCode;
	}
	public String getRoleCode () {
		return roleCode;
	}
	public void setRoleName (String roleName) {
		this.roleName = roleName;
	}
	public String getRoleName () {
		return roleName;
	}
	public void setRoleDesc (String roleDesc) {
		this.roleDesc = roleDesc;
	}
	public String getRoleDesc () {
		return roleDesc;
	}

@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != roleCode && !"".equals(roleCode)) {
			return false;
		}
		if(null != roleName && !"".equals(roleName)) {
			return false;
		}
		if(null != roleDesc && !"".equals(roleDesc)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "Role";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  roleCode:%s ,  roleName:%s ,  roleDesc:%s  ", 
				 id ,  roleCode ,  roleName ,  roleDesc  );
	}
}
