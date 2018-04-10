package com.isane.in.exporter;

import com.isane.in.entity.ExportTemplate;
import com.isane.ragdoll.persistent.entity.Operation;

public interface ExportTemplateUpdater {
	Operation updateExportTemplate(ExportTemplate template, String xlsTemplateFile);
}
