Ext.define('isane.store.lyxs.lyxs',{
	extend:'Ext.data.Store',
	model:'isane.model.lyxs',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/LYXS/list',
	    	//read: 'ext/test/lptj.json',
	    	add: 'api/LYXS/addAndUpdate',
	    	publicUrl: 'api/LYXS/'
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