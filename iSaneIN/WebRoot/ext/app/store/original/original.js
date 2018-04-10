Ext.define('isane.store.original.original',{
	extend:'Ext.data.Store',
	model:'isane.model.original',
	pageSize: 30,
	autoLoad:false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/OriginalType/queryAll',
	    	//read: 'test/original.json',
	    	add: 'api/OriginalType/addAndUpdate',
	    	upload: 'api/Import/in'
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