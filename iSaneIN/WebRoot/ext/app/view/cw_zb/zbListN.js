Ext.define('isane.view.cw_zb.zbListN',{
	extend:'Ext.grid.Panel',
	alias:'widget.cw_zb-zbListN',
	id: 'cw_zb-zbListN-id',
	store: Ext.create('isane.store.original.original',{storeId: 'cw_zb-zbListN-storeId'}),
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
		id: 'cw_zb-zbListN-organCode',
		emptyText: '所属单位..',
		readOnly: true,
		fieldStyle: 'color:gray'
	},'-',
	'日期:',
	{
		xtype:'numberfield',
		name: 'storeY',
		id: 'cw_zb-zbListN-storeY',
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
		id: 'cw_zb-zbListN-storeM',
		width: 70,
		minValue: 1,
		maxValue: 12,
		value: Ext.Date.format(new Date(), 'm')
	},'-',	
	{
		xtype:'numberfield',
		name: 'storeD',
		id: 'cw_zb-zbListN-storeD',
		width: 70,
		minValue: 1,
		maxValue: 31,
		hidden: true,
		value: '1'
	},'-',		
	'年/月:',
	{
		xtype: 'combobox',
		store: new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['', '=空='],['M', '  -月-'], ['Y', '  -年-']]}),
		name:'dateType',
		id: 'cw_zb-zbListN-dateType',
		displayField: 'name',
		valueField: 'id',
		value: 'M',
		width: 70,
		//readOnly: true,
		editable: false,
		emptyText: '--请选择--'
	},			
	{
		text: '搜索',
	    id: 'cw_zb-zbListN-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{
		text: '保存',
		tooltip: "<span style='color:red'>多条数据保存！</span>",
		iconCls: 'ok1',
		disabled: true,
		id: 'cw_zb-zbListN-saveButton'
	},'-',
	{
		text: '刷新',
		tooltip:'刷新数据',
		disabled: true,
		id: 'cw_zb-zbListN-refresh',
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
		store: 'cw_zb-zbListN-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'cw_zb-zbListN-pageId'
	},*/	
	initComponent:function(){
		this.callParent(arguments);
	}	       
});