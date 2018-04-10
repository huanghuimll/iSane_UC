package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;
public class DimArea implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String areaCode; //$item.comment
	private String areaName; //$item.comment
	private String areaDesc; //$item.comment
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setAreaCode (String areaCode) {
		this.areaCode = areaCode;
	}
	public String getAreaCode () {
		return areaCode;
	}
	public void setAreaName (String areaName) {
		this.areaName = areaName;
	}
	public String getAreaName () {
		return areaName;
	}
	public void setAreaDesc (String areaDesc) {
		this.areaDesc = areaDesc;
	}
	public String getAreaDesc () {
		return areaDesc;
	}

@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != areaCode && !"".equals(areaCode)) {
			return false;
		}
		if(null != areaName && !"".equals(areaName)) {
			return false;
		}
		if(null != areaDesc && !"".equals(areaDesc)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "DimArea";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  areaCode:%s ,  areaName:%s ,  areaDesc:%s  ", 
				 id ,  areaCode ,  areaName ,  areaDesc  );
	}
}
