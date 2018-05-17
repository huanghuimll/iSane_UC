package com.isane.in.service.impl;

import com.isane.in.service.ImportService;
import com.isane.index.entity.OriginalData;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.multipart.MultipartFile;
import com.isane.in.entity.Import;
import com.isane.ragdoll.persistent.dao.Dao;
import com.isane.ragdoll.service.RagdollServiceImpl;

public class ImportServiceImpl extends RagdollServiceImpl<Import>implements ImportService {
	private static Logger logger = Logger.getLogger(ImportServiceImpl.class);
	@Autowired
	@Qualifier("dao")
	private Dao<OriginalData> originalDataDao;
	private Pattern p = Pattern.compile("^\\d*\\.\\d*");
	private Matcher m;

	@Override
	public List<OriginalData> importFile(MultipartFile mFile, List<Import> dataList, Import importData) {

		List<OriginalData> list = new ArrayList<OriginalData>();

		String fileName = mFile.getOriginalFilename();
		String suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
		try {
			File file = new File(fileName);
			mFile.transferTo(file);
			if ("xls".equals(suffix) || "XLS".equals(suffix)) {
				list = importXls(file, dataList, importData);
			} else if ("xlsx".equals(suffix) || "XLSX".equals(suffix)) {
				list = importXlsx(file, dataList, importData);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return list;
	}

	private List<OriginalData> importXls(File file, List<Import> dataList, Import importData) {
		List<OriginalData> list = new ArrayList<OriginalData>();

		InputStream is = null;
		HSSFWorkbook hWorkbook = null;
		try {
			is = new FileInputStream(file);
			hWorkbook = new HSSFWorkbook(is);
			int sheets = hWorkbook.getNumberOfSheets();
			HSSFSheet hSheet = null;
			for (int i = 0; i < dataList.size(); i++) {
				Import im = dataList.get(i);
				OriginalData od = new OriginalData();
				if (sheets <= im.getSheet()) {
					logger.error(String.format("编码:%s的sheet坐标配置错误.", im.getOriginalCode()));
					continue;
				}
				hSheet = hWorkbook.getSheetAt(im.getSheet());
				HSSFRow hRow = hSheet.getRow(im.getRow());
				if (hRow == null) {
					logger.error(String.format("编码:%s的行坐标配置错误.", im.getOriginalCode()));
					continue;
				}
				Cell cell = hRow.getCell(im.getCol());
				if (cell == null) {
					logger.error(String.format("编码:%s的列坐标配置错误.", im.getOriginalCode()));
					continue;
				}
				if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {
					od.setOriginalValue(
							new BigDecimal(cell.getNumericCellValue()).setScale(3, BigDecimal.ROUND_HALF_UP));
				} else if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
					od.setOriginalValue(
							new BigDecimal(cell.getNumericCellValue()).setScale(3, BigDecimal.ROUND_HALF_UP));
				}else {
					m = p.matcher(cell.toString());
					if(m.matches()){
						od.setOriginalValue(new BigDecimal(cell.toString()).setScale(3, BigDecimal.ROUND_HALF_UP));
					}else{
						logger.error(String.format("编码:%s的列坐标配置错误.", im.getOriginalCode()));
						continue;
					}
				}

				od.setOriginalCode(im.getOriginalCode());
				od.setDateType(im.getDateType());
				od.setOriginalDataVersion(1);
				switch (importData.getDateType()) {
				case "M":
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
					od.setStoreDate(sdf.parse(importData.getStoreDate()));
					break;
				case "D":
					SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
					od.setStoreDate(sdf1.parse(importData.getStoreDate()));
					break;
				}
				od.setInputDate(new Date());
				list.add(od);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != is) {
				try {
					is.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

		return list;
	}

	private List<OriginalData> importXlsx(File file, List<Import> dataList, Import importData) {
		List<OriginalData> list = new ArrayList<OriginalData>();
		InputStream is = null;
		XSSFWorkbook xWorkbook = null;
		try {
			is = new FileInputStream(file);
			xWorkbook = new XSSFWorkbook(is);
			int sheets = xWorkbook.getNumberOfSheets();
			XSSFSheet xSheet = null;
			for (int i = 0; i < dataList.size(); i++) {
				Import im = dataList.get(i);
				OriginalData od = new OriginalData();
				if (sheets <= im.getSheet()) {
					logger.error(String.format("编码:%s的sheet坐标配置错误.", im.getOriginalCode()));
					continue;
				}
				xSheet = xWorkbook.getSheetAt(im.getSheet());
				XSSFRow xRow = xSheet.getRow(im.getRow());
				if (xRow == null) {
					logger.error(String.format("编码:%s的行坐标配置错误.", im.getOriginalCode()));
					continue;
				}
				Cell cell = xRow.getCell(im.getCol());
				if (cell == null) {
					logger.error(String.format("编码:%s的列坐标配置错误.", im.getOriginalCode()));
					continue;
				}
				if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {
					od.setOriginalValue(
							new BigDecimal(cell.getNumericCellValue()).setScale(3, BigDecimal.ROUND_HALF_UP));
				} else if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
					od.setOriginalValue(
							new BigDecimal(cell.getNumericCellValue()).setScale(3, BigDecimal.ROUND_HALF_UP));
				} else {
					m = p.matcher(cell.toString());
					if(m.matches()){
						od.setOriginalValue(new BigDecimal(cell.toString()).setScale(3, BigDecimal.ROUND_HALF_UP));
					}else{
						logger.error(String.format("编码:%s的列坐标配置错误.", im.getOriginalCode()));
						continue;
					}
				}
				
				od.setOriginalCode(im.getOriginalCode());
				od.setDateType(im.getDateType());
				od.setOriginalDataVersion(1);
				switch (importData.getDateType()) {
				case "M":
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
					od.setStoreDate(sdf.parse(importData.getStoreDate()));
					break;
				case "D":
					SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
					od.setStoreDate(sdf1.parse(importData.getStoreDate()));
					break;
				}
				od.setInputDate(new Date());
				list.add(od);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != is) {
				try {
					is.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return list;
	}

	// 根据excel传入的数据与数据库比对
	// 无：增加，有：修改
	// private void Manager(List<Import> list) {
	// List<Import> obj = getDao().select(new Import(),
	// DaoConst.PAGE_DEFAULT_START,
	// DaoConst.PAGE_DEFAULT_LIMIT);
	// List<Import> undateList = new ArrayList<Import>();
	// List<Import> addList = new ArrayList<Import>();
	// for (int i = 0; i < list.size(); i++) {
	// String code = list.get(i).getPlantCode() + list.get(i).getImportCode();
	// int count = 0;
	// for (int j = 0; j < obj.size(); j++) {
	// if (code.equals(obj.get(j).getPlantCode() + obj.get(j).getImportCode()))
	// {
	// list.get(i).setId(obj.get(j).getId());
	// undateList.add(list.get(i));
	// obj.remove(j);
	// count = 1;
	// break;
	// }
	// }
	// if (count == 0) {
	// addList.add(list.get(i));
	// }
	// }
	// getDao().batchInsert(addList);
	// getDao().batchUpdate(undateList);
	// System.out.println("增加了材质：" + addList.size() + "条");
	// System.out.println("修改了材质：" + undateList.size() + "条");
	// }

	// 处理导入int类型时会有.0问题及空值报空指针问题
	public Object getValue(Cell cell) {
		Object value = null;
		if (cell == null) {
			value = "";
			return value;
		} else {
			if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
				long longVal = Math.round(cell.getNumericCellValue());
				if (Double.parseDouble(longVal + ".0") == cell.getNumericCellValue()) {
					value = longVal;
				} else {
					value = cell.getNumericCellValue();
				}
			} else {
				value = cell;
			}
		}
		return value;
	}

}