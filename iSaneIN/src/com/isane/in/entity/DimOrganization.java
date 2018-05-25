package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;
public class DimOrganization implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //
	private String organKey; //
	private String organName; //
	private String organDesc; //
	private String organParentId; //
	private String areakey;
	private String installType;
	private String areaType;
	private int organType =1;//1常规类型2非常规类型(财务需要能销公司数据)
	private int organLev;
	private int disOrder;
	private String organParentId1;
	
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setOrganKey (String organKey) {
		this.organKey = organKey;
	}
	public String getOrganKey () {
		return organKey;
	}
	public void setOrganName (String organName) {
		this.organName = organName;
	}
	public String getOrganName () {
		return organName;
	}
	public void setOrganDesc (String organDesc) {
		this.organDesc = organDesc;
	}
	public String getOrganDesc () {
		return organDesc;
	}
	public String getOrganParentId() {
		return organParentId;
	}
	public void setOrganParentId(String organParentId) {
		this.organParentId = organParentId;
	}
	public String getAreakey() {
		return areakey;
	}
	public void setAreakey(String areakey) {
		this.areakey = areakey;
	}
	public String getInstallType() {
		return installType;
	}
	public void setInstallType(String installType) {
		this.installType = installType;
	}
	public String getAreaType() {
		return areaType;
	}
	public void setAreaType(String areaType) {
		this.areaType = areaType;
	}
	public int getOrganType() {
		return organType;
	}
	public void setOrganType(int organType) {
		this.organType = organType;
	}
	public int getOrganLev() {
		return organLev;
	}
	public void setOrganLev(int organLev) {
		this.organLev = organLev;
	}
	public int getDisOrder() {
		return disOrder;
	}
	public void setDisOrder(int disOrder) {
		this.disOrder = disOrder;
	}
	
	public String getOrganParentId1() {
		return organParentId1;
	}
	public void setOrganParentId1(String organParentId1) {
		this.organParentId1 = organParentId1;
	}
@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != organKey && !"".equals(organKey)) {
			return false;
		}
		if(null != organName && !"".equals(organName)) {
			return false;
		}
		if(null != organDesc && !"".equals(organDesc)) {
			return false;
		}
		
		return true;
	}

	@Override
	public String getDomain() {
		return "DimOrganization";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  organKey:%s ,  organName:%s ,  organType:%s ,  organParentId:%s, organLev:%d  ", 
				 id ,  organKey ,  organName ,  organType ,  organParentId, organLev  );
	}
}
