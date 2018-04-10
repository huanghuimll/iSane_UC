Ext.define('isane.store.aq_kjgl.kjglTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.Menu',
	autoLoad: true,
    proxy: {
        type: 'ajax',
        //url: 'api/Menu/listByUser',
        //url: 'api/Menu/4u3d/atree',
        url: 'ext/test/kjglTree.json',
        reader:'json'
    },
    root: {  
        text: '==ROOT==',
        expanded: false
    }  
});