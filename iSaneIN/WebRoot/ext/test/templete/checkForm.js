Ext.define('isane.view.check.checkForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.check-checkForm',
	border : 0,
	bodyPadding : '5 5 5 5',
	frame : true,
	items : [
	//1.基础信息
	{
		xtype : 'fieldset',
		title : '基础信息',
		defaults : {
			margin : '5 5 5 5',
			labelWidth : 60,
			width : 450,
			allowBlank : false,
			labelAlign : 'right'
		},
		layout : {
			type : 'table',
			columns : 1,
			tableAttrs : {
			//       	        	border: 1,
			//       	        	style: "border: 1px solid gray;"
			}
		},
		items : [ 
        {
			xtype : 'textfield',
			name : 'id',
			id : 'check-checkForm-id',
			allowBlank : true,
			hidden : true
		}, 
	    {
	    	xtype: 'datefield',
//			xtype : 'datetimefield',		
	    	name: 'checkDate',
	    	fieldLabel: '<span style="color: red">*</span>日期',
	    	format: 'Y-m-d',
	    	//editable: false,
	    	value: new Date(),
	    	emptyText: '--选择时间--'
	    },		
		{
			xtype:'combobox',
			fieldLabel:'<span style="color: red">*</span>类型',
			store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['001', '本部'], ['002', '热电']]}),
			name:'checkType',
			id: 'check-checkForm-checkType',
			displayField : 'name',
			valueField : 'id',
			editable: false,
			allowBlank:false,
			//value: '001',
			emptyText: '--请选择--'
		},
		{
			xtype: 'triggerfield',
			name: 'checkCompere',
			fieldLabel: '<span style="color: red">*</span>主持人',
			id: 'check-checkForm-checkCompere',
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			emptyText: '--请选择--',
			onTriggerClick: function(){
				this.fireEvent('onTriggerClick');
			}
	    },		
		{	//2016-5-16 用来传个后台取登记人编码
			xtype : 'textfield',
			name : 'employeId',
			id: 'check-checkForm-employeId',
			allowBlank: true,
			hidden: true
		}, 
		{
			xtype: 'triggerfield',
			name: 'checkRegister',
			fieldLabel: '<span style="color: red">*</span>登记人',
			id: 'check-checkForm-checkRegister',
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			emptyText: '--请选择--',
			editable: false,
			onTriggerClick: function(){
				this.fireEvent('onTriggerClick');
			}
	    },		    
//		{
//			xtype : 'textfield',
//			name : 'checkRegister',
//			fieldLabel : '<span style="color: red">*</span>主持人',
//			emptyText : '请输入主持人...'
//		}, 
		{
			xtype:'combobox',
			fieldLabel:'<span style="color: red">*</span>会议状态',
			store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['001', '正常'], ['002', '不正常']]}),
			name:'checkStatusID',
			displayField : 'name',
			valueField : 'id',
			allowBlank:false,
			value: '001',
			emptyText: '--请选择--'
		},	
		{
			xtype: 'triggerfield',
			name: 'leader',
			fieldLabel: '<span style="color: red">*</span>参会领导',
			id: 'check-checkForm-leader',
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			emptyText: '--请选择--',
			onTriggerClick: function(){
				this.fireEvent('onTriggerClick');
			}
	    },		
		{
			xtype: 'triggerfield',
			name: 'dept',
			fieldLabel: '<span style="color: red">*</span>参会部门',
			id: 'check-checkForm-dept',
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			emptyText: '--请选择--',
			onTriggerClick: function(){
				this.fireEvent('onTriggerClick');
			}
	    },		    
//		{
//			xtype : 'textfield',
//			name : 'dept',
//			fieldLabel : '<span style="color: red">*</span>参会部门',
//			emptyText : '请输入参会部门...'
//		}, 		
/*		{
	    	xtype:'combobox',
    		fieldLabel:'<span style="color: red">*</span>地点',
         	store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['现场15米会议室', '现场15米会议室'], ['14楼 大会议室', '14楼 大会议室']]}),
       	    name:'checkPlace',
       		displayField : 'name',
       		valueField : 'id',
       		//editable: false,
       		allowBlank:false,
       		emptyText: '--请选择--'
	    },*/
    	{
    		xtype: 'combobox',
    		fieldLabel: '<span style="color: red">*</span>地点',
    		name: 'checkPlace',
    		displayField: 'valueName',
    		valueField: 'valueCode',
    		store: Ext.create('isane.store.util.SystemItemUtil'),
    		emptyText: '--请选择--',
    		//新版本
    		listeners:{
    			beforerender: function(item){
    				var store = item.getStore();
    				var value = "{itemCode: 'messagePlace'}";
					Ext.apply(store.proxy.extraParams, {jsonString: value});
					store.load();	
    			}
    		}
    	},	    
		{
			xtype : 'numberfield',
			name : 'joinNum',
			fieldLabel : '<span style="color: red">*</span>参会人数',
			value: 2
		} 		    
		]
	},
/*	//2.人员信息
	{
		xtype : 'fieldset',
		title : '人员信息',
		defaults : {
			margin : '5 5 5 5',
			labelWidth : 60,
			width : 219,
			allowBlank : true,
			labelAlign : 'right'
		},
		layout : {
			type : 'table',
			columns : 1,
			tableAttrs : {
			//       	        	border: 1,
			//       	        	style: "border: 1px solid gray;"
			}
		},
		items : [
		{
	    	xtype:'combobox',
    		fieldLabel:'主管单位',
         	store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['行政部', '行政部'], ['策划部', '策划部'], ['政工部', '政工部'], ['安检部', '安检部'], ['财经部', '财经部'], ['人资部', '人资部'], ['监审部', '监审部']]}),
       	    name:'organizaPerson',
       		displayField : 'name',
       		valueField : 'id',
       		//editable: false,
       		width : 450,
       		allowBlank:false,
       		emptyText: '--请选择--'
	    },
		{
			xtype : 'textfield',
			name : 'needSpeak',
			fieldLabel : '主持人',
			width : 450,
			emptyText : '请输入...'
		},		  
		{
			xtype: 'triggerfield',
			name: 'checkScope',
			fieldLabel: '发布范围',
			id: 'check-checkForm-checkScope',
			triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
			editable: false,
			width : 450,
			emptyText: '--请选择--',
			onTriggerClick: function(){
				this.fireEvent('onTriggerClick');
			}
	    }		
		]
	},*/
	//1.会议描述
	{
		xtype : 'fieldset',
		title : '会议内容',
		collapsible : true,
		defaults : {
			margin : '5 5 10 5',
			labelWidth : 60,
			width : 450,
			allowBlank : true,
			labelAlign : 'right'
		},
		items : [ 	         
        {
        	xtype : 'htmleditor',
        	name : 'checkContent',
        	height: 220
        }
        ]
	}
	]
});