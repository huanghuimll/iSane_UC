Ext.define('isane.store.role.RoleUserL',{
	extend:'Ext.data.Store',
	model:'isane.model.RoleUser',
	pageSize: 20,
	autoLoad:false,
	proxy:{
	   type:'ajax',
	   enablePaging: true,
	   api: {
		   	create: 'api/RoleUser/deleteRoleUsers',
        	read: 'api/RoleUser/queryUsersNotIn',
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