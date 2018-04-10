package com.isane.in.service.impl;

import com.isane.in.service.ExportTemplateService;

import java.util.List;

import org.apache.log4j.Logger;

import com.isane.in.entity.ExportCell;
import com.isane.in.entity.ExportMerge;
import com.isane.in.entity.ExportTemplate;
import com.isane.ragdoll.persistent.dao.Dao;
import com.isane.ragdoll.service.RagdollServiceImpl;

public class ExportTemplateServiceImpl extends RagdollServiceImpl<ExportTemplate> implements ExportTemplateService {

	private static Logger logger = Logger.getLogger( ExportTemplateServiceImpl.class );
	private Dao<ExportCell> exportCellDao;
	private Dao<ExportMerge> exportMergeDao;
	
	@Override
	public void setExportCellDao(Dao<ExportCell> dao) {
		this.exportCellDao = dao;
	}

	@Override
	public Dao<ExportCell> getExportCellDao() {
		return exportCellDao;
	}

	@Override
	public void setExportMergeDao(Dao<ExportMerge> dao) {
		this.exportMergeDao = dao;
	}

	@Override
	public Dao<ExportMerge> getExportMergeDao() {
		return exportMergeDao;
	}

	@Override
	public boolean createExportTemplateInfo(ExportTemplate template, List<ExportCell> cellList, List<ExportMerge> mergeList) {
		
		logger.info( "cellList.size() = " + cellList.size() );
		logger.info( "mergeList.size() = " + mergeList.size() );
		
		ExportTemplate itemET = getDao().insert( template );
		if( null == itemET || 0 == itemET.getId() ) {
			logger.error( "insert ExportTemplate Error." );
			return false;
		}
		
		long id = itemET.getId();
		int count = 0;
		
		ExportCell itemCell = null;
		count = cellList.size();
		for(int i=0;i<count;i++) {
			itemCell = cellList.get( i );
			itemCell.setExportId( id );
			
			//DONE; comment
			//模拟出错情况，看看是否触发事务
//			itemCell.setCellType( null );
			
			itemCell = exportCellDao.insert( itemCell );
			
			if( null == itemCell || 0 == itemCell.getId() ) {
				logger.error( "insert ExportCell Error." );
				return false;
			}
		}
		
		ExportMerge itemMerge = null;
		count = mergeList.size();
		for(int i=0;i<count;i++) {
			itemMerge = mergeList.get( i );
			itemMerge.setExportId( id );
			itemMerge = exportMergeDao.insert( itemMerge );
			if( null == itemMerge || 0 == itemMerge.getId() ) {
				logger.error( "insert ExportMerge Error." );
				return false;
			}
		}
		
		return true;
	}
	
}