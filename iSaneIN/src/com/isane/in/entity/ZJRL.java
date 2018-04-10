package com.isane.in.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isane.ragdoll.persistent.entity.Entity;

public class ZJRL implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String contentCode; //$item.comment
	private int zjrlValue; //$item.comment
	private String zjrlType; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date dataTime; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date inputTime; //$item.comment
	private String unit; //$item.comment
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setContentCode (String contentCode) {
		this.contentCode = contentCode;
	}
	public String getContentCode () {
		return contentCode;
	}
	public void setZjrlValue (int zjrlValue) {
		this.zjrlValue = zjrlValue;
	}
	public int getZjrlValue () {
		return zjrlValue;
	}
	public void setZjrlType (String zjrlType) {
		this.zjrlType = zjrlType;
	}
	public String getZjrlType () {
		return zjrlType;
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
	public void setUnit (String unit) {
		this.unit = unit;
	}
	public String getUnit () {
		return unit;
	}

@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != contentCode && !"".equals(contentCode)) {
			return false;
		}
		if(zjrlValue != 0) {
			return false;
		}
		if(null != zjrlType && !"".equals(zjrlType)) {
			return false;
		}
		if(null != dataTime) {
			return false;
		}
		if(null != inputTime) {
			return false;
		}
		if(null != unit && !"".equals(unit)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "ZJRL";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  contentCode:%s ,  zjrlValue:%s ,  zjrlType:%s ,  dataTime:%s ,  inputTime:%s ,  unit:%s  ", 
				 id ,  contentCode ,  zjrlValue ,  zjrlType ,  dataTime ,  inputTime ,  unit  );
	}
}
