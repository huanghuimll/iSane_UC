package com.isane.in.entity;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isane.ragdoll.persistent.entity.Entity;

public class IndexDat implements Entity{
private static final long serialVersionUID = 1L;
    private String tempName; //导出模板名
    private String fileName; //导出文件名
	private String indexCode; //$item.comment
	private String dateType; //$item.comment
	private int computeVersion; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date storeDate; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date computeDate; //$item.comment
	private BigDecimal indexValue; //$item.comment
	private int computeStatus; //$item.comment
	private String originalDataVersions; //$item.comment
	private long id; //$item.comment
	private int monthOfYear; //$item.comment
	private String valueUnit;
	
	public String getTempName() {
		return tempName;
	}
	public void setTempName(String tempName) {
		this.tempName = tempName;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public void setIndexCode (String indexCode) {
		this.indexCode = indexCode;
	}
	public String getIndexCode () {
		return indexCode;
	}
	public void setDateType (String dateType) {
		this.dateType = dateType;
	}
	public String getDateType () {
		return dateType;
	}
	public void setComputeVersion (int computeVersion) {
		this.computeVersion = computeVersion;
	}
	public int getComputeVersion () {
		return computeVersion;
	}
	public void setStoreDate (Date storeDate) {
		this.storeDate = storeDate;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getStoreDate () {
		return storeDate;
	}
	public void setComputeDate (Date computeDate) {
		this.computeDate = computeDate;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getComputeDate () {
		return computeDate;
	}
	public void setIndexValue (BigDecimal indexValue) {
		this.indexValue = indexValue;
	}
	public BigDecimal getIndexValue () {
		return indexValue;
	}
	public void setComputeStatus (int computeStatus) {
		this.computeStatus = computeStatus;
	}
	public int getComputeStatus () {
		return computeStatus;
	}
	public void setOriginalDataVersions (String originalDataVersions) {
		this.originalDataVersions = originalDataVersions;
	}
	public String getOriginalDataVersions () {
		return originalDataVersions;
	}
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setMonthOfYear (int monthOfYear) {
		this.monthOfYear = monthOfYear;
	}
	public int getMonthOfYear () {
		return monthOfYear;
	}

	public String getValueUnit() {
		return valueUnit;
	}
	public void setValueUnit(String valueUnit) {
		this.valueUnit = valueUnit;
	}
	@Override
	public boolean isEmptyProperties() {
		if(null != indexCode && !"".equals(indexCode)) {
			return false;
		}
		if(null != dateType && !"".equals(dateType)) {
			return false;
		}
		if(computeVersion != 0) {
			return false;
		}
		if(null != storeDate) {
			return false;
		}
		if(null != computeDate) {
			return false;
		}
		if(computeStatus != 0) {
			return false;
		}
		if(null != originalDataVersions && !"".equals(originalDataVersions)) {
			return false;
		}
		if(id != 0) {
			return false;
		}
		if(monthOfYear != 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "IndexData";
	}

	@Override
	public String toString() {
		return String.format(" indexCode:%s ,  dateType:%s ,  computeVersion:%s ,  storeDate:%s ,  computeDate:%s ,  indexValue:%s ,  computeStatus:%s ,  originalDataVersions:%s ,  id:%s ,  monthOfYear:%s  ", 
				 indexCode ,  dateType ,  computeVersion ,  storeDate ,  computeDate ,  indexValue ,  computeStatus ,  originalDataVersions ,  id ,  monthOfYear  );
	}
}
