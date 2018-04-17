Ext.define('isane.store.dl_fdl.zbTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: 'ext/test/cwTree.json',
        url: 'api/DimOrganization/selectCTE',
        reader:'json'
    },
    root: {  
        text: '==ROOT==',
        expanded: false
    }  
});