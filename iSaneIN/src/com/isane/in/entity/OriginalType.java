package com.isane.in.entity;

import java.math.BigDecimal;

import com.isane.ragdoll.persistent.entity.Entity;

public class OriginalType implements Entity {
	private static final long serialVersionUID = 1L;
	private String originalCode; // $item.comment
	private String dataType; // $item.comment
	private int dataOrder; // $item.comment
	private long id; // $item.comment

	private long dataId;
	private String originalName;
	private String originalDesc;
	private String plantCode;
	private String plantName;
	private String dateType;
	private String storeDate;
	private String inputDate;
	private BigDecimal originalValue = new BigDecimal(0.0);
	private int originalDataVersion;
	private String valueUnit;

	public long getDataId() {
		return dataId;
	}

	public void setDataId(long dataId) {
		this.dataId = dataId;
	}

	public OriginalType() {
		super();
	}

	public OriginalType(String plantCode, String dataType, String storeDate) {
		super();
		this.dataType = dataType;
		this.plantCode = plantCode;
		this.storeDate = storeDate;
	}

	public String getOriginalName() {
		return originalName;
	}

	public void setOriginalName(String originalName) {
		this.originalName = originalName;
	}

	public String getOriginalDesc() {
		return originalDesc;
	}

	public void setOriginalDesc(String originalDesc) {
		this.originalDesc = originalDesc;
	}

	public String getPlantName() {
		return plantName;
	}

	public void setPlantName(String plantName) {
		this.plantName = plantName;
	}

	public String getPlantCode() {
		return plantCode;
	}

	public void setPlantCode(String plantCode) {
		this.plantCode = plantCode;
	}

	public String getDateType() {
		return dateType;
	}

	public void setDateType(String dateType) {
		this.dateType = dateType;
	}

	public String getStoreDate() {
		return storeDate;
	}

	public void setStoreDate(String storeDate) {
		this.storeDate = storeDate;
	}

	public String getInputDate() {
		return inputDate;
	}

	public void setInputDate(String inputDate) {
		this.inputDate = inputDate;
	}

	public BigDecimal getOriginalValue() {
		return originalValue;
	}

	public void setOriginalValue(BigDecimal originalValue) {
		this.originalValue = originalValue;
	}

	public int getOriginalDataVersion() {
		return originalDataVersion;
	}

	public void setOriginalDataVersion(int originalDataVersion) {
		this.originalDataVersion = originalDataVersion;
	}

	public void setOriginalCode(String originalCode) {
		this.originalCode = originalCode;
	}

	public String getOriginalCode() {
		return originalCode;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataOrder(int dataOrder) {
		this.dataOrder = dataOrder;
	}

	public int getDataOrder() {
		return dataOrder;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public String getValueUnit() {
		return valueUnit;
	}

	public void setValueUnit(String valueUnit) {
		this.valueUnit = valueUnit;
	}

	@Override
	public boolean isEmptyProperties() {
		if (null != originalCode && !"".equals(originalCode)) {
			return false;
		}
		if (null != dataType && !"".equals(dataType)) {
			return false;
		}
		if (dataOrder != 0) {
			return false;
		}
		if (id != 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "OriginalType";
	}

	@Override
	public String toString() {
		return String.format(" originalCode:%s,  dataType:%s,  dataOrder:%s ,  originalValue:%s, storeDate:%s  ", originalCode, dataType,
				dataOrder, originalValue , storeDate);
	}
}
