Ext.define('isane.store.role.RoleMenuLTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.RoleMenuLTree',
	pageSize: 1000,
//	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'queryMenuByRoleL',
//        url: 'rolemenu.json',
        reader:'json'
    },
    root: {
        text: '菜单',
        expanded: true
    }    
    
});