package com.isane.in.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isane.ragdoll.persistent.entity.Entity;

public class AQYXZT implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String organCode; //$item.comment
	private String jzKey; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date startTime; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date endTime; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date inputTime; //$item.comment
	private String yxType; //$item.comment
	private String gzType; //$item.comment
	private float dayCount; //$item.comment
	private String yxDesc; //$item.comment
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setOrganCode (String organCode) {
		this.organCode = organCode;
	}
	public String getOrganCode () {
		return organCode;
	}
	public void setJzKey (String jzKey) {
		this.jzKey = jzKey;
	}
	public String getJzKey () {
		return jzKey;
	}
	public void setStartTime (Date startTime) {
		this.startTime = startTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getStartTime () {
		return startTime;
	}
	public void setEndTime (Date endTime) {
		this.endTime = endTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getEndTime () {
		return endTime;
	}
	public void setInputTime (Date inputTime) {
		this.inputTime = inputTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getInputTime () {
		return inputTime;
	}
	public String getYxType() {
		return yxType;
	}
	public void setYxType(String yxType) {
		this.yxType = yxType;
	}
	public String getGzType() {
		return gzType;
	}
	public void setGzType(String gzType) {
		this.gzType = gzType;
	}
	public void setDayCount (float dayCount) {
		this.dayCount = dayCount;
	}
	public float getDayCount () {
		return dayCount;
	}
	public void setYxDesc (String yxDesc) {
		this.yxDesc = yxDesc;
	}
	public String getYxDesc () {
		return yxDesc;
	}

@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != organCode && !"".equals(organCode)) {
			return false;
		}
		if(null != jzKey && !"".equals(jzKey)) {
			return false;
		}
		if(null != startTime) {
			return false;
		}
		if(null != endTime) {
			return false;
		}
		if(null != inputTime) {
			return false;
		}
		if(null != yxDesc && !"".equals(yxDesc)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "AQYXZT";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  organCode:%s ,  jzKey:%s ,  startTime:%s ,  endTime:%s ,  inputTime:%s ,  yxType :%s ,  gzType:%s ,  dayCount:%s ,  yxDesc:%s  ", 
				 id ,  organCode ,  jzKey ,  startTime ,  endTime ,  inputTime ,  yxType,  gzType ,  dayCount ,  yxDesc  );
	}
}
