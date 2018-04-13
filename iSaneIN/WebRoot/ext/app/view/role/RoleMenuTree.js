Ext.define('isane.view.role.RoleMenuTree',{
	extend:'Ext.tree.Panel',
	alias:'widget.role-RoleMenuTree', 
	id: 'role-RoleMenuTree-id',
	//rootVisible: false, 
	store: Ext.create('isane.store.role.RoleMenuTree'),
	tbar: [
	{
		width: 60,
		iconCls: 'treeBt',
		id: 'role-RoleMenuTree-ZS',
		text: '展开'
	},'-',
	{
	   width: 80,
	   iconCls: 'list_selectAll',
	   text:'选取所有'	
	},'-',
	{
	   xtype:'button',
	   width: 80,
	   text:'取消所有',
	   iconCls: 'list_deleteAll'		
	},'-',
	{
	   xtype:'button',
	   width: 80,
	   text:'权限保存',
	   disabled: true,
	   id: 'role-RoleMenuTree-saveQX',
	   iconCls: 'list_save'		
	}
	]
});