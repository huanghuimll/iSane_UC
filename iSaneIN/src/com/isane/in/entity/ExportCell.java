package com.isane.in.entity;

import com.isane.ragdoll.persistent.annotation.PinYin;
import com.isane.ragdoll.persistent.entity.Entity;

public class ExportCell implements Entity {
	private static final long serialVersionUID = 1L;
	private long id; 
	private long exportId; 
	private int sheetNubmer; 
	private int rowNumber; 
	private int colNumber; 
	private String cellType; 
	private String cellContent; 
	@PinYin(field = "modifyFlag", firstLetter = true)
	private int modifyFlag; 
	private int decimalPlace; 
	private int cellWidth; 
	private int cellHeight; 

	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public void setExportId(long exportId) {
		this.exportId = exportId;
	}

	public long getExportId() {
		return exportId;
	}

	public void setSheetNubmer(int sheetNubmer) {
		this.sheetNubmer = sheetNubmer;
	}

	public int getSheetNubmer() {
		return sheetNubmer;
	}

	public void setRowNumber(int rowNumber) {
		this.rowNumber = rowNumber;
	}

	public int getRowNumber() {
		return rowNumber;
	}

	public void setColNumber(int colNumber) {
		this.colNumber = colNumber;
	}

	public int getColNumber() {
		return colNumber;
	}

	public void setCellType(String cellType) {
		this.cellType = cellType;
	}

	public String getCellType() {
		return cellType;
	}

	public void setCellContent(String cellContent) {
		this.cellContent = cellContent;
	}

	public String getCellContent() {
		return cellContent;
	}

	public void setModifyFlag(int modifyFlag) {
		this.modifyFlag = modifyFlag;
	}

	public int getModifyFlag() {
		return modifyFlag;
	}

	public void setDecimalPlace(int decimalPlace) {
		this.decimalPlace = decimalPlace;
	}

	public int getDecimalPlace() {
		return decimalPlace;
	}

	public void setCellWidth(int cellWidth) {
		this.cellWidth = cellWidth;
	}

	public int getCellWidth() {
		return cellWidth;
	}

	public void setCellHeight(int cellHeight) {
		this.cellHeight = cellHeight;
	}

	public int getCellHeight() {
		return cellHeight;
	}

	@Override
	public boolean isEmptyProperties() {
		if (id != 0) {
			return false;
		}
		if (exportId != 0) {
			return false;
		}
		if (sheetNubmer != 0) {
			return false;
		}
		if (rowNumber != 0) {
			return false;
		}
		if (colNumber != 0) {
			return false;
		}
		if (null != cellType && !"".equals(cellType)) {
			return false;
		}
		if (null != cellContent && !"".equals(cellContent)) {
			return false;
		}
		if (modifyFlag != 0) {
			return false;
		}
		if (decimalPlace != 0) {
			return false;
		}
		if (cellWidth != 0) {
			return false;
		}
		if (cellHeight != 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "ExportCell";
	}

	@Override
	public String toString() {
		return String.format(
				" id:%s ,  exportId:%s ,  sheetNubmer:%s ,  rowNumber:%s ,  colNumber:%s ,  cellType:%s ,  cellContent:%s ,  modifyFlag:%s ,  decimalPlace:%s ,  cellWidth:%s ,  cellHeight:%s  ",
				id, exportId, sheetNubmer, rowNumber, colNumber, cellType, cellContent, modifyFlag, decimalPlace,
				cellWidth, cellHeight);
	}
}
