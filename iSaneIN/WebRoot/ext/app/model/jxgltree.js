Ext.define('isane.model.jxgltree', {
	extend: 'Ext.data.Model',
	fields: [
	    //{name: 'id', type: 'int', mapping: 'id'},
 		'id', 'organCode', 'organName', 'parentCode', 'leaf',
 		{name: 'text', type: 'string', mapping: 'organName'},
 		{name: 'parentId', type: 'String', mapping: 'parentCode'},
 		'dispOrder', 'organDesc', 'organType'
 	]
});