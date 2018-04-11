 Ext.define('isane.view.role.roleForm',{
    extend:'Ext.form.Panel',
    alias:'widget.role-roleForm',
    border:0,
    bodyPadding:'5 5 5 5',
    frame: true,
    items:[{
    	xtype:'fieldset',
    	title:'基础信息',
	    defaults:{
	        margin:'10 5 10 5',
	        labelWidth:60,
	        width:400,
	        allowBlank:false,
	        labelAlign:'left'
	    },
		items:[
		{
        	xtype:'textfield',
        	name:'id',
        	allowBlank: true,
        	value: 0,
        	hidden: true
	    },			
		{
        	xtype:'textfield',
        	name:'roleCode',
        	fieldLabel:'角色编码', 
			emptyText: '请输入角色编码...'
        },
		{
        	xtype:'textfield',
        	name:'roleName',
        	fieldLabel:'角色名称', 
			blankText:'角色名称不能为空',
			emptyText: '请输入角色名...'
        },
        {
        	xtype:'textareafield',
        	name:'roleDesc',
        	fieldLabel:'角色描述',
        	heigth: 40,
	    	allowBlank: true,
	    	emptyText: '请输入角色描述...'
       }
	   ]
	}
   ]});