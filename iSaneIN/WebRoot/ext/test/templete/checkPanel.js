Ext.define('isane.controller.check.checkPanel', {
	extend : 'Ext.app.Controller',
	stores : ['check.Check', 'check.CheckCont'],
	models : ['check.Check', 'check.CheckCont'],
	views : ['check.checkPanel','check.checkSearch', 'check.checkList', 'check.checkForm', 'check.checkcontList', 'check.checkcontForm'],
	init : function() { 
		this.utilWin = Ext.create('isane.util.Win');
		this.control({
			'check-checkPanel':{ 
				afterrender: this.afterPanel
			},
			'check-checkList':{
				afterrender: this.afterrender,
				itemclick: this.itemclick
			},				
			'check-checkList button[text=增加]':{
				click: this.addBtn
			},
			'check-checkList button[text=修改]':{
				click: this.updateBtn
			},
			'check-checkList button[text=删除]':{
				click: this.deleteBtn
			},
			'check-checkSearch button[text=查询]':{
				click: this.onSearchBtn
			},
			'check-checkList button[text=查看]' : { // 查看
				click : this.view
			}, 			
			'check-checkForm triggerfield[name=leader]':{
				onTriggerClick: this.onTriggerClick_leader
			},
			'check-checkForm triggerfield[name=checkCompere]':{
				onTriggerClick: this.onTriggerClick_checkCompere
			},
			'check-checkForm triggerfield[name=checkRegister]':{
				onTriggerClick: this.onTriggerClick_checkRegister
			},
			'check-checkForm triggerfield[name=dept]':{
				onTriggerClick: this.onTriggerClick_dept
			},
//			//--------------调度会回复------------------------
			'check-checkcontList button[text=增加]':{
				click: this.addBtn_attach
			},
			'check-checkcontList':{
				itemclick: this.itemclick_attach
			},	
			'check-checkcontList button[text=修改]':{
				click: this.updateBtn_attach
			},		
			'check-checkcontList button[text=查看]' : {
				click : this.view_attach
			}, 			
			'check-checkcontList button[text=删除]':{
				click: this.deleteBtn_attach
			}
		});
	},
	//初始化界面:配置权限、
	afterPanel: function(owner){
//		var permiss = owner.permiss; 
//		permiss = permiss.split(',');
//		if(permiss[0] == 0){ //增加
//			Ext.getCmp('param-paramList-addButton').hide();
//		}
//		if(permiss[1] == 0){ //删除
//			Ext.getCmp('param-paramList-deleteButton').hide();
//		}
//		if(permiss[2] == 0){ //修改
//			Ext.getCmp('param-paramList-editButton').hide();
//		}		
//		if(permiss[3] == 0){ //查询
//		}		
//		if(permiss[4] == 0){ //特殊
//		}
    	Ext.require("isane.controller.employeutil.employeutilPanel", function(){
    		application.getController("employeutil.employeutilPanel");//注册控制器
    	})   		
    	Ext.require("isane.controller.deptutil.deptUtilExt", function(){
    		application.getController("deptutil.deptUtilExt");//注册控制器
    	})   		
	},
	
	//更新数据
	afterrender: function(grid){
		var store = grid.getStore();
//		var checkType = Ext.getCmp('check-checkSearch-checkType').getValue();
//		var json = "{'checkType':'"+checkType+"'}";
//		Ext.apply(store.proxy.extraParams, {jsonString: json});
		store.load();			
	},
	
	//1.更新数据、2.控制界面按钮
	itemclick: function(grid, record){
		Ext.getCmp('check-checkList-viewButton').setDisabled(false);
		var userCode = Ext.get('workNumberId').getValue();
		var workNum = record.data.registerWorkNum;
		if(userCode == workNum || userCode == 'sapxmb.nj'|| userCode == 'admin'){
			Ext.getCmp('check-checkList-editButton').setDisabled(false);	
			Ext.getCmp('check-checkList-deleteButton').setDisabled(false);
		}else{
			Ext.getCmp('check-checkList-editButton').setDisabled(true);	
			Ext.getCmp('check-checkList-deleteButton').setDisabled(true);			
		}
		//控制子表按钮
		Ext.getCmp('check-checkcontList-addButton').setDisabled(false);
		var checkNum = record.data.checkNum;
		var checkType = record.data.checkType;
		var grid = Ext.getCmp('check-checkcontList-id');
		var param = "{'checkNum':'"+checkNum+"','checkType':'"+checkType+"'}";
		var store = grid.getStore();
    	Ext.apply(store.proxy.extraParams,{jsonString: param});
    	Ext.getCmp('check-checkcontList-pageId').moveFirst();	
	},
	
	//增加窗口
	addBtn: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '调度会-增加',
			modal: true,
			//maximizable: true,
			constrain:true,
			autoScroll: true,				
			border: 0,
			items: [{xtype: 'check-checkForm'}],
			buttons: [{scope: this, text:'添加',handler: this.saveAddBtn},{text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		win.show();
	},
	
	//保存增加
	saveAddBtn: function(btn){
		//alert('增加');
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;
		var jsonString = Ext.encode(record);
		var grid = Ext.getCmp('check-checkList-id');
		var store = grid.getStore();
		var url = store.proxy.api.create;
		Ext.Ajax.request({
			scope: this,
			url: url,
			params: {jsonString: jsonString},
			success: function(response){
				var text = response.responseText;
				var result = Ext.decode(text);
				if(result.success){
					record = result.obj;
//					record.id = result.obj.id;
//					record.checkDate = Ext.util.Format.date(record.checkDate, 'Y-m-d');
					store.add(record);
					win.close();
				}else{
					this.utilWin.failwin(result.message);
				}
			}
		});
	},
	
	//修改窗口
	updateBtn: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '调度会-修改',
			modal: true,
			//maximizable: true,
			constrain:true,
			autoScroll: true,				
			border: 0,
			items: [{xtype: 'check-checkForm'}],
			buttons: [{scope: this,text: '修改',handler: this.saveUpdate},{text: '取消', handler: function(btn){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var flag = this.utilWin.onWin(records);
		if(!flag) return;//如果删除数据后需要这个校验		
//		console.log(records[0]);
		win.down('form').getForm().loadRecord(records[0]);
		Ext.getCmp('check-checkForm-checkType').setReadOnly(true);
		Ext.getCmp('check-checkForm-checkType').setFieldStyle("color:gray");
		win.show();
	},
	
	//修改保存
	saveUpdate: function(btn){
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;
		var grid = Ext.getCmp('check-checkList-id');
		var store = grid.getStore();
		var jsonString = Ext.encode(record);
		var url = store.proxy.api.update;
		Ext.Ajax.request({
			scope: this,
			url: url,
			params: {jsonString: jsonString},
			success: function(response){
				var text = response.responseText;
				var result = Ext.decode(text);
				if(result.success){
					form.getRecord().set(record);
					store.commitChanges();
					win.close();
				}else{
					this.utilWin.failwin(result.message);
				}
			}
		});
	},
	
	//删除操作
	deleteBtn: function(btn){
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var jsonString = Ext.encode(records[0].data);
		Ext.Msg.confirm('删除','您确定删除该条数据吗?',function(btn){
			if(btn == 'yes'){
				this.confirmDelete(records[0], grid);
			}
		},this);
	},
	
	//确认删除
	confirmDelete: function(record, grid){
		var jsonString = Ext.encode(record.data);
		var store = grid.getStore();
		var url = store.proxy.api.destroy;
		Ext.Ajax.request({
			scope: this,
			url: url,
			params: {jsonString: jsonString},
			success: function(response){
				var text = response.responseText;
				var result = Ext.decode(text);
				if(result.success){
					store.remove(record);
					//恢复按钮变暗
					Ext.getCmp('check-checkList-editButton').setDisabled(true);	
					Ext.getCmp('check-checkList-deleteButton').setDisabled(true);						
				}else{
					this.utilWin.failwin(result.message);
				}
			}
		});
	},
	
	//系统参数查询
	onSearchBtn: function(btn){
		var form = btn.up('form');
		var record = form.getForm().getValues();
		var checkYear = record.checkYear;
		var checkNum = record.checkNum;
		var checkType = record.checkType;
		var startTime = record.startTime;
		var endTime = record.endTime;
		var json = "{";
		if(checkYear != ''){
			json = json +"'checkYear':'"+checkYear+"',";
		}
		if(checkNum != ''){
			json = json +"'checkNum':'"+checkNum+"',";
		}
		if(checkType != ''){
			json = json +"'checkType':'"+checkType+"',";
		}
		if(startTime != ''){
			json = json +"'startTime':'"+startTime+"',";
		}
		if(endTime != ''){
			json = json +"'endTime':'"+endTime+"',";
		}
		json = json + "}";
		var grid = Ext.getCmp('check-checkList-id');
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, {jsonString : json});
		Ext.getCmp('check-checkList-pageId').moveFirst();		
	},
	view: function(own) {
		var grid = own.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var win = Ext.create('Ext.window.Window',{
			title:'调度会-查看',
			modal:true,
			//maximizable: true,
			constrain:true,
			autoScroll: true,				
			closable: false,
			border: 0,
			buttons:[{xtype:'button',text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign:'right',
			items:[
				{xtype:'check-checkForm'}
			]
		});	
		win.child('form').getForm().loadRecord(records[0]);
		var flag = this.utilWin.onWin(records);
		if(!flag) return;//如果删除数据后需要这个校验				
		//this.utilWin.setReadOnly(win.down('form'));
		win.show();
	},
	onTriggerClick_leader: function(btn){
//		alert('onTriggerClick_leader');
		var win = Ext.create('Ext.window.Window',{
			title: '员工-选择',
			modal: true,
			maximizable: true,
			width: 750,
			height: 500,
			border: 0,
			constrain:true,
			autoScroll: true,
			layout: 'fit',
			items: [{xtype: 'employeutil-employeUtilExt'}],
			buttons: [{scope: this, text:'选择', handler: this.saveAddBtn_leader},{text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}]
		});
		win.show();	
	},
	saveAddBtn_leader: function(btn){
		var dataMap = getEmployeExt().map;
		var item ="";
		for ( var key in dataMap) {
//			console.log(key+"----"+dataMap[key]);
			item += dataMap[key]+","
		}
		item = item.substring(0, item.length-1);
		Ext.getCmp('check-checkForm-leader').setValue(item);
		btn.up('window').close();
	},	
	onTriggerClick_checkCompere: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '员工-选择',
			modal: true,
			maximizable: true,
			width: 750,
			height: 500,
			border: 0,
			constrain:true,
			autoScroll: true,
			layout: 'fit',
			items: [{xtype: 'employeutil-employeUtilExt'}],
			buttons: [{scope: this, text:'选择', handler: this.saveAddBtn_checkCompere},{text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}]
		});
		win.show();	
	},
	saveAddBtn_checkCompere: function(btn){
		var dataMap = getEmployeExt().map;
		var item ="";
		for ( var key in dataMap) {
//			console.log(key+"----"+dataMap[key]);
			item += dataMap[key]+","
		}
		item = item.substring(0, item.length-1);
		Ext.getCmp('check-checkForm-checkCompere').setValue(item);
		btn.up('window').close();
	},	
	onTriggerClick_checkRegister: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '员工-选择',
			modal: true,
			maximizable: true,
			width: 750,
			height: 500,
			border: 0,
			constrain:true,
			autoScroll: true,
			layout: 'fit',
			items: [{xtype: 'employeutil-employeUtilExt'}],
			buttons: [{scope: this, text:'选择', handler: this.saveAddBtn_checkRegister},{text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}]
		});
		win.show();	
	},
	saveAddBtn_checkRegister: function(btn){
		var dataMap = getEmployeExt().map;
		var item ="";
		var arr = [];
		for ( var key in dataMap) {
//			console.log(key+"----"+dataMap[key]);
			item += dataMap[key]+","
			arr.push(key);
		}
		item = item.substring(0, item.length-1);
		Ext.getCmp('check-checkForm-employeId').setValue(arr[0]);
		Ext.getCmp('check-checkForm-checkRegister').setValue(item);
		btn.up('window').close();
	},
	//有树形结构的部门UTIL
	onTriggerClick_dept: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '部门-选择',
			modal: true,
			maximizable: true,
			width: 750,
			height: 500,
			border: 0,
			constrain:true,
			autoScroll: true,
			layout: 'fit',
			items: [{xtype: 'deptutil-deptutilList'}],
			buttons: [{scope: this, text:'选择', handler: this.saveAddBtn_dept},{text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}]
		});
		win.show();	
		var store = win.down('grid').getStore();
		store.on('load',function(own){
			var json = "{'parentDept':'#'}";
			Ext.apply(own.proxy.extraParams, {jsonString: json});
		})
		store.load();
	},
	saveAddBtn_dept: function(btn){
		var grid = Ext.getCmp('deptutil-deptutilList-id');
		var records = grid.getSelectionModel().getSelection();
		var item ="";
		if(records.length > 0){
			for(var i = 0; i < records.length; i++){
				item += records[i].data.deptName+','
			}
			item = item.substring(0, item.length-1);
		}
		Ext.getCmp('check-checkForm-dept').setValue(item);
		btn.up('window').close();
	},	
/*	//有树形结构的部门UTIL
	onTriggerClick_dept: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '部门-选择',
			modal: true,
			border: 0,
			width: 750,
			height: 500,
			layout: 'fit',
			items: [{xtype: 'deptutil-deptUtilExt'}],
			buttons: [{scope: this, text:'选择', handler: this.saveAddBtn_dept},{text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}]
		});
		win.show();	
	},
	saveAddBtn_dept: function(btn){
		var dataMap = getDeptExt().map;
		var item ="";
		for ( var key in dataMap) {
//			console.log(key+"----"+dataMap[key]);
			item += dataMap[key]+","
		}
		item = item.substring(0, item.length-1);
		Ext.getCmp('check-checkForm-dept').setValue(item);
		btn.up('window').close();
	},	*/
	//-------------------------回复----------------------------------------------
	addBtn_attach: function(){
		var win = Ext.create('Ext.window.Window',{
			title: '新增回复',
			modal: true,
			border: 0,
			items: [{xtype: 'check-checkcontForm'}],
			buttons: [{scope: this, text:'添加',handler: this.saveAddBtn_attach},{text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var grid = Ext.getCmp('check-checkList-id');
		var records = grid.getSelectionModel().getSelection();
		if(records.length == 0){
			return;
		}
		Ext.getCmp('check-checkcontForm-checkNum').setValue(records[0].data.checkNum);
		Ext.getCmp('check-checkcontForm-checkType').setValue(records[0].data.checkType);
		Ext.getCmp('check-checkcontForm-checkDate').setValue(records[0].data.checkDate);
		win.show();
	},
	//保存增加
	saveAddBtn_attach: function(btn){
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();		
		if(!form.isValid()) return;
		var jsonString = Ext.encode(record);		
		var grid = Ext.getCmp('check-checkcontList-id');
		var store = grid.getStore();
		var url = store.proxy.api.create;
//		console.log("url is:"+url);
		Ext.Ajax.request({
			scope: this,
			url: url,
			params: {jsonString: jsonString},
			success: function(response){
				var text = response.responseText;
				var result = Ext.decode(text);
				if(result.success){
					record = result.obj;
					//record.subDate = Ext.Date.parse(Ext.util.Format.date(result.obj.subDate,'Y-m-d H:i:s'), "Y-m-d H:i:s");
					//record.subDate = Ext.util.Format.date(result.obj.subDate, 'Y-m-d H:i:s');
					//record.subDate = Ext.util.Format.date(Date.parse(result.obj.subDateStr, 'Y-m-d H:i:s'), 'Y-m-d H:i:s');
					record.subDate = result.obj.subDateStr;
					store.add(record);
					win.close();
				}else{
					this.utilWin.failwin(result.message);
				}
			}
		});	
	},
	itemclick_attach: function(grid, record){
		Ext.getCmp('check-checkcontList-viewButton').setDisabled(false);
		var userCode = Ext.get('workNumberId').getValue();
		var workNum = record.data.subUserWorkNum;
		if(userCode == workNum || userCode == 'sapxmb.nj'|| userCode == 'admin'){
			Ext.getCmp('check-checkcontList-editButton').setDisabled(false);	
			Ext.getCmp('check-checkcontList-deleteButton').setDisabled(false);
		}else{
			Ext.getCmp('check-checkcontList-editButton').setDisabled(true);	
			Ext.getCmp('check-checkcontList-deleteButton').setDisabled(true);			
		}		
	},
	//修改窗口
	updateBtn_attach: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '回复修改',
			modal: true,
			border: 0,
			items: [{xtype: 'check-checkcontForm'}],
			buttons: [{scope: this,text: '修改',handler: this.saveUpdate_attach},{text: '取消', handler: function(btn){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var flag = this.utilWin.onWin(records);
		if(!flag) return;//如果删除数据后需要这个校验	
		win.down('form').getForm().loadRecord(records[0]);
		win.show();
	},
	
	//修改保存
	saveUpdate_attach: function(btn){
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;
		var grid = Ext.getCmp('check-checkcontList-id');
		var store = grid.getStore();
		var jsonString = Ext.encode(record);
		var url = store.proxy.api.update;
		Ext.Ajax.request({
			scope: this,
			url: url,
			params: {jsonString: jsonString},
			success: function(response){
				var text = response.responseText;
				var result = Ext.decode(text);
				if(result.success){
					form.getRecord().set(record);
//					store.commitChanges();
					win.close();
				}else{
					this.utilWin.failwin(result.message);
				}
			}
		});
	},
	view_attach: function(own) {
		var grid = own.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var win = Ext.create('Ext.window.Window',{
			title:'回复-查看',
			modal:true,
			closable: false,
			border: 0,
			buttons:[{xtype:'button',text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign:'right',
			items:[
				{xtype:'check-checkcontForm'}
			]
		});	
		win.child('form').getForm().loadRecord(records[0]);
		var flag = this.utilWin.onWin(records);
		if(!flag) return;//如果删除数据后需要这个校验				
		this.utilWin.setReadOnly(win.down('form'));
		win.show();
	},	
	deleteBtn_attach: function(btn){
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var jsonString = Ext.encode(records[0].data);
		Ext.Msg.confirm('删除','您确定删除该条数据吗?',function(btn){
			if(btn == 'yes'){
				this.confirmDelete_attach(records[0], grid);
			}
		},this);
	},
	confirmDelete_attach: function(record, grid){
		var jsonString = Ext.encode(record.data);
		var store = grid.getStore();
		var url = store.proxy.api.destroy;
		Ext.Ajax.request({
			scope: this,
			url: url,
			params: {jsonString: jsonString},
			success: function(response){
				var text = response.responseText;
				var result = Ext.decode(text);
				if(result.success){
					store.remove(record);
					//恢复按钮变暗
					Ext.getCmp('check-checkcontList-editButton').setDisabled(true);	
					Ext.getCmp('check-checkcontList-deleteButton').setDisabled(true);						
				}else{
					this.utilWin.failwin(result.message);
				}
			}
		});
	}	
});
