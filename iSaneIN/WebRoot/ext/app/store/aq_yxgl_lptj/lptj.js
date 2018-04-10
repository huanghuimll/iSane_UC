Ext.define('isane.store.aq_yxgl_lptj.lptj',{
	extend:'Ext.data.Store',
	model:'isane.model.lptj',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/AQLP/list',
	    	//read: 'ext/test/lptj.json',
	    	add: 'api/AQLP/addAndUpdate',
	    	publicUrl: 'api/AQLP/'
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