Ext.define('isane.view.cw_zb.zbWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.cw_zb-zbWest', 
	id: 'cw_zb-zbWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.cw_zb.zbTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});