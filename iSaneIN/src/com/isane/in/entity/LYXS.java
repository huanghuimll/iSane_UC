package com.isane.in.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isane.ragdoll.persistent.entity.Entity;

public class LYXS implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private int lyxsValue; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dataTime; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date inputTime; //$item.comment
	private String unit; //$item.comment
	private String contentCode; //$item.comment
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setLyxsValue (int lyxsValue) {
		this.lyxsValue = lyxsValue;
	}
	public int getLyxsValue () {
		return lyxsValue;
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
	public void setContentCode (String contentCode) {
		this.contentCode = contentCode;
	}
	public String getContentCode () {
		return contentCode;
	}
	
	@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(lyxsValue != 0) {
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
		if(null != contentCode && !"".equals(contentCode)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "LYXS";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  lyxsValue:%s ,  dataTime:%s ,  inputTime:%s ,  unit:%s ,  contentCode:%s  ", 
				 id ,  lyxsValue ,  dataTime ,  inputTime ,  unit ,  contentCode  );
	}
}
