Ext.define('isane.view.aq_rb_rl.rbPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_rb_rl-rbPanel',
	title:'日报录入',
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
        xtype: 'aq_rb_rl-rbWest'
	},
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
		{
			region: 'center',
			border: 0,
			xtype: 'aq_rb_rl-rbList',
		}
		]
	}	
	]
});