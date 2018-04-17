package com.isane.in.entity;

import java.util.List;

import com.isane.ragdoll.persistent.entity.Entity;
public class DimNavNodeC implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String navCode; //$item.comment
	private String navName; //$item.comment
	private String navUrl; //$item.comment
	private String parentCode; //$item.comment
	private boolean isHome; //$item.comment
	private int disOrder; //$item.comment
	
	private String plantCode; // 厂级编码
	private int childrenCount;// 菜单异步加载判断是否有子集
	private boolean leaf;
	private List<DimNavNodeC> children;// 子菜单
	//private String iconUrl;
	private boolean checked;	
	
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

	public String getPlantCode() {
		return plantCode;
	}
	public void setPlantCode(String plantCode) {
		this.plantCode = plantCode;
	}
	public int getChildrenCount() {
		return childrenCount;
	}
	public void setChildrenCount(int childrenCount) {
		this.childrenCount = childrenCount;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public List<DimNavNodeC> getChildren() {
		return children;
	}
	public void setChildren(List<DimNavNodeC> childList) {
		this.children = childList;
	}
	public boolean isChecked() {
		return checked;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
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
	
	public void copyFrom(DimNav m) {
		this.id = m.getId();
		this.navCode = m.getNavCode();
		this.navName = m.getNavName();
		this.parentCode = m.getParentCode();
		this.disOrder = m.getDisOrder();
		//this.iconUrl = m.getIconUrl();
		//this.checked = m.getResource() == null || "".equals(m.getResource()) ? false : true;
	}	
}
