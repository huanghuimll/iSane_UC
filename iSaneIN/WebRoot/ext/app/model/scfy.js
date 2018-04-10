/**
 * 安全生产。生产费用管理。生产费用
 */
Ext.define('isane.model.scfy',{
	extend: 'Ext.data.Model',
	fields: [
	         'id',
	         'plantCode', 
	         'scfyCode', 
	         'scfyName',
	         'scfyValue',
	         'dataTime',
	         'inputTime',
	         'scfyType',
	         'scfyDesc'
 ]
});
 