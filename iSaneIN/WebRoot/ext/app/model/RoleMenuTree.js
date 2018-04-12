Ext.define('isane.model.RoleMenuTree', {
extend: 'Ext.data.Model',
fields: [	
		'id','plantCode','menuCode', 'parentCode',
		{name: 'text', type: 'string', mapping: 'menuTitle'},
		//{name: 'url', type: 'string', mapping: 'menuAction'},       
		{name: 'parentId', type: 'String', mapping: 'parentCode'},
		{name: 'actionType', type: 'int', mapping: 'actionType'},
		//{name: 'icon', type: 'String', mapping: 'iconUrl'},
		{name: 'checked', type: 'Boolean', mapping: 'checked'},
		'displayOrder', 'menuTitle', 'menuAction'
	]
});