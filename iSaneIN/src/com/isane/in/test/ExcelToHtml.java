package com.isane.in.test;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

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
import org.apache.poi.hwpf.usermodel.Picture;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellValue;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.w3c.dom.Document;
/**
 * 只支持xls(2003),不支持xlsx(2007以上)
 * @author Henry
 *
 */
public class ExcelToHtml {
	private static FormulaEvaluator evaluator;	
	
	public static void main(String[] args) throws Exception {
		String path = "D:\\ISANECHART\\upload\\template\\";
		String file = "GZFGS_DR_DL.xls";
	     InputStream input=new FileInputStream(path+file);
	     HSSFWorkbook excelBook=new HSSFWorkbook(input);
	     //操作下单元格数据--start
	     HSSFSheet sheet =  excelBook.getSheetAt(0);//1
	     HSSFRow row6 =  sheet.getRow(5);//第6行
	     HSSFCell cell2 = row6.getCell(1);//2
	     cell2.setCellValue(100);
	     HSSFCell cell3 = row6.getCell(2);//3
	     cell3.setCellValue(100);
	     HSSFCell cell4 = row6.getCell(3);//4
	     cell4.setCellValue(100);
	     HSSFCell cell5 = row6.getCell(4);//5
	     cell5.setCellValue(100);
	    
	     HSSFRow row7 =  sheet.getRow(6);//第7行
	     cell2 = row7.getCell(1);//2
	     cell2.setCellValue(50);
	     cell3 = row7.getCell(2);//3
	     cell3.setCellValue(50);
	     cell4 = row7.getCell(3);//4
	     cell4.setCellValue(50);
	     cell5 = row7.getCell(4);//5	
	     cell5.setCellValue(50);
	     
	      	evaluator=excelBook.getCreationHelper().createFormulaEvaluator();
	        
	        for (int i = 1; i <8; i++) {
	        	HSSFRow  row=sheet.getRow(i);
	            for (Cell cell : row) {
	                System.out.println(getCellValue(cell));
	                cell.setCellValue(getCellValue(cell));
	            }
	        }	     
	     
	     /* HSSFRow row8 =  sheet.getRow(6);//第7行
	     cell2 = row8.getCell(1);//2
	     //cell2.setCellValue(50);
	     cell2.setCellFormula(cell2.getCellFormula());
	     cell3 = row8.getCell(2);//3
	     cell3.setCellValue(50);
	     cell4 = row8.getCell(3);//4
	     cell4.setCellValue(50);
	     cell5 = row8.getCell(4);//5	
	     cell5.setCellValue(50);*/	     
	     
	     //操作下单元格数据---end
	     ExcelToHtmlConverter excelToHtmlConverter = new ExcelToHtmlConverter (DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument() );
	     //去掉Excel头行
	     excelToHtmlConverter.setOutputColumnHeaders(false);
	     //去掉Excel行号
	     excelToHtmlConverter.setOutputRowNumbers(false);	    
	     excelToHtmlConverter.processWorkbook(excelBook);
	     //处理Excel中包含的图片
	     List pics = excelBook.getAllPictures();
	     if (pics != null) {
	         for (int i = 0; i < pics.size(); i++) {
	             Picture pic = (Picture) pics.get (i);
	             try {
	                 pic.writeImageContent (new FileOutputStream (path + pic.suggestFullFileName() ) );
	             } catch (FileNotFoundException e) {
	                 e.printStackTrace();
	             }
	         }
	     }
	     
	     Document htmlDocument =excelToHtmlConverter.getDocument();
	     ByteArrayOutputStream outStream = new ByteArrayOutputStream();
	     DOMSource domSource = new DOMSource (htmlDocument);
	     StreamResult streamResult = new StreamResult (outStream);
	     TransformerFactory tf = TransformerFactory.newInstance();
	     Transformer serializer = tf.newTransformer();
	     serializer.setOutputProperty (OutputKeys.ENCODING, "utf-8");
	     serializer.setOutputProperty (OutputKeys.INDENT, "yes");
	     serializer.setOutputProperty (OutputKeys.METHOD, "html");
	     serializer.transform (domSource, streamResult);
	     outStream.close();

	     String content = new String (outStream.toByteArray());	
	     FileUtils.writeStringToFile(new File (path, "exportExcel.html"), content, "utf-8");
	}
	
    private static String getCellValue(Cell cell) {
        if (cell==null) {
            return "isNull";
        }
        
        System.out.println("rowIdx:"+cell.getRowIndex()+",colIdx:"+cell.getColumnIndex());
        
        String cellValue = null;
        switch (cell.getCellType()) {
	        case Cell.CELL_TYPE_STRING:
	            System.out.print("STRING :");
	            cellValue=cell.getStringCellValue();
	            break;
	        case Cell.CELL_TYPE_NUMERIC:
	            System.out.print("NUMERIC:");
	            cellValue=String.valueOf(cell.getNumericCellValue());
	            break;
	        case Cell.CELL_TYPE_FORMULA:
	            System.out.print("FORMULA:");
	            cellValue=getCellValue(evaluator.evaluate(cell));
	            break;
	        default:
	            System.out.println("Has Default.");
	            break;
        }
        
        return cellValue;
    }	
    
    private static String getCellValue(CellValue cell) {
        String cellValue = null;
        switch (cell.getCellType()) {
	        case Cell.CELL_TYPE_STRING:
	            System.out.print("String :");
	            cellValue=cell.getStringValue();
	            break;
	        case Cell.CELL_TYPE_NUMERIC:
	            System.out.print("NUMERIC:");
	            cellValue=String.valueOf(cell.getNumberValue());
	            break;
	        case Cell.CELL_TYPE_FORMULA:
	            System.out.print("FORMULA:");
	            break;
	        default:
	            break;
        }
        
        return cellValue;
    }    

}
