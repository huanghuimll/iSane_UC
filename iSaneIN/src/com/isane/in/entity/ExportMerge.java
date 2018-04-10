package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;

public class ExportMerge implements Entity {
	private static final long serialVersionUID = 1L;
	private long id; 
	private long exportId; 
	private int sheetNubmer; 
	private int mergeRow1; 
	private int mergeCol1; 
	private int mergeRow2; 
	private int mergeCol2; 
	
	public ExportMerge() {
		
	}
	
	public ExportMerge(long exportId, int sheetNumber, int r1, int c1, int r2, int c2) {
		this.exportId = exportId;
		this.sheetNubmer = sheetNumber;
		this.mergeRow1 = r1;
		this.mergeCol1 = c1;
		this.mergeRow2 = r2;
		this.mergeCol2 = c2;
	}

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

	public void setMergeRow1(int mergeRow1) {
		this.mergeRow1 = mergeRow1;
	}

	public int getMergeRow1() {
		return mergeRow1;
	}

	public void setMergeCol1(int mergeCol1) {
		this.mergeCol1 = mergeCol1;
	}

	public int getMergeCol1() {
		return mergeCol1;
	}

	public void setMergeRow2(int mergeRow2) {
		this.mergeRow2 = mergeRow2;
	}

	public int getMergeRow2() {
		return mergeRow2;
	}

	public void setMergeCol2(int mergeCol2) {
		this.mergeCol2 = mergeCol2;
	}

	public int getMergeCol2() {
		return mergeCol2;
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
		if (mergeRow1 != 0) {
			return false;
		}
		if (mergeCol1 != 0) {
			return false;
		}
		if (mergeRow2 != 0) {
			return false;
		}
		if (mergeCol2 != 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "ExportMerge";
	}

	@Override
	public String toString() {
		return String.format(
				" id:%s ,  exportId:%s ,  sheetNubmer:%s ,  mergeRow1:%s ,  mergeCol1:%s ,  mergeRow2:%s ,  mergeCol2:%s  ",
				id, exportId, sheetNubmer, mergeRow1, mergeCol1, mergeRow2, mergeCol2);
	}
}
