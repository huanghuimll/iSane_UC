Ext.define('isane.store.role.RoleNewsTypeTreeL',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.RoleNewsTypeTree',
	pageSize: 100000,
	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'queryNewsTypeByRoleL',
//        url: 'test/RoleNewsTypeL.json',
        reader:'json'
    },
    root: {
        text: '菜单',
        expanded: false
    }    
    
});