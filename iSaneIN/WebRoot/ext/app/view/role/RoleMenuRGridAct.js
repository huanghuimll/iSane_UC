Ext.define('isane.view.role.RoleMenuRGridAct',{
	extend:'Ext.grid.Panel',
	alias:'widget.role-RoleMenuRGridAct',
	id:'role-RoleMenuRGridAct-id',
	bodyPadding: 2,
	boder: 0,
	store:'role.RoleMenuRAct',
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
		id:'role-RoleMenuRGridAct-pagingAreaR',
		store: 'role.RoleMenuRAct',
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
	    	id: 'role-RoleMenuRGridAct-modifybt'
	    }
	    ]
	},	
	initComponent: function(){
		this.callParent(arguments);
	}
});