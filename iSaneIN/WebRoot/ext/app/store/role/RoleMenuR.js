Ext.define('isane.store.role.RoleMenuR',{
	extend:'Ext.data.Store',
	model:'isane.model.RoleMenu',
	pageSize:30,
	autoLoad:false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    api: {
        	read: 'queryMenuByRoleR'
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