Ext.define('isane.view.aq_kkxgl.kkxglPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_kkxgl-kkxglPanel',
	title:'机组运行状态',
	closable:true,
	layout:'border',
	border: 0,
	items:[
	{
	    region: 'west',
        minWidth: 150,
        maxWidth: 500,
        width: 210,	  
        collapsible: true,
        header: false,
        split: true,        
        xtype: 'aq_kkxgl-kkxglWest'
	},
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
		{
			region: 'center',
			border: 0,
			xtype: 'aq_kkxgl-kkxglList',
		}
		]
	}	
	]
});