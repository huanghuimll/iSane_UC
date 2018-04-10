Ext.define('isane.view.aq_yb_dc_zh.zhPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_yb_dc_zh-zhPanel',
	title:'综合报表统计',
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
			xtype: 'aq_yb_dc_zh-zhList'
		}
		]
	}	
	]
});