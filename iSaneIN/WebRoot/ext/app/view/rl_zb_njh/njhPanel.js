Ext.define('isane.view.rl_zb_njh.njhPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.rl_zb_njh-njhPanel',
	title:'年计划值录入',
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
        xtype: 'rl_zb_njh-njhWest'
	},
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
		{
			region: 'center',
			border: 0,
			xtype: 'rl_zb_njh-njhList'
		}
		]
	}	
	]
});