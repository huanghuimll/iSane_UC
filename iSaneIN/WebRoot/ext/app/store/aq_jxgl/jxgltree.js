Ext.define('isane.store.aq_jxgl.jxgltree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.jxgltree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: 'ext/test/jxglTree.json',
        url: 'api/DimOrganization/selectTreeJX',
        reader:'json'
    },
    root: {	  
        text: '==ROOT==',
        expanded: false
    }  
});