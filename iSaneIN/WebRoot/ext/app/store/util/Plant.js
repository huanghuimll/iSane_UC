Ext.define('isane.store.util.Plant',{
	extend:'Ext.data.Store',
	model:'isane.model.Plant',
	pageSize: 10000,
	autoLoad: true,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    api: {
        	//read: 'ext/test/plant.json'
	    	//read: 'api/Dept/list?deptType=3'
        	read: 'api/DimOrganization/list'
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