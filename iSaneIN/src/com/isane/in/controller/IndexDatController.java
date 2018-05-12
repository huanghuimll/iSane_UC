package com.isane.in.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.utils.upload.PropertiesUtil;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.IndexDat;
import com.isane.in.exporter.ReportExport;


@Controller
@RequestMapping(value = "/api/IndexDat")
public class IndexDatController extends RagdollControllerImpl<IndexDat> {

	@Autowired
	ReportExport reportExportImpl;
	
	@Override
	public IndexDat getEmptyEntity() {
		return new IndexDat();
	}

	@Override
	public Class<IndexDat> getEntityClass() {
		return IndexDat.class;
	}
	/**
	 * 日报月报公用同一个导出接口
	 * 
	 * @param item
	 * @param response
	 * @param request
	 */
	@RequestMapping("/DAndY/export")
	public void exportFile(IndexDat item, HttpServletResponse response, HttpServletRequest request) {
		logMsg = "导出";
		Date storeDate = item.getStoreDate();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		String fileName = item.getFileName() +"_"+ df.format(new Date(storeDate.getTime())) + ".xls";
		String tempName = item.getTempName();
		//System.out.println("====fileName:"+fileName);
		//System.out.println("====tempName:"+tempName);
		OutputStream os = null;
		try {
			os = response.getOutputStream();
			response.reset();
			String userAgent = request.getHeader("USER-AGENT");
			if (StringUtils.contains(userAgent, "Mozilla")) {
				response.setHeader("Content-disposition",
						"attachment; filename = " + new String(fileName.getBytes(), "ISO8859-1"));
			} else {
				response.setHeader("Content-disposition",
						"attachment; filename = " + URLEncoder.encode(fileName, "UTF-8"));
			}
			response.setContentType("application/octet-streem");
			
			//调用导出
			reportExportImpl.exportReport(storeDate, tempName, os);
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				os.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 日报月报公用同一个导出接口
	 * 导出html
	 * @param item
	 * @param response
	 * @param request
	 */
	@RequestMapping("/DAndY/exportHtml")
	@ResponseBody
	public Map<String, String> exportFileHtml(IndexDat item) {
		Date storeDate = item.getStoreDate();
		//SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		//String fileName = item.getFileName() +"_"+ df.format(new Date(storeDate.getTime())) + ".xls";
		String tempName = item.getTempName();
		//System.out.println("====fileName:"+fileName);
		//System.out.println("====tempName:"+tempName);
		String outpath = PropertiesUtil.readAsString(PropertiesUtil.UPLOAD_PATH)+"/excelTohtml/"+tempName+".html";
		
		try {
			reportExportImpl.exportReportHtml(storeDate, tempName, outpath);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("url", outpath);
		
		return map;
	}	
	
	/**
	 * 日报月报公用同一个导出接口
	 * 直接返回html字符串,不用先存在一个地方，前天再去取
	 * =====正在用=====
	 * @param item
	 * @param response
	 * @param request
	 */
	@RequestMapping("/DAndY/exportHtml01")
	@ResponseBody
	public String exportFileHtml01(IndexDat item) {
		Date storeDate = item.getStoreDate();
		String tempName = item.getTempName();
		String html = null;
		try {
			html = reportExportImpl.exportReportHtml01(storeDate, tempName);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return html;
	}		
}