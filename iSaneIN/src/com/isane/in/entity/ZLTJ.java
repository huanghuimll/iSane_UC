package com.isane.in.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
import java.util.Date;

/****
 * 
 * 安全生产.科技管理.专利统计
 * @author HH
 *
 */
public class ZLTJ implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String zlName; //$item.comment
	private String zlContent; //$item.comment
	private String zlType; //$item.comment
	private String zlProposer; //$item.comment
	private String zlInvent; //$item.comment
	private String zlStatus; //$item.comment
	private String zlApplyNum; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date zlApplyTime; //$item.comment
	private String zlSQGH; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date zlSQGGR; //$item.comment
	private int zlIs; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date inputTime; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dataTime; //$item.comment
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setZlName (String zlName) {
		this.zlName = zlName;
	}
	public String getZlName () {
		return zlName;
	}
	public void setZlContent (String zlContent) {
		this.zlContent = zlContent;
	}
	public String getZlContent () {
		return zlContent;
	}
	public void setZlType (String zlType) {
		this.zlType = zlType;
	}
	public String getZlType () {
		return zlType;
	}
	public void setZlProposer (String zlProposer) {
		this.zlProposer = zlProposer;
	}
	public String getZlProposer () {
		return zlProposer;
	}
	public void setZlInvent (String zlInvent) {
		this.zlInvent = zlInvent;
	}
	public String getZlInvent () {
		return zlInvent;
	}
	public void setZlStatus (String zlStatus) {
		this.zlStatus = zlStatus;
	}
	public String getZlStatus () {
		return zlStatus;
	}
	public void setZlApplyNum (String zlApplyNum) {
		this.zlApplyNum = zlApplyNum;
	}
	public String getZlApplyNum () {
		return zlApplyNum;
	}
	public void setZlApplyTime (Date zlApplyTime) {
		this.zlApplyTime = zlApplyTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public Date getZlApplyTime () {
		return zlApplyTime;
	}
	public void setZlSQGH (String zlSQGH) {
		this.zlSQGH = zlSQGH;
	}
	public String getZlSQGH () {
		return zlSQGH;
	}
	public void setZlSQGGR (Date zlSQGGR) {
		this.zlSQGGR = zlSQGGR;
	}
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public Date getZlSQGGR () {
		return zlSQGGR;
	}
	public void setZlIs (int zlIs) {
		this.zlIs = zlIs;
	}
	public int getZlIs () {
		return zlIs;
	}
	public void setInputTime (Date inputTime) {
		this.inputTime = inputTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public Date getInputTime () {
		return inputTime;
	}
	public void setDataTime (Date dataTime) {
		this.dataTime = dataTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public Date getDataTime () {
		return dataTime;
	}

@Override
	public boolean isEmptyProperties() {
		if(id != 0) {
			return false;
		}
		if(null != zlName && !"".equals(zlName)) {
			return false;
		}
		if(null != zlContent && !"".equals(zlContent)) {
			return false;
		}
		if(null != zlType && !"".equals(zlType)) {
			return false;
		}
		if(null != zlProposer && !"".equals(zlProposer)) {
			return false;
		}
		if(null != zlInvent && !"".equals(zlInvent)) {
			return false;
		}
		if(null != zlStatus && !"".equals(zlStatus)) {
			return false;
		}
		if(null != zlApplyNum && !"".equals(zlApplyNum)) {
			return false;
		}
		if(null != zlApplyTime) {
			return false;
		}
		if(null != zlSQGH && !"".equals(zlSQGH)) {
			return false;
		}
		if(null != zlSQGGR) {
			return false;
		}
		if(zlIs != 0) {
			return false;
		}
		if(null != inputTime) {
			return false;
		}
		if(null != dataTime) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "ZLTJ";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  zlName:%s ,  zlContent:%s ,  zlType:%s ,  zlProposer:%s ,  zlInvent:%s ,  zlStatus:%s ,  zlApplyNum:%s ,  zlApplyTime:%s ,  zlSQGH:%s ,  zlSQGGR:%s ,  zlIs:%s ,  inputTime:%s ,  dataTime:%s  ", 
				 id ,  zlName ,  zlContent ,  zlType ,  zlProposer ,  zlInvent ,  zlStatus ,  zlApplyNum ,  zlApplyTime ,  zlSQGH ,  zlSQGGR ,  zlIs ,  inputTime ,  dataTime  );
	}
}
