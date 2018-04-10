 Ext.define('isane.view.aq_kjgl_hlhjy.hlhjyForm',{
    extend:'Ext.form.Panel',
    alias:'widget.aq_kjgl_hlhjy-hlhjyForm',
    border:0,
    bodyPadding:'5 5 5 5',
    frame: true,
    items:[
    {
	   	xtype:'fieldset',
	   	title:'基础信息',
	    defaults:{
	        margin:'5 5 5 5',
	        labelWidth: 60,
	        width: 280,
	        allowBlank: false,
	        cls: 'x-check-group-alt',
	        labelAlign:'right'
	    },
		layout : {
			type : 'table',
			columns : 1,
			tableAttrs : {
   	        	//border: 1,
   	        	//style: "border: 1px solid gray;"
			}
		},		    
		items:[
		{
			xtype: 'textareafield',
			name: 'id',
			id: 'aq_kjgl_hlhjy-hlhjyForm-hidden-id',
			allowBlank: true,
			value: 0,
			hidden: true
		},
        {
        	xtype: 'textfield',
        	fieldLabel: '<span style="color:red">*</span>单位',
        	name: 'unit',
        	emptyText: '请输入内容....'
        },	
        {
        	xtype: 'textfield',
        	fieldLabel: '<span style="color:red">*</span>项目名',
        	name: 'projectName',
        	emptyText: '请输入内容....'
        },
		{
        	xtype : 'textareafield',
        	name : 'person',
        	fieldLabel:'<span style="color:red">*</span>参与人员',
        	//colspan: 2,
        	grow : true,
        	height: 50,
        	width: 570,
        	anchor : '100%',
			emptyText: '*主要参与人员'
		}        
		]
      },
	  {
		xtype : 'fieldset',
		title : '项目简况',
		collapsible : true,
		//collapsed: true,
		defaults : {
			margin : '5 5 10 5',
			labelWidth : 60,
			width : 570,
			allowBlank : true,
			cls: 'x-check-group-alt',
			labelAlign : 'right'
		},
		items: [ 
        {
        	xtype : 'textareafield',
        	name : 'projectBriefing',
        	grow : true,
        	height: 100,
        	anchor : '100%',
        	emptyText : '*项目简况...'
        }
        ]
	},    
    {
    	xtype:'fieldset',
    	title:'论文信息',	    
		items:[
		{
			xtype: 'fieldcontainer',
		    defaults:{
		        margin:'5 5 5 5',
		        labelWidth:60,
		        width: 280,
		        //allowBlank:false,
		        cls: 'x-check-group-alt',
		        labelAlign:'right'
	        },				
			layout : {
				type : 'table',
				columns : 2,
				tableAttrs : {
	   	        	//border: 2,
	   	        	//style: "border: 1px solid gray;"
				}
			},
			items: [
			{
	        	xtype : 'textareafield',
	        	name : 'status',
	        	fieldLabel:'<span style="color:red">*</span>鉴定应用情况',
	        	colspan: 2,
	        	grow : true,
	        	height: 80,
	        	width: 570,
	        	anchor : '100%',
				emptyText: '*鉴定应用情况'
			},			        
			{
				xtype: 'datefield',
				name: 'dataTime',
				fieldLabel:'<span style="color:red">*</span>实施时间',
				format: 'Y-m-d H:i:s',
				value: new Date()
			},	        
	        {
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>实施效果',
	        	name: 'result',
	        	emptyText: '请输入内容....'
	        }
	        ]
		}
	   ]
	  }  
   ]
 });