Ext.define('isane.view.aq_aqgl.aqglPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_aqgl-aqglPanel',
	title:'安全管理',
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
			xtype: 'tabpanel',
			items:[
			{
				title: '安全管理',
				xtype:'aq_aqgl-aqglList'
			}
			]
		}
		]
	}
	]
});