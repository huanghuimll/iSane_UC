Ext.define('isane.view.mainview.MainMenuC',{
	extend:'Ext.tree.Panel',
	alias:'widget.mainview-MainMenuC', 
	id: 'mainview-MainMenuC-id',
	iconCls: 'menu_server',
	rootVisible: false, 
	store: Ext.create('isane.store.mainview.MenuTree'),
	border: 0,
	tools:[
   {
	    type:'refresh',
	    tooltip: 'Refresh the Data',
	    handler: function(event, toolEl, panelHeader) {
	        var own = panelHeader.ownerCt;
			var store = own.getStore();
	        new Ext.LoadMask(own, {msg:"Loading...", store: store}).show();
			Ext.apply(store.proxy.extraParams, {actionType: 3, menuTypeId: 1});
			store.load();            
	    }
   	}
   	],	
	listeners:{
		afterrender: function(own){
			//console.log('CCCC');
			var store = own.getStore();
			Ext.apply(store.proxy.extraParams, {actionType: 3, menuTypeId: 1});
			store.load({
			    scope: this,
			    callback: function(records, operation, success) {
			    	var root = this.getRootNode();
			    	if(!root.hasChildNodes()){
						//var panel = Ext.getCmp('mainview-MainMenuC-id');
						//panel.setVisible(false);		
						//panel.hide();
						//panel.setDisabled(true);
			    		this.ownerCt.remove(this);
			    	}
			    }				
			});
			store.getRootNode().set('expanded', true);
		},
	}
});