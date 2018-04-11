Ext.define('isane.store.role.RoleNewsTypeTreeR',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.NewsTypeTree',
	pageSize: 100000,
	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'queryNewsTypeByRoleR',
        reader:'json'
    },
    root: {
        text: '菜单',
        expanded: false
    }    
    
});