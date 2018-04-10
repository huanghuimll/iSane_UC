 Ext.define('isane.view.navigate.NavigateForm',{
    extend:'Ext.form.Panel',
    alias:'widget.navigate-NavigateForm',
    border:0,
    bodyPadding:'5 5 5 5',
    frame: true,
    items:[
    {
	   	xtype:'fieldset',
	   	title:'所属单位',
	    defaults:{
	        margin:'10 5 10 5',
	        labelWidth:60,
	        width:480,
	        allowBlank:false,
	        cls: 'x-check-group-alt',
	        labelAlign:'right'
	    },
		items:[
		{
			xtype: 'textfield',
			name: 'id',
			id: 'navigate-NavigateForm-hidden-id',
			allowBlank: true,
			value: 0,
			hidden: true
		},
		{
	    	xtype:'combobox',
    		fieldLabel:'<span style="color:red">*</span>单位',
     		store : 'util.Plant',
       	    name:'plantCode',
       		displayField : 'deptName',
       		valueField : 'plantCode',
       		editable: false
	    },
    	{
    		xtype: 'combobox',
    		fieldLabel: '机组',
    		name: 'jzCode',
    		id: 'navigate-NavigateForm-jzCode',
    		displayField: 'jzName',
    		valueField: 'jzCode',
    		store: Ext.create('isane.store.jz.Jz'),
    		editable: false,
    		allowBlank: true,
    		emptyText: '--请选择--',
    		listeners:{
    			beforerender: function(item){  				
    				var obt= {
    						plantCode: QJ_PlantCode
    				};      				
    				var store = item.getStore();
					Ext.apply(store.proxy.extraParams, obt);
					store.load();	
    			}
    		}
    	}	 	    
		]
    },
    {
    	xtype:'fieldset',
    	title:'基础信息',
	    defaults:{
	        margin:'10 5 10 5',
	        labelWidth:60,
	        width:480,
	        allowBlank:false,
	        cls: 'x-check-group-alt',
	        labelAlign:'right'
	    },
		items:[ 
	    {
			xtype: 'textfield',
			fieldLabel: '<span style="color:red">*</span>编码',
			name: 'navCode',
			emptyText: '请输入编码...'
	    },       	
		{
        	xtype:'textfield',
        	name:'navName',
        	fieldLabel:'<span style="color:red">*</span>名称',
			emptyText: '请输入名称...'
	    },
	    {
	    	xtype: 'combobox',
	    	fieldLabel: '类别',
	    	name: 'navTypeCfg',
	    	displayField: 'itemValueName',
	    	valueField: 'itemValueCode',
	    	store: Ext.create('isane.store.util.ConfigItemValue'),
	    	editable: false,
	    	emptyText: '--请选择--',
	    	listeners:{
	    		beforerender: function(item){
	    			var obt= {
	    					itemCode: 'NavigateGraphType',
	    					plantCode: QJ_PlantCode
	    			};    				
	    			var store = item.getStore();
	    			Ext.apply(store.proxy.extraParams, obt);
	    			store.load();	
	    		}
	    	}
	    }, 	 
		{
			xtype:'textfield',
			name:'assetUrl',
			fieldLabel:'<span style="color:red">*</span>路径',
			emptyText: '请输入路径...'
		},
    	{
    		xtype      : 'fieldcontainer',
    		fieldLabel : '<span style="color:red">*</span>是否机组',
    		id: 'navigate-NavigateForm-canChooseJz',
    		defaultType: 'radiofield',
    		layout: 'hbox',
    		items: [
	        {
	        	boxLabel  : '是',
	        	name      : 'canChooseJz',
	        	margin: '0 0 0 10',
	        	allowBlank: true,
	        	inputValue: 1
	        },
	        {
	        	boxLabel  : '否',
	        	name      : 'canChooseJz',
	        	margin: '0 0 0 50',
	        	inputValue: 2,
	        	checked: true,
	        	allowBlank: true
	        }
	        ]
    	},			
/*		{
			xtype:'combobox',
			fieldLabel:'<span style="color: red">*</span>机组选择',
			store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [[1, '是'], [2, '否']]}),
			name:'canChooseJz',
			id: 'navigate-NavigateForm-canChooseJz',
			displayField : 'name',
			valueField : 'id',
			editable: false,
			allowBlank:false,
			value: 2,
			emptyText: '--请选择--'
		},*/
    	{
    		xtype      : 'fieldcontainer',
    		fieldLabel : '<span style="color:red">*</span>是否主页',
    		id: 'navigate-NavigateForm-isHome',
    		defaultType: 'radiofield',
    		layout: 'hbox',
    		items: [
	        {
	        	boxLabel  : '是',
	        	name      : 'isHome',
	        	margin: '0 0 0 10',
	        	allowBlank: true,
	        	checked: true,
	        	inputValue: 1
	        },
	        {
	        	boxLabel  : '否',
	        	name      : 'isHome',
	        	margin: '0 0 0 50',
	        	inputValue: 2,
	        	allowBlank: true
	        }
	        ]
    	},		
		/*{
			xtype:'combobox',
			fieldLabel:'<span style="color: red">*</span>isHome',
			store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [[1, '是'], [2, '否']]}),
			name:'isHome',
			id: 'navigate-NavigateForm-isHome',
			displayField : 'name',
			valueField : 'id',
			editable: false,
			allowBlank:false,
			value: 1,
			emptyText: '--请选择--'
		},*/
    	{
    		xtype      : 'fieldcontainer',
    		fieldLabel : '<span style="color:red">*</span>是否公用',
    		id: 'navigate-NavigateForm-isPublic',
    		defaultType: 'radiofield',
    		layout: 'hbox',
    		items: [
	        {
	        	boxLabel  : '是',
	        	name      : 'isPublic',
	        	margin: '0 0 0 10',
	        	allowBlank: true,
	        	inputValue: 1
	        },
	        {
	        	boxLabel  : '否',
	        	name      : 'isPublic',
	        	margin: '0 0 0 50',
	        	inputValue: 2,
	        	checked: true,
	        	allowBlank: true
	        }
	        ]
    	},    	
/*	    {
	    	xtype:'textfield',
	    	name:'isPublic',
	    	fieldLabel:'<span style="color:red">*</span>isPublic',
	    	value: 2,
	    	emptyText: '请输入颜色...'
	    },*/
		{
			xtype: 'numberfield',
			name : 'assetVersion',
			fieldLabel : '<span style="color: red">*</span>版本',
			emptyText: '请输入版本...'
		} 	    
	   ]
	  }	  
   ]});