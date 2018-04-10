package com.isane.in.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
import java.util.Date;

public class AQLP implements Entity{
	private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private int hgps; //$item.comment
	private int zps; //$item.comment
	private String psDesc; //$item.comment
	private int disOrder; //$item.comment
	private String dataType; //$item.comment
	private String dataTypeValue; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM")
	private Date dataTime; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM")
	private Date inputTime; //$item.comment
	private String plantCode;
	
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setHgps (int hgps) {
		this.hgps = hgps;
	}
	public int getHgps () {
		return hgps;
	}
	public void setZps (int zps) {
		this.zps = zps;
	}
	public int getZps () {
		return zps;
	}
	public void setPsDesc (String psDesc) {
		this.psDesc = psDesc;
	}
	public String getPsDesc () {
		return psDesc;
	}
	public void setDisOrder (int disOrder) {
		this.disOrder = disOrder;
	}
	public int getDisOrder () {
		return disOrder;
	}
	public void setDataType (String dataType) {
		this.dataType = dataType;
	}
	public String getDataType () {
		return dataType;
	}
	public void setDataTypeValue (String dataTypeValue) {
		this.dataTypeValue = dataTypeValue;
	}
	public String getDataTypeValue () {
		return dataTypeValue;
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
		if(hgps != 0) {
			return false;
		}
		if(zps != 0) {
			return false;
		}
		if(null != psDesc && !"".equals(psDesc)) {
			return false;
		}
		if(disOrder != 0) {
			return false;
		}
		if(null != dataType && !"".equals(dataType)) {
			return false;
		}
		if(null != dataTypeValue && !"".equals(dataTypeValue)) {
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
		return "AQLP";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  hgps:%s ,  zps:%s ,  psDesc:%s ,  disOrder:%s ,  dataType:%s ,  dataTypeValue:%s ,  dataTime:%s ,  inputTime:%s  ", 
				 id ,  hgps ,  zps ,  psDesc ,  disOrder ,  dataType ,  dataTypeValue ,  dataTime ,  inputTime  );
	}
}
