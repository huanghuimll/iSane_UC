Ext.define('isane.store.aq_yb_lr_hb.hbTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ext/test/hbTree.json',
        reader:'json'
    },
    root: {  
        text: '广东分工公司',
        expanded: false
    }  
});