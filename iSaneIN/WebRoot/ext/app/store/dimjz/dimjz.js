Ext.define('isane.store.dimjz.dimjz',{
	extend:'Ext.data.Store',
	model:'isane.model.dimjz',
	pageSize: 30,
	autoLoad: true,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/DimJz/list',
	    	//read: 'ext/test/lptj.json',
	    	add: 'api/DimJz/addAndUpdate',
	    	publicUrl: 'api/DimJz/'
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