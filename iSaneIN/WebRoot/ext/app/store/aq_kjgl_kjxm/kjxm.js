Ext.define('isane.store.aq_kjgl_kjxm.kjxm',{
	extend:'Ext.data.Store',
	model:'isane.model.kjxm',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/KJXM/list',
	    	//read: 'ext/test/kjxm.json',
	        publicUrl: 'api/KJXM/'    		
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