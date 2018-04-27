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
    	/*{
    		xtype: 'textfield',
    		name: 'plantCode',
    		fieldLabel: '所属单位',
    		value: 'GZFGS'
    	}, */
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
    		id: 'dl_fdl-fdlImportForm-importType',
    		fieldLabel: 'EXCEL类型',
    		value: 'DR-DL',
    		hidden: true
    	},    	        
    	{
    		xtype: 'textfield',
    		name: 'dateType',
    		id: 'dl_fdl-fdlImportForm-dateType',
    		fieldLabel: '类型',
    		value: 'M',
    		hidden: true
    	}, 	    
    	{
    		xtype: 'datefield',
    		name: 'storeDate',
    		fieldLabel: '日期',
    		format: 'Y-m',
    		value: new Date(),
            minValue: '2016/01/01',
            id: 'dl_fdl-fdlImportForm-storeDate',
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