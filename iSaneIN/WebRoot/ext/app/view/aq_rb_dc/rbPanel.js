Ext.define('isane.view.aq_rb_dc.rbPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_rb_dc-rbPanel',
	title:'日报导出',
	closable:true,
	border: 0,
	tbar:[      
  	'所属单位:',
    	{
    		xtype:'combobox',
    		store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['GZFGS', '广州分公司']]}),
    		name:'organCode',
    		id: 'aq_rb_dc-rbPanel-organCode',
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
    		id: 'aq_rb_dc-rbPanel-storeY',
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
    		id: 'aq_rb_dc-rbPanel-storeM',
    		width: 70,
    		minValue: 1,
    		maxValue: 12,
    		value: Ext.Date.format(new Date(), 'm')
    	},	
    	{
    		xtype:'numberfield',
    		name: 'storeD',
    		id: 'aq_rb_dc-rbPanel-storeD',
    		width: 70,
    		minValue: 1,
    		maxValue: 31,
    		value: Ext.Date.format(new Date(), 'd'),
    		listeners: {
    			change: function(own){
    				var y = Ext.getCmp('aq_rb_dc-rbList-storeY').getValue(); 
    				var m = Ext.getCmp('aq_rb_dc-rbList-storeM').getValue(); 
    				var date = new Date(y, m, 0);
    				var dayCount = date.getDate();
    				own.maxValue = dayCount;
    			}
    		}		
    	},'-',    	
    	/*{
    		xtype:'numberfield',
    		name: 'storeD',
    		id: 'aq_rb_dc-rbPanel-storeD',
    		width: 70,
    		minValue: 1,
    		maxValue: 31,
    		value: 1,
    		hidden: true	
    	},'-',*/	
    	{
    		text: '搜索',
    		id: 'aq_rb_dc-rbPanel-searchButton',
    		tooltip:'搜索数据',
    		iconCls: 'search'		
    	},'-',	
    	{
    		text: '导出',
    		tooltip:'导出报表',
    		iconCls: 'list_export',
    		id: 'aq_rb_dc-rbPanel-exportButton'
    	},'-'
      ],	
  	items:[
     	{
  		//frame: true,
  		border: 0,
  		id: 'aq_rb_dc-rbPanel-html',
  		minHeight: 800,
  		//height: '100%',
  		autoHeight: true,
  		layout: 'fit',
  		bodyStyle: 'padding:0px 20px 20px 20px;overflow-y:auto;overflow-x:auto',
  		autoScroll: true
  		//html: '<iframe src="/upload/excelTohtml/GZFGS_Y_XZB_REPORT.html" width="100%" height="100%" frameborder="0"></iframe>'
      }	       
  	]
});