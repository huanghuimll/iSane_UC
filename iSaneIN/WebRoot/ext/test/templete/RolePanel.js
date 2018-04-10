Ext.define('isane.controller.role.RolePanel', {
	extend : 'Ext.app.Controller',
	stores : ['role.Role'],
	models : ['Role'],
	views : ['role.RolePanel', 'role.RoleList', 'role.RoleForm'],
	init: function() {
		this.control({	
			'role-RoleList':{
				afterrender:this.afterrender,
				itemclick: this.itemclick
			},	
			'role-RoleList button[text=增加]': {
				click: this.click_add
			},	
			'role-RoleList button[text=明细]': { 
				click : this.click_view
			}, 
			'role-RoleList button[text=修改]':{
				click: this.click_update
			},
			'role-RoleList button[text=删除]':{
				click: this.click_delete
			},
			'role-RoleList button[text=搜索]':{
				click: this.click_search
			},
			'role-RoleList button[text=上移]':{
				click: this.click_up
			},
			'role-RoleList button[text=下移]':{
				click: this.click_down
			},
			
		});
	},
	afterrender: function(panel){
		panel.getStore().load();	
	},
	itemclick: function(grid){
		//var bts = Ext.getCmp('role-RoleList-id').query('button[disabled=true]');
		//console.log(bts);
		Ext.getCmp('role-RoleList-viewButton').setDisabled(false);
		Ext.getCmp('role-RoleList-editButton').setDisabled(false);
		Ext.getCmp('role-RoleList-removeButton').setDisabled(false);
		Ext.getCmp('role-RoleList-upButton').setDisabled(false);
		Ext.getCmp('role-RoleList-downButton').setDisabled(false);
	},
	click_add: function(){
		//alert('click_add');
		var win = Ext.create('Ext.window.Window',{
			title: '角色增加',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_add',
			border: 0,
			items: [{xtype: 'role-RoleForm'}],
			buttons: [{scope: this, text:'添加', iconCls:'ok1', handler: this.click_add_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});	
		if(QJ_PlantCode){
			var form = win.down('form');
			form.down('combobox[name=plantCode]').setValue(QJ_PlantCode);
			form.down('combobox[name=plantCode]').setReadOnly(true);
			form.down('combobox[name=plantCode]').setFieldStyle('color:grey');
			
			form.down('textfield[name=roleCode]').setValue(QJ_PlantCode+"_"+"ROLE_");
			
			win.show();	
		}
	},
	click_add_but: function(btn){
		//alert('click_add');
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;		
		var grid = Ext.getCmp('role-RoleList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUlr;
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: url,
			params: record,
			success: function(response){
				var text = response.responseText;
				var rec = Ext.decode(text);
				store.add(rec);
				win.close();
				Ext.example.msg('系统提示！', "增加成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});	
	},
	click_view: function(own) {
		var grid = own.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var win = Ext.create('Ext.window.Window',{
			title:'角色查看',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_view',			
			border: 0,
			items:[{xtype:'role-RoleForm'}],
			buttons: [{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign:'right'
		});	
		if(records[0]){
			win.child('form').getForm().loadRecord(records[0]);
			QJ_UtilEntity.setReadOnly(win.down('form'));
			win.show();
		}
	},
	click_update: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '角色修改',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_update',			
			border: 0,
			items: [{xtype: 'role-RoleForm'}],
			buttons: [{scope: this, text:'修改', iconCls:'ok1', handler: this.click_edit_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();
		if(records[0]){
			var form = win.down('form');
			form.loadRecord(records[0]);
			
			form.down('combobox[name=plantCode]').setReadOnly(true);
			form.down('combobox[name=plantCode]').setFieldStyle('color:grey');			
			win.show();
		}
	},	
	
	click_edit_but: function(btn){
		//alert("click_refresh");
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid())return;
		var grid = Ext.getCmp('role-RoleList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUlr;
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'put',
			url: url,
			params: record,
			success: function(response){
	        	form.getRecord().set(record);
                //store.commitChanges();				
				win.close();
				Ext.example.msg('系统提示！', "修改成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
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
	click_search: function(btn){
		var roleName = Ext.getCmp('role-RoleList-roleName').getValue()
		var roleNameFl;
		var reg = /^[a-zA-Z]*$/;//英文表达式
		if(reg.test(roleName)){
			roleNameFl = roleName;
			roleName= '';
		}
		var obt = {
				roleName: roleName,
				roleNameFl: roleNameFl
		};
		
		var grid = btn.up('grid');
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, obt);
		Ext.getCmp('role-RoleList-pageId').moveFirst();		
	},
	click_up: function(btn){
		var grid = btn.up('grid');
		QJ_UtilEntity.upItem(grid);
	},
	click_down: function(btn){
		var grid = btn.up('grid');
		QJ_UtilEntity.downItem(grid);		
	}
});
