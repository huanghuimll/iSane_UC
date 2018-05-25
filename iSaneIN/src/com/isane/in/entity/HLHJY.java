package com.isane.in.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
import java.util.Date;
/****
 * 
 * 安全生产.科技管理.合理化建议
 * @author HH
 *
 */
public class HLHJY implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String unit; //$item.comment
	private String projectName; //$item.comment
	private String person; //$item.comment
	private String projectBriefing; //$item.comment
	private String status; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dataTime; //$item.comment
	private String result; //$item.comment
	private String plantCode;
	
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setUnit (String unit) {
		this.unit = unit;
	}
	public String getUnit () {
		return unit;
	}
	public void setProjectName (String projectName) {
		this.projectName = projectName;
	}
	public String getProjectName () {
		return projectName;
	}
	public void setPerson (String person) {
		this.person = person;
	}
	public String getPerson () {
		return person;
	}
	public void setProjectBriefing (String projectBriefing) {
		this.projectBriefing = projectBriefing;
	}
	public String getProjectBriefing () {
		return projectBriefing;
	}
	public void setStatus (String status) {
		this.status = status;
	}
	public String getStatus () {
		return status;
	}
	public void setDataTime (Date dataTime) {
		this.dataTime = dataTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public Date getDataTime () {
		return dataTime;
	}
	public void setResult (String result) {
		this.result = result;
	}
	public String getResult () {
		return result;
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
		if(null != unit && !"".equals(unit)) {
			return false;
		}
		if(null != projectName && !"".equals(projectName)) {
			return false;
		}
		if(null != person && !"".equals(person)) {
			return false;
		}
		if(null != projectBriefing && !"".equals(projectBriefing)) {
			return false;
		}
		if(null != status && !"".equals(status)) {
			return false;
		}
		if(null != dataTime) {
			return false;
		}
		if(null != result && !"".equals(result)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "HLHJY";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  unit:%s ,  projectName:%s ,  person:%s ,  projectBriefing:%s ,  status:%s ,  dataTime:%s ,  result:%s  ", 
				 id ,  unit ,  projectName ,  person ,  projectBriefing ,  status ,  dataTime ,  result  );
	}
}
