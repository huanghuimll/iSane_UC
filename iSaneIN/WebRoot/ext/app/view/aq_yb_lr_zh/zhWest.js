Ext.define('isane.view.aq_yb_lr_zh.zhWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_yb_lr_zh-zhWest', 
	id: 'aq_yb_lr_zh-zhWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_yb_lr_zh.zhTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});