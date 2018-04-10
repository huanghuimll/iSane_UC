package com.isane.in.service;

import java.util.List;

import com.isane.in.entity.ExportCell;
import com.isane.in.entity.ExportMerge;
import com.isane.in.entity.ExportTemplate;
import com.isane.ragdoll.persistent.dao.Dao;
import com.isane.ragdoll.service.RagdollService;

public interface ExportTemplateService extends RagdollService<ExportTemplate> {
	
	void setExportCellDao(Dao<ExportCell> dao);
	Dao<ExportCell> getExportCellDao();
	
	void setExportMergeDao(Dao<ExportMerge> dao);
	Dao<ExportMerge> getExportMergeDao();
	
	/**
	 * 保存整个导出模版信息；项目使用配置事务方式；
	 * @param template
	 * @param cells
	 * @param merges
	 * @return
	 */
	boolean createExportTemplateInfo(ExportTemplate template, List<ExportCell> cellList, List<ExportMerge> mergeList);
}