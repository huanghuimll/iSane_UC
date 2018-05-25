Ext.define('isane.store.aq_kkxgl.organtree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'api/DimOrganization/selectTree',
        //url: 'ext/test/organTree.json',
        reader:'json'
    },
    root: {  
        text: '==ROOT==',
        expanded: false
    }  
});