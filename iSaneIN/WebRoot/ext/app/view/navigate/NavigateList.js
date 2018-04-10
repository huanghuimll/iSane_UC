Ext.define('isane.view.navigate.NavigateList',{
	extend:'Ext.grid.Panel',
	alias:'widget.navigate-NavigateList',
	id: 'navigate-NavigateList-id',
	store: Ext.create('isane.store.navigate.Navigate',{storeId: 'navigate-NavigateList-storeId'}),
	border: 0,
	tbar:[
	{
	 	text: '增加',
	 	id: 'navigate-NavigateList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add'
	},'-',
	{
		text: '明细',
		disabled: true,
		id: 'navigate-NavigateList-viewButton',
		tooltip:'查看详细信息',
		iconCls: 'view'
	},'-',
	{
		text: '修改',
		disabled: true,
		id: 'navigate-NavigateList-editButton',
		tooltip:'修改一条新数据',
        iconCls: 'edit'
	},'-',
	{
	    text: '删除',
	    disabled: true,
	    id: 'navigate-NavigateList-removeButton',
	    tooltip:'删除一条新数据',
        iconCls: 'delete1'
	},'-',
	{
		xtype: 'textfield',
		name: 'navName',
		id: 'navigate-NavigateList-navName',
		emptyText: '输入名称..'	
	},'-',
	{
		xtype:'combobox',
		store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [[0, '==NULL=='],[1, '是'], [2, '否']]}),
		name:'isPublic',
		id:'navigate-NavigateList-isPublic',
		displayField : 'name',
		valueField : 'id',
		editable: false,
		allowBlank:false,
		emptyText: '--是否公用--'
	},
	{
		text: '搜索',
	    id: 'navigate-NavigateList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{	
		text: '重置',
		tooltip:'重置',
		//iconCls: 'search'	
		handler: function(won){
			won.up('toolbar').down('textfield[name=navName]').reset();
			won.up('toolbar').down('combobox[name=isPublic]').reset();
		}
		
	},'-'	
    ],
	columns:[
         {header:'选择',dataIndex:'id',width:50},
         {header:'单位',dataIndex:'plantCode',flex:2, renderer: function(val){
    	   	 if(getDeptByCode(val)){
    			 return getDeptByCode(val).deptShortName;
    		 }else{
    			 return '';
    		 }   
         }},
         {header:'机组',dataIndex:'jzCode',flex:2},
         {header:'导航图编码',dataIndex:'navCode',flex:2},
         {header:'导航图名',dataIndex:'navName',flex:4},
         {header:'导航图类型',dataIndex:'navTypeCfg',flex:2, renderer: function(val){
    	   	 if(getConfigValueByCode(val)){
    			 return getConfigValueByCode(val).itemValueName;
    		 }else{
    			 return '';
    		 }
         }},
         {header:'是否选择机组',dataIndex:'canChooseJz',flex:2},
         {header:'资源路径',dataIndex:'assetUrl',flex:4},
         {header:'版本',dataIndex:'assetVersion',flex:1}
    ],
	bbar:
	{
		xtype:'pagingtoolbar',
		store: 'navigate-NavigateList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'navigate-NavigateList-pageId'
	},	
	initComponent:function(){
		this.callParent(arguments);
	}	       
});