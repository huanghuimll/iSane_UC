package com.isane.in.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isane.ragdoll.persistent.annotation.PinYin;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
import java.util.Date;

public class User implements Entity{
private static final long serialVersionUID = 1L;
	private long id; //
	private String userCode; //用户编码
	private String userName; //用户名称
	private String password; //密码
	private int currentStatus; //状�??
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date createTime; //创建时间
	private String employeCode; //员工编码
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date lastUpdateTime; //上次登录时间
	@PinYin(field = "userName", firstLetter = false)
	private String userNamePy; //全拼
	@PinYin(field = "userName", firstLetter = true)
	private String userNameFl; //首字�?
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date validDate; //有效�?
	private String sex; //性别（男，女�?
	private String mailAddr; //邮箱
	private String phoneNum; //电话号码
	private String photoUrl; //照片地址
	private int disOrder; //排序
	private String userDesc; //备注
	private String deptName; //
	private String roleCode;
	private String plantCode;
	
	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public User() {
		super();
	}
	
	public User(String plantCode) {
		super();
		this.plantCode = plantCode;
	}
	
	public User(String userCode, String userName, String password) {
		super();
		this.userCode = userCode;
		this.userName = userName;
		this.password = password;
	}
	
	public void setDeptName (String deptName) {
		this.deptName = deptName;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setId (long id) {
		this.id = id;
	}
	public long getId () {
		return id;
	}
	public void setUserCode (String userCode) {
		this.userCode = userCode;
	}
	public String getUserCode () {
		return userCode;
	}
	public void setUserName (String userName) {
		this.userName = userName;
	}
	public String getUserName () {
		return userName;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword (String password) {
		this.password = password;
	}
	public String index () {
		return password;
	}
	public void setCurrentStatus (int currentStatus) {
		this.currentStatus = currentStatus;
	}
	public int getCurrentStatus () {
		return currentStatus;
	}
	public void setCreateTime (Date createTime) {
		this.createTime = createTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getCreateTime () {
		return createTime;
	}
	public String getEmployeCode() {
		return employeCode;
	}

	public void setEmployeCode(String employeCode) {
		this.employeCode = employeCode;
	}

	public void setLastUpdateTime (Date lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getLastUpdateTime () {
		return lastUpdateTime;
	}
	public void setUserNamePy (String userNamePy) {
		this.userNamePy = userNamePy;
	}
	public String getUserNamePy () {
		return userNamePy;
	}
	public void setUserNameFl (String userNameFl) {
		this.userNameFl = userNameFl;
	}
	public String getUserNameFl () {
		return userNameFl;
	}
	public void setValidDate (Date validDate) {
		this.validDate = validDate;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	public Date getValidDate () {
		return validDate;
	}
	public void setSex (String sex) {
		this.sex = sex;
	}
	public String getSex () {
		return sex;
	}
	public void setMailAddr (String mailAddr) {
		this.mailAddr = mailAddr;
	}
	public String getMailAddr () {
		return mailAddr;
	}
	public void setPhoneNum (String phoneNum) {
		this.phoneNum = phoneNum;
	}
	public String getPhoneNum () {
		return phoneNum;
	}
	public void setPhotoUrl (String photoUrl) {
		this.photoUrl = photoUrl;
	}
	public String getPhotoUrl () {
		return photoUrl;
	}
	public void setDisOrder (int disOrder) {
		this.disOrder = disOrder;
	}
	public int getDisOrder () {
		return disOrder;
	}
	public void setUserDesc (String userDesc) {
		this.userDesc = userDesc;
	}
	public String getUserDesc () {
		return userDesc;
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
		if(null != userCode && !"".equals(userCode)) {
			return false;
		}
		if(null != userName && !"".equals(userName)) {
			return false;
		}
		if(null != password && !"".equals(password)) {
			return false;
		}
		if(currentStatus != 0) {
			return false;
		}
		if(null != createTime) {
			return false;
		}
		if(null != employeCode && !"".equals(employeCode)) {
			return false;
		}
		if(null != lastUpdateTime) {
			return false;
		}
		if(null != userNamePy && !"".equals(userNamePy)) {
			return false;
		}
		if(null != userNameFl && !"".equals(userNameFl)) {
			return false;
		}
		if(null != validDate) {
			return false;
		}
		if(null != sex && !"".equals(sex)) {
			return false;
		}
		if(null != mailAddr && !"".equals(mailAddr)) {
			return false;
		}
		if(null != phoneNum && !"".equals(phoneNum)) {
			return false;
		}
		if(null != photoUrl && !"".equals(photoUrl)) {
			return false;
		}
		if(disOrder != 0) {
			return false;
		}
		if(null != userDesc && !"".equals(userDesc)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "User";
	}

	@Override
	public String toString() {
		return String.format(" id:%s , userCode:%s ,  userName:%s ,  password:%s ,  currentStatus:%s ,  createTime:%s ,  employeeCode:%s ,  lastUpdateTime:%s ,  userNamePy:%s ,  userNameFl:%s ,  validDate:%s ,  sex:%s ,  mailAddr:%s ,  phoneNum:%s ,  photoUrl:%s ,  disOrder:%s ,  userDesc:%s  ", 
				 id , userCode ,  userName ,  password ,  currentStatus ,  createTime ,  employeCode ,  lastUpdateTime ,  userNamePy ,  userNameFl ,  validDate ,  sex ,  mailAddr ,  phoneNum ,  photoUrl ,  disOrder ,  userDesc  );
	}
}