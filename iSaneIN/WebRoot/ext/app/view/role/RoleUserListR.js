Ext.define('isane.view.role.RoleUserListR',{
	extend:'Ext.grid.Panel',
	alias:'widget.role-RoleUserListR',
	id: 'role-RoleUserListR-id',
	multiSelect:true,
	store: Ext.create('isane.store.role.RoleUserR',{storeId: 'role-RoleUserListR-storeId'}),
	bodyPadding: 2,
	border:0,
	tbar:[
	"<span style='color:blue'>已配置:</sapan>",
	{			
  		xtype : 'textfield',
  		name:'roleCode',
  		hidden: true,
  		id: 'role-RoleUserListR-roleCode'
  	}, 
  	{			
  		xtype : 'textfield',
  		name:'userName',
  		id: 'role-RoleUserListR-userName',
  		emptyText: '用户名...'
  	},'-',
  	{
  		xtype : 'button',
  		style:'float:right;margin-right:10px;',
  		margin: '2 10 2 2',
  		text : '查询',
  		width : 50,
  		id: 'role-RoleUserListR-btn',
  		iconCls:'search'
  	 }	
    ],	
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'group2',
            dropGroup: 'group1'
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
		id:'RoleUserListRPaging-id',
		pageSize: 20,
		store: 'role-RoleUserListR-storeId',
		loadMask:true,
		displayInfo:true,
		items: [
        {
            xtype: 'button',
            iconCls: 'list_selectAll',
            tooltip: '选中列表中所有用户',
            id: 'RoleUserListR-SelectAll-id',
            margin: '0 0 0 5' 
        }
        ]
	},    
	initComponent:function(){
		this.addEvents('viewdrop');
		this.callParent(arguments);
	}
});