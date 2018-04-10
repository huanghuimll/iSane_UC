Ext.define('isane.store.attachment.attachment',{
	extend:'Ext.data.Store',
	model:'isane.model.attachment',
	pageSize: 30,
	autoLoad:false,
	proxy:{
	    type:'ajax',
	    enablePaging: true,
	    method: 'GET',
	    api: {
        	read: 'api/Attachment/list',
	    	//read: 'ext/test/aqgl.json',
	    	add: 'api/Attachment/addAndUpdate',
	    	publicUrl: 'api/Attachment/'
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