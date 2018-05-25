package com.isane.in.exporter;

import java.io.Serializable;
import java.math.BigDecimal;

public class IndexDataStore implements Serializable {
	private static final long serialVersionUID = -4595544851211361242L;

	private String indexDateType;

	private boolean typeDQ;// Day,Month,Year
	private boolean typeSR;// Day
	private boolean typeSY;// Month
	private boolean typeTQ;// Month
	private boolean typeNLJ;// Year
	private boolean typeNPJ;// Year
	private boolean typeQNLJ;// Year
	private boolean typeQNPJ;// Year
	private BigDecimal valueDQ;
	private BigDecimal valueSR;
	private BigDecimal valueSY;
	private BigDecimal valueTQ;
	private BigDecimal valueNLJ;
	private BigDecimal valueNPJ;
	private BigDecimal valueQNLJ;
	private BigDecimal valueQNPJ;

	public boolean isTypeSR() {
		return typeSR;
	}

	public void setTypeSR(boolean typeSR) {
		this.typeSR = typeSR;
	}

	public BigDecimal getValueSR() {
		return valueSR;
	}

	public void setValueSR(BigDecimal valueSR) {
		this.valueSR = valueSR;
	}

	public boolean isTypeDQ() {
		return typeDQ;
	}

	public void setTypeDQ(boolean typeDQ) {
		this.typeDQ = typeDQ;
	}

	public boolean isTypeSY() {
		return typeSY;
	}

	public void setTypeSY(boolean typeSY) {
		this.typeSY = typeSY;
	}

	public boolean isTypeTQ() {
		return typeTQ;
	}

	public void setTypeTQ(boolean typeTQ) {
		this.typeTQ = typeTQ;
	}

	public boolean isTypeNLJ() {
		return typeNLJ;
	}

	public void setTypeNLJ(boolean typeNLJ) {
		this.typeNLJ = typeNLJ;
	}

	public boolean isTypeNPJ() {
		return typeNPJ;
	}

	public void setTypeNPJ(boolean typeNPJ) {
		this.typeNPJ = typeNPJ;
	}

	public boolean isTypeQNLJ() {
		return typeQNLJ;
	}

	public void setTypeQNLJ(boolean typeQNLJ) {
		this.typeQNLJ = typeQNLJ;
	}

	public boolean isTypeQNPJ() {
		return typeQNPJ;
	}

	public void setTypeQNPJ(boolean typeQNPJ) {
		this.typeQNPJ = typeQNPJ;
	}

	public BigDecimal getValueDQ() {
		return valueDQ;
	}

	public void setValueDQ(BigDecimal valueDQ) {
		this.valueDQ = valueDQ;
	}

	public BigDecimal getValueSY() {
		return valueSY;
	}

	public void setValueSY(BigDecimal valueSY) {
		this.valueSY = valueSY;
	}

	public BigDecimal getValueTQ() {
		return valueTQ;
	}

	public void setValueTQ(BigDecimal valueTQ) {
		this.valueTQ = valueTQ;
	}

	public BigDecimal getValueNLJ() {
		return valueNLJ;
	}

	public void setValueNLJ(BigDecimal valueNLJ) {
		this.valueNLJ = valueNLJ;
	}

	public BigDecimal getValueNPJ() {
		return valueNPJ;
	}

	public void setValueNPJ(BigDecimal valueNPJ) {
		this.valueNPJ = valueNPJ;
	}

	public BigDecimal getValueQNLJ() {
		return valueQNLJ;
	}

	public void setValueQNLJ(BigDecimal valueQNLJ) {
		this.valueQNLJ = valueQNLJ;
	}

	public BigDecimal getValueQNPJ() {
		return valueQNPJ;
	}

	public void setValueQNPJ(BigDecimal valueQNPJ) {
		this.valueQNPJ = valueQNPJ;
	}

	public String getIndexDateType() {
		return indexDateType;
	}

	public void setIndexDateType(String indexDateType) {
		this.indexDateType = indexDateType;
	}
}
