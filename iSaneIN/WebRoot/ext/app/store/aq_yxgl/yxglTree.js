Ext.define('isane.store.aq_yxgl.yxglTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.Menu',
	autoLoad: true,
    proxy: {
        type: 'ajax',
        //url: 'api/Menu/listByUser',
        //url: 'api/Menu/4u3d/atree',
        url: 'ext/test/yxglTree.json',
        reader:'json'
    },
    root: {  
        text: '==ROOT==',
        expanded: false
    }  
});