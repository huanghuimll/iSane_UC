/**
 * 安全生产。运行管理。两票统计
 */
Ext.define('isane.model.lptj',{
	extend: 'Ext.data.Model',
	fields: [
	         'id',
	         'plantCode', 
	         'dataType', 
	         'dataTypeValue', 
	         'hgps',
	         'zps',
	         'psDesc',
	         'dataTime',
	         'inputTime',
	         'disOrder'
 ]
});
 