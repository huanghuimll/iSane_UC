Ext.define('isane.view.aq_kjgl_kjxm.kjxmPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_kjgl_kjxm-kjxmPanel',
	title:'科技项目',
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
			xtype:'aq_kjgl_kjxm-kjxmList'
		}
		]
	}
	]
});