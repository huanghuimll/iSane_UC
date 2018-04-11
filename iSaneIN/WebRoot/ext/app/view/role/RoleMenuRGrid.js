Ext.define('isane.view.role.RoleMenuRGrid',{
	extend:'Ext.grid.Panel',
	alias:'widget.role-RoleMenuRGrid',
	id:'role-RoleMenuRGrid-id',
	bodyPadding: 2,
	boder: 0,
	store:'role.RoleMenuR',
	columns :[
	{header:'选择',dataIndex:'id',width: 60, hidden: true},
    {header:'菜单名',dataIndex:'menuTitle',width: 150},
    {xtype: 'checkcolumn',header: '增',dataIndex: 'isAdd',width: 50},
    {xtype: 'checkcolumn',header: '删', dataIndex: 'isDelete',width: 50},
    {xtype: 'checkcolumn', header: '改',dataIndex: 'isModify',width: 50},
    {xtype: 'checkcolumn',header: '查',dataIndex: 'isQuery',width: 50}, 
	{xtype: 'checkcolumn',header: '特殊',dataIndex: 'isSpecial',width: 50}
	],	
	bbar: {
		xtype:'pagingtoolbar',
		pageSize:10,
		id:'role-RoleMenuRGrid-pagingAreaR',
		store: 'role.RoleMenuR',
		loadMask:true,
		displayInfo:true,
		items: [
	    {
	    	xtype: 'button',
	    	tooltip:'权限修改',
	    	text: '权限修改',
	    	iconCls: 'modify',
	    	disabled: true,
	    	margin: '0 0 0 5', 
	    	id: 'role-RoleMenuRGrid-modifybt'
	    }
	    ]
	},	
	initComponent: function(){
		this.callParent(arguments);
	}
});