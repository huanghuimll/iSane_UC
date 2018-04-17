Ext.define('isane.model.RoleNavTree', {
extend: 'Ext.data.Model',
fields: [	
		'id','plantCode','navCode', 'parentCode',
		{name: 'text', type: 'string', mapping: 'navName'},
		{name: 'parentId', type: 'String', mapping: 'parentCode'},
		//{name: 'icon', type: 'String', mapping: 'iconUrl'},
		{name: 'checked', type: 'Boolean', mapping: 'checked'},
		'disOrder', 'navName'
	]
});