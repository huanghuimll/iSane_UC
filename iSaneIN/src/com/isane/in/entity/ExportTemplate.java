package com.isane.in.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
import java.util.Date;

public class ExportTemplate implements Entity{
private static final long serialVersionUID = 1L;
	private long id;
	private String exportName;
	private String exportFile;
	private String exportType;
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date uploadDate;
	private String uploadUser;
	private int decimalPlace;
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setExportName (String exportName) {
		this.exportName = exportName;
	}
	public String getExportName () {
		return exportName;
	}
	public void setExportFile (String exportFile) {
		this.exportFile = exportFile;
	}
	public String getExportFile () {
		return exportFile;
	}
	public void setExportType (String exportType) {
		this.exportType = exportType;
	}
	public String getExportType () {
		return exportType;
	}
	public void setUploadDate (Date uploadDate) {
		this.uploadDate = uploadDate;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getUploadDate () {
		return uploadDate;
	}
	public void setUploadUser (String uploadUser) {
		this.uploadUser = uploadUser;
	}
	public String getUploadUser () {
		return uploadUser;
	}
	public void setDecimalPlace (int decimalPlace) {
		this.decimalPlace = decimalPlace;
	}
	public int getDecimalPlace () {
		return decimalPlace;
	}

@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != exportName && !"".equals(exportName)) {
			return false;
		}
		if(null != exportFile && !"".equals(exportFile)) {
			return false;
		}
		if(null != exportType && !"".equals(exportType)) {
			return false;
		}
		if(null != uploadDate) {
			return false;
		}
		if(null != uploadUser && !"".equals(uploadUser)) {
			return false;
		}
		if(decimalPlace != 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "ExportTemplate";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  exportName:%s ,  exportFile:%s ,  exportType:%s ,  uploadDate:%s ,  uploadUser:%s ,  decimalPlace:%s  ", 
				 id ,  exportName ,   exportFile ,  exportType ,  uploadDate ,  uploadUser ,  decimalPlace  );
	}
}
