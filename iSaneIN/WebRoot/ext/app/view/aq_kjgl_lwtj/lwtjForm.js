 Ext.define('isane.view.aq_kjgl_lwtj.lwtjForm',{
    extend:'Ext.form.Panel',
    alias:'widget.aq_kjgl_lwtj-lwtjForm',
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
			id: 'aq_kjgl_lwtj-lwtjForm-hidden-id',
			allowBlank: true,
			value: 0,
			hidden: true
		},
		{
			xtype:'textfield',
			name:'lwName',
			fieldLabel : '<span style="color:red">*</span>论文名',
        	grow : true,
        	height: 30,
        	width: 570,
        	anchor : '100%',			
			emptyText: '请输入名称...'
		}	
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
        	name : 'lwContent',
        	grow : true,
        	height: 100,
        	anchor : '100%',
        	emptyText : '请输入备注...'
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
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>作者',
	        	name: 'lwAuthor',
	        	emptyText: '请输入内容....'
	        },
	        {
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>单位',
	        	name: 'lwUnit',
	        	emptyText: '请输入内容....'
	        },	    	
	        {
	        	xtype: 'textfield',
	        	fieldLabel: '<span style="color:red">*</span>发表刊物',
	        	name: 'lwFKW',
	        	emptyText: '请输入内容....'
	        },
			{
				xtype: 'datefield',
				name: 'dataTime',
				fieldLabel:'<span style="color:red">*</span>发表时间',
	        	format: 'Y-m-d H:i:s',
	        	value: new Date()
			},	        
			{
	        	xtype : 'textareafield',
	        	name : 'lwSL',
	        	fieldLabel:'<span style="color:red">*</span>收录刊物',
	        	colspan: 2,
	        	grow : true,
	        	height: 80,
	        	width: 570,
	        	anchor : '100%',
				emptyText: '*被SCI、EI、ISTP、ISR和CIGRE会议论文集收录与否，若收录写明收录刊物'
			}
	        ]
		}
	   ]
	  }  
   ]
 });