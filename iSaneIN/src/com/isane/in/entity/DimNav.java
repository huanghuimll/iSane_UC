package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;
public class DimNav implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String navCode; //$item.comment
	private String navName; //$item.comment
	private String navUrl; //$item.comment
	private String parentCode; //$item.comment
	private boolean isHome; //$item.comment
	private int disOrder; //$item.comment
	
	private String roleCode;
	private int menuTypeId;
	
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setNavCode (String navCode) {
		this.navCode = navCode;
	}
	public String getNavCode () {
		return navCode;
	}
	public void setNavName (String navName) {
		this.navName = navName;
	}
	public String getNavName () {
		return navName;
	}
	public void setNavUrl (String navUrl) {
		this.navUrl = navUrl;
	}
	public String getNavUrl () {
		return navUrl;
	}
	public void setParentCode (String parentCode) {
		this.parentCode = parentCode;
	}
	public String getParentCode () {
		return parentCode;
	}
	public void setIsHome (boolean isHome) {
		this.isHome = isHome;
	}
	public boolean getIsHome () {
		return isHome;
	}
	public void setDisOrder (int disOrder) {
		this.disOrder = disOrder;
	}
	public int getDisOrder () {
		return disOrder;
	}

	public String getRoleCode() {
		return roleCode;
	}
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
	public int getMenuTypeId() {
		return menuTypeId;
	}
	public void setMenuTypeId(int menuTypeId) {
		this.menuTypeId = menuTypeId;
	}
	public void setHome(boolean isHome) {
		this.isHome = isHome;
	}
	
	@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != navCode && !"".equals(navCode)) {
			return false;
		}
		if(null != navName && !"".equals(navName)) {
			return false;
		}
		if(null != navUrl && !"".equals(navUrl)) {
			return false;
		}
		if(null != parentCode && !"".equals(parentCode)) {
			return false;
		}
		if(disOrder != 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "DimNav";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  navCode:%s ,  navName:%s ,  navUrl:%s ,  parentCode:%s ,  isHome:%s ,  disOrder:%s  ", 
				 id ,  navCode ,  navName ,  navUrl ,  parentCode ,  isHome ,  disOrder  );
	}
}
