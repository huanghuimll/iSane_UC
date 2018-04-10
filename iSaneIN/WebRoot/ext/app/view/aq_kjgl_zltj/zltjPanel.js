Ext.define('isane.view.aq_kjgl_zltj.zltjPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_kjgl_zltj-zltjPanel',
	title:'专利统计',
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
			xtype:'aq_kjgl_zltj-zltjList'
		}
		]
	}
	]
});