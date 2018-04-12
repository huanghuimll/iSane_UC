Ext.define('isane.store.role.RoleMenuTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.RoleMenuTree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'api/Menu/menuByRoleC',
        //url: 'rolemenu.json',
        reader:'json'
    },
    root: {
        text: '后台菜单',
        expanded: false,
        checked: true
    }    
    
});