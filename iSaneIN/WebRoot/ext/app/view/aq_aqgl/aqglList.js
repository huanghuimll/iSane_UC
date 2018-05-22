Ext.define('isane.view.aq_aqgl.aqglList',{
	extend:'Ext.grid.Panel',
	alias:'widget.aq_aqgl-aqglList',
	id: 'aq_aqgl-aqglList-id',
	store: Ext.create('isane.store.aq_aqgl.aqgl',{storeId: 'aq_aqgl-aqglList-storeId'}),
	plugins: [
	    Ext.create('Ext.grid.plugin.CellEditing', {
	    	id: 'aq_aqgl_cellId',
	    	clicksToEdit: 2
	    })
	],
    selModel: { selType: 'cellmodel' },	
	border: 0,
	tbar:[      
	'所属单位:',	      
	{
		xtype: 'textfield',
		name: 'plantCode',
		emptyText: '所属单位..',
		value: 'GZFGS',
		readOnly: true,
		fieldStyle: 'color:gray'
	},'-',
	'日期:',
	{
		xtype:'numberfield',
		name: 'storeY',
		id: 'aq_aqgl-aqglList-storeY',
		width: 70,
		minValue: 2016,
		value: Ext.Date.format(new Date(), 'Y')
	},
	{
		xtype:'text',
		text: '--'
	},
	{
		xtype:'numberfield',
		name: 'storeM',
		id: 'aq_aqgl-aqglList-storeM',
		width: 70,
		minValue: 1,
		maxValue: 12,
		value: Ext.Date.format(new Date(), 'm')
	},'-',		
	{
		text: '搜索',
	    id: 'aq_aqgl-aqglList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{
	 	text: '增加',
	 	id: 'aq_aqgl-aqglList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add',
        handler : function(btn){
            var r = Ext.create('isane.model.aqgl', {
   	         id: 0,
	         plantCode: QJ_PlantCode, 
	         dataType: null, 
	         dataTypeValue: null, 
	         dataValue: 0.0,
	         dataTime: new Date(),
	         disOrder: 0
            });
            var grid = btn.up('grid');
            var store = grid.getStore();
            store.insert(0, r);
            //var cell = Ext.getCmp('aq_aqgl_cellId');
            //console.log(cell);
            //cell.startEditByPosition({row: 0, column: 1});
        }        
	},'-',	
	{
		text: '保存',
		tooltip: "<span style='color:red'>多条数据保存！</span>",
		iconCls: 'ok1',
		id: 'aq_aqgl-aqglList-saveButton'
	},'-',
    ],
	columns:[
         {header:'选择',dataIndex:'id', width:50},
         {header:'所属单位',dataIndex:'plantCode', flex:2},
         {header:'数据类型',dataIndex:'dataType', flex:4, editor: {
             xtype: 'combobox',
             name: 'itemCode',
             displayField: 'itemName',
             valueField: 'itemCode',
             //store: 'system.systemitem',
             store: Ext.create('isane.store.system.systemitem'),             
             listeners: {
            	 /*change: function(own, newValue, oldValue, eOpts){
            		 if(newValue != oldValue){
            			var grid = own.up('grid');
            			//console.log(grid);
            			var rowRecord = grid.getView().getSelectionModel().getSelection()[0];
            			//console.log(rowRecord);
            			rowRecord.set('dataTypeValue', null);
            		 }
            	 },*/
            	 beforerender: function(own, eOpts){
            		 var store = own.getStore();
            		 var obt = {'itemType': 'aqgl'};
            		 Ext.apply(store.proxy.extraParams, obt);
            		 store.load();            		 
            	 }
             }
         },
         renderer: function(val, metaData, record, rowIndex, colIndex, store, view){
        	metaData.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        	 return getItemNameByCode(val) == null ? '': getItemNameByCode(val).itemName;
         }
         },
         {header:'类型详细',dataIndex:'dataTypeValue', flex:4, editor: {
             xtype: 'combobox',
             name: 'valueCode',
             displayField: 'valueName',
             valueField: 'valueCode',
             //store: 'system.systemitemvalue',
             store: Ext.create('isane.store.system.systemitemvalue'),
             listeners: {
            	 expand: function(own, eOpts){
         			var grid = own.up('grid');
        			//console.log(grid);
        			var rowRecord = grid.getView().getSelectionModel().getSelection()[0];      
        			//console.log(rowRecord);
        			var dataType = rowRecord.data.dataType;
        			//console.log(dataType);
    				var obt = {'itemCode': dataType};
    				var store = own.getStore();
    				Ext.apply(store.proxy.extraParams, obt);
    				store.load();
            	 }
             }
         },
         renderer: function(val, metaData, record, rowIndex, colIndex, store, view){
        	 metaData.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        	 return getItemValueNameByCode(val) == null ? '': getItemValueNameByCode(val).valueName;
         }
         },
         {header:'数据值',dataIndex:'dataValue', flex:4,
        	 editor: {
        		 xtype: 'textfield',
             	 allowBlank:false,
             	 regex:/^(-$|-\d*|-\d*\.|-\d*\.\d*|0|\d*|\d*\.|\d*\.\d*)$/,
             	 regexText:'请输入数字!',        		 
        	 },         	 
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 return Ext.util.Format.number(val, '0');
        	 }
         },
         {header:'时间',dataIndex:'dataTime', xtype: 'datecolumn', flex:4, 
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == null){
        			 val = new Date();
        		 }
        		 return Ext.util.Format.date(val, 'Y-m-d');
        	 },        	 
	         editor:{
	                 xtype: 'datefield',
	                 format: 'Y-m-d',
	                 minValue: '2016-01-01'
	          }
         },
         {header:'录入时间',dataIndex:'inputTime', xtype: 'datecolumn', flex:4,
        	 renderer: function(val, metadata){
        		 //metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == null){
        			 val = new Date();
        		 }
        		 return Ext.util.Format.date(val, 'Y-m-d H:i:s');
        	 }
         },         
         {header:'排序',dataIndex:'disOrder',flex:4, editor: {
             xtype: 'textfield',
         },
         renderer: function(val, metaData){
        	 metaData.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
    		 return Ext.util.Format.number(val, '0');
    	 },  
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
                    //console.log(rec);
                    if(rec.isModified('dataTime') || rec.isModified('dataType') || rec.isModified('dataTypeValue') 
                    		|| rec.isModified('dataValue') || rec.isModified('disOrder') ){
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
		            	this.fireEvent('singleDelete', rec);
		            }
	        	}            
	        }    	        
            ] 
    	 }          
    ],
    bbar:{
		xtype:'pagingtoolbar',
		store: 'aq_aqgl-aqglList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'aq_aqgl-aqglList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});