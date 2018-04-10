Ext.define('isane.store.aq_yxgl_pxtj.pxtj',{
	extend:'Ext.data.Store',
	model:'isane.model.pxtj',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/AQPXTJ/list',
	    	//read: 'ext/test/pxtj.json',
	    	add: 'api/AQPXTJ/addAndUpdate',
	        publicUrl: 'api/AQPXTJ/'    		
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