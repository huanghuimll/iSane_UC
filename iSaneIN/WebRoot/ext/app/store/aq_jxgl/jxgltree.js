Ext.define('isane.store.aq_jxgl.jxgltree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.jxgltree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ext/test/jxglTree.json',
        reader:'json'
    },
    root: {	  
        text: '分工公司',
        expanded: false
    }  
});