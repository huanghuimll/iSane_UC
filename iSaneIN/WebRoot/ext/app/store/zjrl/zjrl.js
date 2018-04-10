Ext.define('isane.store.zjrl.zjrl',{
	extend:'Ext.data.Store',
	model:'isane.model.zjrl',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/ZJRL/list',
	    	//read: 'ext/test/lptj.json',
	    	add: 'api/ZJRL/addAndUpdate',
	    	publicUrl: 'api/ZJRL/'
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