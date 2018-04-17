Ext.define('isane.store.aq_rb_rl.rbTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: 'ext/test/rbTree.json',
        url: 'api/DimOrganization/selectCTE',
        reader:'json'
    },
    root: {  
        text: '==ROOT==',
        expanded: false
    }  
});