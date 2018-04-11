Ext.define('isane.store.role.RoleUserR',{
	extend:'Ext.data.Store',
	model:'isane.model.RoleUser',
	pageSize: 20,
	autoLoad:false,
	proxy:{
	   type:'ajax',
	   enablePaging: true,
	   api: {
        	create: 'api/RoleUser/addRoleUsers',
        	read: 'api/RoleUser/queryUsersIn'
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