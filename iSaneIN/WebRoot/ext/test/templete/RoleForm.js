 Ext.define('isane.view.role.RoleForm',{
    extend:'Ext.form.Panel',
    alias:'widget.role-RoleForm',
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
			id: 'role-RoleForm-hidden-id',
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
			xtype: 'textfield',
			fieldLabel: '<span style="color:red">*</span>编码',
			name: 'roleCode',
			emptyText: '请输入编码...'
	    },       	
		{
        	xtype:'textfield',
        	name:'roleName',
        	fieldLabel:'<span style="color:red">*</span>名称',
			emptyText: '请输入名称...'
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
	  },
	  {
		xtype : 'fieldset',
		title : '备注',
		collapsible : true,
		defaults : {
			margin : '5 5 10 5',
			labelWidth : 60,
			width : 480,
			allowBlank : true,
			cls: 'x-check-group-alt',
			labelAlign : 'right'
		},
		items : [ 
        {
        	xtype : 'textareafield',
        	name : 'roleDesc',
        	grow : true,
        	height: 80,
        	anchor : '100%',
        	emptyText : '请输入备注...'
        }
        ]
	 }	  
   ]});