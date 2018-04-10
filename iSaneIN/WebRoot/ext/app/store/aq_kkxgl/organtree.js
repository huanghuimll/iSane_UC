Ext.define('isane.store.aq_kkxgl.organtree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: 'api/Menu/4u3d/atree',
        url: 'ext/test/organTree.json',
        reader:'json'
    },
    root: {  
        text: '广东分工公司',
        expanded: false
    }  
});