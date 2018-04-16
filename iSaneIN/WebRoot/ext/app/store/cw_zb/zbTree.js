Ext.define('isane.store.cw_zb.zbTree',{
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
        text: '根目录',
        expanded: false
    }  
});