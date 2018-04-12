package com.isane.in.entity;

import java.util.List;

public class MenuNodeC {
	private long id; // 主键ID
	private String plantCode; // 厂级编码
	private String menuCode;
	private String menuTitle; // 菜单名
	private String menuAction; // 菜单资源
	private String parentCode; // 父级ID
	private int actionType; // 菜单资源类型
	private int displayOrder; // 排序
	private int childrenCount;// 菜单异步加载判断是否有子集
	private boolean leaf;
	private List<MenuNodeC> children;// 子菜单
	//private String iconUrl;
	private boolean checked;

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getMenuCode() {
		return menuCode;
	}

	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}

	public List<MenuNodeC> getChildren() {
		return children;
	}

	public void setChildren(List<MenuNodeC> children) {
		this.children = children;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public int getChildrenCount() {
		return childrenCount;
	}

	public void setChildrenCount(int childrenCount) {
		this.childrenCount = childrenCount;
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

	public String getParentCode() {
		return parentCode;
	}

	public void setParentCode(String parentCode) {
		this.parentCode = parentCode;
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

	/*public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}*/

	@Override
	public String toString() {
		return String.format(
				" id:%s ,  plantCode:%s ,  menuTitle:%s ,  menuAction:%s ,  parentCode:%s ,  actionType:%s ,  displayOrder:%s  ,leaf:%s",
				id, plantCode, menuTitle, menuAction, parentCode, actionType, displayOrder, leaf);
	}

	public void copyFrom(Menu m) {
		this.id = m.getId();
		this.plantCode = m.getPlantCode();
		this.menuCode = m.getMenuCode();
		this.menuTitle = m.getMenuTitle();
		this.menuAction = m.getMenuAction();
		this.parentCode = m.getParentCode();
		this.actionType = m.getActionType();
		this.displayOrder = m.getDisplayOrder();
		this.childrenCount = m.getChildrenCount();
		this.leaf = m.getLeaf();
		//this.iconUrl = m.getIconUrl();
		//this.checked = m.getResource() == null || "".equals(m.getResource()) ? false : true;
	}

}
