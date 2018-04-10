Ext.define('isane.store.system.systemitemvalue',{
	extend:'Ext.data.Store',
	model:'isane.model.systemitemvalue',
	pageSize: 30,
	autoLoad: true,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/SystemItemValue/list',
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