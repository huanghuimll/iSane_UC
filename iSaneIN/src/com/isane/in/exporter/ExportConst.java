package com.isane.in.exporter;

public class ExportConst {
	/**
	 * 模版中-单元格-定义了静态的内容；可能是数字也可能是字符串
	 */
	public static final String CELL_TYPE_STATIC = "STATIC";
	/**
	 * 模版中-单元格-定义了指标内容；
	 */
	public static final String CELL_TYPE_INDEX = "INDEX";
	/**
	 * 模版中-单元格-定义了Excel公式；
	 */
	public static final String CELL_TYPE_FORMULA = "FORMULA";
	/**
	 * 模版中-单元格-定义了日期或时间内容；
	 */
	public static final String CELL_TYPE_DATETIME = "DATETIME";
	/**
	 * 模版中-单元格-定义了自定义内容</br>
	 * 当前支持:
	 */
	public static final String CELL_TYPE_CUSTOMIZED = "CUSTOMIZED";
	/**
	 * 模版中-单元格-非上述四中内容，导出系统不会处理；
	 */
	public static final String CELL_TYPE_IGNORE = "IGNORE";
	/**
	 * MC当天在当月中是第几天
	 * MB当天在当月前面有几天
	 * MA当天在当月后面有几天
	 * MT当月总天数是多少天
	 * MY当月及前所有月份的总天数
	 * YC当天在当年中是第几天
	 * YA当天在当年后面有几天
	 * YB当天在当年前面有几天
	 * YT当年总天数是多少天
	 */
	public static final String CUSTOMIZED_DAYCOUNTER = "DayCounter";
	public static final String CUSTOMIZED_DAYCOUNTER_MC = "MC";
	public static final String CUSTOMIZED_DAYCOUNTER_MB = "MB";
	public static final String CUSTOMIZED_DAYCOUNTER_MA = "MA";
	public static final String CUSTOMIZED_DAYCOUNTER_MT = "MT";
	public static final String CUSTOMIZED_DAYCOUNTER_MY = "MY";
	public static final String CUSTOMIZED_DAYCOUNTER_YC = "YC";
	public static final String CUSTOMIZED_DAYCOUNTER_YA = "YA";
	public static final String CUSTOMIZED_DAYCOUNTER_YB = "YB";
	public static final String CUSTOMIZED_DAYCOUNTER_YT = "YT";
	
	
	
	/**
	 * 当期 - 当日、当月、当年的意思
	 */
	public static final String REPORT_DATETYPE_DQ = "DQ";
	/**
	 * 上日
	 */
	public static final String REPORT_DATETYPE_SR = "SR";
	/**
	 * 上月
	 */
	public static final String REPORT_DATETYPE_SY = "SY";
	/**
	 * 同期
	 */
	public static final String REPORT_DATETYPE_TQ = "TQ";
	/**
	 * 年累计(累加)
	 */
	public static final String REPORT_DATETYPE_NLJ = "NLJ";
	/**
	 * 年累计(平均)
	 */
	public static final String REPORT_DATETYPE_NPJ = "NPJ";
	/**
	 * 同期年累计(累加)
	 */
	public static final String REPORT_DATETYPE_QNLJ = "QNLJ";
	/**
	 * 同期年累计(平均)
	 */
	public static final String REPORT_DATETYPE_QNPJ = "QNPJ";
	
	
	/**
	 * 报表模版类型-月报模版
	 */
	public static final String TEMPLATE_REPORT_TYPE_MONTH = "M";
	/**
	 * 报表模版类型-日报模版
	 */
	public static final String TEMPLATE_REPORT_TYPE_DAY = "D";
	
	public static final int EXPORT_UPDATER_ERROR_NOERROR = 0;
	public static final int EXPORT_UPDATER_ERROR_FILE_NOTEXIST = 100;
	public static final int EXPORT_UPDATER_ERROR_FILE_ERROR = 101;
	public static final int EXPORT_UPDATER_ERROR_CONTENT_NOCELL = 201;
}
