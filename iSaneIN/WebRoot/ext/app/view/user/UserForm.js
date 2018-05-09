 Ext.define('isane.view.user.UserForm',{
    extend:'Ext.form.Panel',
    alias:'widget.user-UserForm',
    border:0,
    bodyPadding:'5 5 5 5',
    frame: true,
    items:[
    {
	   	xtype:'fieldset',
	   	title:'所属单位',
	    defaults:{
	        margin:'10 5 10 5',
	        labelWidth: 60,
	        width: 280,
	        allowBlank: false,
	        cls: 'x-check-group-alt',
	        labelAlign:'right'
	    },
		items:[
		{
			xtype: 'textfield',
			name: 'id',
			id: 'user-UserForm-hidden-id',
			allowBlank: true,
			value: 0,
			hidden: true
		},
/*		{
	    	xtype:'treepicker',
    		fieldLabel:'<span style="color:red">*</span>单位',
    		store: Ext.create('isane.store.user.organTree'),
       	    name:'plantCode',
       		displayField : 'organName',
       		//valueField : 'organKey',
       		//value: 'GZFGS',
       		editable: false,
       		minPickerHeight: 250,
       		autoScroll: false,
       		listeners: {
       			beforerender: function(){
       				var storeTre = this.getStore();
       				Ext.apply(storeTre.proxy.extraParams, {
       					organKey: 'GZFGS',
       					organType: 1
       				});
       				storeTre.load();
       				storeTre.getRootNode().set('expanded', true);    				
       			}
       		}       		
	    }*/		
		{
	    	xtype:'combobox',
    		fieldLabel:'<span style="color:red">*</span>单位',
     		//store : 'util.Plant',
    		store: Ext.create('isane.store.util.Plant'),
       	    name:'plantCode',
       		displayField : 'organName',
       		valueField : 'organKey',
       		//value: 'GZFGS',
       		editable: false,
       		emptyText: '==请选择==',
       		listeners: {
       			beforerender: function(){
       				var storeTre = this.getStore();
       				Ext.apply(storeTre.proxy.extraParams, {
       					organType: 1,
       					organLev: 1
       				});
       				storeTre.load();     				
       			}
       		}
	    }		
		]
    },
    {
    	xtype:'fieldset',
    	title:'基础信息',  
	    defaults:{
	        margin:'10 5 0 5',
	        labelWidth:60,
	        width: 280,
	        allowBlank:false,
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
				fieldLabel: '<span style="color:red">*</span>编码',
				name: 'userCode',
				emptyText: '请输入编码...'
		    },
			{
	        	xtype:'textfield',
	        	name:'userName',
	        	fieldLabel:'<span style="color:red">*</span>名称',
				emptyText: '请输入名称...'
		    },	
	    	{
	    		xtype      : 'fieldcontainer',
	    		fieldLabel : '状态',
	    		defaultType: 'radiofield',
	    		layout: 'hbox',
	    		items: [
		        {
		        	boxLabel  : '正常',
		        	name      : 'currentStatus',
		        	margin: '0 0 0 10',
		        	allowBlank: true,
		        	checked: true,
		        	inputValue: 1
		        },
		        {
		        	boxLabel  : '失效',
		        	name      : 'currentStatus',
		        	margin: '0 0 0 50',
		        	inputValue: 2,
		        	allowBlank: true
		        	
		        }
		        ]
	    	},
	    	{
	    		xtype      : 'fieldcontainer',
	    		fieldLabel : '性别',
	    		defaultType: 'radiofield',
	    		layout: 'hbox',
	    		items: [
		        {
		        	boxLabel  : '男',
		        	name      : 'sex',
		        	margin: '0 0 0 10',
		        	allowBlank: true,
		        	checked: true,
		        	inputValue: '男'
		        },
		        {
		        	boxLabel  : '女',
		        	name      : 'sex',
		        	margin: '0 0 0 63',
		        	inputValue: '女',
		        	allowBlank: true
		        	
		        }
		        ]
	    	},
	        {
	        	xtype: 'datefield',
	        	fieldLabel: '创建时间',
	        	name: 'createTime',
	        	format: 'Y-m-d H:i:s',
	        	value: new Date()
	        }, 	    	
	        {
	        	xtype: 'datefield',
	        	fieldLabel: '有效时间',
	        	name: 'validDate',
	        	format: 'Y-m-d H:i:s',
	        	allowBlank: true,
	        	value: '2050-12-30 00:00:00'
	        },		       
	        {
	        	xtype:'textfield',
	        	fieldLabel: '联系方式',
	        	name:'phoneNum',
	        	margin:'10 5 10 5',
	        	labelAlign:'right',
	        	allowBlank: true,
	        	emptyText : '请输入联系方式...'
	        },	    
		    {
	    	 	xtype:'numberfield',
	    	 	fieldLabel: '排序',
	    	 	name:'disOrder',
	    	 	margin:'10 5 10 5',
		        maxValue: 10000,
		        minValue: 1,
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
			width : 540,
			allowBlank : true,
			cls: 'x-check-group-alt',
			labelAlign : 'right'
		},
		items : [ 
        {
        	xtype : 'textareafield',
        	name : 'userDesc',
        	grow : true,
        	height: 80,
        	anchor : '100%',
        	emptyText : '请输入备注...'
        }
        ]
	 }	  
   ]
 
 });
 
function getFullPath(obj){
	if(obj){
		//ie
		if(window.navigator.userAgent.indexOf('MSIE') >= 1){
			obj.select();
			return document.selection.createRange().text;
		}else if(window.navigator.userAgent.indexOf('Firefox') >= 1){
			//firefox
			if(obj.files){
				return obj.files.item(0).getAsDataURL();
			}
			return obj.value;
		}
		return obj.value;
	}
}