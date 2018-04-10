Ext.define('isane.view.dl_fdl.fdlListC',{
	extend:'Ext.grid.Panel',
	alias:'widget.dl_fdl-fdlListC',
	id: 'dl_fdl-fdlListC-id',
	store: Ext.create('isane.store.original.original',{storeId: 'dl_fdl-fdlListC-storeId'}),
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
		emptyText: '所属单位..',
		value: 'GZFGS',
		readOnly: true,
		fieldStyle: 'color:gray'
	},'-',
	'日期:',
	{
		xtype:'numberfield',
		name: 'storeY',
		id: 'dl_fdl-fdlListC-storeY',
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
		id: 'dl_fdl-fdlListC-storeM',
		width: 70,
		minValue: 1,
		maxValue: 12,
		value: Ext.Date.format(new Date(), 'm')
	},'-',	
	'年/月:',
	{
		xtype: 'combobox',
		store: new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['', '=空='],['M', '  -月-'], ['Y', '  -年-']]}),
		name:'dateType',
		id: 'dl_fdl-fdlListC-dateType',
		displayField: 'name',
		valueField: 'id',
		value: 'M',
		width: 70,
		//readOnly: true,
		editable: false,
		emptyText: '--请选择--'
	},'-',		
//	'时间:',
//	{
//		xtype: 'datefield',
//		name: 'storeDate',
//		format: 'Y-m-d',
//		id: 'dl_fdl-fdlListC-storeDate',
//		value: new Date(),
//        minValue: '2016/01/01',
//        //disabledDays: [0, 6],		
//		emptyText: '输入时间..'	
//	},	
	{
		text: '搜索',
	    id: 'dl_fdl-fdlListC-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{
		text: '保存',
		tooltip:'保存修改的数据',
		iconCls: 'ok1',
		id: 'dl_fdl-fdlListC-saveButton'
	},'-',
	{
		text: '导入',
		tooltip:'导入数据',
		iconCls: 'list_import',
		id: 'dl_fdl-fdlListC-importButton'
	},'-',	
	{
		text: '刷新',
		tooltip:'刷新数据',
		iconCls: 'refresh',
		handler: function(btn){
			btn.up('grid').getStore().reload();
		}		
	}	
    ],
	columns:[
         {header:'选择',dataIndex:'id',width:50},
         {header:'所属单位',dataIndex:'plantName',flex:2},
         {header:'指标编码',dataIndex:'originalCode',flex:4},
         {header:'指标项',dataIndex:'originalName',flex:4},
         {header:'指标值',dataIndex:'originalValue',flex:4, editor: 'textfield', 
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 return Ext.util.Format.number(val, '0.00');
        	 }
         },
         {header:'日期',dataIndex:'storeDate',xtype: 'datecolumn', format:'Y-m', flex:4},
         {header:'录入时间',dataIndex:'inputDate', xtype: 'datecolumn', flex:4, 
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
         {header:'指标描述',dataIndex:'originalDesc',flex:4},
         {header:'值类型',dataIndex:'dateType',flex:2},
         {header:'单位',dataIndex:'valueUnit',flex:2},
         {header:'值版本',dataIndex:'originalDataVersion',flex:1},
         {
        	 text:'操作', 
        	 xtype: 'actioncolumn', 
        	 align: 'center',
        	 flex: 2,
        	 items:[
    		 {
    			 /*
                getClass: function(v, meta, rec) {     
                	var workNumber = Ext.get('workNumber').getValue();
                    if (rec.get('registStatus') == 0 && rec.get('registPerson') == workNumber) {
                        return 'up';
                    }else{
                    	return 'x-hide-visibility';
                    }
                },*/
    			iconCls: 'list_save',
                tooltip: "<span style='color:red'>单条数据保存！</span>",
                handler: function(grid, rowIndex, colIndex) {
                	//alert('未开发..');
                	var store = grid.getStore();
                    var rec = store.getAt(rowIndex);
                    //console.log(rec);
                    if(rec.isModified('originalValue') || rec.isModified('inputDate') ){
                    	var arr = [];
                    	arr[0] = rec;
                    	this.fireEvent('saveSingle', arr, store, grid);
                    }
                }            
            }    	        
            ] 
    	 }          
    ],
/*	bbar:
	{
		xtype:'pagingtoolbar',
		store: 'dl_fdl-fdlListC-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'dl_fdl-fdlListC-pageId'
	},*/	
	initComponent:function(){
		this.callParent(arguments);
	}	       
});