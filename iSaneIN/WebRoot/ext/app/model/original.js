/***
 *源数据
 */
Ext.define('isane.model.original',{
	extend: 'Ext.data.Model',
	fields: [
	         'id',
	         'plantCode', 
	         'plantName', 
	         'originalCode', 
	         'originalName', 
	         'originalValue',
	         'originalDesc',
	         'dateType', 
	         //{name :'storeDate', type: 'date', dateFormat: 'Y-m-d'}, 
	         'storeDate',
	         'inputDate', 
	         'valueUnit', 
	         'originalDataVersion', 
	         'dataOrder',
	         'dataId',
	         'originalDesc'
 ]
});
 