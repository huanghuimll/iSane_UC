Ext.define('isane.view.mainview.MainMenuB',{
	extend:'Ext.tree.Panel',
	alias:'widget.mainview-MainMenuB', 
	id: 'mainview-MainMenuB-id',
	iconCls: 'menu_office',
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
			Ext.apply(store.proxy.extraParams, {actionType: 2});
			store.load();            
	    }
   	}
   	],	
	listeners:{
		afterrender: function(own){
			var store = own.getStore();
			Ext.apply(store.proxy.extraParams, {actionType: 2});
			store.load({
			    scope: this,
			    callback: function(records, operation, success) {
			    	var root = this.getRootNode();
			    	//root.set('expanded', true);	
			    	if(!root.hasChildNodes()){
						//var panel = Ext.getCmp('mainview-MainMenuB-id');
						//panel.setVisible(false);
			    		this.ownerCt.remove(this);
			    	}
			    }				
			});
			store.getRootNode().set('expanded', true);	
		}
	}
});