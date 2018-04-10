Ext.define('isane.store.system.systemitem',{
	extend:'Ext.data.Store',
	model:'isane.model.systemitem',
	storeId: 'systemitemId',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/SystemItem/list'
	    	//add: 'api/aq_aqglType/addAndUpdate'
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