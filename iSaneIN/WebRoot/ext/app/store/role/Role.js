Ext.define('isane.store.role.Role',{
	extend:'Ext.data.Store',
	model:'isane.model.Role',
	pageSize: 30,
	autoLoad:false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    api: {
        	read: 'api/Role/list',
        	publicUrl:'api/Role/'	    	
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