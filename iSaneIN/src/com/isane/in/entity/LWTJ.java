package com.isane.in.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
import java.util.Date;



/****
 * 
 * 安全生产.科技管理.论文统计
 * @author HH
 *
 */
public class LWTJ implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String lwName; //$item.comment
	private String lwContent; //$item.comment
	private String lwAuthor; //$item.comment
	private String lwUnit; //$item.comment
	private String lwFKW; //$item.comment
	private String lwSL; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dataTime; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date inputTime; //$item.comment
	private String plantCode;
	
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setLwName (String lwName) {
		this.lwName = lwName;
	}
	public String getLwName () {
		return lwName;
	}
	public void setLwContent (String lwContent) {
		this.lwContent = lwContent;
	}
	public String getLwContent () {
		return lwContent;
	}
	public void setLwAuthor (String lwAuthor) {
		this.lwAuthor = lwAuthor;
	}
	public String getLwAuthor () {
		return lwAuthor;
	}
	public void setLwUnit (String lwUnit) {
		this.lwUnit = lwUnit;
	}
	public String getLwUnit () {
		return lwUnit;
	}
	public void setLwFKW (String lwFKW) {
		this.lwFKW = lwFKW;
	}
	public String getLwFKW () {
		return lwFKW;
	}
	public void setLwSL (String lwSL) {
		this.lwSL = lwSL;
	}
	public String getLwSL () {
		return lwSL;
	}
	public void setDataTime (Date dataTime) {
		this.dataTime = dataTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public Date getDataTime () {
		return dataTime;
	}
	public void setInputTime (Date inputTime) {
		this.inputTime = inputTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public Date getInputTime () {
		return inputTime;
	}
	public String getPlantCode() {
		return plantCode;
	}
	public void setPlantCode(String plantCode) {
		this.plantCode = plantCode;
	}
	
	@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != lwName && !"".equals(lwName)) {
			return false;
		}
		if(null != lwContent && !"".equals(lwContent)) {
			return false;
		}
		if(null != lwAuthor && !"".equals(lwAuthor)) {
			return false;
		}
		if(null != lwUnit && !"".equals(lwUnit)) {
			return false;
		}
		if(null != lwFKW && !"".equals(lwFKW)) {
			return false;
		}
		if(null != lwSL && !"".equals(lwSL)) {
			return false;
		}
		if(null != dataTime) {
			return false;
		}
		if(null != inputTime) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "LWTJ";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  lwName:%s ,  lwContent:%s ,  lwAuthor:%s ,  lwUnit:%s ,  lwFKW:%s ,  lwSL:%s ,  dataTime:%s ,  inputTime:%s  ", 
				 id ,  lwName ,  lwContent ,  lwAuthor ,  lwUnit ,  lwFKW ,  lwSL ,  dataTime ,  inputTime  );
	}
}
