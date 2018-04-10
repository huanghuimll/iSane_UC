package com.isane.in.entity;

import com.isane.ragdoll.persistent.entity.Entity;

public class DimJz implements Entity {
	private static final long serialVersionUID = 1L;
	private long id; //
	private String jzKey; //
	private String jzName; //
	private String jzDesc; //
	private int periodes; //
	private String organKey; //
	private String organName;
	private int type;

	public String getOrganName() {
		return organName;
	}

	public void setOrganName(String organName) {
		this.organName = organName;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public void setJzKey(String jzKey) {
		this.jzKey = jzKey;
	}

	public String getJzKey() {
		return jzKey;
	}

	public void setJzName(String jzName) {
		this.jzName = jzName;
	}

	public String getJzName() {
		return jzName;
	}

	public void setJzDesc(String jzDesc) {
		this.jzDesc = jzDesc;
	}

	public String getJzDesc() {
		return jzDesc;
	}

	public void setPeriodes(int periodes) {
		this.periodes = periodes;
	}

	public int getPeriodes() {
		return periodes;
	}

	public void setOrganKey(String organKey) {
		this.organKey = organKey;
	}

	public String getOrganKey() {
		return organKey;
	}

	@Override
	public boolean isEmptyProperties() {
		if (id != 0) {
			return false;
		}
		if (null != jzKey && !"".equals(jzKey)) {
			return false;
		}
		if (null != jzName && !"".equals(jzName)) {
			return false;
		}
		if (null != jzDesc && !"".equals(jzDesc)) {
			return false;
		}
		if (periodes != 0) {
			return false;
		}
		if (null != organKey && !"".equals(organKey)) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "DimJz";
	}

	@Override
	public String toString() {
		return String.format(" id:%s ,  jzKey:%s ,  jzName:%s ,  jzDesc:%s ,  periodes:%s ,  organKey:%s  ", id, jzKey,
				jzName, jzDesc, periodes, organKey);
	}
}
