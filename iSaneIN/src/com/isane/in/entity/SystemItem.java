package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;

public class SystemItem implements Entity {
	private static final long serialVersionUID = 1L;
	private long id; // $item.comment
	private String itemCode; // $item.comment
	private String itemName; // $item.comment
	private String itemDesc; // $item.comment
	private String itemType;

	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getItemCode() {
		return itemCode;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}

	public String getItemDesc() {
		return itemDesc;
	}

	public String getItemType() {
		return itemType;
	}

	public void setItemType(String itemType) {
		this.itemType = itemType;
	}

	@Override
	public boolean isEmptyProperties() {
		if (id != 0) {
			return false;
		}
		if (null != itemCode && !"".equals(itemCode)) {
			return false;
		}
		if (null != itemName && !"".equals(itemName)) {
			return false;
		}
		if (null != itemDesc && !"".equals(itemDesc)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "SystemItem";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  itemCode:%s ,  itemName:%s ,  itemDesc:%s  ", id, itemCode, itemName, itemDesc);
	}
}
