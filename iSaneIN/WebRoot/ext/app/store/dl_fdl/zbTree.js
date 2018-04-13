Ext.define('isane.store.dl_fdl.zbTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ext/test/cwTree.json',
        reader:'json'
    },
    root: {  
        text: '广东分工公司',
        expanded: false
    }  
});