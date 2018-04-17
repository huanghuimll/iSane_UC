Ext.define('isane.store.role.RoleNavTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.RoleNavTree',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'api/DimNav/navByRoleC',
        //url: 'rolemenu.json',
        reader:'json'
    },
    root: {
        text: '前台菜单',
        expanded: false,
        checked: true
    }    
    
});