Ext.define('isane.view.role.RoleMenuLTree',{
	extend:'Ext.tree.Panel',
	alias:'widget.role-RoleMenuLTree', 
	id: 'role-RoleMenuLTree-id',
	rootVisible: false, 
	store:'role.RoleMenuLTree',
	bbar: [
	'->',
	{
		width: 60,
		iconCls: 'treeBt',
		id: 'role-RoleMenuLTree-ZS',
		text: '展开'
	},
	{
	   width: 80,
	   iconCls: 'list_selectAll',
	   text:'选取所有'	
	},
	{
	   xtype:'button',
	   width: 80,
	   text:'取消所有',
	   iconCls: 'list_deleteAll'		
	},
	{
	   xtype:'button',
	   width: 80,
	   text:'权限保存',
	   disabled: true,
	   id: 'role-RoleMenuLTree-saveQX',
	   iconCls: 'list_save'		
	}
	]
});