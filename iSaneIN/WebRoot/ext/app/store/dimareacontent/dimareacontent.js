Ext.define('isane.store.dimareacontent.dimareacontent',{
	extend:'Ext.data.Store',
	model:'isane.model.dimareacontent',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/DimAreaContent/list',
	    	//read: 'ext/test/lptj.json',
	    	add: 'api/DimAreaContent/addAndUpdate',
	    	publicUrl: 'api/DimAreaContent/'
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