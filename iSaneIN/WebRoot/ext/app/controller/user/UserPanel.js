Ext.define('isane.controller.user.UserPanel', {
	extend : 'Ext.app.Controller',
	stores : ['user.User', 'user.organTree'],
	models : ['User', 'organtree'],
	views : ['user.UserPanel', 'user.UserList', 'user.UserForm'],
	init: function() {
		this.control({	
			'user-UserList':{
				afterrender:this.afterrender,
				itemclick: this.itemclick
			},	
			'user-UserList button[text=增加]': {
				click: this.click_add
			},	
			'user-UserList button[text=明细]': { 
				click : this.click_view
			}, 
			'user-UserList button[text=修改]':{
				click: this.click_update
			},
			'user-UserList button[text=删除]':{
				click: this.click_delete
			},
			'user-UserList button[text=重置密码]':{
				click: this.click_rest
			},		
			'user-UserList #user-UserList-openAndCloseButton':{
				click: this.click_isLock
			},			
			'user-UserList button[text=搜索]':{
				click: this.click_search
			},
			/*'user-UserForm triggerfield[name=employeName]':{
				onTriggerClick: this.onTriggerClick_employeName
			},
			'user-UserList button[text=模板]':{
				click: this.templeteBtn
			},					
			'user-UserList button[text=导出]':{
				click: this.exportBtn
			},					
			'user-UserList button[text=导入]':{
				click: this.importBtn
			},					
			'user-UserList actioncolumn':{
				showPermissWin: this.showPermissWin
			},					
			'user-UserResource button[text=搜索]':{
				click: this.click_searchRes
			},*/
			/*****员工弹出窗******/
			/*'user-EmployeWest':{
				itemclick: this.onItemClick,
				afterrender: this.onAfter_Dept
			},
			'user-EmployeWest [text=搜索]':{
				click: this.click_refresh
			},
			'user-EmployeList button[text=搜索]':{
				click: this.click_searchLib
			}*/			
		});
	},
	
	afterrender: function(panel){
		var store = panel.getStore();
		Ext.apply(store.proxy.extraParams, {});
		store.load();
	},
	
	itemclick: function(grid){
		//var bts = Ext.getCmp('user-UserList-id').query('button[disabled=true]');
		//console.log(bts);
		Ext.getCmp('user-UserList-viewButton').setDisabled(false);
		Ext.getCmp('user-UserList-editButton').setDisabled(false);
		Ext.getCmp('user-UserList-restButton').setDisabled(false);
		Ext.getCmp('user-UserList-removeButton').setDisabled(false);
		Ext.getCmp('user-UserList-upButton').setDisabled(false);
		Ext.getCmp('user-UserList-downButton').setDisabled(false);
		
		var records = grid.getSelectionModel().getSelection();
		if(records[0].data.currentStatus == 1){
			Ext.getCmp('user-UserList-openAndCloseButton').setText("锁定");
			Ext.getCmp('user-UserList-openAndCloseButton').setIconCls("list_startUse");
		}else{
			Ext.getCmp('user-UserList-openAndCloseButton').setText("开锁");
			Ext.getCmp('user-UserList-openAndCloseButton').setIconCls("list_closeUse");
		}
		Ext.getCmp('user-UserList-openAndCloseButton').setDisabled(false);
			
	},
	
	click_add: function(){
		//alert('click_add');
		var win = Ext.create('Ext.window.Window',{
			title: '用户增加',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_add',
			border: 0,
			items: [{xtype: 'user-UserForm'}],
			buttons: [{scope: this, text:'添加', iconCls:'ok1', handler: this.click_add_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		win.show();	
	},
	
	click_add_but: function(btn){
		//alert('click_add');
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;
		var grid = Ext.getCmp('user-UserList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: url+'addUser',
			params: record,
			success: function(response){
				/*var text = response.responseText;
				var rec = Ext.decode(text);*/
				store.add(record);
				win.close();
				Ext.example.msg('系统提示！', "增加成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});			
		//return;
		/*form.getForm().submit({
			scope: this,
			method: 'post',
			url: url+'addUser',
			success: function(form, action){
				var objJson = action.result.objJson;
				var rec = Ext.decode(objJson);
				store.add(rec);
				win.close();
				Ext.example.msg('系统提示！', "增加成功！");
			},
			failure: function(form, action){
				QJ_UtilEntity.failWin(action.response);
				//Ext.example.msg('系统提示！', "删除失败！<br/>error:"+status+"<br/>errorText:"+statusText);
			}			
		});	*/
	},
	
	click_view: function(own) {
		var grid = own.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var win = Ext.create('Ext.window.Window',{
			title:'用户查看',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_view',			
			border: 0,
			items:[{xtype:'user-UserForm'}],
			buttons: [{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign:'right'
		});	
		if(records[0]){
			win.child('form').getForm().loadRecord(records[0]);
			QJ_UtilEntity.setReadOnly(win.down('form'));
			win.show();
			//头像处理
			/*if(records[0].data.photoUrl != null && records[0].data.photoUrl != ''){
				Ext.getCmp('user-UserForm-box').getEl().dom.src = records[0].data.photoUrl;
			}else{
				Ext.getCmp('user-UserForm-box').getEl().dom.src = 'img/default.png';
			}*/
		}
	},
	
	click_update: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '用户修改',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_update',			
			border: 0,
			items: [{xtype: 'user-UserForm'}],
			buttons: [{scope: this, text:'修改', iconCls:'ok1', handler: this.click_edit_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();
		if(records[0]){
			var form = win.down('form');
			form.loadRecord(records[0]);
			/*form.down('combobox[name=plantCode]').setReadOnly(true);
			form.down('combobox[name=plantCode]').setFieldStyle('color:grey');	*/
			win.show();
			//头像处理
		}
	},	
	
	click_edit_but: function(btn){
		//alert("click_refresh");
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid())return;
		var grid = Ext.getCmp('user-UserList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
		//return;
		form.getForm().submit({
			scope: this,
			method: 'post',
			url: url+'updateUser',
			success: function(form, action){
				var objJson = action.result.objJson;
				var rec = Ext.decode(objJson);
				form.getRecord().set(rec);
				win.close();
				Ext.example.msg('系统提示！', "修改成功！");
			},
			failure: function(form, action){
				QJ_UtilEntity.failWin(action.response);
			}			
		});				
	},	
	
	click_delete: function(btn){
		//alert("click_delete");
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();		
		if(records[0]){
			Ext.Msg.confirm('删除', '您确定删除该数据吗?', function(button) {
				if (button == 'yes') {
					this.click_delete_but(records[0], grid, false);
				}
			}, this);		
		}
	},
	
	click_delete_but: function(record, grid){
		//alert("click_delete_but");
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;	
		Ext.Ajax.request({
			scope: this,
			method: 'delete',
			url: url+record.data.id,
			success: function(response){
				var text = response.responseText;
				var rec = Ext.decode(text);	
				store.remove(record);
				Ext.example.msg('系统提示！', "删除成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});		
	},
	
	click_rest: function(btn){
		//alert("click_rest");
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();		
		if(records[0]){
			Ext.Msg.confirm('重置', '您确定重置密码吗?', function(button) {
				if (button == 'yes') {
					this.click_rest_but(records[0], grid, false);
				}
			}, this);		
		}
	},
	
	click_rest_but: function(record, grid){
		//alert("click_delete_but");
		var id = record.data.id;
		var password = "E10ADC3949BA59ABBE56E057F20F883E";
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;	
		Ext.Ajax.request({
			scope: this,
			method: 'put',
			url: url,
			params: {'id': id, 'password': password},
			success: function(response){	
				Ext.example.msg('系统提示！', "重置成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});		
	},
	
	click_isLock: function(btn){
		var grid = Ext.getCmp('user-UserList-id');
		var records = grid.getSelectionModel().getSelection();
		if(!records || records.length == 0) return;
		var record = records[0].data;
		var tempLock = record.currentStatus;
		if(record.currentStatus == 1){
			record['currentStatus'] = 2;
		}else{
			record['currentStatus'] = 1;
		}
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
		Ext.Ajax.request({
			scope: this,
			method: 'put',
			url: url,
			//params: record,
			params: {'id': record.id , 'currentStatus': record['currentStatus']},
			success: function(response){
                //store.commitChanges();				
				Ext.example.msg('系统提示！', "成功！");
				store.load();
				if(tempLock == 1){
					Ext.getCmp('user-UserList-openAndCloseButton').setText("开锁");
					Ext.getCmp('user-UserList-openAndCloseButton').setIconCls("list_closeUse");					
				}else{
					Ext.getCmp('user-UserList-openAndCloseButton').setText("锁定");
					Ext.getCmp('user-UserList-openAndCloseButton').setIconCls("list_startUse");					
				}
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});			
	},		
	
	click_search: function(btn){
		var userName = Ext.getCmp('user-UserList-userName').getValue();
		var reg = /^[a-zA-Z]*$/;//英文表达式
		if(reg.test(userName)){
			userName= '';
		}
		var obt = {
				userName: userName
		};
		
		var grid = btn.up('grid');
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, obt);
		Ext.getCmp('user-UserList-pageId').moveFirst();		
	},
	
	click_up: function(btn){
		var grid = btn.up('grid');
		QJ_UtilEntity.upItem(grid);
	},
	click_down: function(btn){
		var grid = btn.up('grid');
		QJ_UtilEntity.downItem(grid);		
	},
	onTriggerClick_employeName: function(btn){
		//alert('未开发...');
		var win = Ext.create('Ext.window.Window',{
			title: '员工选择',
			modal: true,
			maximizable: true,
			width: 850,
			height: 500,
			border: 0,
			constrain:true,
			autoScroll: true,
			layout: 'border',
			items: [
	    	{
	    		region: 'west',
	            minWidth: 150,
	            maxWidth: 700,
	            width: 250,	
	            collapsible: true,
	            split: true,
	            header: false,
	            border: 0,
	            xtype: 'user-EmployeWest'
	    	},
	    	{
	    		region: 'center',
	    		border: 0,
	    		layout: 'fit',
	    		items:[
	    		{
    				xtype:'user-EmployeList'
	    		}			
	    		]
	    	}			        
	        ],
			buttons: [{scope: this, text:'选择',  iconCls:'ok1', handler: this.onTriggerClick_employeName_save},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}]
		});
		win.show();	
	},
	
	onTriggerClick_employeName_save: function(btn){
		var grid = btn.up('window').down('grid');
		var models = grid.getSelectionModel().getSelection();
		Ext.getCmp('user-UserForm-hidden-employeCode').setValue(models[0].data.employeCode);
		Ext.getCmp('user-UserForm-employeName').setValue(models[0].data.employeName);
		btn.up('window').close();
	},
	
	templeteBtn: function(){
		 window.location.href = 'api/User/exportTemplate';
	},
	
	exportBtn: function(btn){
		var userName = Ext.getCmp('user-UserList-userName').getValue();
		var userNameFl;
		var reg = /^[a-zA-Z]*$/;//英文表达式
		
		var url = "api/User/export?";
		if(userName != null){
			url += "&userName="+userName;
		}
		if(reg.test(userName)){
			url += "&userNameFl="+userName;
		}
		
		window.location.href = url;
	},
	
	importBtn: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '用户导入',
			modal: true,
			border: 0,
			items: [{xtype: 'user-UserImportForm'}],
			buttons: [{scope: this,text: '确定', iconCls:'ok1', handler: this.importSave},{text: '取消', iconCls:'delete1',  handler: function(btn){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		
		win.show();		
	},
	
	importSave: function(btn){
    	var win = btn.up('window');
    	var form = win.down('form').getForm();
    	var grid = Ext.getCmp('user-UserList-id');
    	var store = grid.getStore();    	
        if(form.isValid()){
            form.submit({
            	scope: this,
                url: "api/User/import",
                waitMsg: 'Uploading...',
    			success: function(response){
    				win.close();
    				Ext.example.msg('系统提示！', "导入成功！");
    				store.load();
    			},
    			failure: function(response){
    				QJ_UtilEntity.failWin(response);
    			}
            });
        }		
	},
	
	showPermissWin: function(rec){
		//alert('showPermissWin');
		//console.log(rec);
		var win = Ext.create('Ext.window.Window',{
			title: '权限查看',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_view',			
			border: 0,
			width: 1000,
			height: 500,
			border: 0,
			layout: 'fit',
			items: [
			{
				xtype: 'tabpanel',
				items:[
				{
					title: '所包含角色',
					xtype: 'user-UserRoleList'					
				},
				{
					title: '所包含菜单',
					xtype: 'user-UserMenu'
				},
				{
					title: '数据权限',
					xtype: 'user-UserResource'
				}       
		        ]
			}       
	        ],
			buttons: [{text:'关闭', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
		});
		if(rec){
			win.show();	
			
			var obt = {
					plantCode: rec.data.plantCode,	
					userCode: rec.data.userCode,	
			};	
			
			var urList = Ext.getCmp('user-UserRoleList-id');
			var urStore = urList.getStore();
			Ext.apply(urStore.proxy.extraParams, obt);
			Ext.getCmp('user-UserRoleList-pageId').moveFirst();	
			
			var utree = Ext.getCmp('user-UserMenu-id');
			var storeMenu = utree.getStore();
			Ext.apply(storeMenu.proxy.extraParams, obt);		
			storeMenu.load();
			storeMenu.getRootNode().set('expanded', true);	
			
			Ext.getCmp('user-UserResource-plantCode').setValue(rec.data.plantCode);
			Ext.getCmp('user-UserResource-userCode').setValue(rec.data.userCode);
			//Ext.getCmp('user-UserResource-searchButton').fireEvent('click');//报错:主要原因是button还没渲染出来,所以找不到button
			obt = {
					plantCode: rec.data.plantCode,
					userCode: rec.data.userCode,
					resourceType: 'general'
			};	
			
			var uReList = Ext.getCmp('user-UserResource-id');
			var uReStore = uReList.getStore();
			Ext.apply(uReStore.proxy.extraParams, obt);
			uReStore.load();			
		}
	},
	
	click_searchRes: function(btn){
		
		var plantCode = Ext.getCmp('user-UserResource-plantCode').getValue();
		var userCode = Ext.getCmp('user-UserResource-userCode').getValue();
		var resourceType = Ext.getCmp('user-UserResource-resourceType').getValue();
		var resource = Ext.getCmp('user-UserResource-resource').getValue();
		
		var obt = {
				plantCode: QJ_PlantCode,
				userCode: userCode,
				resourceType: resourceType,
				resource: resource
		};
		
		var grid = btn.up('grid');
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, obt);
		store.load();
	},
	
	onAfter_Dept: function(item){
		//console.log('onAfter_Dept');
		var own = item;
		var obt ={
				parentDeptCode: this.QJ_PlantCode	
		}
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, obt);
		storeTre.load();
		storeTre.getRootNode().set('expanded', true);
	},
	
	onItemClick: function(own, record, item, index, e, eOpts){
		//console.log(record);
		if(!record || record.data.id == 'root') return;
		
		var deptCode = record.data.deptCode;
		var plantCode = QJ_PlantCode;
		
		//变革不用id取值
		var grid = Ext.ComponentQuery.query('user-EmployeList')[0];
		
		grid.down('toolbar textfield[name=plantCode]').setValue(plantCode);
		grid.down('toolbar textfield[name=deptCode]').setValue(deptCode);
		
		var searchBtn = grid.down('toolbar button[text=搜索]');
		
		searchBtn.fireEvent('click', searchBtn);
	},
	
	click_refresh: function(item){
		//alert("click_refresh");
		var obt = {
			parentDeptCode: QJ_PlantCode
		};		
		
		var tree = item.up('treepanel');
		var storeTre = tree.getStore();
		
		Ext.apply(storeTre.proxy.extraParams, obt);		
		storeTre.load();
		storeTre.getRootNode().set('expanded', true);
	},
	
	click_searchLib: function(item){
		var grid = item.up('grid');
		
		var deptCode = grid.down('toolbar textfield[name=deptCode]').getValue();
		var plantCode = grid.down('toolbar textfield[name=plantCode]').getValue();
		var employeName = grid.down('toolbar textfield[name=employeName]').getValue();
		var employeCode = grid.down('toolbar textfield[name=employeCode]').getValue();
		
		var store = grid.getStore();
		
		var obt = {
				plantCode: plantCode,
				deptCode: deptCode,
				employeCode: employeCode,
				employeName: employeName
		}
		
		Ext.apply(store.proxy.extraParams, obt);
		store.load();		
		
	}	
	
});
