Ext.define('isane.view.aq_jxgl.jxglPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_jxgl-jxglPanel',
	title:'检修管理',
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
        xtype: 'aq_jxgl-jxglWest'
	},
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
		{
			region: 'center',
			border: 0,
			xtype: 'aq_jxgl-jxglList'
		}
		]
	}	
	]
});