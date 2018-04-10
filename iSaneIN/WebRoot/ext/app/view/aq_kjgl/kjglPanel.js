Ext.define('isane.view.aq_kjgl.kjglPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_kjgl-kjglPanel',
	title:'科技管理',
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
        xtype: 'aq_kjgl-kjglWest'
	},
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
		{
			region: 'center',
			border: 0,
			xtype: 'aq_kjgl-kjglCenter'
		}
		]
	}	
	]
});