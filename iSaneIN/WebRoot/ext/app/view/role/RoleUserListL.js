Ext.define('isane.view.role.RoleUserListL',{
	extend:'Ext.grid.Panel',
	alias:'widget.role-RoleUserListL',
	id: 'role-RoleUserListL-id',
	multiSelect:true,
	store: Ext.create('isane.store.role.RoleUserL',{storeId: 'role-RoleUserListL-storeId'}),
	bodyPadding: 2,
	border:0,
	tbar:[
	"<span style='color:blue'>未配置:</sapan>",
  	{			
		xtype : 'textfield',
		name:'roleCode',
		hidden: true,
		id: 'role-RoleUserListL-roleCode'
	}, 
	{			
		xtype : 'textfield',
		name:'userName',
		id: 'role-RoleUserListL-userName',
		emptyText: '用户名...'
	},'-',
	{
		xtype : 'button',
		style:'float:right;margin-right:10px;',
		margin: '2 10 2 2',
		text : '查询',
		width : 50,
		id: 'role-RoleUserListL-btn',
		iconCls:'search'
	 }	
    ],	
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'group1',
            dropGroup: 'group2'
        },
        listeners: {
        	drop: function(node, data, dropRec, dropPosition) {
            	this.panel.fireEvent('viewdrop', node, data, dropRec, dropPosition);
            }
        }
    },
	columns :[
	 {header:'序号',dataIndex:'id',flex: 1},
     {header:'用户编码',dataIndex:'userCode',flex: 5},
     {header:'用户名',dataIndex:'userName',flex:5},
     {header:'用户状态',dataIndex:'userStatus',flex:2 ,renderer:function(val){
        	if(val==1){
        		return '<span style="color:green;">启用</span>';
        	}else if(val==2){
        		return '<span style="color:red;">禁用</span>';
        	}
        	return val;
		}
	}
    ],
	bbar: {
		xtype:'pagingtoolbar',
		id:'RoleUserListLPaging-id',
		pageSize: 20,
		store: 'role-RoleUserListL-storeId',
		loadMask:true,
		displayInfo:true,
		items: [
        {
            xtype: 'button',
            iconCls: 'list_selectAll',
            tooltip: '选中列表中所有用户',
            id: 'RoleUserListL-SelectAll-id',
            margin: '0 0 0 5' 
        }
        ]
	},    
	initComponent:function(){
		this.addEvents('viewdrop');
		this.callParent(arguments);
	}
});