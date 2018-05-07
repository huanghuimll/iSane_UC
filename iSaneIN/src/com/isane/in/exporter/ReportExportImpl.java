package com.isane.in.exporter;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.converter.ExcelToHtmlConverter;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.w3c.dom.Document;

import com.isane.in.entity.ExportCell;
import com.isane.in.entity.ExportTemplate;
import com.isane.in.service.ExportCellService;
import com.isane.in.service.ExportTemplateService;
import com.isane.index.compute.core.IndexCompute;
import com.isane.index.entity.Index;
import com.isane.index.entity.IndexData;
import com.isane.index.service.IndexDataService;
import com.isane.index.service.IndexService;

public class ReportExportImpl implements ReportExport {

	private static final Logger logger = Logger.getLogger(ReportExportImpl.class);

	private IndexService indexServiceImpl;
	private IndexDataService indexDataService;
	private ExportTemplateService exportTemplateServiceImpl;
	private ExportCellService exportCellServiceImpl;

	/**
	 * @author yangxm 2018-03-12;
	 * 
	 *         根据id取出模版文件路径，并打开文件 （从数据库中获取）循环处理每个cell，判断类型； 静态：不处理
	 *         公式：不处理，excel会自己处理 日期：读取日期格式，将格子赋值 ### 指标：读取指标编码、日期类型、单位转换
	 */
	@Override
	public void exportReport(Date date, String exportTemplateName, OutputStream out) throws RuntimeException {
		logger.info("处理模版导出：" + exportTemplateName);
		
		// 得到模版信息
		ExportTemplate template = getExportTemplate(exportTemplateName);
		if (null == template) {
			throw new RuntimeException( "未找到导出模版内容。" );
		}
		logger.debug("从数据库找模版，成功。");

		// 判断文件是否存在
		String xlsTemplateFile = template.getExportFile();
		File templateFile = new File(xlsTemplateFile);
		if (!templateFile.exists()) {
			throw new RuntimeException("模版文件不存在。");
		}
		logger.debug("打开模版文件，成功。");

		// 得到单元格信息（没有内容也行，相当于将模版文件不做处理，另存一份而已）
		List<ExportCell> cellList = getCellList( template.getId() );
		if (null == cellList || 0 == cellList.size()) {
			logger.warn(String.format("模版%s：没有定义任何单元格信息。", template.getExportName()));
		}
		if (null == cellList) {
			cellList = Collections.emptyList();
		}

		Map<String, IndexDataStore> indexDataCache = new HashMap<>();
		
		// 打开文件处理单元格
		// 1. 处理所有日期
		Map<Integer, String> dateCellMap = new HashMap<>();
		processDateCell(dateCellMap, cellList, date);
		logger.info("处理日期单元格，成功。");
		
		// 2. 处理所有指标
		int decimalPlace = template.getDecimalPlace();
		String reportType = template.getExportType();
		Map<Integer, Index> indexCellMap = new HashMap<>();
		Map<Integer, Index> indexCellToFormulaMap = new HashMap<>();
		logger.debug("处理指标单元格，开始。");
		processIndexCell(indexCellMap, indexCellToFormulaMap, cellList, date, reportType, decimalPlace, indexDataCache);
		logger.debug("处理指标单元格，结束。");
		
		//3. 处理公式单元格
		Map<Integer, String> formulaCellMap = new HashMap<>();
		processFormulaCell(formulaCellMap, cellList);
		
		//4. 处理自定义单元格
		Map<Integer, String> customizedMap = new HashMap<>();
		processCustomizedCell(date, customizedMap, cellList);
		
		// 处理xls文件（打开、写入、保存到流）
		processTemplateFile(out, templateFile, dateCellMap, formulaCellMap, indexCellMap, indexCellToFormulaMap, customizedMap, indexDataCache);
		logger.info("保存到输出流，成功。");
	}

	private void processCustomizedCell(Date date, Map<Integer, String> customizedMap, List<ExportCell> cellList) {
		cellList.stream().filter(c -> ExportConst.CELL_TYPE_CUSTOMIZED.equals(c.getCellType())).forEach(c -> {
			String content = c.getCellContent();
			// 去掉[]
			content = content.replace("[", "");
			content = content.replace("]", "");
			// 分割字符串用逗号
			String[] subs = content.split(",");

			// 指标编码
			String customizedType = subs[0];
			
			String processContent = "";
			switch(customizedType) {
				case ExportConst.CUSTOMIZED_DAYCOUNTER:
					processContent = processDayCounter(date, subs[1]);
					break;
				default:
					logger.warn("不支持的自定义单元格式：" + customizedType);
					break;
			}
			
			customizedMap.put(zipRowAndCol(c.getRowNumber(), c.getColNumber()), processContent);
		});
	}

	//DayCounter具体的处理
	private String processDayCounter(Date date, String processContent) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		
		int mt = c.getActualMaximum(Calendar.DAY_OF_MONTH);
		int mc = c.get(Calendar.DAY_OF_MONTH);
		int mb = mc - 1;
		int ma = mt - mc;
		
		int yt = c.getActualMaximum(Calendar.DAY_OF_YEAR);
		int yc = c.get(Calendar.DAY_OF_YEAR);
		int yb = yc - 1;
		int ya = yt - yc;
		
		int result = 0;
		switch(processContent){
			case ExportConst.CUSTOMIZED_DAYCOUNTER_MC:
				result = mc;
				break;
			case ExportConst.CUSTOMIZED_DAYCOUNTER_MA:
				result = ma;
				break;
			case ExportConst.CUSTOMIZED_DAYCOUNTER_MB:
				result = mb;
				break;
			case ExportConst.CUSTOMIZED_DAYCOUNTER_MT:
				result = mt;
				break;
			case ExportConst.CUSTOMIZED_DAYCOUNTER_YC:
				result = yc;
				break;
			case ExportConst.CUSTOMIZED_DAYCOUNTER_YA:
				result = ya;
				break;
			case ExportConst.CUSTOMIZED_DAYCOUNTER_YB:
				result = yb;
				break;
			case ExportConst.CUSTOMIZED_DAYCOUNTER_YT:
				result = yt;
				break;
			case ExportConst.CUSTOMIZED_DAYCOUNTER_MY:
				result = grtDayByYearMonth(date);
				break;
			default:
				logger.warn("不支持的自定义单元格式(DayCounter)：" + processContent);
				break;
		}
		
		return String.format("%d", result);
	}
	
	public int grtDayByYearMonth(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String[] d = sdf.format(date).split("-");
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR, Integer.valueOf(d[0]));
		c.set(Calendar.MONTH, Integer.valueOf(d[1])-1);
		c.set(Calendar.DATE, 1);
		c.roll(Calendar.DATE, -1);
		return c.get(Calendar.DAY_OF_YEAR);
	}

	private void processFormulaCell(Map<Integer, String> formulaCellMap, List<ExportCell> cellList) {
		cellList.stream().filter(c -> ExportConst.CELL_TYPE_FORMULA.equals(c.getCellType())).forEach(c -> {
			String content = c.getCellContent();
			formulaCellMap.put(zipRowAndCol(c.getRowNumber(), c.getColNumber()), content);
		});
	}

	private void processTemplateFile(OutputStream out, File templateFile, 
			Map<Integer, String> dateCellMap, Map<Integer, String> formulaCellMap,
			Map<Integer, Index> indexCellMap, Map<Integer, Index> indexCellToFormulaMap,
			Map<Integer, String> customizedMap,
			Map<String, IndexDataStore> indexDataCache) {
		FileInputStream fis = null;
		HSSFWorkbook workbook = null;
		try {
			fis = new FileInputStream(templateFile);

			workbook = new HSSFWorkbook(fis);
			HSSFSheet sh = workbook.getSheetAt(0);

			// 写入日期单元格（实际是字符串）
			dateCellMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				cell.setCellType( Cell.CELL_TYPE_STRING );
				cell.setCellValue( es.getValue() );
			});
			
			// 写入公式单元格
			formulaCellMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
//				cell.setCellType( Cell.CELL_TYPE_FORMULA );
				cell.setCellFormula( es.getValue() );
			});

			// 写入指标单元格
			indexCellMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				
				String indexCode = es.getValue().getIndexCode();
				BigDecimal value = getValueFromStore(indexCode, es.getValue(), indexDataCache);
				if( null != value ) {
					cell.setCellValue( value.doubleValue() );
				} else {
					cell.setCellValue( "" );
				}
			});

			// 写入指标单元格(有单位转换，变成公式单元格)
			indexCellToFormulaMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				
				String indexCode = es.getValue().getIndexCode();
				BigDecimal value = getValueFromStore(indexCode, es.getValue(), indexDataCache);
				if( null != value ) {
					String el = es.getValue().getExtentContent();//单位转换表达式内容
					el = el.replace("#value", "%s");
					el = String.format(el, value.toString());
					cell.setCellFormula(el);
				} else {
					cell.setCellValue( "" );
				}
			});
			
			//写入自定义单元格 
			customizedMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				cell.setCellType( Cell.CELL_TYPE_STRING );
				cell.setCellValue( es.getValue() );
			});

			// 写入流
			workbook.write(out);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				workbook.close();
				fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	private BigDecimal getValueFromStore(String indexCode, Index indexInformation, Map<String, IndexDataStore> indexDataCache) {
		BigDecimal value = null;
		
		if( indexDataCache.containsKey(indexCode) ) {
			//判断日期类型(DQ,SY,TQ,NLJ,NPJ,QNLJ,QNPJ)，并读取对应的值
			String reportDateType = indexInformation.getDateType();
			IndexDataStore indexDataStore = indexDataCache.get(indexCode);
			switch(reportDateType) {
			case ExportConst.REPORT_DATETYPE_DQ:
				if(indexDataStore.isTypeDQ() ) {
					value = indexDataStore.getValueDQ();
				}
				break;
			case ExportConst.REPORT_DATETYPE_SY:
				if(indexDataStore.isTypeSY() ) {
					value = indexDataStore.getValueSY();
				}
				break;
			case ExportConst.REPORT_DATETYPE_TQ:
				if(indexDataStore.isTypeTQ() ) {
					value = indexDataStore.getValueTQ();
				}
				break;
			case ExportConst.REPORT_DATETYPE_NLJ:
			case ExportConst.REPORT_DATETYPE_NPJ:
				if (indexDataStore.isTypeNLJ() ||  indexDataStore.isTypeNPJ() ) {
					value = indexDataStore.getValueNLJ();
				}
				break;
			case ExportConst.REPORT_DATETYPE_QNLJ:
			case ExportConst.REPORT_DATETYPE_QNPJ:
				if (indexDataStore.isTypeQNLJ() ||  indexDataStore.isTypeQNPJ() ) {
					value = indexDataStore.getValueQNLJ();
				}
				break;
			}
		}//if
		
		return value;
	}

	private void processIndexCell(Map<Integer, Index> indexCellMap, Map<Integer, Index> indexCellToFormulaMap,
			List<ExportCell> cellList, Date date, String reportType, int decimalPlace,
			Map<String, IndexDataStore> indexDataCache) {

		Map<String, List<String>> indexReportDateTypeMap = new HashMap<>();
		List<String> allIndexList = new ArrayList<>();
		
		// 取出所有指标cell，并判断是否有单位转换，放入对应的map中
		cellList.stream().filter(c -> ExportConst.CELL_TYPE_INDEX.equals(c.getCellType())).forEach(c -> {
//			logger.debug( "\t处理指标单元格:" + c.getCellContent() );
			// {idx,dateType,modifyEnable,unitConvert}
			String content = c.getCellContent();
			// 去掉{}
			content = content.replace("{", "");
			content = content.replace("}", "");
			// 分割字符串用逗号
			String[] subs = content.split(",");

			// 指标编码
			String indexCode = subs[0];

			// 日期类型
			String reportDateType = ExportConst.REPORT_DATETYPE_DQ;
			if (subs.length >= 2) {
				if (!"".equals(subs[1])) {
					reportDateType = subs[1];
				}
			}
			
			//按类型存储指标到列表
			List<String> dtList = null;
			if( !indexReportDateTypeMap.containsKey(reportDateType) ) {
				dtList = new ArrayList<>();
				indexReportDateTypeMap.put( reportDateType, dtList);
			} else {
				dtList = indexReportDateTypeMap.get(reportDateType);
			}
			if( !dtList.contains(indexCode) ) {
				dtList.add( indexCode );
			}
			
			// 单位转换
			String unitConvert = "";
			if (subs.length >= 4) {
				if (!"".equals(subs[3]) && subs[3].contains("#value")) {
					// 去掉''
					unitConvert = subs[3];
					unitConvert = unitConvert.replaceAll("'", "");
				}
			}

			Index index = new Index();//仅仅用来存储信息
			index.setIndexCode(indexCode);//存储指标编码
			index.setDateType(reportDateType);//存储报表日期类型(DQ,SY,TQ,...)，不是原本的指标日期类型(D,M,Y)
			if ("".equals(unitConvert)) {
				indexCellMap.put(zipRowAndCol(c.getRowNumber(), c.getColNumber()), index);
				logger.debug( "\t指标单元格-普通指标:" + indexCode );
			} else {
				index.setExtentContent(unitConvert);
				indexCellToFormulaMap.put(zipRowAndCol(c.getRowNumber(), c.getColNumber()), index);
				logger.debug( "\t指标单元格-需转换单位指标:" + indexCode );
			}
			
			if( !allIndexList.contains(indexCode) ) {
				allIndexList.add(indexCode);
			}
			
		});

		//读取指标历史数据
		readIndexDataToCache(date, reportType, allIndexList, indexReportDateTypeMap, indexDataCache);
	}

	/**
	 * 
	 * @param date
	 * @param reportType (日报还是月报)没有使用该信息，而是使用了指标编码自身对应的日期类型
	 * @param allIndexList
	 * @param indexReportDateTypeMap
	 * @param indexDataCache
	 */
	private void readIndexDataToCache(Date date, String reportType, List<String> allIndexList, 
			Map<String, List<String>> indexReportDateTypeMap, Map<String, IndexDataStore> indexDataCache) {
		
		logger.debug( "\t\t指标单元格数据");
		
		//取出所有指标信息，被查指标类型D/M/Y
		List<Index> list = indexServiceImpl.list(new Index(), 0, 10000);
		Map<String, Index> indexMap = new HashMap<>();
//		logger.debug("数据库中指标个数：" + list.size() );
//		allIndexList.stream().forEach( idx -> {
//			int index = list.indexOf( idx );
//			if( index == -1 ) {
//				logger.warn( String.format("计算指标类型时，未从数据库中发现指标：%s", idx) );
//			} else {
//				indexMap.put( idx,  list.get(index) );
//			}
//		});
		
		int count = list.size();
		int countInXls = allIndexList.size();
		String idxInXls = "";
		String temp = "";
		boolean found = false;
		for (int i=0;i<countInXls;i++) {
			found = false;
			idxInXls = allIndexList.get(i);
			for(int j=0;j<count;j++) {
				temp = list.get(j).getIndexCode();
				if( temp.equals(idxInXls) ) {
					indexMap.put( idxInXls,  list.get(j) );
					
					found = true;
					break;
				}
			}
			if(!found) {
				logger.warn( String.format("计算指标类型时，未从数据库中发现指标：%s", idxInXls) );
			}
		}
		
		/**
		 * 具体取数时，分6步
		 * D1. 取出当年(所有当年指标)
		 * D2. 取出去年(所有去年指标)
		 * D3. 取出当月(所有当月指标)
		 * D4. 取出去年当月(所有月同期指标)
		 * D5. 取出上月(所有月同期指标)
		 * D6. 取出当日(所有当日指标)
		 */
		
		Calendar c = Calendar.getInstance();
		String dateType = "";
		int monthOfYear = 0;
		Date storeDate;
		List<String> indexCodeList = null;
		List<IndexData> indexDataList = null;
		
		//D1.
		dateType = IndexCompute.DATE_TYPE_YEAR;
		storeDate = getForYear(c, date, 0);
		monthOfYear = getMonth(c, date) + 1;
		List<String> dtListNLJ = indexReportDateTypeMap.get(ExportConst.REPORT_DATETYPE_NLJ);
		List<String> dtListNPJ = indexReportDateTypeMap.get(ExportConst.REPORT_DATETYPE_NPJ);
		
		List<String> dtListYear = new ArrayList<>();
		if( null != dtListNLJ ) {
			dtListYear.addAll(dtListNLJ);
		}
		if( null != dtListNPJ ) {
			dtListNPJ.stream()
				.filter( x -> !dtListNLJ.contains(x) )
				.forEach( x -> dtListYear.add(x) );
		}
		
		logger.debug( "\t\t指标单元格数据:" + dateType);
		if( null != dtListYear && dtListYear.size() > 0) {
			indexCodeList = indexMap.values()
				.stream()
				.filter( idx -> IndexCompute.DATE_TYPE_YEAR.equals( idx.getDateType() ) )
				.filter( idx -> isListContainsKey(idx.getIndexCode(), dtListYear) )
				.map( idx -> {
					return idx.getIndexCode();
				})
				.collect( Collectors.toList() );
		}
		if( null != indexCodeList && indexCodeList.size() > 0) {
			indexDataList = indexDataService.listByCodes(storeDate, dateType, monthOfYear, indexCodeList);
			logger.debug( "\t\t处理指标数据，个数:" + indexDataList.size() );
			if( null != indexDataList && indexDataList.size() > 0 ) {
				indexDataList.stream().forEach( data -> {
					logger.info( "\t\t指标数据:" + data.getIndexCode() );
					IndexDataStore ids = null;
					if( indexDataCache.containsKey(data.getIndexCode()) ) {
						ids = indexDataCache.get( data.getIndexCode() );
					} else {
						ids = new IndexDataStore();
						ids.setIndexDateType( IndexCompute.DATE_TYPE_YEAR );
						indexDataCache.put(data.getIndexCode(), ids);
					}
					
					//年累计与年平均主要看指标定义，与配置为NLJ与NPJ无关
					//NLJ与NPJ是为了扩展用的
					ids.setTypeNLJ(true);
					ids.setTypeNPJ(true);
					ids.setValueNLJ(data.getIndexValue());
					ids.setValueNPJ(data.getIndexValue());
				});
			}
		}
		
		//D2.
		dateType = IndexCompute.DATE_TYPE_YEAR;
		storeDate = getForYear(c, date, -1);
		monthOfYear = getMonth(c, date) + 1;
		List<String> dtListQNLJ = indexReportDateTypeMap.get(ExportConst.REPORT_DATETYPE_QNLJ);
		List<String> dtListQNPJ = indexReportDateTypeMap.get(ExportConst.REPORT_DATETYPE_QNPJ);
		List<String> dtListLastYear = new ArrayList<>();
		if( null != dtListQNLJ ) {
			dtListLastYear.addAll(dtListQNLJ);
		}
		if( null != dtListQNPJ ) {
			dtListQNPJ.stream()
				.filter( x -> !dtListQNLJ.contains(x) )
				.forEach( x -> dtListLastYear.add(x) );
		}
		
		if( null != dtListLastYear && dtListLastYear.size() > 0) {
			indexCodeList = indexMap.values()
				.stream()
				.filter( idx -> IndexCompute.DATE_TYPE_YEAR.equals( idx.getDateType() ) )
				.filter( idx -> dtListLastYear.contains( idx.getIndexCode() ) )
				.map( idx -> {
					return idx.getIndexCode();
				})
				.collect( Collectors.toList() );
		}
		if( null != indexCodeList && indexCodeList.size() > 0) {
			indexDataList = indexDataService.listByCodes(storeDate, dateType, monthOfYear, indexCodeList);
			logger.debug( "\t\t处理指标数据，个数:" + indexDataList.size() );
			if( null != indexDataList && indexDataList.size() > 0 ) {
				indexDataList.stream().forEach( data -> {
					logger.debug( "\t\t指标数据:" + data.getIndexCode() );
					IndexDataStore ids = null;
					if( indexDataCache.containsKey(data.getIndexCode()) ) {
						ids = indexDataCache.get( data.getIndexCode() );
					} else {
						ids = new IndexDataStore();
						ids.setIndexDateType( IndexCompute.DATE_TYPE_YEAR );
						indexDataCache.put(data.getIndexCode(), ids);
					}
					
					ids.setTypeQNLJ(true);
					ids.setTypeQNPJ(true);
					ids.setValueQNLJ(data.getIndexValue());
					ids.setValueQNPJ(data.getIndexValue());
				});
			}
		}
		
		//D3.
		dateType = IndexCompute.DATE_TYPE_MONTH;
		storeDate = getForMonth(c, date, 0, 0);
		monthOfYear = 0;
		List<String> dtListDY = indexReportDateTypeMap.get(ExportConst.REPORT_DATETYPE_DQ);
		
		if( null != dtListDY && dtListDY.size() > 0) {
			indexCodeList = indexMap.values()
				.stream()
				.filter( idx -> IndexCompute.DATE_TYPE_MONTH.equals( idx.getDateType() ) )
				.filter( idx -> dtListDY.contains( idx.getIndexCode() ) )
				.map( idx -> {
					return idx.getIndexCode();
				})
				.collect( Collectors.toList() );
		}
		if( null != indexCodeList && indexCodeList.size() > 0) {
			indexDataList = indexDataService.listByCodes(storeDate, dateType, monthOfYear, indexCodeList);
			logger.debug( "\t\t处理指标数据，个数:" + indexDataList.size() );
			if( null != indexDataList && indexDataList.size() > 0 ) {
				indexDataList.stream().forEach( data -> {
					logger.debug( "\t\t指标数据:" + data.getIndexCode() );
					IndexDataStore ids = null;
					if( indexDataCache.containsKey(data.getIndexCode()) ) {
						ids = indexDataCache.get( data.getIndexCode() );
					} else {
						ids = new IndexDataStore();
						ids.setIndexDateType( IndexCompute.DATE_TYPE_MONTH );
						indexDataCache.put(data.getIndexCode(), ids);
					}
					
					ids.setTypeDQ(true);
					ids.setValueDQ(data.getIndexValue());
				});
			}
		}
		
		//D4.
		dateType = IndexCompute.DATE_TYPE_MONTH;
		storeDate = getForMonth(c, date, -1, 0);
		monthOfYear = 0;
		List<String> dtListTQ = indexReportDateTypeMap.get(ExportConst.REPORT_DATETYPE_TQ);
		
		if( null != dtListTQ && dtListTQ.size() > 0) {
			indexCodeList = indexMap.values()
				.stream()
				.filter( idx -> IndexCompute.DATE_TYPE_MONTH.equals( idx.getDateType() ) )
				.filter( idx -> dtListTQ.contains( idx.getIndexCode() ) )
				.map( idx -> {
					return idx.getIndexCode();
				})
				.collect( Collectors.toList() );
		}
		if( null != indexCodeList && indexCodeList.size() > 0) {
			indexDataList = indexDataService.listByCodes(storeDate, dateType, monthOfYear, indexCodeList);
			logger.debug( "\t\t处理指标数据，个数:" + indexDataList.size() );
			if( null != indexDataList && indexDataList.size() > 0 ) {
				indexDataList.stream().forEach( data -> {
					logger.debug( "\t\t指标数据:" + data.getIndexCode() );
					IndexDataStore ids = null;
					if( indexDataCache.containsKey(data.getIndexCode()) ) {
						ids = indexDataCache.get( data.getIndexCode() );
					} else {
						ids = new IndexDataStore();
						ids.setIndexDateType( IndexCompute.DATE_TYPE_MONTH );
						indexDataCache.put(data.getIndexCode(), ids);
					}
					
					ids.setTypeTQ(true);
					ids.setValueTQ(data.getIndexValue());
				});
			}
		}
		
		//D5.
		dateType = IndexCompute.DATE_TYPE_MONTH;
		storeDate = getForMonth(c, date, 0, -1);
		monthOfYear = 0;
		List<String> dtListSY = indexReportDateTypeMap.get(ExportConst.REPORT_DATETYPE_SY);
		
		if( null != dtListSY && dtListSY.size() > 0) {
			indexCodeList = indexMap.values()
				.stream()
				.filter( idx -> IndexCompute.DATE_TYPE_MONTH.equals( idx.getDateType() ) )
				.filter( idx -> dtListSY.contains( idx.getIndexCode() ) )
				.map( idx -> {
					return idx.getIndexCode();
				})
				.collect( Collectors.toList() );
		}
		if( null != indexCodeList && indexCodeList.size() > 0) {
			indexDataList = indexDataService.listByCodes(storeDate, dateType, monthOfYear, indexCodeList);
			logger.debug( "\t\t处理指标数据，个数:" + indexDataList.size() );
			if( null != indexDataList && indexDataList.size() > 0 ) {
				indexDataList.stream().forEach( data -> {
					logger.debug( "\t\t指标数据:" + data.getIndexCode() );
					IndexDataStore ids = null;
					if( indexDataCache.containsKey(data.getIndexCode()) ) {
						ids = indexDataCache.get( data.getIndexCode() );
					} else {
						ids = new IndexDataStore();
						ids.setIndexDateType( IndexCompute.DATE_TYPE_MONTH );
						indexDataCache.put(data.getIndexCode(), ids);
					}
					
					ids.setTypeSY(true);
					ids.setValueSY(data.getIndexValue());
				});
			}
		}
		
		//D6.
		dateType = IndexCompute.DATE_TYPE_DAY;
		storeDate = getForDay(c, date, 0, 0);
		monthOfYear = 0;
		List<String> dtListDayDQ = indexReportDateTypeMap.get(ExportConst.REPORT_DATETYPE_DQ);
		
		if( null != dtListDayDQ && dtListDayDQ.size() > 0) {
			indexCodeList = indexMap.values()
				.stream()
				.filter( idx -> IndexCompute.DATE_TYPE_DAY.equals( idx.getDateType() ) )
				.filter( idx -> dtListDayDQ.contains( idx.getIndexCode() ) )
				.map( idx -> {
					return idx.getIndexCode();
				})
				.collect( Collectors.toList() );
		}
		if( null != indexCodeList && indexCodeList.size() > 0) {
			indexDataList = indexDataService.listByCodes(storeDate, dateType, monthOfYear, indexCodeList);
			logger.debug( "\t\t处理指标数据，个数:" + indexDataList.size() );
			if( null != indexDataList && indexDataList.size() > 0 ) {
				indexDataList.stream().forEach( data -> {
					logger.debug( "\t\t指标数据:" + data.getIndexCode() );
					IndexDataStore ids = null;
					if( indexDataCache.containsKey(data.getIndexCode()) ) {
						ids = indexDataCache.get( data.getIndexCode() );
					} else {
						ids = new IndexDataStore();
						ids.setIndexDateType( IndexCompute.DATE_TYPE_DAY );
						indexDataCache.put(data.getIndexCode(), ids);
					}
					
					ids.setTypeDQ(true);
					ids.setValueDQ(data.getIndexValue());
				});
			}
		}	

	}
	
	private boolean isListContainsKey(String key, List<String> list) {
		return list.contains(key);
	}
	
	private int getMonth(Calendar c, Date date) {
		c.setTime(date);
		
		return c.get(Calendar.MONTH);
	}
	
	private Date getForDay(Calendar c, Date date, int yearFix, int monthFix) {
		c.setTime(date);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		
		c.add(Calendar.YEAR, yearFix);
		c.add(Calendar.MONTH, monthFix);
		
		return c.getTime();
	}
	
	private Date getForMonth(Calendar c, Date date, int yearFix, int monthFix) {
		c.setTime(date);
		c.set(Calendar.DAY_OF_MONTH, 1);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		
		c.add(Calendar.YEAR, yearFix);
		c.add(Calendar.MONTH, monthFix);
		
		return c.getTime();
	}
	
	private Date getForYear(Calendar c, Date date, int yearFix) {
		c.setTime(date);
		c.set(Calendar.DAY_OF_MONTH, 1);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		
		c.add(Calendar.YEAR, yearFix);
		
		return c.getTime();
	}

	private void processDateCell(Map<Integer, String> dateCellMap, List<ExportCell> cellList, Date date) {
		cellList.stream().filter(c -> ExportConst.CELL_TYPE_DATETIME.equals(c.getCellType())).forEach(c -> {
			// (date, 'DateFormat')
			String content = c.getCellContent();
			int first = content.indexOf("'");
			int last = content.lastIndexOf("'");
			String formatter = content.substring(first + 1, last);
			logger.debug("\t===formatter:"+formatter);
			DateFormat df = new SimpleDateFormat(formatter);
			dateCellMap.put(zipRowAndCol(c.getRowNumber(), c.getColNumber()), df.format(date));
		});
	}

	/**
	 * 最大支持65535个行或列
	 * 
	 * @param row
	 * @param col
	 * @return
	 */
	private int zipRowAndCol(int row, int col) {
		if (row > 65535 || col > 65535) {
			logger.warn("不支持的行号或列号。");
		}

		row = row << 16;
		int rowAndCol = row | col;

		return rowAndCol;
	}

	private int unZipRow(int rowAndCol) {
		int row = rowAndCol >> 16;

		return row;
	}

	private int unZipCol(int rowAndCol) {
		int mask = 0xFFFF;
		int col = rowAndCol & mask;

		return col;
	}

	private ExportTemplate getExportTemplate(String exportTemplateName) {
		ExportTemplate item = new ExportTemplate();
		item.setExportName(exportTemplateName);

		item = exportTemplateServiceImpl.singleCustom(item, "findNewest");

		return item;
	}

	private List<ExportCell> getCellList(long exportTemplateId) {
		ExportCell item = new ExportCell();
		item.setExportId(exportTemplateId);

		List<ExportCell> list = exportCellServiceImpl.list(item, 0, 20000);

		return list;
	}

	public ExportCellService getExportCellServiceImpl() {
		return exportCellServiceImpl;
	}

	public void setExportCellServiceImpl(ExportCellService exportCellServiceImpl) {
		this.exportCellServiceImpl = exportCellServiceImpl;
	}

	public ExportTemplateService getExportTemplateServiceImpl() {
		return exportTemplateServiceImpl;
	}

	public void setExportTemplateServiceImpl(ExportTemplateService exportTemplateServiceImpl) {
		this.exportTemplateServiceImpl = exportTemplateServiceImpl;
	}

	public IndexService getIndexServiceImpl() {
		return indexServiceImpl;
	}

	public void setIndexServiceImpl(IndexService indexServiceImpl) {
		this.indexServiceImpl = indexServiceImpl;
	}

	public IndexDataService getIndexDataService() {
		return indexDataService;
	}

	public void setIndexDataService(IndexDataService indexDataService) {
		this.indexDataService = indexDataService;
	}
	
	/**
	 *huangh 20180502 excel转html
	 */
	@Override
	public void exportReportHtml(Date date, String exportTemplateName, String outpath) {
		logger.info("处理模版导出：" + exportTemplateName);
		
		// 得到模版信息
		ExportTemplate template = getExportTemplate(exportTemplateName);
		if (null == template) {
			throw new RuntimeException( "未找到导出模版内容。" );
		}
		logger.debug("从数据库找模版，成功。");

		// 判断文件是否存在
		String xlsTemplateFile = template.getExportFile();
		File templateFile = new File(xlsTemplateFile);
		if (!templateFile.exists()) {
			throw new RuntimeException("模版文件不存在。");
		}
		logger.debug("打开模版文件，成功。");

		// 得到单元格信息（没有内容也行，相当于将模版文件不做处理，另存一份而已）
		List<ExportCell> cellList = getCellList( template.getId() );
		if (null == cellList || 0 == cellList.size()) {
			logger.warn(String.format("模版%s：没有定义任何单元格信息。", template.getExportName()));
		}
		if (null == cellList) {
			cellList = Collections.emptyList();
		}

		Map<String, IndexDataStore> indexDataCache = new HashMap<>();
		
		// 打开文件处理单元格
		// 1. 处理所有日期
		Map<Integer, String> dateCellMap = new HashMap<>();
		processDateCell(dateCellMap, cellList, date);
		logger.info("处理日期单元格，成功。");
		
		// 2. 处理所有指标
		int decimalPlace = template.getDecimalPlace();
		String reportType = template.getExportType();
		Map<Integer, Index> indexCellMap = new HashMap<>();
		Map<Integer, Index> indexCellToFormulaMap = new HashMap<>();
		logger.debug("处理指标单元格，开始。");
		processIndexCell(indexCellMap, indexCellToFormulaMap, cellList, date, reportType, decimalPlace, indexDataCache);
		logger.debug("处理指标单元格，结束。");
		
		//3. 处理公式单元格
		Map<Integer, String> formulaCellMap = new HashMap<>();
		processFormulaCell(formulaCellMap, cellList);
		
		//4. 处理自定义单元格
		Map<Integer, String> customizedMap = new HashMap<>();
		processCustomizedCell(date, customizedMap, cellList);
		
		//5. 处理xls文件（打开、写入、保存到流）并转成html,输进outpath
		processTemplateFileHtml(outpath, templateFile, dateCellMap, formulaCellMap, indexCellMap, indexCellToFormulaMap, customizedMap, indexDataCache);
		logger.info("保存到输出流，成功。");		
		
	}

	/**
	 *huangh 20180502 excel转html
	 */
	@Override
	public String exportReportHtml01(Date date, String exportTemplateName) {
		logger.info("处理模版导出：" + exportTemplateName);
		
		// 得到模版信息
		ExportTemplate template = getExportTemplate(exportTemplateName);
		if (null == template) {
			throw new RuntimeException( "未找到导出模版内容。" );
		}
		logger.debug("从数据库找模版，成功。");

		// 判断文件是否存在
		String xlsTemplateFile = template.getExportFile();
		File templateFile = new File(xlsTemplateFile);
		if (!templateFile.exists()) {
			throw new RuntimeException("模版文件不存在。");
		}
		logger.debug("打开模版文件，成功。");

		// 得到单元格信息（没有内容也行，相当于将模版文件不做处理，另存一份而已）
		List<ExportCell> cellList = getCellList( template.getId() );
		if (null == cellList || 0 == cellList.size()) {
			logger.warn(String.format("模版%s：没有定义任何单元格信息。", template.getExportName()));
		}
		if (null == cellList) {
			cellList = Collections.emptyList();
		}

		Map<String, IndexDataStore> indexDataCache = new HashMap<>();
		
		// 打开文件处理单元格
		// 1. 处理所有日期
		Map<Integer, String> dateCellMap = new HashMap<>();
		processDateCell(dateCellMap, cellList, date);
		logger.info("处理日期单元格，成功。");
		
		// 2. 处理所有指标
		int decimalPlace = template.getDecimalPlace();
		String reportType = template.getExportType();
		Map<Integer, Index> indexCellMap = new HashMap<>();
		Map<Integer, Index> indexCellToFormulaMap = new HashMap<>();
		logger.debug("处理指标单元格，开始。");
		processIndexCell(indexCellMap, indexCellToFormulaMap, cellList, date, reportType, decimalPlace, indexDataCache);
		logger.debug("处理指标单元格，结束。");
		
		//3. 处理公式单元格
		Map<Integer, String> formulaCellMap = new HashMap<>();
		processFormulaCell(formulaCellMap, cellList);
		
		//4. 处理自定义单元格
		Map<Integer, String> customizedMap = new HashMap<>();
		processCustomizedCell(date, customizedMap, cellList);
		
		//5. 处理xls文件（打开、写入、保存到流）并转成html,输进outpath
		String html = processTemplateFileHtml01(templateFile, dateCellMap, formulaCellMap, indexCellMap, indexCellToFormulaMap, customizedMap, indexDataCache);
		logger.info("保存到输出流，成功。");
		return html;
		
	}
	
	/**
	 * 得到excel并转换为Html,并导出outpath huangh 20180502
	 * @param out
	 * @param templateFile
	 * @param dateCellMap
	 * @param formulaCellMap
	 * @param indexCellMap
	 * @param indexCellToFormulaMap
	 * @param customizedMap
	 * @param indexDataCache
	 */
	private void processTemplateFileHtml(String outpath, File templateFile, 
			Map<Integer, String> dateCellMap, Map<Integer, String> formulaCellMap,
			Map<Integer, Index> indexCellMap, Map<Integer, Index> indexCellToFormulaMap,
			Map<Integer, String> customizedMap,
			Map<String, IndexDataStore> indexDataCache) {
		FileInputStream fis = null;
		ByteArrayOutputStream out = null;
		HSSFWorkbook workbook = null;
		try {
			fis = new FileInputStream(templateFile);

			workbook = new HSSFWorkbook(fis);
			HSSFSheet sh = workbook.getSheetAt(0);

			// 写入日期单元格（实际是字符串）
			dateCellMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				cell.setCellType( Cell.CELL_TYPE_STRING );
				cell.setCellValue( es.getValue() );
			});
			
			// 写入公式单元格
			formulaCellMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
//				cell.setCellType( Cell.CELL_TYPE_FORMULA );
				cell.setCellFormula( es.getValue() );
			});

			// 写入指标单元格
			indexCellMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				
				String indexCode = es.getValue().getIndexCode();
				BigDecimal value = getValueFromStore(indexCode, es.getValue(), indexDataCache);
				if( null != value ) {
					cell.setCellValue( value.doubleValue() );
				} else {
					cell.setCellValue( "" );
				}
			});

			// 写入指标单元格(有单位转换，变成公式单元格)
			indexCellToFormulaMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				
				String indexCode = es.getValue().getIndexCode();
				BigDecimal value = getValueFromStore(indexCode, es.getValue(), indexDataCache);
				if( null != value ) {
					String el = es.getValue().getExtentContent();//单位转换表达式内容
					el = el.replace("#value", "%s");
					el = String.format(el, value.toString());
					cell.setCellFormula(el);
				} else {
					cell.setCellValue( "" );
				}
			});
			
			//写入自定义单元格 
			customizedMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				cell.setCellType( Cell.CELL_TYPE_STRING );
				cell.setCellValue( es.getValue() );
			});
			 // 写入流
			 //workbook.write(out);
			 //*****excel转换成html******
			 ExcelToHtmlConverter excelToHtmlConverter = new ExcelToHtmlConverter (DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument() );
		     //去掉Excel头行
		     excelToHtmlConverter.setOutputColumnHeaders(false);
		     //去掉Excel行号
		     excelToHtmlConverter.setOutputRowNumbers(false);	    
		     excelToHtmlConverter.processWorkbook(workbook);	
		     //DOTO省去对包含图片的处理
		     Document htmlDocument =excelToHtmlConverter.getDocument();
		     out = new ByteArrayOutputStream();
		     DOMSource domSource = new DOMSource (htmlDocument);
		     StreamResult streamResult = new StreamResult (out);
		     TransformerFactory tf = TransformerFactory.newInstance();
		     Transformer serializer = tf.newTransformer();
		     serializer.setOutputProperty (OutputKeys.ENCODING, "gbk");
		     serializer.setOutputProperty (OutputKeys.INDENT, "yes");
		     serializer.setOutputProperty (OutputKeys.METHOD, "html");
		     serializer.transform (domSource, streamResult);

		     String content = new String (out.toByteArray());	
		     FileUtils.writeStringToFile(new File(outpath), content, "gbk");	
		     
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				workbook.close();
				fis.close();
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	private String processTemplateFileHtml01(File templateFile, 
			Map<Integer, String> dateCellMap, Map<Integer, String> formulaCellMap,
			Map<Integer, Index> indexCellMap, Map<Integer, Index> indexCellToFormulaMap,
			Map<Integer, String> customizedMap,
			Map<String, IndexDataStore> indexDataCache) {
		FileInputStream fis = null;
		ByteArrayOutputStream out = null;
		HSSFWorkbook workbook = null;
		String content = null;
		try {
			fis = new FileInputStream(templateFile);

			workbook = new HSSFWorkbook(fis);
			HSSFSheet sh = workbook.getSheetAt(0);

			// 写入日期单元格（实际是字符串）
			dateCellMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				cell.setCellType( Cell.CELL_TYPE_STRING );
				cell.setCellValue( es.getValue() );
			});
			
			// 写入公式单元格
			formulaCellMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
//				cell.setCellType( Cell.CELL_TYPE_FORMULA );
				cell.setCellFormula( es.getValue() );
			});

			// 写入指标单元格
			indexCellMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				
				String indexCode = es.getValue().getIndexCode();
				BigDecimal value = getValueFromStore(indexCode, es.getValue(), indexDataCache);
				if( null != value ) {
					cell.setCellValue( value.doubleValue() );
				} else {
					cell.setCellValue( "" );
				}
			});

			// 写入指标单元格(有单位转换，变成公式单元格)
			indexCellToFormulaMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				
				String indexCode = es.getValue().getIndexCode();
				BigDecimal value = getValueFromStore(indexCode, es.getValue(), indexDataCache);
				if( null != value ) {
					String el = es.getValue().getExtentContent();//单位转换表达式内容
					el = el.replace("#value", "%s");
					el = String.format(el, value.toString());
					cell.setCellFormula(el);
				} else {
					cell.setCellValue( "" );
				}
			});
			
			//写入自定义单元格 
			customizedMap.entrySet().stream().forEach(es -> {
				Integer rowAndCol = es.getKey();
				int r = unZipRow(rowAndCol);
				int c = unZipCol(rowAndCol);

				HSSFRow row = sh.getRow(r);
				HSSFCell cell = row.getCell(c);
				cell.setCellType( Cell.CELL_TYPE_STRING );
				cell.setCellValue( es.getValue() );
			});
			 // 写入流
			 //workbook.write(out);
			 //*****excel转换成html******
			 ExcelToHtmlConverter excelToHtmlConverter = new ExcelToHtmlConverter (DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument() );
		     //去掉Excel头行
		     excelToHtmlConverter.setOutputColumnHeaders(false);
		     //去掉Excel行号
		     excelToHtmlConverter.setOutputRowNumbers(false);	    
		     excelToHtmlConverter.processWorkbook(workbook);	
		     //DOTO省去对包含图片的处理
		     Document htmlDocument =excelToHtmlConverter.getDocument();
		     out = new ByteArrayOutputStream();
		     DOMSource domSource = new DOMSource (htmlDocument);
		     StreamResult streamResult = new StreamResult (out);
		     TransformerFactory tf = TransformerFactory.newInstance();
		     Transformer serializer = tf.newTransformer();
		     serializer.setOutputProperty (OutputKeys.ENCODING, "gbk");
		     serializer.setOutputProperty (OutputKeys.INDENT, "yes");
		     serializer.setOutputProperty (OutputKeys.METHOD, "html");
		     serializer.transform (domSource, streamResult);
		     content = new String (out.toByteArray());	
		     //FileUtils.writeStringToFile(new File(outpath), content, "gbk");	
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				workbook.close();
				fis.close();
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		 return content;
	}
}
