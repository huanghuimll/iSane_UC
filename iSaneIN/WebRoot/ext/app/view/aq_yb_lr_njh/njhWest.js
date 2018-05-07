Ext.define('isane.view.aq_yb_lr_njh.njhWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_yb_lr_njh-njhWest', 
	id: 'aq_yb_lr_njh-njhWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_yb_lr_njh.njhTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});