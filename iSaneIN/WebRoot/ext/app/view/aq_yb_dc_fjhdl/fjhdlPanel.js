Ext.define('isane.view.aq_yb_dc_fjhdl.fjhdlPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_yb_dc_fjhdl-fjhdlPanel',
	title:'辅机耗电率统计',
	closable:true,
	border: 0,
	tbar:[      
  	'所属单位:',
    	{
    		xtype:'combobox',
    		store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['GZFGS', '广东分公司']]}),
    		name:'organCode',
    		id: 'aq_yb_dc_fjhdl-fjhdlPanel-organCode',
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
    		id: 'aq_yb_dc_fjhdl-fjhdlPanel-storeY',
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
    		id: 'aq_yb_dc_fjhdl-fjhdlPanel-storeM',
    		width: 70,
    		minValue: 1,
    		maxValue: 12,
    		value: Ext.Date.format(new Date(), 'm')
    	},			
    	{
    		xtype:'numberfield',
    		name: 'storeD',
    		id: 'aq_yb_dc_fjhdl-fjhdlPanel-storeD',
    		width: 70,
    		minValue: 1,
    		maxValue: 31,
    		value: 1,
    		hidden: true	
    	},'-',	
    	{
    		text: '搜索',
    		id: 'aq_yb_dc_fjhdl-fjhdlPanel-searchButton',
    		tooltip:'搜索数据',
    		iconCls: 'search'		
    	},'-',	
    	{
    		text: '导出',
    		tooltip:'导出报表',
    		iconCls: 'list_export',
    		id: 'aq_yb_dc_fjhdl-fjhdlPanel-exportButton'
    	},'-'
      ],	
    layout: 'fit',
  	items:[
     	{
  		//frame: true,
  		border: 0,
  		id: 'aq_yb_dc_fjhdl-fjhdlPanel-html',
  		//minHeight: 1000,
  		//height: '100%',
  		autoHeight: true,
  		bodyStyle: 'padding:0px 20px 100px 20px; overflow-y:auto;overflow-x:auto',
  		autoScroll: true
  		//html: '<iframe src="/upload/excelTohtml/GZFGS_Y_XZB_REPORT.html" width="100%" height="100%" frameborder="0"></iframe>'
      }	       
  	]
});