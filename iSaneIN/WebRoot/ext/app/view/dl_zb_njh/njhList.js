Ext.define('isane.view.dl_zb_njh.njhList',{
	extend:'Ext.grid.Panel',
	alias:'widget.dl_zb_njh-njhList',
	id: 'dl_zb_njh-njhList-id',
	store: Ext.create('isane.store.original.original',{storeId: 'dl_zb_njh-njhList-storeId'}),
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
		id: 'dl_zb_njh-njhList-organCode',
		readOnly: true,
		width: 100,
		fieldStyle: 'color:gray'
	},'-',		
	'日期:',
	{
		xtype:'numberfield',
		name: 'storeY',
		id: 'dl_zb_njh-njhList-storeY',
		width: 70,
		minValue: 2016,
		value: Ext.Date.format(new Date(), 'Y')
	},
	{
		xtype:'text',
		text: '--',
		hidden: true
	},
	{
		xtype:'numberfield',
		name: 'storeM',
		id: 'dl_zb_njh-njhList-storeM',
		width: 70,
		minValue: 1,
		maxValue: 12,
		hidden: true,
		//value: Ext.Date.format(new Date(), 'm')
		value: '1'
	},'-',			
	{
		xtype:'numberfield',
		name: 'storeD',
		id: 'dl_zb_njh-njhList-storeD',
		width: 70,
		minValue: 1,
		maxValue: 31,
		hidden: true,
		value: '1'/*,
		listeners: {
			change: function(own){
				var y = Ext.getCmp('dl_zb_njh-njhList-storeY').getValue(); 
				var m = Ext.getCmp('dl_zb_njh-njhList-storeM').getValue(); 
				var date = new Date(y, m, 0);
				var dayCount = date.getDate();
				own.maxValue = dayCount;
			}
		}*/	
	},			
	{
		text: '搜索',
	    id: 'dl_zb_njh-njhList-searchButton',
	    tooltip:'搜索数据',
	    disabled: true,
        iconCls: 'search'		
	},'-',
	{
		text: '保存',
		tooltip: "<span style='color:red'>多条数据保存！</span>",
		iconCls: 'ok1',
		disabled: true,
		id: 'dl_zb_njh-njhList-saveButton'
	},'-',	
	{
		text: '刷新',
		tooltip:'刷新数据',
		iconCls: 'refresh',
		disabled: true,
		id: 'dl_zb_njh-njhList-refresh',
		handler: function(btn){
			btn.up('grid').getStore().reload();
		}		
	}	
    ],
	columns:[
         {header:'选择',dataIndex:'id',width:50},
         {header:'所属单位',dataIndex:'plantName',flex:2},
         {header:'指标编码',dataIndex:'originalCode',flex:3},
         {header:'指标项',dataIndex:'originalName',flex:5},
         {header:'指标值',dataIndex:'originalValue',flex:3,
        	 editor: {
        		 xtype: 'textfield',
             	 allowBlank:false,
             	 regex: /^(-$|-\d*|-\d*\.|-\d*\.\d*|0|\d*|\d*\.|\d*\.\d*)$/,
             	 regexText:'请输入数字!'       		 
        	 },         	 
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 return Ext.util.Format.number(val, '0.000');
        	 }
         },
         {header:'日期',dataIndex:'storeDate',xtype: 'datecolumn', format:'Y', flex:3},
         {header:'录入时间',dataIndex:'inputDate', xtype: 'datecolumn', flex:3, 
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