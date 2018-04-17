Ext.define('isane.store.aq_yb_lr_hb.hbTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: 'ext/test/hbTree.json',
        url: 'api/DimOrganization/selectCTE',
        reader:'json'
    },
    root: {  
    	text: '==ROOT==',
        expanded: false
    }  
});