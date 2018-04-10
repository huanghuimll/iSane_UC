package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;

public class Import implements Entity {
	private static final long serialVersionUID = 1L;
	private long id;
	private String plantCode;
	private String originalCode;
	private int sheet;
	private int row;
	private int col;
	private String importType;
	private String dateType;
	private String storeDate;
	private int originalDataVersion;

	public Import() {
		super();
	}

	public Import(String importType) {
		super();
		this.importType = importType;
	}

	public int getOriginalDataVersion() {
		return originalDataVersion;
	}

	public void setOriginalDataVersion(int originalDataVersion) {
		this.originalDataVersion = originalDataVersion;
	}

	public String getPlantCode() {
		return plantCode;
	}

	public void setPlantCode(String plantCode) {
		this.plantCode = plantCode;
	}

	public String getStoreDate() {
		return storeDate;
	}

	public void setStoreDate(String storeDate) {
		this.storeDate = storeDate;
	}

	public String getDateType() {
		return dateType;
	}

	public void setDateType(String dateType) {
		this.dateType = dateType;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public void setOriginalCode(String originalCode) {
		this.originalCode = originalCode;
	}

	public String getOriginalCode() {
		return originalCode;
	}

	public void setSheet(int sheet) {
		this.sheet = sheet;
	}

	public int getSheet() {
		return sheet;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public int getRow() {
		return row;
	}

	public void setCol(int col) {
		this.col = col;
	}

	public int getCol() {
		return col;
	}

	public void setImportType(String importType) {
		this.importType = importType;
	}

	public String getImportType() {
		return importType;
	}

	@Override
	public boolean isEmptyProperties() {
		if (id != 0) {
			return false;
		}
		if (null != originalCode && !"".equals(originalCode)) {
			return false;
		}
		if (sheet != 0) {
			return false;
		}
		if (row != 0) {
			return false;
		}
		if (col != 0) {
			return false;
		}
		if (null != importType && !"".equals(importType)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "Import";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  originalCode:%s ,  sheet:%s ,  row:%s ,  col:%s ,  importType:%s,  dateType:%s ,  storeDate:%s", id,
				originalCode, sheet, row, col, importType, dateType, storeDate );
	}
}
