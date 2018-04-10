Ext.define('isane.store.navigate.Navigate',{
	extend:'Ext.data.Store',
	model:'isane.model.Navigate',
	pageSize: 30,
	autoLoad:false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/Navigate/list',
        	publicUrl:'api/Navigate/'
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