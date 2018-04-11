Ext.define('isane.view.role.rolePanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.role-rolePanel',
	title:'角色管理',
	closable:true,
	layout:'border',	
	items:[
   	{
	    region: 'west',
        minWidth: 450,
        maxWidth: 500,
        width: 210,	  
        collapsible: true,
        header: false,
        split: true,        
        xtype:'role-roleList',
	},	
	{
		region: 'center',
		xtype: 'tabpanel',	
		items:[
		{
			title: '配置用户',
        	xtype: 'role-RoleUserRelation'
        },
    	{
    		title: '配置后台菜单',
    		//xtype: 'role-RoleMenuRelation'
		},
    	{
    		title: '配置前台菜单',
    		//xtype: 'role-RoleNewsTypeRelation'
		}		
		]
	}
	]
});