package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;

public class SystemItemValue implements Entity {
	private static final long serialVersionUID = 1L;
	private long id; // $item.comment
	private String itemCode; // $item.comment
	private String valueCode; // $item.comment
	private String valueName; // $item.comment
	private String value1; // $item.comment
	private String value2; // $item.comment

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

	public void setValueCode(String valueCode) {
		this.valueCode = valueCode;
	}

	public String getValueCode() {
		return valueCode;
	}

	public void setValueName(String valueName) {
		this.valueName = valueName;
	}

	public String getValueName() {
		return valueName;
	}

	public void setValue1(String value1) {
		this.value1 = value1;
	}

	public String getValue1() {
		return value1;
	}

	public void setValue2(String value2) {
		this.value2 = value2;
	}

	public String getValue2() {
		return value2;
	}

	@Override
	public boolean isEmptyProperties() {
		if (id != 0) {
			return false;
		}
		if (null != itemCode && !"".equals(itemCode)) {
			return false;
		}
		if (null != valueCode && !"".equals(valueCode)) {
			return false;
		}
		if (null != valueName && !"".equals(valueName)) {
			return false;
		}
		if (null != value1 && !"".equals(value1)) {
			return false;
		}
		if (null != value2 && !"".equals(value2)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "SystemItemValue";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  itemCode:%s ,  valueCode:%s ,  valueName:%s ,  value1:%s ,  value2:%s  ", id,
				itemCode, valueCode, valueName, value1, value2);
	}
}
