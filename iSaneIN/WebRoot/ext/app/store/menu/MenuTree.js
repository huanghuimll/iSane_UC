Ext.define('isane.store.menu.MenuTree',{
	extend:'Ext.data.TreeStore',
	model:'isane.model.RoleMenu',
	autoLoad: false,
    proxy: {
        type: 'ajax',
        method: 'get',
        //url: 'api/Menu/4u3d/atree',
        url: 'ext/test/menu.json',
	   /* api: {
        	read: 'api/Menu/4u3d/atree',
        	publicUrl: 'api/Menu/'
        },*/	        
        reader:'json',
    },
    root: {  
        text: 'ROOT',
        iconCls: 'menu_root',
        expanded: false,
    }  
});