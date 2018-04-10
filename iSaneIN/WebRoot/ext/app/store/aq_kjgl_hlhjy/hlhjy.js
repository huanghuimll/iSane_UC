Ext.define('isane.store.aq_kjgl_hlhjy.hlhjy',{
	extend:'Ext.data.Store',
	model:'isane.model.hlhjy',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/HLHJY/list',
	    	//read: 'ext/test/hlhjy.json',
	        publicUrl: 'api/HLHJY/'    		
        },	
		reader:{
			type:'json',
			root:'list',
			totalProperty : 'totalCount',
			successProperty:'success',
			messageProperty: 'message'
		},
		writer:{
			type:'json'
		}
	}
});