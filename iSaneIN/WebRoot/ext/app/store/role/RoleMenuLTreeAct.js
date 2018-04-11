Ext.define('isane.store.role.RoleMenuLTreeAct',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.RoleMenuLTree',
	pageSize: 1000,
//	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: isane.util.URL.URLACT+'queryMenuByRoleL',
//        url: 'rolemenu.json',
        reader:'json'
    },
    root: {
        text: '菜单',
        expanded: true
    }    
    
});