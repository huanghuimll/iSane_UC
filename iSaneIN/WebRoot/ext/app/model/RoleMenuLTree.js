Ext.define('isane.model.RoleMenuLTree', {
extend: 'Ext.data.Model',
fields: [
//	    {name: 'id', type: 'string', mapping: 'id'},
		{name: 'text', type: 'string', mapping: 'menuTitle'},
		{name: 'url', type: 'string', mapping: 'action'},       
		{name: 'parentsID', type: 'string', mapping: 'parentCode'},
		{name: 'checked', type: 'Boolean', mapping: 'checked'} 
	]
});