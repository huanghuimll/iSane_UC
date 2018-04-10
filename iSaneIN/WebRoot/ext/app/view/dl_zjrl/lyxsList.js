Ext.define('isane.view.dl_zjrl.lyxsList',{
	extend:'Ext.grid.Panel',
	alias:'widget.dl_zjrl-lyxsList',
	id: 'dl_zjrl-lyxsList-id',
	store: Ext.create('isane.store.lyxs.lyxs',{storeId: 'dl_zjrl-lyxsList-storeId'}),
	plugins: [
	    Ext.create('Ext.grid.plugin.CellEditing', {
	    	id: 'dl_zjrl_cellId',
	    	clicksToEdit: 2
	    })
	],
    selModel: { selType: 'cellmodel' },	
	border: 0,
	tbar:[      
	'区域名:',	      
	{
		xtype: 'textfield',
		name: 'contentCode',
		id: 'dl_zjrl-lyxsList-contentCode',
		emptyText: '请输入..'
	},'-',
	'年:',
	{
		xtype:'numberfield',
		name: 'storeY',
		id: 'dl_zjrl-lyxsList-storeY',
		width: 100,
		minValue: 2010,
		value: Ext.Date.format(new Date(), 'Y')
	},'-',
	{
		xtype:'text',
		text: '--'
	},
	{
		xtype:'numberfield',
		name: 'storeM',
		id: 'dl_zjrl-lyxsList-storeM',
		width: 70,
		minValue: 1,
		maxValue: 12,
		value: Ext.Date.format(new Date(), 'm')
	},'-',	
	{
		text: '搜索',
	    id: 'dl_zjrl-lyxsList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{
	 	text: '增加',
	 	id: 'dl_zjrl-lyxsList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add',
        disabled: true,
        handler : function(btn){
            var r = Ext.create('isane.model.lyxs', {
   	         id: 0,
   	         contentCode: Ext.getCmp('dl_zjrl-lyxsList-contentCode').getValue(), 
   	         lyxsValue: null, 
   	         dataTime: null,
   	         inputTime: new Date(),
            });
            var grid = btn.up('grid');
            var store = grid.getStore();
            store.insert(0, r);
        }        
	},'-',	
	{
		text: '保存',
		tooltip: "<span style='color:red'>多条数据保存！</span>",
		iconCls: 'ok1',
		id: 'dl_zjrl-lyxsList-saveButton'
	},'-',
    ],
	columns:[
         {header:'选择',dataIndex:'id', width:50},
         {header:'区域',dataIndex:'contentCode', flex:2},
         {header:'值',dataIndex:'lyxsValue', editor: 'textfield', flex:2},         
         {header:'时间',dataIndex:'dataTime', flex:2,
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == '1970-01-01 08:00:00'){
        			 val = '';
        		 }
        		 return Ext.util.Format.date(val, 'Y-m');
        	 },        	 
	         editor:{
	                 xtype: 'datefield',
	                 format: 'Y-m',
	                 minValue: '2016-01-01'
	          }
         },         
         {header:'录入时间',dataIndex:'inputTime', editor: 'textfield', flex:2,
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == '1970-01-01 08:00:00'){
        			 val = '';
        		 }
        		 return Ext.util.Format.date(val, 'Y-m-d H:i:s');
        	 }        	 
    	 },         
         {
        	 text:'操作', 
        	 xtype: 'actioncolumn', 
        	 align: 'center',
        	 flex: 2,
        	 items:[
    		 {
    			iconCls: 'list_save',
                tooltip: "<span style='color:red'>单条数据保存！</span>",
                handler: function(grid, rowIndex, colIndex) {
                	//alert('未开发..');
                	var store = grid.getStore();
                    var rec = store.getAt(rowIndex);
                    if(rec.isModified('lyxsValue') || rec.isModified('dataTime')){
                    	var arr = [];
                    	arr[0] = rec;
                    	this.fireEvent('saveSingle', arr, store, grid);
                    }
                }            
            },'',	
	        {
	        	iconCls: 'delete',
	        	tooltip: "<span style='color:red'>删除单条记录！</span>",
	        	handler: function(grid, rowIndex, colIndex) {
	        		//alert('未开发..');
	        		var store = grid.getStore();
		            var rec = store.getAt(rowIndex);
		           if(rec.data.id == null){
		            	store.remove(rec);
		            }else{
		            	this.fireEvent('singleDelete', rec, grid);
		            }
	        	}            
	        }    	        
            ] 
    	 }          
    ],
    bbar:{
		xtype:'pagingtoolbar',
		store: 'dl_zjrl-lyxsList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'dl_zjrl-lyxsList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});