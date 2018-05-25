package com.isane.in.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
import java.util.Date;
/****
 * 安全生产.科技管理.科技项目
 * @author HH
 */
public class KJXM implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //$item.comment
	private String projectCode; //$item.comment
	private String projectName; //$item.comment
	private String projectJC; //$item.comment
	private String developName; //$item.comment
	private String projectContent; //$item.comment
	private String projectCase; //$item.comment
	private String projectResult; //$item.comment
	private float projectCost; //$item.comment
	private float projectBudget; //$item.comment
	private float projectFinish; //$item.comment
	private float projectTotal; //$item.comment
	private String projectPlan; //$item.comment
	private String projectNext; //$item.comment
	private String projectQuest; //$item.comment
	private String projectLeader; //$item.comment
	private String projectDesc; //$item.comment
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
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
	public void setProjectCode (String projectCode) {
		this.projectCode = projectCode;
	}
	public String getProjectCode () {
		return projectCode;
	}
	public void setProjectName (String projectName) {
		this.projectName = projectName;
	}
	public String getProjectName () {
		return projectName;
	}
	public String getProjectJC() {
		return projectJC;
	}
	public void setProjectJC(String projectJC) {
		this.projectJC = projectJC;
	}
	public void setDevelopName (String developName) {
		this.developName = developName;
	}
	public String getDevelopName () {
		return developName;
	}
	public void setProjectContent (String projectContent) {
		this.projectContent = projectContent;
	}
	public String getProjectContent () {
		return projectContent;
	}
	public void setProjectCase (String projectCase) {
		this.projectCase = projectCase;
	}
	public String getProjectCase () {
		return projectCase;
	}
	public void setProjectResult (String projectResult) {
		this.projectResult = projectResult;
	}
	public String getProjectResult () {
		return projectResult;
	}
	public void setProjectCost (float projectCost) {
		this.projectCost = projectCost;
	}
	public float getProjectCost () {
		return projectCost;
	}
	public void setProjectBudget (float projectBudget) {
		this.projectBudget = projectBudget;
	}
	public float getProjectBudget () {
		return projectBudget;
	}
	public void setProjectFinish (float projectFinish) {
		this.projectFinish = projectFinish;
	}
	public float getProjectFinish () {
		return projectFinish;
	}
	public void setProjectTotal (float projectTotal) {
		this.projectTotal = projectTotal;
	}
	public float getProjectTotal () {
		return projectTotal;
	}
	public String getProjectPlan() {
		return projectPlan;
	}
	public void setProjectPlan(String projectPlan) {
		this.projectPlan = projectPlan;
	}
	public void setProjectNext (String projectNext) {
		this.projectNext = projectNext;
	}
	public String getProjectNext () {
		return projectNext;
	}
	public void setProjectQuest (String projectQuest) {
		this.projectQuest = projectQuest;
	}
	public String getProjectQuest () {
		return projectQuest;
	}
	public void setProjectLeader (String projectLeader) {
		this.projectLeader = projectLeader;
	}
	public String getProjectLeader () {
		return projectLeader;
	}
	public void setProjectDesc (String projectDesc) {
		this.projectDesc = projectDesc;
	}
	public String getProjectDesc () {
		return projectDesc;
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
		if(null != projectCode && !"".equals(projectCode)) {
			return false;
		}
		if(null != projectName && !"".equals(projectName)) {
			return false;
		}
		if(null != developName && !"".equals(developName)) {
			return false;
		}
		if(null != projectContent && !"".equals(projectContent)) {
			return false;
		}
		if(null != projectCase && !"".equals(projectCase)) {
			return false;
		}
		if(null != projectResult && !"".equals(projectResult)) {
			return false;
		}
		if(null != projectNext && !"".equals(projectNext)) {
			return false;
		}
		if(null != projectQuest && !"".equals(projectQuest)) {
			return false;
		}
		if(null != projectLeader && !"".equals(projectLeader)) {
			return false;
		}
		if(null != projectDesc && !"".equals(projectDesc)) {
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
		return "KJXM";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  projectCode:%s ,  projectName:%s ,  developName:%s ,  projectContent:%s ,  projectCase:%s ,  projectResult:%s ,  projectCost:%s ,  projectBudget:%s ,  projectFinish:%s ,  projectTotal:%s ,  projectPlan:%s ,  projectNext:%s ,  projectQuest:%s ,  projectLeader:%s ,  projectDesc:%s ,  dataTime:%s ,  inputTime:%s  ", 
				 id ,  projectCode ,  projectName ,  developName ,  projectContent ,  projectCase ,  projectResult ,  projectCost ,  projectBudget ,  projectFinish ,  projectTotal ,  projectPlan ,  projectNext ,  projectQuest ,  projectLeader ,  projectDesc ,  dataTime ,  inputTime  );
	}
}
