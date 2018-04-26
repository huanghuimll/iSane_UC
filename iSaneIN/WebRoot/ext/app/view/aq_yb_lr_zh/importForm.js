 Ext.define('isane.view.aq_yb_lr_zh.importForm',{
    extend:'Ext.form.Panel',
    alias:'widget.aq_yb_lr_zh-importForm',
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
    	/*{
    		xtype: 'textfield',
    		name: 'plantCode',
    		id: 'aq_yb_lr_zh-importForm-plantCode',
    		fieldLabel: '所属单位',
    		hidden: true
    	},*/
		{
	    	xtype:'combobox',
    		fieldLabel:'<span style="color:red">*</span>单位',
    		store: Ext.create('isane.store.util.OrganCTE'),
       	    name:'plantCode',
       		displayField : 'organName',
       		valueField : 'organKey',
       		value: QJ_PlantCode,
       		fieldLabel: '所属单位',
       		editable: false,
       		emptyText: '==请选择==',
       		listeners: {
       			beforerender: function(){
       				var storeCTE = this.getStore();
       				Ext.apply(storeCTE.proxy.extraParams, {
       					organKey: QJ_PlantCode,
       					organType: 1
       				});
       				storeCTE.load();     				
       			}
       		}
	    },    	
    	{
    		xtype: 'textfield',
    		name: 'importType',
    		id: 'aq_yb_lr_zh-importForm-importType',
    		fieldLabel: 'EXCEL类型',
    		value: 'YB-ZH',
    		hidden: true
    	},    	        
    	{
    		xtype: 'textfield',
    		name: 'dateType',
    		id: 'aq_yb_lr_zh-importForm-dateType',
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
            id: 'aq_yb_lr_zh-importForm-storeDate',
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