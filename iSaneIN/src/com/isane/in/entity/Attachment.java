package com.isane.in.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isane.ragdoll.persistent.annotation.RogdallEntity;
import com.isane.ragdoll.persistent.entity.Entity;

@RogdallEntity(lastUpdateTime = "inputTime" )
public class Attachment implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String plantCode; //$item.comment
	private String ownTypeCfg; //$item.comment
	private String ownCode; //$item.comment
	private String attachmentName; //$item.comment
	private String attachmentUrl; //$item.comment
	private String smallUrl; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date inputTime; //$item.comment
	private String attachmentTypeCfg; //$item.comment
	private String serverPath; //$item.comment
	private String encodeUrl; //$item.comment
	
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
	public void setOwnTypeCfg (String ownTypeCfg) {
		this.ownTypeCfg = ownTypeCfg;
	}
	public String getOwnTypeCfg () {
		return ownTypeCfg;
	}
	public void setOwnCode (String ownCode) {
		this.ownCode = ownCode;
	}
	public String getOwnCode () {
		return ownCode;
	}
	public void setAttachmentName (String attachmentName) {
		this.attachmentName = attachmentName;
	}
	public String getAttachmentName () {
		return attachmentName;
	}
	public void setAttachmentUrl (String attachmentUrl) {
		this.attachmentUrl = attachmentUrl;
	}
	public String getAttachmentUrl () {
		return attachmentUrl;
	}
	public void setSmallUrl (String smallUrl) {
		this.smallUrl = smallUrl;
	}
	public String getSmallUrl () {
		return smallUrl;
	}
	public void setInputTime (Date inputTime) {
		this.inputTime = inputTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getInputTime () {
		return inputTime;
	}
	public void setAttachmentTypeCfg (String attachmentTypeCfg) {
		this.attachmentTypeCfg = attachmentTypeCfg;
	}
	public String getAttachmentTypeCfg () {
		return attachmentTypeCfg;
	}
	public void setServerPath (String serverPath) {
		this.serverPath = serverPath;
	}
	public String getServerPath () {
		return serverPath;
	}
	public void setEncodeUrl (String encodeUrl) {
		this.encodeUrl = encodeUrl;
	}
	public String getEncodeUrl () {
		return encodeUrl;
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
		if(null != ownTypeCfg && !"".equals(ownTypeCfg)) {
			return false;
		}
		if(null != ownCode && !"".equals(ownCode)) {
			return false;
		}
		if(null != attachmentName && !"".equals(attachmentName)) {
			return false;
		}
		if(null != attachmentUrl && !"".equals(attachmentUrl)) {
			return false;
		}
		if(null != smallUrl && !"".equals(smallUrl)) {
			return false;
		}
		if(null != inputTime) {
			return false;
		}
		if(null != attachmentTypeCfg && !"".equals(attachmentTypeCfg)) {
			return false;
		}
		if(null != serverPath && !"".equals(serverPath)) {
			return false;
		}
		if(null != encodeUrl && !"".equals(encodeUrl)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "Attachment";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  plantCode:%s ,  ownTypeCfg:%s ,  ownCode:%s ,  attachmentName:%s ,  attachmentUrl:%s ,  smallUrl:%s ,  inputTime:%s ,  attachmentTypeCfg:%s ,  serverPath:%s ,  encodeUrl:%s  ", 
				 id ,  plantCode ,  ownTypeCfg ,  ownCode ,  attachmentName ,  attachmentUrl ,  smallUrl ,  inputTime ,  attachmentTypeCfg ,  serverPath ,  encodeUrl  );
	}
}
