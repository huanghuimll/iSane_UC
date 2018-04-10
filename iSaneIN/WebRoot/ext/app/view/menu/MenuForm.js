 Ext.define('isane.view.menu.MenuForm',{
    extend:'Ext.form.Panel',
    alias:'widget.menu-MenuForm',
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
			id: 'menu-MenuForm-hidden-id',
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
       		//value: 'HNHM',
       		editable: false
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
    	   xtype:'combobox',
    	   fieldLabel:'<span style="color:red">*</span>菜单类型',
    	   id: 'menu-MenuForm-actionType',
    	   store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [[1, '组织架构'], [3, '系统管理'], [2, '业务管理'], [4, '工作流管理']]}),
    	   name:'actionType',
    	   displayField : 'name',
    	   valueField : 'id',
    	   value: 1,
    	   editable: false
        },
       	{
       		xtype: 'treepicker',
       		name: 'parentId',
       		id: 'menu-MenuForm-parentId',
       		fieldLabel: '<span style="color:red">*</span>父级节点',
       		displayField: 'text',
       		//valueField: 'id',
       		store: Ext.create('isane.store.mainview.MenuTree'),
       		editable: false,
       		minPickerHeight: 250,
       		autoScroll: false,
       		listeners: {
       			beforerender: function(){
       				var actionType = Ext.getCmp('menu-MenuForm-actionType').getValue();
       				var storeTre = this.getStore();
       				Ext.apply(storeTre.proxy.extraParams, {actionType: actionType});
       				storeTre.load();
       				storeTre.getRootNode().set('expanded', true);    				
       			},
       			expand: function(){
       				var actionType = Ext.getCmp('menu-MenuForm-actionType').getValue();
       				var storeTre = this.getStore();
       				Ext.apply(storeTre.proxy.extraParams, {actionType: actionType});
       				storeTre.load();
       				storeTre.getRootNode().set('expanded', true);        				
       			}
       		}
       	},  
	    {
			xtype: 'textfield',
			fieldLabel: '<span style="color:red">*</span>节点编码',
			name: 'menuCode',
			//vtype: 'menuCode',
			emptyText: '请输入编码...'
	    },       	
		{
        	xtype:'textfield',
        	name:'menuTitle',
        	fieldLabel:'<span style="color:red">*</span>节点名',
			emptyText: '请输入子节点名名...'
	    },
	    {
			xtype: 'textfield',
			fieldLabel: '<span style="color:red">*</span>URL',
			name: 'menuAction',
			allowBlank: true,
			emptyText: '请输入链接...'
	    },		    
	    {
	    	xtype: 'textfield',
	    	fieldLabel: 'iconUrl',
	    	name: 'iconUrl',
	    	allowBlank: true,
	    	emptyText: '请输入iconUrl...'
	    },		    
	    {
    	 	xtype:'numberfield',
    	 	fieldLabel: '排序',
    	 	name:'displayOrder',
	        maxValue: 10000,
	        minValue: 1 ,
	        value: 1
	    }
	   ]
	  }
   ]});