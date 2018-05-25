Ext.define('isane.controller.aq_kjgl_zltj.zltjPanel', {
	extend : 'Ext.app.Controller',
	stores : ['aq_kjgl_zltj.zltj'],
	models : ['zltj'],	
	views : ['aq_kjgl_zltj.zltjPanel', 'aq_kjgl_zltj.zltjList', 'aq_kjgl_zltj.zltjForm', 'aq_kjgl_zltj.zltjWest'],
	init: function() {
		this.control({
			'aq_kjgl_zltj-zltjPanel':{
				beforerender: this.onBeforeRender
			},
			'aq_kjgl_zltj-zltjWest':{
    			itemclick: this.itemclick_dt
    		},				
			'aq_kjgl_zltj-zltjList':{
				//afterrender:this.afterrender,
				itemclick: this.itemclick
			},
			'aq_kjgl_zltj-zltjList button[text=增加]': {
				click: this.click_add
			},	
			'aq_kjgl_zltj-zltjList button[text=明细]': { 
				click : this.click_view
			}, 
			'aq_kjgl_zltj-zltjList button[text=修改]':{
				click: this.click_update
			},
			'aq_kjgl_zltj-zltjList button[text=删除]':{
				click: this.click_delete
			},			
			'aq_kjgl_zltj-zltjList button[text=搜索]':{
				click:this.click_search
			}
		});
	},
	
	onBeforeRender: function(item){
		var own = Ext.getCmp('aq_kjgl_zltj-zltjWest-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {
			organKey: QJ_PlantCode,
			organLev: 1,
			organType: 2
		});
		storeTre.load();
		storeTre.getRootNode().set('expanded', true);
	},
	
    itemclick_dt: function(own, record, item, index, e, eOpts){
    	this.record = record; 
		if(record.data.id == 'root'){
			return;
		}
		//console.log(record.data);
		var organCode = record.data.organCode;
		Ext.getCmp('aq_kjgl_zltj-zltjList-organCode').setValue(organCode);
		Ext.getCmp('aq_kjgl_zltj-zltjList-searchButton').setDisabled(false);
		Ext.getCmp('aq_kjgl_zltj-zltjList-addButton').setDisabled(false);		
		
		var grid = Ext.getCmp('aq_kjgl_zltj-zltjList-id');
		this.afterrender(grid);
    },		
	
	afterrender: function(panel){
		var plantCode = Ext.getCmp('aq_kjgl_zltj-zltjList-organCode').getValue();
		var storeY = Ext.getCmp('aq_kjgl_zltj-zltjList-storeY').getValue();
		var storeM = Ext.getCmp('aq_kjgl_zltj-zltjList-storeM').getValue();
		
		var obt = {
				plantCode: plantCode,
				zlApplyTime: storeY + '-' + QJ_UtilEntity.month(storeM) + '-01 00:00:00'
			};	
		var store = panel.getStore();	
		Ext.apply(store.proxy.extraParams, obt);
		store.load();
	},
	
	click_search: function(btn){
		this.afterrender(btn.up('grid'));
	},
	
	itemclick: function(grid){
		//var bts = Ext.getCmp('role-RoleList-id').query('button[disabled=true]');
		//console.log(bts);
		Ext.getCmp('aq_kjgl_zltj-zltjList-viewButton').setDisabled(false);
		Ext.getCmp('aq_kjgl_zltj-zltjList-editButton').setDisabled(false);
		Ext.getCmp('aq_kjgl_zltj-zltjList-removeButton').setDisabled(false);
	},
	
	click_add: function(){
		//alert('click_add');
		var win = Ext.create('Ext.window.Window',{
			title: '专利统计增加',
			modal: true,
			constrain: true,
			maximizable: true,
			autoScroll: true,			
			iconCls: 'list_add',
			border: 0,
			items: [{xtype: 'aq_kjgl_zltj-zltjForm'}],
			buttons: [{scope: this, text:'添加', iconCls:'ok1', handler: this.click_add_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var plantCode = Ext.getCmp('aq_kjgl_zltj-zltjList-organCode').getValue();
		if(plantCode){
			Ext.getCmp('aq_kjgl_zltj-zltjForm-hidden-plantCode').setValue(plantCode);
			win.show();	
		}
	},
	
	click_add_but: function(btn){
		//alert('click_add');
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;		
		var grid = Ext.getCmp('aq_kjgl_zltj-zltjList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
		//console.log(record);
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
			title:'专利统计查看',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_view',			
			border: 0,
			items:[{xtype:'aq_kjgl_zltj-zltjForm'}],
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
			title: '专利统计修改',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_update',			
			border: 0,
			items: [{xtype: 'aq_kjgl_zltj-zltjForm'}],
			buttons: [{scope: this, text:'修改', iconCls:'ok1', handler: this.click_edit_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();
		if(records[0]){
			var form = win.down('form');
			form.loadRecord(records[0]);
			win.show();
		}
	},	
	
	click_edit_but: function(btn){
		//alert("click_refresh");
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid())return;
		var grid = Ext.getCmp('aq_kjgl_zltj-zltjList-id');
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
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();			
		if(records[0]){
			Ext.Msg.confirm('删除', '您确定删除该数据吗?', function(button) {
				if (button == 'yes') {
					this.singleDelete_but(records[0]);
				}
			}, this);		
		}
	},	
	singleDelete_but: function(record){
		//alert('singleDelete');
		var grid = Ext.getCmp('aq_kjgl_zltj-zltjList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
		//console.log(record.data);
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'delete',
			url: url+record.data.id,
			success: function(response){
				store.remove(record);
				Ext.example.msg('系统提示！', "删除成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});			
	}	
	
});
