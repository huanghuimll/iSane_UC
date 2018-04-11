Ext.define('isane.view.role.roleList',{
	extend:'Ext.grid.Panel',
	alias:'widget.role-roleList',
	id: 'role-roleList-id',
	store: Ext.create('isane.store.role.Role',{storeId: 'role-roleList-storeId'}),
	border: 0,
	tbar:[
	{
	 	text: '增加',
	 	id: 'role-roleList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add'
	},'-',
	{
		text: '查看',
		disabled: true,
		id: 'role-roleList-viewButton',
		tooltip:'查看详细信息',
		iconCls: 'view'
	},'-',
	{
		text: '修改',
		disabled: true,
		id: 'role-roleList-editButton',
		tooltip:'修改一条新数据',
        iconCls: 'edit'
	},'-',
	{
	    text: '删除',
	    disabled: true,
	    id: 'role-roleList-removeButton',
	    tooltip:'删除一条新数据',
        iconCls: 'delete1'
	},'-'	
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
		store: 'role-roleList-storeId',
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