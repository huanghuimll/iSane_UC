Ext.define('isane.store.dimarea.dimarea',{
	extend:'Ext.data.Store',
	model:'isane.model.dimarea',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/DimArea/list',
	    	//read: 'ext/test/lptj.json',
	    	add: 'api/DimArea/addAndUpdate',
	    	publicUrl: 'api/DimArea/'
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