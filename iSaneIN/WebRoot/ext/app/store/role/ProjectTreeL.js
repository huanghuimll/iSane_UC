Ext.define('isane.store.role.ProjectTreeL',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.ProjectTree',
	pageSize: 100000,
    proxy: {
        type: 'ajax',
        url: 'queryProjectByRoleL',
//        url: 'queryInfProCatalogTree',
        reader:'json'
    },
    root: {  
        text: '==根目录==',
        id: 0,
        expanded: false,
        children: null
    }      
});