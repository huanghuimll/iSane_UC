Ext.define('isane.view.aq_yb_lr_xzb.xzbWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_yb_lr_xzb-xzbWest', 
	id: 'aq_yb_lr_xzb-xzbWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_yb_lr_xzb.xzbTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});