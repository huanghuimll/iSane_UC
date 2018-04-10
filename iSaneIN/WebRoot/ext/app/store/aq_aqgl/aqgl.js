Ext.define('isane.store.aq_aqgl.aqgl',{
	extend:'Ext.data.Store',
	model:'isane.model.aqgl',
	pageSize: 30,
	autoLoad:false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/AQGL/list',
	    	//read: 'ext/test/aqgl.json',
	    	add: 'api/AQGL/addAndUpdate',
	    	publicUrl: 'api/AQGL/'
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