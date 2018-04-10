Ext.define('isane.view.navigate.NavigatePanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.navigate-NavigatePanel',
	title:'导航图管理',
	closable:true,
	layout:'border',	
	items:[
	{
		region: 'center',
		xtype:'navigate-NavigateList'
	}
	]
});