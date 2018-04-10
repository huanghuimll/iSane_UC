Ext.define('isane.view.aq_yxgl_pxtj.pxtjPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_yxgl_pxtj-pxtjPanel',
	title:'培训统计',
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
			xtype:'aq_yxgl_pxtj-pxtjList'
		}
		]
	}
	]
});