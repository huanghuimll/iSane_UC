Ext.define('isane.store.user.organTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.organtree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: 'ext/test/cwTree.json',
        url: 'api/DimOrganization/selectTree',
        reader:'json'
    },
    root: {  
        text: '==ROOT==',
        expanded: false
    }  
});