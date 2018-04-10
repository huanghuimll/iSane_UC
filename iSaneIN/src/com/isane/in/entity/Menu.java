package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;

public class Menu implements Entity {
	private static final long serialVersionUID = 1L;
	private long id; // 主键ID
	private String plantCode; // 厂级编码
	private String menuCode; //
	private String menuTitle; // 菜单名
	private String menuAction; // 菜单资源
	private String parentCode; // 父级ID
	private int actionType; // 菜单资源类型
	private int displayOrder; // 排序
	private String iconUrl; //
	private int childrenCount;// 菜单异步加载判断是否有子集
	private boolean leaf;
	//用来查询没有实际意义
	private int menuTypeId;

	private String roleCode;
	private String resource;
	private String userCode;

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getResource() {
		return resource;
	}

	public void setResource(String resource) {
		this.resource = resource;
	}

	public int getChildrenCount() {
		return childrenCount;
	}

	public void setChildrenCount(int childrenCount) {
		this.childrenCount = childrenCount;
	}

	public boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public int getMenuTypeId() {
		return menuTypeId;
	}

	public void setMenuTypeId(int menuTypeId) {
		this.menuTypeId = menuTypeId;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public void setPlantCode(String plantCode) {
		this.plantCode = plantCode;
	}

	public String getPlantCode() {
		return plantCode;
	}

	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}

	public String getMenuCode() {
		return menuCode;
	}

	public void setMenuTitle(String menuTitle) {
		this.menuTitle = menuTitle;
	}

	public String getMenuTitle() {
		return menuTitle;
	}

	public void setMenuAction(String menuAction) {
		this.menuAction = menuAction;
	}

	public String getMenuAction() {
		return menuAction;
	}

	public void setParentCode(String parentCode) {
		this.parentCode = parentCode;
	}

	public String getParentCode() {
		return parentCode;
	}

	public void setActionType(int actionType) {
		this.actionType = actionType;
	}

	public int getActionType() {
		return actionType;
	}

	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}

	public int getDisplayOrder() {
		return displayOrder;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

	public String getIconUrl() {
		return iconUrl;
	}

	@Override
	public boolean isEmptyProperties() {
		if (id != 0) {
			return false;
		}
		if (null != plantCode && !"".equals(plantCode)) {
			return false;
		}
		if (null != menuCode && !"".equals(menuCode)) {
			return false;
		}
		if (null != menuTitle && !"".equals(menuTitle)) {
			return false;
		}
		if (null != menuAction && !"".equals(menuAction)) {
			return false;
		}
		if (null != parentCode && !"".equals(parentCode)) {
			return false;
		}
		if (actionType != 0) {
			return false;
		}
		if (displayOrder != 0) {
			return false;
		}
		if (null != iconUrl && !"".equals(iconUrl)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "Menu";
	}

	@Override
	public String toString() {
		return String.format(
				" id:%s ,  plantCode:%s ,  menuCode:%s ,  menuTitle:%s ,  menuAction:%s ,  parentCode:%s ,  actionType:%s ,  displayOrder:%s ,  iconUrl:%s  ,resource:%s",
				id, plantCode, menuCode, menuTitle, menuAction, parentCode, actionType, displayOrder, iconUrl,
				resource);
	}
}
