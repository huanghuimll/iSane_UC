Ext.define('isane.view.user.UserPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.user-UserPanel',
	title:'用户管理',
	closable:true,
	layout:'border',	
	items:[
	{
		region: 'center',
		xtype:'user-UserList'
	}
	]
});