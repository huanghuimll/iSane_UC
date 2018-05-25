Ext.define('isane.view.aq_jxgl.jxglList',{
	extend:'Ext.grid.Panel',
	alias:'widget.aq_jxgl-jxglList',
	id: 'aq_jxgl-jxglList-id',
	store: Ext.create('isane.store.aq_jxgl.jxgl',{storeId: 'aq_jxgl-jxglList-storeId'}),
	border: 0,
	tbar:[      
	{
		xtype: 'textfield',
		name: 'plantCode',
		id: 'aq_jxgl-jxglList-plantCode',
		width: 100,
		emptyText: '所属单位..',
		value: 'GZFGS',
		readOnly: true,
		hidden: true,
		fieldStyle: 'color:gray'
	},'类型:',		
	{
        xtype: 'combobox',
        name: 'ownTypeCfg',
        id: 'aq_jxgl-jxglList-ownTypeCfg',
        store: Ext.create('isane.store.system.systemitemvalue'),
        displayField: 'valueName',
        valueField: 'valueCode',
		width: 100,
		editable: false,
		//readOnly: true,
		//hidden: false,
		//fieldStyle: 'color:gray',
		listeners:{
			beforerender: function(item){
				var store = item.getStore();
				var obt =  {'itemCode': 'AQSC_JXGL_JXLX'};
				Ext.apply(store.proxy.extraParams, obt);
				store.load();	
			}
		}        
	},'-',		
	{
		xtype: 'textfield',
		name: 'jzCode',
		id: 'aq_jxgl-jxglList-jzCode',
		width: 100,
		readOnly: true,
		fieldStyle: 'color:gray'
	},'-',	
	'日期:',
	{
        xtype: 'datefield',
        name: 'startTime',
        id: 'aq_jxgl-jxglList-startTime',
        format: 'Y-m-d',
        value: new Date(),
        minValue: '2016-01-01'		
	},
	{
		xtype:'text',
		text: '--'
	},
	{
        xtype: 'datefield',
        name: 'endTime',
        id: 'aq_jxgl-jxglList-endTime',
        format: 'Y-m-d',
        minValue: '2016-01-01'		
	},	
	'-',		
	{
		text: '搜索',
	    id: 'aq_jxgl-jxglList-searchButton',
	    tooltip:'搜索数据',
	    disabled: true,
        iconCls: 'search'		
	},'-',
	{
		text: '上传',
		tooltip:'导入数据',
		iconCls: 'list_import',
		disabled: true,
		id: 'aq_jxgl-jxglList-importButton'
	},'-'	
    ],
	columns:[
         {header:'选择',dataIndex:'id', width:40},
         {header:'所属单位',dataIndex:'plantCode', width:70},
         {header:'类型',dataIndex:'ownTypeCfg', flex:2,
             renderer: function(val, metaData, record, rowIndex, colIndex, store, view){
            	 return getItemValueNameByCode(val) == null ? '': getItemValueNameByCode(val).valueName;
             }       	 
         },
         {header:'机组',dataIndex:'ownCode', width:50},
         {header:'名称',dataIndex:'attachmentName', flex:4},
         {header:'虚拟路径',dataIndex:'attachmentUrl', flex:4},
         {header:'全路径',dataIndex:'serverPath', flex:4},
         {header:'文档类型',dataIndex:'attachmentTypeCfg', flex:2},      
         {header:'录入时间',dataIndex:'inputTime', xtype: 'datecolumn', flex:2,
        	 renderer: function(val, metadata){
        		 //metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == null){
        			 val = new Date();
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
		store: 'aq_jxgl-jxglList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'aq_jxgl-jxglList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});