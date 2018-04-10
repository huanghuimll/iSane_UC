/**
 * 安全生产。安全管理。人身事故、设备故障、违章情况
 */
Ext.define('isane.model.aqgl',{
	extend: 'Ext.data.Model',
	fields: [
	         'id',
	         'plantCode', 
	         //'plantName', 
	         'dataType', 
	         //'dataTypeName', 
	         'dataTypeValue', 
	         //'dataTypeValueName', 
	         'dataValue',
	         'dataTime',
	         'inputTime',
	         'disOrder'
 ]
});
 