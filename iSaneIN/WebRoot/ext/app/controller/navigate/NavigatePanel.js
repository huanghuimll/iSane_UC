Ext.define('isane.controller.navigate.NavigatePanel', {
	extend : 'Ext.app.Controller',
	stores : ['navigate.Navigate'],
	models : ['Navigate'],
	views : ['navigate.NavigatePanel', 'navigate.NavigateList', 'navigate.NavigateForm'],
	init: function() {
		this.control({	
			'navigate-NavigateList':{
				afterrender:this.afterrender,
				itemclick: this.itemclick
			},	
			'navigate-NavigateList button[text=增加]': {
				click: this.click_add
			},	
			'navigate-NavigateList button[text=明细]': { 
				click : this.click_view
			}, 
			'navigate-NavigateList button[text=修改]':{
				click: this.click_update
			},
			'navigate-NavigateList button[text=删除]':{
				click: this.click_delete
			},
			'navigate-NavigateList button[text=搜索]':{
				click: this.click_search
			}
		});
	},
	
	afterrender: function(panel){
		//panel.getStore().load();	
		var store = panel.getStore();
		Ext.apply(store.proxy.extraParams, {plantCode: QJ_PlantCode});
		Ext.getCmp('navigate-NavigateList-pageId').moveFirst();		
	},
	
	itemclick: function(grid){
		//var bts = Ext.getCmp('navigate-NavigateList-id').query('button[disabled=true]');
		//console.log(bts);
		Ext.getCmp('navigate-NavigateList-viewButton').setDisabled(false);
		Ext.getCmp('navigate-NavigateList-editButton').setDisabled(false);
		Ext.getCmp('navigate-NavigateList-removeButton').setDisabled(false);
	},
	
	click_add: function(){
		//alert('click_add');
		var win = Ext.create('Ext.window.Window',{
			title: '导航图增加',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_add',
			border: 0,
			items: [{xtype: 'navigate-NavigateForm'}],
			buttons: [{scope: this, text:'添加', iconCls:'ok1', handler: this.click_add_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});	
		if(QJ_PlantCode){
			var form = win.down('form');
			form.down('combobox[name=plantCode]').setValue(QJ_PlantCode);
			form.down('combobox[name=plantCode]').setReadOnly(true);
			form.down('combobox[name=plantCode]').setFieldStyle('color:grey');
			
			form.down('textfield[name=navCode]').setValue(QJ_PlantCode+"_"+"NavCode_");
			
			win.show();	
		}
	},
	
	click_add_but: function(btn){
		//alert('click_add');
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;		
		var grid = Ext.getCmp('navigate-NavigateList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
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
			title:'导航图查看',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_view',			
			border: 0,
			items:[{xtype:'navigate-NavigateForm'}],
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
			title: '导航图修改',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_update',			
			border: 0,
			items: [{xtype: 'navigate-NavigateForm'}],
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
		var grid = Ext.getCmp('navigate-NavigateList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'put',
			url: url,
			params: record,
			success: function(response){
	        	form.getRecord().set(record);
                store.commitChanges();				
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
		var navName = Ext.getCmp('navigate-NavigateList-navName').getValue();
		var isPublic = Ext.getCmp('navigate-NavigateList-isPublic').getValue();
		var obt = {
			plantCode: QJ_PlantCode,
			navName: navName,
			isPublic: isPublic
		};
		var grid = btn.up('grid');
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, obt);
		Ext.getCmp('navigate-NavigateList-pageId').moveFirst();		
	}
	
	
});
