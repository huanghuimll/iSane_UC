Ext.define('isane.store.aq_kjgl_lwtj.lwtj',{
	extend:'Ext.data.Store',
	model:'isane.model.lwtj',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/LWTJ/list',
	    	//read: 'ext/test/lwtj.json',
	        publicUrl: 'api/LWTJ/'    		
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