Ext.define('isane.store.mainview.MenuTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.Menu',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: 'api/Menu/listByUser',
        url: 'api/Menu/4u3d/atree',
        //url: 'ext/test/menu.json',
        reader:'json'
    },
    root: {  
        text: '==ROOT==',
        expanded: false
    }  
});