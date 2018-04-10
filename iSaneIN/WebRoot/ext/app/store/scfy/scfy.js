Ext.define('isane.store.scfy.scfy',{
	extend:'Ext.data.Store',
	model:'isane.model.scfy',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/SCFY/list',
	    	//read: 'ext/test/lptj.json',
	    	add: 'api/SCFY/addAndUpdate',
	    	publicUrl: 'api/SCFY/'
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