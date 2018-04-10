Ext.define('isane.view.aq_kkxgl.kkxglList',{
	extend:'Ext.grid.Panel',
	alias:'widget.aq_kkxgl-kkxglList',
	id: 'aq_kkxgl-kkxglList-id',
	store: Ext.create('isane.store.aq_kkxgl.yxzt',{storeId: 'aq_kkxgl-kkxglList-storeId'}),
	plugins: [
	    Ext.create('Ext.grid.plugin.CellEditing', {
	    	clicksToEdit: 2
	    })
	],
    selModel: { selType: 'cellmodel' },	
	border: 0,
	tbar:[
  	'所属单位:',
	{
		xtype: 'textfield',
		name: 'organCode',
		id: 'aq_kkxgl-kkxglList-organCode',
		width: 100,
		readOnly: true,
		fieldStyle: 'color:gray'
	},'-',	      
	'机组:',
	{
		xtype: 'combobox',
		name: 'jzKey',
		displayField: 'jzName',
		valueField: 'jzKey',
		store: Ext.create('isane.store.dimjz.dimjz'),
		emptyText: '--请选择--',
		id: 'aq_kkxgl-kkxglList-jzKey',
		readOnly: true,
		width: 100,
		fieldStyle: 'color:gray',
		listeners:{
			beforerender: function(item){
				var store = item.getStore();
				store.load();	
			}
		}
	},'-',
	'年:',
	{
		xtype:'numberfield',
		name: 'storeY',
		id: 'aq_kkxgl-kkxglList-storeY',
		width: 100,
		minValue: 2010,
		value: Ext.Date.format(new Date(), 'Y')
	},'-',
	/*{
		xtype:'text',
		text: '--'
	},
	{
		xtype:'numberfield',
		name: 'storeM',
		id: 'aq_kkxgl-kkxglList-storeM',
		width: 70,
		minValue: 1,
		maxValue: 12,
		value: Ext.Date.format(new Date(), 'm')
	},'-',*/		
	{
		text: '搜索',
	    id: 'aq_kkxgl-kkxglList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{
	 	text: '增加',
	 	id: 'aq_kkxgl-kkxglList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add',
        handler : function(btn){
            var r = Ext.create('isane.model.yxzt', {
   	         id: 0,
   	         //organCode: QJ_PlantCode, 
   	         organCode: Ext.getCmp('aq_kkxgl-kkxglList-organCode').getValue(), 
   	         jzKey: Ext.getCmp('aq_kkxgl-kkxglList-jzKey').getValue(), 
	         dataValue: 0.0,
	         startTime: '',
	         endTime: '',
	         yxType: null,
	         gzType: null,
	         dayCount: null,
	         inputTime: new Date()
            });
            var grid = btn.up('grid');
            var store = grid.getStore();
            store.insert(0, r);
            //var cell = Ext.getCmp('aq_kkxgl_cellId');
            //console.log(cell);
            //cell.startEditByPosition({row: 0, column: 1});
        }        
	},'-'//,	
	/*{
		text: '保存',
		tooltip: "<span style='color:red'>多条数据保存！</span>",
		iconCls: 'ok1',
		id: 'aq_kkxgl-kkxglList-saveButton'
	},'-',*/
    ],
	columns:[
         {header:'选择',dataIndex:'id', width:50},
         {header:'所属单位',dataIndex:'organCode', flex:2},
         {header:'机组',dataIndex:'jzKey', flex:2,
	         renderer: function(val, metaData, record, rowIndex, colIndex, store, view){
	        	 metaData.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
	        	 return getJzNameByCode(val) == null ? '': getJzNameByCode(val).jzName;
	         }    	 
         },
         {header:'设备状态',dataIndex:'yxType', flex:2, 
        	 editor: {
	             xtype: 'combobox',
	             name: 'valueCode',
	             displayField: 'valueName',
	             valueField: 'valueCode',
	             store: Ext.create('isane.store.system.systemitemvalue'),
	             listeners: {
	            	 change: function(own, newValue, oldValue, eOpts){
	            		 if(newValue == 'AQSC_KKX_JZYXZT_FT'){
	            			var grid = own.up('grid');
	            			//console.log(grid);
	            			var rowRecord = grid.getView().getSelectionModel().getSelection()[0];
	            			//console.log(rowRecord);
	            			//var nod = grid.getView().getSelectedNodes()[0];
	            			//console.log(nod);
	            			//console.log(nod.cells[4]);
	            			//nod.cells[4].style.backgroundColor='red';
	            			var mod =  grid.getView().getSelectionModel();
	            			//console.log(mod);
	            			rowRecord.set('gzType', null);
	            		 }
	            	 },	            	 
	            	 expand: function(own, eOpts){
	            		 var obt = {'itemCode': 'AQSC_KKX_JZYXZT'};
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
         {header:'故障类型',dataIndex:'gzType', flex:2, 
        	 editor: {
        		 xtype: 'combobox',
        		 name: 'valueCode',
        		 displayField: 'valueName',
        		 valueField: 'valueCode',
        		 store: Ext.create('isane.store.system.systemitemvalue'),
        		 listeners: {
        			 expand: function(own, eOpts){
              			var grid = own.up('grid');
            			//console.log(grid);
            			var rowRecord = grid.getView().getSelectionModel().getSelection()[0];      
            			//console.log(rowRecord);
            			var yxType = rowRecord.data.yxType;
            			//console.log(yxType);
            			var store = own.getStore();
            			if(yxType == 'AQSC_KKX_JZYXZT_FT'){
            				 var obt = {'itemCode': 'AQSC_KKX_JZYXGZ'};
	           				 Ext.apply(store.proxy.extraParams, obt);
	           				 store.load();
            			}else{
            				 var obt = {'itemCode': '000000000'};
	           				 Ext.apply(store.proxy.extraParams, obt);
	           				 store.load();
            			}
        			 }
        		 }
        	 },
        	 renderer: function(val, metaData, record, rowIndex, colIndex, store, view){
        		 metaData.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 return getItemValueNameByCode(val) == null ? '': getItemValueNameByCode(val).valueName;
        	 }
         },         
         {header:'发生时间',dataIndex:'startTime', flex:4,
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == '1970-01-01 08:00:00'){
        			 val = '';
        		 }
        		 return Ext.util.Format.date(val, 'Y-m-d H:i:s');
        	 },        	 
	         editor:{
	                 xtype: 'datefield',
	                 format: 'Y-m-d H:i:s',
	                 minValue: '2016-01-01'
	          }
         },        
         {header:'结束时间',dataIndex:'endTime', xtype: 'datecolumn', flex:4, 
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == '1970-01-01 08:00:00'){
        			 val = '';
        		 }
        		 return Ext.util.Format.date(val, 'Y-m-d H:i:s');
        	 },        	 
        	 editor:{
        		 xtype: 'datefield',
        		 format: 'Y-m-d H:i:s',
        		 minValue: '2016-01-01'
        	 }
         },        
         {header:'持续天数',dataIndex:'dayCount', flex:4, editor: 'textfield', 
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 return Ext.util.Format.number(val, '0.00');
        	 }
         },        
         {
        	 text:'操作', 
        	 xtype: 'actioncolumn', 
        	 align: 'center',
        	 flex: 4,
        	 items:[
    		 {
    			iconCls: 'list_save',
                tooltip: "<span style='color:red'>单条数据保存！</span>",
                handler: function(grid, rowIndex, colIndex) {
                	//alert('未开发..');
                	var store = grid.getStore();
                    var rec = store.getAt(rowIndex);
                    //console.log(rec);
                    if(rec.isModified('yxType') || rec.isModified('gzType') 
                    		|| rec.isModified('startTime') || rec.isModified('endTime')){
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
		store: 'aq_kkxgl-kkxglList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'aq_kkxgl-kkxglList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});