Ext.define('isane.view.aq_yb_dc_xzb.xzbList',{
	extend:'Ext.grid.Panel',
	alias:'widget.aq_yb_dc_xzb-xzbList',
	id: 'aq_yb_dc_xzb-xzbList-id',
	//store: Ext.create('isane.store.original.original',{storeId: 'aq_yb_dc_xzb-xzbList-storeId'}),
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
		xtype:'combobox',
		store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['GZFGS', '广州分公司']]}),
		name:'organCode',
		id: 'aq_yb_dc_xzb-xzbList-organCode',
		displayField : 'name',
		valueField : 'id',
		editable: false,
		allowBlank: true,
		value: 'GZFGS',
		emptyText: '--请选择--'		
	},'-',		
	'日期:',
	{
		xtype:'numberfield',
		name: 'storeY',
		id: 'aq_yb_dc_xzb-xzbList-storeY',
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
		id: 'aq_yb_dc_xzb-xzbList-storeM',
		width: 70,
		minValue: 1,
		maxValue: 12,
		value: Ext.Date.format(new Date(), 'm')
	},			
	{
		xtype:'numberfield',
		name: 'storeD',
		id: 'aq_yb_dc_xzb-xzbList-storeD',
		width: 70,
		minValue: 1,
		maxValue: 31,
		value: 1,
		hidden: true
		//value: Ext.Date.format(new Date(), 'd'),
		/*listeners: {
			change: function(own){
				var y = Ext.getCmp('aq_yb_dc_xzb-xzbList-storeY').getValue(); 
				var m = Ext.getCmp('aq_yb_dc_xzb-xzbList-storeM').getValue(); 
				var date = new Date(y, m, 0);
				var dayCount = date.getDate();
				own.maxValue = dayCount;
			}
		}*/		
	},'-',	
	{
		text: '导出',
		tooltip:'导出报表',
		iconCls: 'list_export',
		id: 'aq_yb_dc_xzb-xzbList-exportButton'
	},'-'//,		
	/*{
		text: '搜索',
	    id: 'aq_yb_dc_xzb-xzbList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{
		text: '保存',
		tooltip: "<span style='color:red'>多条数据保存！</span>",
		iconCls: 'ok1',
		id: 'aq_yb_dc_xzb-xzbList-saveButton'
	},'-',
	{
		text: '刷新',
		tooltip:'刷新数据',
		iconCls: 'refresh',
		handler: function(btn){
			btn.up('grid').getStore().reload();
		}		
	}	*/
    ],
	columns:[
         {header:'选择',dataIndex:'id',width:50},
         {header:'所属单位',dataIndex:'plantName',flex:2},
         {header:'指标编码',dataIndex:'originalCode',flex:4},
         {header:'指标项',dataIndex:'originalName',flex:4},
         {header:'指标值',dataIndex:'originalValue',flex:4, editor: 'textfield', 
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 return Ext.util.Format.number(val, '0.000');
        	 }
         },
         {header:'日期',dataIndex:'storeDate',xtype: 'datecolumn', format:'Y-m-d', flex:4},
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
	initComponent:function(){
		this.callParent(arguments);
	}	       
});