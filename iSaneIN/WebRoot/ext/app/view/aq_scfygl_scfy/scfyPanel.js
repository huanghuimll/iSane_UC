Ext.define('isane.view.aq_scfygl_scfy.scfyPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_scfygl_scfy-scfyPanel',
	title:'生产费用',
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
			//title: '两票统计',
			xtype:'aq_scfygl_scfy-scfyList'
		}
		]
	}
	]
});