Ext.define('isane.view.user.UserList',{
	extend:'Ext.grid.Panel',
	alias:'widget.user-UserList',
	id: 'user-UserList-id',
	store: Ext.create('isane.store.user.User',{storeId: 'user-UserList-storeId'}),
	border: 0,
	tbar:[
	{
	 	text: '增加',
	 	id: 'user-UserList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add'
	},'-',
	{
		text: '明细',
		disabled: true,
		id: 'user-UserList-viewButton',
		tooltip:'查看详细信息',
		iconCls: 'view'
	},'-',
	{
		text: '修改',
		disabled: true,
		id: 'user-UserList-editButton',
		tooltip:'修改一条新数据',
        iconCls: 'edit'
	},'-',
	{
	    text: '删除',
	    disabled: true,
	    id: 'user-UserList-removeButton',
	    tooltip:'删除一条新数据',
        iconCls: 'delete1'
	},'-',
	{
		text: '重置密码',
		disabled: true,
		id: 'user-UserList-restButton',
		tooltip:'重置密码',
		iconCls: 'edit'
	},'-',
	{
	 	text: '开锁',
	 	id: 'user-UserList-openAndCloseButton',
	 	tooltip:'锁定或未锁定',
	 	disabled: true,
        iconCls: 'list_closeUse'
	},'-',	
	{
	    text: '上移',
	    disabled: true,
	    id: 'user-UserList-upButton',
	    tooltip:'向上移动一格',
        iconCls: 'up',
        hidden: true
        
	},
	{
	    text: '下移',
	    disabled: true,
	    id: 'user-UserList-downButton',
	    tooltip:'向下移动一格',
        iconCls: 'down',
        hidden: true
	},
	{
		xtype: 'textfield',
		name: 'userName',
		id: 'user-UserList-userName',
		//width: 100,
		emptyText: '输入用户名..'	
	},
	{
		text: '搜索',
	    id: 'user-UserList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{	
		text: '重置',
		tooltip:'重置',
		//iconCls: 'search'	
		handler: function(won){
			won.up('toolbar').down('textfield[name=userName]').reset();
		}
		
	},'-'
    ],
	columns:[
         {header:'选择',dataIndex:'id',width:50},
         {header:'所属单位',dataIndex:'plantCode',flex:2/*, 
        	 renderer: function(val){
    	   	 if(getDeptByCode(val)){
    			 return getDeptByCode(val).deptShortName;
    		 }else{
    			 return '';
    		 }   
         }*/},
         {header:'用户编码',dataIndex:'userCode',flex:4},
         {header:'用户名',dataIndex:'userName',flex:4},
         {header:'状态',dataIndex:'currentStatus',flex:2, renderer: function(val){
         	if(val==1){
        		return '<span style="color:green;">正常</span>';
        	}else if(val==2){
        		return '<span style="color:red;">失效</span>';
        	}
        	return val;	           	 
         }},
         {header:'性别',dataIndex:'sex',flex:2},
         {
        	 text:'权限查看', 
        	 xtype: 'actioncolumn', 
        	 flex: 2,
        	 items:[
    		 {
    			iconCls: 'list_view',
                tooltip: "<span style='color:red'>权限查看</span>",
                handler: function(grid, rowIndex, colIndex) {
                	var store = grid.getStore();
                    var rec = store.getAt(rowIndex);
                    alert('开发中．．．．');
                    //this.fireEvent('showPermissWin', rec);
                }            
            }    	        
            ] 
    	 }         
     ],
	bbar:
	{
		xtype:'pagingtoolbar',
		store: 'user-UserList-storeId',
		width: 500,
		loadMask:true,
		displayInfo:true,
		id: 'user-UserList-pageId'
	},	
	initComponent:function(){
		this.callParent(arguments);
	}	       
});