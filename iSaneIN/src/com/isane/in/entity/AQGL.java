package com.isane.in.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import com.isane.ragdoll.persistent.entity.Entity;
import java.util.Date;

public class AQGL implements Entity {
	private static final long serialVersionUID = 1L;
	private long id; // $item.comment
	private String plantCode; // $item.comment
	private String dataType; // $item.comment
	private String dataTypeValue; // $item.comment
	private int dataValue; // $item.comment
	@DateTimeFormat(pattern = "yyyy-MM")
	private Date dataTime; // $item.comment
	private int disOrder; // $item.comment
	@DateTimeFormat(pattern = "yyyy-MM")
	private Date inputTime; // $item.comment

	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public void setPlantCode(String plantCode) {
		this.plantCode = plantCode;
	}

	public String getPlantCode() {
		return plantCode;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataTypeValue(String dataTypeValue) {
		this.dataTypeValue = dataTypeValue;
	}

	public String getDataTypeValue() {
		return dataTypeValue;
	}

	public void setDataValue(int dataValue) {
		this.dataValue = dataValue;
	}

	public int getDataValue() {
		return dataValue;
	}

	public void setDataTime(Date dataTime) {
		this.dataTime = dataTime;
	}

	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	public Date getDataTime() {
		return dataTime;
	}

	public void setDisOrder(int disOrder) {
		this.disOrder = disOrder;
	}

	public int getDisOrder() {
		return disOrder;
	}

	public void setInputTime(Date inputTime) {
		this.inputTime = inputTime;
	}

	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	public Date getInputTime() {
		return inputTime;
	}

	@Override
	public boolean isEmptyProperties() {
		if (id != 0) {
			return false;
		}
		if (null != plantCode && !"".equals(plantCode)) {
			return false;
		}
		if (null != dataType && !"".equals(dataType)) {
			return false;
		}
		if (null != dataTypeValue && !"".equals(dataTypeValue)) {
			return false;
		}
		if (dataValue != 0) {
			return false;
		}
		if (null != dataTime) {
			return false;
		}
		if (disOrder != 0) {
			return false;
		}
		if (null != inputTime) {
			return false;
		}
		return true;
	}

	@Override
	public String getDomain() {
		return "AQGL";
	}

	@Override
	public String toString() {
		return String.format(
				" id:%s ,  plantCode:%s ,  dataType:%s ,  dataTypeValue:%s ,  dataValue:%s ,  dataTime:%s ,  disOrder:%s ,  inputTime:%s  ",
				id, plantCode, dataType, dataTypeValue, dataValue, dataTime, disOrder, inputTime);
	}
}
