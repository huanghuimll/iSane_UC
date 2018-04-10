Ext.define('isane.view.aq_yxgl.yxglPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_yxgl-yxglPanel',
	title:'运行管理',
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
        xtype: 'aq_yxgl-yxglWest'
	},
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
		{
			region: 'center',
			border: 0,
			xtype: 'aq_yxgl-yxglCenter',
		}
		]
	}	
	]
});