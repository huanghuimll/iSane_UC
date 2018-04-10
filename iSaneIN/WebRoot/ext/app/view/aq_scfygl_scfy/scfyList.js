Ext.define('isane.view.aq_scfygl_scfy.scfyList',{
	extend:'Ext.grid.Panel',
	alias:'widget.aq_scfygl_scfy-scfyList',
	id: 'aq_scfygl_scfy-scfyList-id',
	store: Ext.create('isane.store.scfy.scfy',{storeId: 'aq_scfygl_scfy-scfyList-storeId'}),
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
		name: 'plantCode',
		id: 'aq_scfygl_scfy-scfyList-plantCode',
		emptyText: '所属单位..',
		value: 'GZFGS',
		readOnly: true,
		fieldStyle: 'color:gray'
	},'-',
	'类型',
	{
		xtype:'combobox',
		store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['', '==NULL=='],['AQSC_SCFYGL_SCFY_BHGW', '不含港务'], ['AQSC_SCFYGL_SCFY_HGW', '含港务']]}),
		name:'scfyType',
		id: 'dl_zjrl-zjrlList-scfyType',
		displayField : 'name',
		valueField : 'id',
		editable: false,
		allowBlank: true,
		value: '',
		emptyText: '--请选择--'		
	},'-',	
	'日期:',
	{
        xtype: 'datefield',
        name: 'startTime',
        id: 'aq_scfygl_scfy-scfyList-startTime',
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
        id: 'aq_scfygl_scfy-scfyList-endTime',
        format: 'Y-m-d',
        minValue: '2016-01-01'		
	},	
	'-',		
	{
		text: '搜索',
	    id: 'aq_scfygl_scfy-scfyList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{
	 	text: '增加',
	 	id: 'aq_scfygl_scfy-scfyList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add',
        handler : function(btn){
            var r = Ext.create('isane.model.scfy', {
   	         id: 0,
   	         plantCode: QJ_PlantCode, 
   	         scfyCode: '', 
   	         scfyValue: 0.0, 
	         dataTime: new Date(),
	         inputTime: new Date(),
	         scfyType: '',
	         scfyDesc: ''
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
		id: 'aq_scfygl_scfy-scfyList-saveButton'
	},'-',
    ],
	columns:[
         {header:'选择',dataIndex:'id', width:50},
         {header:'所属单位',dataIndex:'plantCode', flex:2},
         {header:'类型',dataIndex:'scfyType', flex:4, editor: {
             xtype: 'combobox',
             name: 'valueCode',
             displayField: 'valueName',
             valueField: 'valueCode',
             store: Ext.create('isane.store.system.systemitemvalue'),
             listeners: {
            	 expand: function(own, eOpts){
         			var grid = own.up('grid');
            		 var obt = {'itemCode': 'AQSC_SCFYGL_SCFY'};
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
         {header:'指标',dataIndex:'scfyCode', flex:4, editor: {
        	 xtype: 'combobox',
        	 name: 'valueCode',
        	 displayField: 'valueName',
        	 valueField: 'valueCode',
        	 store: Ext.create('isane.store.system.systemitemvalue'),
        	 listeners: {
        		 expand: function(own, eOpts){
        			 var grid = own.up('grid');
        			 var obt = {'itemCode': 'AQSC_SCFYGL_ZBGL'};
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
         {header:'数值',dataIndex:'scfyValue', flex:4, editor: 'textfield', 
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 return Ext.util.Format.number(val, '0.000');
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
                    if(rec.isModified('dataTime') || rec.isModified('scfyCode') || rec.isModified('scfyValue') 
                    		|| rec.isModified('scfyType')){
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
		store: 'aq_scfygl_scfy-scfyList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'aq_scfygl_scfy-scfyList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});