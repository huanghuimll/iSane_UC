package com.isane.in.controller;

import java.io.File;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.isane.ragdoll.persistent.entity.Operation;
import com.isane.ragdoll.utils.jodc.JODCUtil;
import com.isane.ragdoll.utils.json.JacksonUtil;
import com.isane.ragdoll.utils.upload.PropertiesUtil;
import com.isane.ragdoll.utils.upload.UploadUtil;
import com.isane.ragdoll.web.Errors;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.Attachment;


@Controller
@RequestMapping(value = "/api/Attachment")
public class AttachmentController extends RagdollControllerImpl<Attachment> {

	@Override
	public Attachment getEmptyEntity() {
		return new Attachment();
	}

	@Override
	public Class<Attachment> getEntityClass() {
		return Attachment.class;
	}
	
	@RequestMapping(value = "upload", method = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST})
	@ResponseBody
	public Operation upload(@RequestParam("uploadFile") MultipartFile mFile, Attachment att) {
		//System.out.println("=== upload ===");
		//System.out.println(String.format("===fileName:%s", mFile.getOriginalFilename()));
		//System.out.println(att);
		boolean flag = uploadService(mFile, att);
		Attachment item = null;
		Operation op = new Operation();
		if (flag) {
			item = getService().create(att);
			op.setSuccess(true);
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("上传文件成功.");
			op.setObjJson(JacksonUtil.toJson(item));
		} else {
			op.setSuccess(false);
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("上传文件失败.");
			op.setObjJson(JacksonUtil.toJson(item));
		}
		
		return op;
	}	
	
	private boolean uploadService(MultipartFile mFile, Attachment attachement) {
		if (mFile.isEmpty() || "".equals(attachement) || null == attachement) {
			return false;
		}
		String fileName = mFile.getOriginalFilename();;
		String typeName = attachement.getOwnTypeCfg()+ "/" + UploadUtil.getExtensionName(fileName);
		String path = UploadUtil.checkFolder(typeName);
		String newFileName = UploadUtil.getNewFileName(path, fileName);
		String uploadPath = PropertiesUtil.readAsString(PropertiesUtil.UPLOAD);
		//System.out.println("===uploadPath:"+uploadPath);
		String attachmentUrl = String.format("%s/%s", path.substring(uploadPath.length() + 1, path.length()), newFileName);
		//System.out.println("===attachmentUrl:"+attachmentUrl);
		String servicePath = String.format("%s/%s", path, newFileName);
		//System.out.println("===servicePath:"+servicePath);

		attachement.setAttachmentName(newFileName);
		attachement.setAttachmentUrl(attachmentUrl);
		attachement.setSmallUrl("");
		attachement.setAttachmentTypeCfg(UploadUtil.getExtensionName(fileName));
		attachement.setServerPath(servicePath);
		//1、上传
		boolean flag = UploadUtil.upload(mFile, typeName);
		//2、转换HTML
		if(flag){
			JODCUtil.toHtmlString(new File(servicePath), path+"/html", UploadUtil.getFileNameOnly(fileName));
		}
		/*if(flag){
			CommonsMultipartFile  cf = (CommonsMultipartFile)mFile;
			DiskFileItem fi = (DiskFileItem)cf.getFileItem();
			File file = fi.getStoreLocation();
			JODCUtil.toHtmlString(file, path+"/html");
		}*/
		attachement.setEncodeUrl(String.format("%s/%s/%s", path.substring(uploadPath.length() + 1, path.length()), "/html/", UploadUtil.getFileNameOnly(fileName)+".pdf"));
		return flag;
	}		

}