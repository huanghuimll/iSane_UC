Ext.define('isane.model.organtree', {
	extend: 'Ext.data.Model',
	fields: [
	    //{name: 'id', type: 'int', mapping: 'id'},
 		'id', 'organCode', 'organName', 'parentCode', 'leaf',
 		{name: 'text', type: 'string', mapping: 'organName'},
 		{name: 'parentId', type: 'String', mapping: 'parentCode'},
 		{name: 'organCode', type: 'String', mapping: 'organKey'},
 		'dispOrder', 'organDesc', 'organType','organLev'
 	]
});