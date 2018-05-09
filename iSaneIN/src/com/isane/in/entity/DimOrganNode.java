package com.isane.in.entity;

import java.util.List;

public class DimOrganNode {
	private long id; // 主键ID
	private String organKey;
	private String organName; // 菜单名
	private String organDesc; //
	private String organParentId; //
	private int organType =1;
	private int organLev;
	//private int childrenCount;// 菜单异步加载判断是否有子集
	private boolean leaf = true;
	private List<DimOrganNode> children;// 子菜单
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getOrganKey() {
		return organKey;
	}
	public void setOrganKey(String organKey) {
		this.organKey = organKey;
	}
	public String getOrganName() {
		return organName;
	}
	public void setOrganName(String organName) {
		this.organName = organName;
	}
	public String getOrganDesc() {
		return organDesc;
	}
	public void setOrganDesc(String organDesc) {
		this.organDesc = organDesc;
	}
	public String getOrganParentId() {
		return organParentId;
	}
	public void setOrganParentId(String organParentId) {
		this.organParentId = organParentId;
	}
	public int getOrganType() {
		return organType;
	}
	public void setOrganType(int organType) {
		this.organType = organType;
	}
	public int getOrganLev() {
		return organLev;
	}
	public void setOrganLev(int organLev) {
		this.organLev = organLev;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public List<DimOrganNode> getChildren() {
		return children;
	}
	public void setChildren(List<DimOrganNode> children) {
		this.children = children;
	}
	
	@Override
	public String toString() {
		return "DimOrganNode [id=" + id + ", organKey=" + organKey + ", organName=" + organName + ", organParentId="
				+ organParentId + ", organType=" + organType + ", leaf=" + leaf + ", children=" + children + "]";
	}
	public void copyFrom(DimOrganization m) {
		this.id = m.getId();
		this.organKey = m.getOrganKey();
		this.organName = m.getOrganName();
		this.organParentId = m.getOrganParentId();
		this.organDesc = m.getOrganDesc();
		this.organType = m.getOrganType();
		this.organLev = m.getOrganLev();
		//this.leaf = m.getLeaf();
		//this.iconUrl = m.getIconUrl();
	}

}
