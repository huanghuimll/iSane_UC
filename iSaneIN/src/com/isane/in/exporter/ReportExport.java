package com.isane.in.exporter;

import java.io.OutputStream;
import java.util.Date;

public interface ReportExport {
	/**
	 * 导出excel
	 * @param date 数据日期
	 * @param exportTemplateName 模版名称(会获取最新版本)
	 * @param 输出流
	 */
	void exportReport(Date date, String exportTemplateName, OutputStream out);
	/**
	 * hungh 20180502
	 * 导出html(原理:将excel转html)
	 * @param date 数据日期
	 * @param exportTemplateName 模版名称(会获取最新版本)
	 * @param 输出流
	 */	
	void exportReportHtml(Date date, String exportTemplateName, String outpath);
	/**
	 * 直接返回html字符串,不用先存在一个地方，前天再去取
	 * @param date
	 * @param exportTemplateName
	 * @return
	 */
	String exportReportHtml01(Date date, String exportTemplateName);
}
