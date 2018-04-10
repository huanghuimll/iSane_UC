 Ext.define('isane.view.dl_fdl.fdlImportForm',{
    extend:'Ext.form.Panel',
    alias:'widget.dl_fdl-fdlImportForm',
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
    		fieldLabel: '所属单位',
    		value: 'GZFGS'
    	},    	        
    	{
    		xtype: 'datefield',
    		name: 'storeDate',
    		fieldLabel: '日期',
    		format: 'Y-m-d',
    		value: new Date(),
            minValue: '2016/01/01',
            //disabledDays: [0, 6],		
    		emptyText: '输入时间..'	
    	},	   	        
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