Ext.define('isane.controller.BaseController', {
	extend : 'Ext.app.Controller',
	init: function() {
		this.control({	
			'grid':{
				afterrender:this.afterrender,
				itemclick: this.itemclick
			},	
			'button[text=上移]':{
				click: this.click_up
			},
			'button[text=下移]':{
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
//		Ext.getCmp('role-RoleList-viewButton').setDisabled(false);
//		Ext.getCmp('role-RoleList-editButton').setDisabled(false);
//		Ext.getCmp('role-RoleList-removeButton').setDisabled(false);
//		Ext.getCmp('role-RoleList-upButton').setDisabled(false);
//		Ext.getCmp('role-RoleList-downButton').setDisabled(false);
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
