 Ext.define('isane.view.aq_jxgl.importForm',{
    extend:'Ext.form.Panel',
    alias:'widget.aq_jxgl-importForm',
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
	    	xtype:'combobox',
    		fieldLabel:'<span style="color:red">*</span>单位',
    		id: 'aq_jxgl-importForm-plantCode',
    		store: Ext.create('isane.store.util.OrganCTE'),
       	    name:'plantCode',
       		displayField : 'organName',
       		valueField : 'organKey',
       		editable: false,
    		readOnly: true,
    		fieldStyle: 'color:gray',       		
       		emptyText: '==请选择==',
       		listeners: {
       			beforerender: function(){
       				var storeTre = this.getStore();
       				Ext.apply(storeTre.proxy.extraParams, {
       					organKey: QJ_PlantCode,
       					organType: 1,
       					organLev: 3
       				});
       				storeTre.load();     				
       			}
       		}
	    },	    	           	        
    	{
    		xtype: 'textfield',
    		name: 'ownCode',
    		id: 'aq_jxgl-importForm-ownCode',
    		readOnly: true,
    		fieldStyle: 'color:gray',     		
    		fieldLabel: '机组',
    	}, 
    	{
            xtype: 'combobox',
            name: 'ownTypeCfg',
            fieldLabel: '类型',
            id: 'aq_jxgl-importForm-ownTypeCfg',
            store: Ext.create('isane.store.system.systemitemvalue'),
            displayField: 'valueName',
            valueField: 'valueCode',
    		editable: false,
    		//readOnly: true,
    		//hidden: false,
    		//fieldStyle: 'color:gray',
    		listeners:{
    			beforerender: function(item){
    				var store = item.getStore();
    				var obt =  {'itemCode': 'AQSC_JXGL_JXLX'};
    				Ext.apply(store.proxy.extraParams, obt);
    				store.load();	
    			}
    		}        
    	},  	   	         	        
    	{
    		xtype: 'datefield',
    		name: 'inputTime',
    		fieldLabel: '日期',
    		format: 'Y-m-d H:i:s',
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