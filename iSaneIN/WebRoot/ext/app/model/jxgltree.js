Ext.define('isane.model.jxgltree', {
	extend: 'Ext.data.Model',
	fields: [
	    'id',
 		'organCode', 'organName', 'parentCode', 'leaf',
 		{name: 'text', type: 'string', mapping: 'organName'},
 		{name: 'organCode', type: 'String', mapping: 'organKey'},
 		'dispOrder', 'organDesc', 'organType','organLev', 'organParentId','organParentId1' 		
 	]
});