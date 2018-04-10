Ext.define('isane.model.Menu', {
	extend: 'Ext.data.Model',
	fields: [
	//	{name: 'id', type: 'int', mapping: 'id'},
		'id','plantCode','menuCode', 'parentCode',
		{name: 'text', type: 'string', mapping: 'menuTitle'},
		//{name: 'url', type: 'string', mapping: 'menuAction'},       
		{name: 'parentId', type: 'String', mapping: 'parentCode'},
		{name: 'actionType', type: 'int', mapping: 'actionType'},
		{name: 'icon', type: 'String', mapping: 'iconUrl'},
		'displayOrder', 'menuTitle', 'menuAction', 'iconUrl'
	]
});