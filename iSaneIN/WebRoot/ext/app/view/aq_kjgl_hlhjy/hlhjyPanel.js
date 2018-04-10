Ext.define('isane.view.aq_kjgl_hlhjy.hlhjyPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_kjgl_hlhjy-hlhjyPanel',
	title:'合理化建议',
	closable:true,
	border: 0,
	layout:'border',	
	items:[
	{
		region: 'center',
		border: 0,
        layout: 'fit',
		items:[ 
		{
			xtype:'aq_kjgl_hlhjy-hlhjyList'
		}
		]
	}
	]
});