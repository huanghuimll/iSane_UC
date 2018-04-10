package com.isane.in.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isane.ragdoll.persistent.entity.Entity;

public class SCFY implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String plantCode; //$item.comment
	private String scfyCode; //$item.comment
	private String scfyName; //$item.comment
	private float scfyValue; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dataTime; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date inputTime; //$item.comment
	private String scfyDesc; //$item.comment
	private String scfyType; //$item.comment
	
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date startTime;
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date endTime;
	
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setPlantCode (String plantCode) {
		this.plantCode = plantCode;
	}
	public String getPlantCode () {
		return plantCode;
	}
	public void setScfyCode (String scfyCode) {
		this.scfyCode = scfyCode;
	}
	public String getScfyCode () {
		return scfyCode;
	}
	public void setScfyName (String scfyName) {
		this.scfyName = scfyName;
	}
	public String getScfyName () {
		return scfyName;
	}
	public void setScfyValue (float scfyValue) {
		this.scfyValue = scfyValue;
	}
	public float getScfyValue () {
		return scfyValue;
	}
	public void setDataTime (Date dataTime) {
		this.dataTime = dataTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getDataTime () {
		return dataTime;
	}
	public void setInputTime (Date inputTime) {
		this.inputTime = inputTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getInputTime () {
		return inputTime;
	}
	public void setScfyDesc (String scfyDesc) {
		this.scfyDesc = scfyDesc;
	}
	public String getScfyDesc () {
		return scfyDesc;
	}
	public String getScfyType() {
		return scfyType;
	}
	public void setScfyType(String scfyType) {
		this.scfyType = scfyType;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != plantCode && !"".equals(plantCode)) {
			return false;
		}
		if(null != scfyCode && !"".equals(scfyCode)) {
			return false;
		}
		if(null != scfyName && !"".equals(scfyName)) {
			return false;
		}
		if(null != dataTime) {
			return false;
		}
		if(null != inputTime) {
			return false;
		}
		if(null != scfyDesc && !"".equals(scfyDesc)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "SCFY";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  plantCode:%s ,  scfyCode:%s ,  scfyName:%s ,  scfyValue:%s ,  dataTime:%s ,  inputTime:%s ,  scfyDesc:%s ,  scfyType:%s  ", 
				 id ,  plantCode ,  scfyCode ,  scfyName ,  scfyValue ,  dataTime ,  inputTime ,  scfyDesc ,  scfyType  );
	}
}
