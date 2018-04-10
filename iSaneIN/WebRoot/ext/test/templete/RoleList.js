Ext.define('isane.view.role.RoleList',{
	extend:'Ext.grid.Panel',
	alias:'widget.role-RoleList',
	id: 'role-RoleList-id',
	store: Ext.create('isane.store.role.Role',{storeId: 'role-RoleList-storeId'}),
	border: 0,
	tbar:[
	{
	 	text: '增加',
	 	id: 'role-RoleList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add'
	},'-',
	{
		text: '明细',
		disabled: true,
		id: 'role-RoleList-viewButton',
		tooltip:'查看详细信息',
		iconCls: 'view'
	},'-',
	{
		text: '修改',
		disabled: true,
		id: 'role-RoleList-editButton',
		tooltip:'修改一条新数据',
        iconCls: 'edit'
	},'-',
	{
	    text: '删除',
	    disabled: true,
	    id: 'role-RoleList-removeButton',
	    tooltip:'删除一条新数据',
        iconCls: 'delete1'
	},'-',
	{
	    text: '上移',
	    disabled: true,
	    id: 'role-RoleList-upButton',
	    tooltip:'向上移动一格',
        iconCls: 'up'
	},'-',
	{
	    text: '下移',
	    disabled: true,
	    id: 'role-RoleList-downButton',
	    tooltip:'向下移动一格',
        iconCls: 'down'
	}
    ],
	columns:[
         {header:'选择',dataIndex:'id',flex:2},
         {header:'角色编码',dataIndex:'roleCode',flex:4},
         {header:'角色名',dataIndex:'roleName',flex:4},
         {header:'角色描述',dataIndex:'roleDesc',flex:4}			          		             
     ],
	bbar:
	{
		xtype:'pagingtoolbar',
		store: 'role-RoleList-storeId',
		pageSize: 15,
		width: 500,
		loadMask:true,
		displayInfo:true,
		id: 'paginRole-id'
	},	
	initComponent:function(){
		this.callParent(arguments);
	}	       
});