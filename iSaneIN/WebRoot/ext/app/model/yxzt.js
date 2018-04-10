/**
 * 安全生产。可靠性管理。机组运行状态
 */

Ext.define('isane.model.yxzt',{
	extend: 'Ext.data.Model',
	fields: [
	         'id',
	         'organCode', 
	         'jzKey', 
	         //'startTime',
	         {name: 'startTime', type: 'date', format: 'Y-m-d H:i:s'},
	         //'endTime',
	         {name: 'endTime', type: 'date', format: 'Y-m-d H:i:s'},
	         //'inputTime',
	         {name: 'inputTime', type: 'date', format: 'Y-m-d H:i:s'},
	         'yxType',
	         'gzType',
	         'dayCount',
	         'yxDesc'
 ]
});
 