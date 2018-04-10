Ext.define('isane.view.aq_yb_lr_hb.rbWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_yb_lr_hb-hbWest', 
	id: 'aq_yb_lr_hb-hbWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_yb_lr_hb.hbTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});