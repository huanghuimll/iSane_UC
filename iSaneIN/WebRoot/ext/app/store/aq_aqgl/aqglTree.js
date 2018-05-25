Ext.define('isane.store.aq_aqgl.aqglTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: 'ext/test/hbTree.json',
        url: 'api/DimOrganization/selectTree',
        reader:'json'
    },
    root: {  
    	text: '==ROOT==',
        expanded: false
    }  
});