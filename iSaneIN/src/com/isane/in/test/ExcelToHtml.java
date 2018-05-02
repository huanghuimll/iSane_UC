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
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hwpf.usermodel.Picture;
import org.w3c.dom.Document;
/**
 * 只支持xls(2003),不支持xlsx(2007以上)
 * @author Henry
 *
 */
public class ExcelToHtml {
	
	public static void main(String[] args) throws Exception {
		String path = "D:\\ISANECHART\\upload\\template\\";
		String file = "GZFGS_DR_DL.xls";
	     InputStream input=new FileInputStream(path+file);
	     HSSFWorkbook excelBook=new HSSFWorkbook(input);
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

}
