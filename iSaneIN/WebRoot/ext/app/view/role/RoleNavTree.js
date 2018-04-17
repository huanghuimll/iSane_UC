Ext.define('isane.view.role.RoleNavTree',{
	extend:'Ext.tree.Panel',
	alias:'widget.role-RoleNavTree', 
	id: 'role-RoleNavTree-id',
	//rootVisible: false, 
	store: Ext.create('isane.store.role.RoleNavTree'),
	tbar: [
	{
		width: 60,
		iconCls: 'treeBt',
		id: 'role-RoleNavTree-ZS',
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
	   id: 'role-RoleNavTree-saveQX',
	   iconCls: 'list_save'		
	}
	]
});