Ext.define('isane.view.aq_kjgl_lwtj.lwtjPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_kjgl_lwtj-lwtjPanel',
	title:'论文统计',
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
			xtype:'aq_kjgl_lwtj-lwtjList'
		}
		]
	}
	]
});