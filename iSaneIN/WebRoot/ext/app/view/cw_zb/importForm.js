 Ext.define('isane.view.cw_zb.importForm',{
    extend:'Ext.form.Panel',
    alias:'widget.cw_zb-importForm',
    border:0,
    bodyPadding:'5 5 5 5',
    frame: true, 
    items:[
    {
    	xtype: 'fieldset',
    	title: '基础信息',
    	defaults: {
    		margin: '5 5 5 5',
    		labelWidth: 60,
    		width: 400,
    		allowBlank: false,
    		labelAlign: 'right'
    	},
    	items: [
    	{
    		xtype: 'textfield',
    		name: 'plantCode',
    		id: 'cw_zb-importForm-plantCode',
    		fieldLabel: '所属单位',
    		//value: 'GZFGS',
    	},    	        
    	{
    		xtype: 'textfield',
    		name: 'importType',
    		id: 'cw_zb-importForm-importType',
    		fieldLabel: 'EXCEL类型',
    		value: 'CW-XLS',
    	},    	        
    	{
    		xtype: 'textfield',
    		name: 'dateType',
    		id: 'cw_zb-importForm-dateType',
    		fieldLabel: '类型',
    		value: 'M'
    	},    	         	        
    	{
    		xtype: 'monthfield',
    		name: 'storeDate',
    		fieldLabel: '日期',
    		format: 'Y-m',
    		value: new Date(),
            minValue: '2016/01/01',
            id: 'cw_zb-importForm-storeDate',
    		emptyText: '输入时间..'	
    	},	   	        
    	/*{
    		xtype: 'datefield',
    		name: 'storeDate',
    		fieldLabel: '日期',
    		format: 'Y-m',
    		value: new Date(),
    		minValue: '2016/01/01',
    		//disabledDays: [0, 6],		
    		emptyText: '输入时间..'	
    	},*/	   	        
	    {
	    	xtype: 'filefield',
	    	name: 'uploadFile',
	    	fieldLabel: '文件',
	    	margin: '5 5 10 5',
	    	buttonText: '..',
	    	emptyText: '请选中文件..'
	    }
    	]
    }
    ]
 });