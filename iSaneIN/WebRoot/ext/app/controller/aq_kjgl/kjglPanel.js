Ext.define('isane.controller.aq_kjgl.kjglPanel', {
	extend : 'Ext.app.Controller',
	//stores : ['aq_kjgl.kjgl'],
	//models : ['kjgl'],	
	views : ['aq_kjgl.kjglPanel', 'aq_kjgl.kjglWest', 'aq_kjgl.kjglCenter'],
	init: function() {
		this.control({
			//kjgl
    		'aq_kjgl-kjglWest':{
    			itemclick: this.itemclick_dt
    		}
		});
	},
	
    itemclick_dt: function(own, record, item, index, e, eOpts){
    	this.record = record; 
		if(!record.data.leaf){
			return;
		}
    	var mCenter = Ext.getCmp('aq_kjgl-kjglCenter-id');
    	var url = record.get('menuAction');
    	var icon = record.get('icon');
    	var arr = url.split('.');
    	var action = arr[2]+"."+arr[3];
    	//console.log("action is:"+action+",icon is:"+icon);
		if(Ext.ClassManager.isCreated(action)){
		}else{
			application.getController(action);
		}
    	var tabs = mCenter.items;
		for(var i=0;i<tabs.getCount();i++){
			var activeId = tabs.getAt(i).activeId;
			if(tabs.getAt(i).id == "UC-KJGL"+record.data.id){
				mCenter.setActiveTab(tabs.getAt(i));
				return;
			}
		}
		var panel = Ext.create(url, {id:'UC-KJGL'+record.data.id, icon: icon});
		//console.log(panel);
		mCenter.add(panel);
		mCenter.setActiveTab(panel);        	
    }
	
});
