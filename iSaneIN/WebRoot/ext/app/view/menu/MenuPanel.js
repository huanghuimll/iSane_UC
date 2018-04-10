Ext.define('isane.view.menu.MenuPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.menu-MenuPanel',
	title:'菜单管理',
	closable:true,
	layout:'border',	
	items:[
//   	{
//		region: 'west',
//        minWidth: 150,
//        maxWidth: 500,
//        width: 325,	
//        collapsible: true,
//        split: true,
//        header: false,
//        xtype: 'menu-MenuWest'
//	},	       
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
		{
			region: 'center',
			xtype: 'menu-MenuWest'
		}
		]
	}
	]
});