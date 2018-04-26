Ext.define('isane.store.aq_yb_lr_xzb.xzbTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'api/DimOrganization/selectTree',
        reader:'json'
    },
    root: {  
    	text: '==ROOT==',
        expanded: false
    }  
});