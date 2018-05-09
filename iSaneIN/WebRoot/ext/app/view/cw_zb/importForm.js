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
    	/*{
    		xtype: 'textfield',
    		name: 'plantCode',
    		id: 'cw_zb-importForm-plantCode',
    		fieldLabel: '所属单位',
    		//value: 'GZFGS',
    	},*/ 
		{
	    	xtype:'combobox',
    		fieldLabel:'<span style="color:red">*</span>单位',
     		//store : 'util.Plant',
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
			xtype:'combobox',
			fieldLabel:'报表类型',
			store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['DR-CW-KB', '==快报表=='], ['DR-CW-SB', '==上报表=='], ['DR-CW-XD', '==下达表=='], ['DR-CW-YJ', '==预计表==']]}),
			name:'importType',
			id: 'cw_zb-importForm-importType',
			displayField : 'name',
			valueField : 'id',
			editable: false,
			allowBlank:false,
			value: 'DR-CW-KB',
			emptyText: '--请选择--'
		},	    
    	/*{
    		xtype: 'textfield',
    		name: 'importType',
    		id: 'cw_zb-importForm-importType',
    		fieldLabel: 'EXCEL类型',
    		value: 'DR-CW',
    		hidden: true
    	},*/    	        
    	{
    		xtype: 'textfield',
    		name: 'dateType',
    		id: 'cw_zb-importForm-dateType',
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