Ext.define('isane.store.aq_kkxgl.yxzt',{
	extend:'Ext.data.Store',
	model:'isane.model.yxzt',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/AQYXZT/list',
	    	//read: 'ext/test/lptj.json',
	    	add: 'api/AQYXZT/addAndUpdate',
	    	publicUrl: 'api/AQYXZT/'
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