 Ext.define('isane.view.aq_yb_lr_hb.importForm',{
    extend:'Ext.form.Panel',
    alias:'widget.aq_yb_lr_hb-importForm',
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
    		id: 'aq_yb_lr_hb-importForm-plantCode',
    		fieldLabel: '所属单位',
    		hidden: true
    		//value: 'GZFGS',
    	},    	        
    	{
    		xtype: 'textfield',
    		name: 'importType',
    		id: 'aq_yb_lr_hb-importForm-importType',
    		fieldLabel: 'EXCEL类型',
    		value: 'YB-HB',
    		hidden: true
    	},    	        
    	{
    		xtype: 'textfield',
    		name: 'dateType',
    		id: 'aq_yb_lr_hb-importForm-dateType',
    		fieldLabel: '类型',
    		value: 'M',
    		hidden: true
    	},    	         	        
    	{
    		xtype: 'monthfield',
    		name: 'storeDate',
    		fieldLabel: '日期',
    		format: 'Y-m',
    		value: new Date(),
            minValue: '2016/01/01',
            id: 'aq_yb_lr_hb-importForm-storeDate',
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