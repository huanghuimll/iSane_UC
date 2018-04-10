Ext.define('isane.view.aq_rb_dc.rbPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_rb_dc-rbPanel',
	title:'日报导出',
	closable:true,
	layout:'border',
	border: 0,
	items:[
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
		{
			region: 'center',
			border: 0,
			xtype: 'aq_rb_dc-rbList'
		}
		]
	}	
	]
});