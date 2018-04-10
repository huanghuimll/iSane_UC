Ext.define('isane.store.aq_kjgl_zltj.zltj',{
	extend:'Ext.data.Store',
	model:'isane.model.zltj',
	pageSize: 30,
	autoLoad: false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/ZLTJ/list',
	    	//read: 'ext/test/zltj.json',
	        publicUrl: 'api/ZLTJ/'    		
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