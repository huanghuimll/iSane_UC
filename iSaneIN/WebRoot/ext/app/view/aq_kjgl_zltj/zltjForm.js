 Ext.define('isane.view.aq_kjgl_zltj.zltjForm',{
    extend:'Ext.form.Panel',
    alias:'widget.aq_kjgl_zltj-zltjForm',
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
			id: 'aq_kjgl_zltj-zltjForm-hidden-id',
			allowBlank: true,
			value: 0,
			hidden: true
		},
		{
			xtype:'textfield',
			name:'zlName',
			fieldLabel : '<span style="color:red">*</span>专利名',
        	grow : true,
        	height: 30,
        	width: 570,
        	anchor : '100%',			
			emptyText: '请输入名称...'
		},		
    	{
    		xtype: 'fieldcontainer',
    		fieldLabel : '<span style="color:red">*</span>类别',
    		defaultType: 'radiofield',
    		cls: 'x-check-group-alt',
    		margin:'0 5 5 5',
    		width: 570,   		
    		layout: 'hbox',
    		items: [
	        {
	        	boxLabel  : '发明',
	        	name      : 'zlType',
	        	margin: '0 0 0 80',
	        	allowBlank: true,
	        	checked: true,
	        	inputValue: '发明'
	        },
	        {
	        	boxLabel  : '实用新型',
	        	name      : 'zlType',
	        	margin: '0 0 0 80',
	        	inputValue: '实用新型',
	        	allowBlank: true
	        },
	        {
	        	boxLabel  : '外观设计',
	        	name      : 'zlType',
	        	margin: '0 0 0 80',
	        	inputValue: '外观设计',
	        	allowBlank: true
	        }
	        ]
    	},		
		]
      },
	  {
		xtype : 'fieldset',
		title : '内容简介',
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
        	name : 'zlContent',
        	grow : true,
        	height: 100,
        	anchor : '100%',
        	emptyText : '请输入备注...'
        }
        ]
	},    
    {
    	xtype:'fieldset',
    	title:'申请信息',	    
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
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>申请人',
	        	name: 'zlProposer',
	        	emptyText: '请输入内容....'
	        },
	        {
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>发明人',
	        	name: 'zlInvent',
	        	emptyText: '请输入内容....'
	        },
	    	{
	    		xtype: 'fieldcontainer',
	    		fieldLabel : '<span style="color:red">*</span>专利状态',
	    		defaultType: 'radiofield',
	    		cls: 'x-check-group-alt',
	    		layout: 'hbox',
	    		items: [
		        {
		        	boxLabel  : '申请中',
		        	name      : 'zlStatus',
		        	margin: '0 0 0 20',
		        	allowBlank: true,
		        	checked: true,
		        	inputValue: '申请中'
		        },
		        {
		        	boxLabel  : '已授权',
		        	name      : 'zlStatus',
		        	margin: '0 0 0 40',
		        	inputValue: '已授权',
		        	allowBlank: true
		        }
		        ]
	    	},
	    	{
	    		xtype: 'fieldcontainer',
	    		fieldLabel : '<span style="color:red">*</span>涉外',
	    		defaultType: 'radiofield',
	    		cls: 'x-check-group-alt',
	    		layout: 'hbox',
	    		items: [
		        {
		        	boxLabel  : '是',
		        	name      : 'projectPlan',
		        	margin: '0 0 0 20',
		        	allowBlank: true,
		        	inputValue: '1'
		        },
		        {
		        	boxLabel  : '否',
		        	name      : 'projectPlan',
		        	margin: '0 0 0 40',
		        	inputValue: '2',
		        	checked: true,
		        	allowBlank: true
		        }
		        ]
	    	},	    	
	        {
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>申请号',
	        	name: 'zlApplyNum',
	        	emptyText: '请输入内容....'
	        },
			{
				xtype: 'datefield',
				name: 'zlApplyTime',
				fieldLabel:'<span style="color:red">*</span>申请日期',
	        	format: 'Y-m-d H:i:s',
	        	value: new Date()
			},	        
			{
				xtype: 'textfield',
				fieldLabel: '<span style="color:red">*</span>授权号',
				name: 'zlSQGH',
				emptyText: '请输入内容....'
			},
			{
				xtype: 'datefield',
				name: 'zlSQGGR',
				fieldLabel:'<span style="color:red">*</span>授权日期',
				format: 'Y-m-d H:i:s',
				value: new Date()
			}
	        ]
		}
	   ]
	  }  
   ]
 });