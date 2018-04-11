Ext.define('isane.view.role.RoleMenuLTreeAct',{
	extend:'Ext.tree.Panel',
	alias:'widget.role-RoleMenuLTreeAct', 
	id: 'role-RoleMenuLTreeAct-id',
	rootVisible: false, 
	store:'role.RoleMenuLTreeAct',
	bbar: [
	'->',
	{
		width: 60,
		iconCls: 'treeBt',
		id: 'role-RoleMenuLTreeAct-ZS',
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
	   id: 'role-RoleMenuLTreeAct-saveQX',
	   iconCls: 'list_save'		
	}
	]
});