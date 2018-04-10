package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;
public class DimAreaContent implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String contentCode; //$item.comment
	private String contentName; //$item.comment
	private String contentDesc; //$item.comment
	private int disOrder; //$item.comment
	private String areaCode; //$item.comment
	private int contentType; //$item.comment
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
	public void setContentName (String contentName) {
		this.contentName = contentName;
	}
	public String getContentName () {
		return contentName;
	}
	public void setContentDesc (String contentDesc) {
		this.contentDesc = contentDesc;
	}
	public String getContentDesc () {
		return contentDesc;
	}
	public void setDisOrder (int disOrder) {
		this.disOrder = disOrder;
	}
	public int getDisOrder () {
		return disOrder;
	}
	public void setAreaCode (String areaCode) {
		this.areaCode = areaCode;
	}
	public String getAreaCode () {
		return areaCode;
	}
	public void setContentType (int contentType) {
		this.contentType = contentType;
	}
	public int getContentType () {
		return contentType;
	}

@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != contentCode && !"".equals(contentCode)) {
			return false;
		}
		if(null != contentName && !"".equals(contentName)) {
			return false;
		}
		if(null != contentDesc && !"".equals(contentDesc)) {
			return false;
		}
		if(disOrder != 0) {
			return false;
		}
		if(null != areaCode && !"".equals(areaCode)) {
			return false;
		}
		if(contentType != 0) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "DimAreaContent";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  contentCode:%s ,  contentName:%s ,  contentDesc:%s ,  disOrder:%s ,  areaCode:%s ,  contentType:%s  ", 
				 id ,  contentCode ,  contentName ,  contentDesc ,  disOrder ,  areaCode ,  contentType  );
	}
}
