 Ext.define('isane.view.aq_kjgl_kjxm.kjxmForm',{
    extend:'Ext.form.Panel',
    alias:'widget.aq_kjgl_kjxm-kjxmForm',
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
			columns : 2,
			tableAttrs : {
   	        	//border: 1,
   	        	//style: "border: 1px solid gray;"
			}
		},		    
		items:[
		{
			xtype: 'textfield',
			name: 'plantCode',
			id: 'aq_kjgl_kjxm-kjxmForm-hidden-plantCode',
			allowBlank: false,
			hidden: true
		},			       
		{
			xtype: 'textfield',
			name: 'id',
			id: 'aq_kjgl_kjxm-kjxmForm-hidden-id',
			allowBlank: true,
			value: 0,
			hidden: true
		},
		{
			xtype: 'datefield',
			name: 'dataTime',
        	format: 'Y-m-d H:i:s',
        	value: new Date(),
			hidden: true
		},
	    {
			xtype: 'textfield',
			fieldLabel: '<span style="color:red">*</span>项目编码',
			name: 'projectCode',
			emptyText: '请输入编码...'
	    },
		{
        	xtype:'textfield',
        	name:'projectName',
        	fieldLabel:'<span style="color:red">*</span>项目名称',
			emptyText: '请输入名称...'
	    },		
	    {
	    	xtype:'textfield',
	    	name:'projectJC',
	    	fieldLabel:'<span style="color:red">*</span>承担单位',
	    	emptyText: '请输入名称...'
	    },		
	    {
	    	xtype:'textfield',
	    	name:'developName',
	    	fieldLabel:'<span style="color:red">*</span>研发单位',
	    	emptyText: '请输入名称...'
	    },		
		]
    },
    {
    	xtype:'fieldset',
    	title:'主要内容',	    
		items:[
		{
			xtype: 'fieldcontainer',
		    defaults:{
		        margin:'5 5 0 5',
		        labelWidth:60,
		        width: 570,
		        //allowBlank:false,
		        cls: 'x-check-group-alt',
		        labelAlign:'right'
	        },								
			items: [
	        {
	        	xtype : 'textareafield',
	        	name : 'projectContent',
	        	fieldLabel: '<span style="color:red">*</span>主要内容',
	        	grow : true,
	        	height: 40,
	        	anchor : '100%',
	        	emptyText : '*项目主要研究内容(300字以内)'
	        },		       
	        {
	        	xtype : 'textareafield',
	        	name : 'projectCase',
	        	fieldLabel: '<span style="color:red">*</span>目标、考核指标、完成情况',
	        	grow : true,
	        	height: 40,
	        	anchor : '100%',
	        	emptyText : '*项目研究目标、考核指标及其完成情况(300字以内)'
	        },		       
	        {
	        	xtype : 'textareafield',
	        	name : 'projectResult',
	        	fieldLabel: '<span style="color:red">*</span>取得成果',
	        	grow : true,
	        	height: 40,
	        	anchor : '100%',
	        	emptyText : '*主要完成工作及取得成果(200字以内)'
	        }	       
	        ]
		},
		{
			xtype: 'fieldcontainer',
		    defaults:{
		        margin:'0 5 0 5',
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
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>批复总费用',
	        	name: 'projectCost',
	        	value: '0.0',
	        	emptyText: '*项目批复总费用(万元)'
	        },
	        {
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>预算数(万元)',
	        	name: 'projectBudget',
	        	value: '0.0',
	        	emptyText: '*项目预算数(万元)'
	        },
	        {
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>预算完成数(万元)',
	        	name: 'projectFinish',
	        	value: '0.0',
	        	emptyText: '*项目预算完成数(万元)'
	        },
	        {
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>累计经费完成情况(万元)',
	        	name: 'projectTotal',
	        	value: '0.0',
	        	emptyText: '*项目累计经费完成情况(万元).'
	        }
	        ]
		},
    	{
    		xtype: 'fieldcontainer',
    		fieldLabel : '<span style="color:red">*</span>项目进度',
    		defaultType: 'radiofield',
    		cls: 'x-check-group-alt',
    		margin:'0 5 0 5',
    		width: 570,   		
    		layout: 'hbox',
    		items: [
	        {
	        	boxLabel  : '进行中',
	        	name      : 'projectPlan',
	        	allowBlank: true,
	        	checked: true,
	        	inputValue: '按计划进行'
	        },
	        {
	        	boxLabel  : '超前',
	        	name      : 'projectPlan',
	        	margin: '0 0 0 80',
	        	inputValue: '进度超前',
	        	allowBlank: true
	        },
	        {
	        	boxLabel  : '拖延',
	        	name      : 'projectPlan',
	        	margin: '0 0 0 80',
	        	inputValue: '进度拖延',
	        	allowBlank: true
	        }
	        ]
    	},
    	{
    		xtype: 'fieldcontainer',
		    defaults:{
		        margin:'5 5 0 5',
		        labelWidth:60,
		        width: 570,
		        //allowBlank:false,
		        cls: 'x-check-group-alt',
		        labelAlign:'right'
	        },
	        items: [
            {
            	xtype : 'textareafield',
            	name : 'projectNext',
            	fieldLabel: '<span style="color:red">*</span>明年计划及经费投入计划',
            	grow : true,
            	height: 40,
            	anchor : '100%',
            	emptyText : '*明年工作计划及经费投入计划(200字以内)'
            },    	
            {
            	xtype : 'textareafield',
            	name : 'projectQuest',
            	fieldLabel: '<span style="color:red">*</span>存在的问题、需要说明的情况',
            	grow : true,
            	height: 40,
            	anchor : '100%',
            	emptyText : '*存在的问题、需要说明的情况(200字以内)'
            },    	
            {
            	xtype : 'textareafield',
            	name : 'projectLeader',
            	fieldLabel: '<span style="color:red">*</span>联系人及联系方式',
            	grow : true,
            	height: 40,
            	anchor : '100%',
            	emptyText : '*项目联系人及联系方式'
            }    
            ]
    	}
	   ]
	  },  
	  {
		xtype : 'fieldset',
		title : '备注',
		collapsible : true,
		collapsed: true,
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
        	name : 'projectDesc',
        	grow : true,
        	height: 80,
        	anchor : '100%',
        	emptyText : '请输入备注...'
        }
        ]
	 }	  
   ]
 });