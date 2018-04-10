package com.isane.in.exporter;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.usermodel.Cell;

import com.isane.in.entity.ExportCell;
import com.isane.in.entity.ExportMerge;
import com.isane.in.entity.ExportTemplate;
import com.isane.in.service.ExportTemplateService;
import com.isane.ragdoll.persistent.entity.Operation;
import com.isane.ragdoll.web.Errors;

public class ExportTemplateUpdaterImpl implements ExportTemplateUpdater {
	
	private static final Logger logger = Logger.getLogger(ExportTemplateUpdaterImpl.class);
	private ExportTemplateService exportTemplateServiceImpl;
	
	/**
	 * @author yangxm
	 * 2018-03-10
	 * 判断文件是否存在
	 * 打开文件，读取信息
	 * 	创建并设置ExportTemplate
	 *  创建并设置List<ExportCell>
	 *  创建并设置List<ExportMerge>
	 * 保存到数据库
	 * 	事务处理
	 * 	服务方法放在ExportTemplateService中
	 */
	@Override
	public Operation updateExportTemplate(ExportTemplate template, String xlsTemplateFile) {
		
		//文件是否存在
		File templateFile = new File(xlsTemplateFile);
		if( !templateFile.exists() ) {
			logger.error( "文件不存在。" );
			return new Operation(false, "文件不存在。", ExportConst.EXPORT_UPDATER_ERROR_FILE_NOTEXIST);
		}
		
		//读取文件
		boolean error = false;
		InputStream xlsFile = null;
		try {
			xlsFile = new FileInputStream( templateFile );
		} catch (FileNotFoundException e) {
			error = true;
			logger.error( "文件打开错误。" );
			logger.error( e.getMessage() );
		}
		
		//读取文件失败
		if(error) {
			return new Operation(false, "文件打开错误。", ExportConst.EXPORT_UPDATER_ERROR_FILE_NOTEXIST);
		}
		
		//处理文件
		int errorCode = ExportConst.EXPORT_UPDATER_ERROR_NOERROR;
		String errorMessage = "";
		
		HSSFWorkbook  workbook = null;
		HSSFSheet sheet = null;
		HSSFRow row = null;
		HSSFCell cell = null;
		error = false;
		
		List<ExportCell> cellList = new ArrayList<>();
		List<ExportMerge> mergeList = new ArrayList<>();
		try {
			workbook = new HSSFWorkbook( xlsFile );
			
			int sheetCount = workbook.getNumberOfSheets();
			if( sheetCount == 0) {
				errorMessage = "没有可用的Sheet页。";
				throw new RuntimeException();
			}
			
			sheet = workbook.getSheetAt( 0 );
			int lastRowNumber = sheet.getLastRowNum();
			if( lastRowNumber == 0) {
				errorMessage = "没有可用的单元格。";
				throw new RuntimeException();
			}
			
			int cellType = -1;
			int lastCellNumber = 0;
			ExportCell itemCell = null;
			String temp = "";
			for (int r = 0; r <= lastRowNumber; r++) {
				row = sheet.getRow( r );
				
				if (row != null) {
					lastCellNumber = row.getLastCellNum();
					for (int c = 0; c < lastCellNumber; c++) {
						cell = row.getCell(c);
						if( null == cell ) {
							continue;
						}
						cellType = cell.getCellType();
						if( cellType == Cell.CELL_TYPE_BLANK || cellType == Cell.CELL_TYPE_ERROR ) {
							continue;
						}
						
						if (cell != null) {
							itemCell = new ExportCell();
							itemCell.setSheetNubmer( 0 );
							itemCell.setRowNumber( cell.getRowIndex() );
							itemCell.setColNumber( cell.getColumnIndex() );
							itemCell.setExportId( template.getId() );
							itemCell.setDecimalPlace( template.getDecimalPlace() );
							itemCell.setCellHeight( cell.getRow().getHeight() );
							itemCell.setCellWidth( sheet.getColumnWidth( cell.getColumnIndex() ) );
							itemCell.setModifyFlag( 2 );
							
							if( cellType == Cell.CELL_TYPE_FORMULA ) {
								itemCell.setCellType( ExportConst.CELL_TYPE_FORMULA );
							} else if( cellType == Cell.CELL_TYPE_NUMERIC || cellType == Cell.CELL_TYPE_BOOLEAN  ) {
								itemCell.setCellType( ExportConst.CELL_TYPE_STATIC );
							} else {
								//进入这里，一定是Cell.CELL_TYPE_STRING
								//判断是指标、日期、还是静态字符串
								temp = cell.getStringCellValue();
								if( temp.startsWith("{") ) {
									//指标
									itemCell.setCellType( ExportConst.CELL_TYPE_INDEX );
									String[] subs = temp.split(",");
									
									//判断指标是否输入
									if( "".equals(subs[0].trim()) ) {
										logger.error("单元格中的指标为空：" + temp);
										continue;
									}
									//判断是否能够修改									
									if( subs.length >= 3 ) {
										if( "Y".equalsIgnoreCase( subs[2] )) {
											itemCell.setModifyFlag( 1 );
										}
									}
								} else if( temp.startsWith("(") ) {
									//日期
									itemCell.setCellType( ExportConst.CELL_TYPE_DATETIME );
								} else if( temp.startsWith("[") ) {
									//自定义类型
									itemCell.setCellType( ExportConst.CELL_TYPE_CUSTOMIZED );
								} else {
									//不支持的动态内容，当成静态字符串处理
									itemCell.setCellType( ExportConst.CELL_TYPE_STATIC );
								}
							}
							
							itemCell.setCellContent( cell.toString() );
							cellList.add( itemCell );
						}//if cell
					}//for cell
				}//if row
			}//for row
			
			// 单元格合并信息
			ExportMerge itemMerge = null;
			int numMergedRegions = sheet.getNumMergedRegions();
			CellRangeAddress mergedRegion = null;
			for (int m = 0; m < numMergedRegions; m++) {
				mergedRegion = sheet.getMergedRegion(m);
				
				itemMerge = new ExportMerge(
						template.getId(),
						0, 
						mergedRegion.getFirstRow(),
						mergedRegion.getFirstColumn(),
						mergedRegion.getLastRow(),
						mergedRegion.getLastColumn()
						);
				
				mergeList.add( itemMerge );
			}
		} catch (IOException e) {
			error = true;
			errorMessage = "处理模版文件错误；";
			logger.error( errorMessage + e.getMessage() );
		} finally {
			if( null != workbook) {
				try {
					workbook.close();
				} catch (IOException e) {
					logger.error( "关闭模版文件错误；" + e.getMessage() );
				}
			}
		}
		
		if( !error ) {
			if( 0 == cellList.size() ) {
				error = true;
				errorCode = ExportConst.EXPORT_UPDATER_ERROR_CONTENT_NOCELL;
				errorMessage = "模版中没有任何单元格定义；";
			}
		}
		
		if( !error ) {
			try {
				exportTemplateServiceImpl.createExportTemplateInfo(template, cellList, mergeList);
			} catch(Exception e) {
				logger.error( e.getMessage() );
				error = true;
				errorCode = Errors.ERROR_DB_ERROR;
				errorMessage = "保存模版信息到数据库错误；";
			}
		}
		
		return new Operation(!error, errorMessage, errorCode);
	}

	public ExportTemplateService getExportTemplateServiceImpl() {
		return exportTemplateServiceImpl;
	}

	public void setExportTemplateServiceImpl(ExportTemplateService exportTemplateServiceImpl) {
		this.exportTemplateServiceImpl = exportTemplateServiceImpl;
	}

}
