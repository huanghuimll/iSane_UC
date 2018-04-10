package com.isane.in.exporter;

import java.io.OutputStream;
import java.util.Date;

public interface ReportExport {
	/**
	 * 
	 * @param date 数据日期
	 * @param exportTemplateName 模版名称(会获取最新版本)
	 * @param 输出流
	 */
	void exportReport(Date date, String exportTemplateName, OutputStream out);
}
