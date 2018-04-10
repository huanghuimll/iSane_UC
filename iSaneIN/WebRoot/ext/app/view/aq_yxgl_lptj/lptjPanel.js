Ext.define('isane.view.aq_yxgl_lptj.lptjPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_yxgl_lptj-lptjPanel',
	title:'两票统计',
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
			xtype:'aq_yxgl_lptj-lptjList'
		}
		]
	}
	]
});