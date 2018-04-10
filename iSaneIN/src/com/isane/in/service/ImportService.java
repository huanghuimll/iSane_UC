package com.isane.in.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.isane.in.entity.Import;
import com.isane.index.entity.OriginalData;
import com.isane.ragdoll.service.RagdollService;

public interface ImportService extends RagdollService<Import> {
	public List<OriginalData> importFile(MultipartFile mFile,List<Import> dataList,Import importData);
}