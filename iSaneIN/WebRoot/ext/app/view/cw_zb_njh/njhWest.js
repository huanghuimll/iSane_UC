Ext.define('isane.view.cw_zb_njh.njhWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.cw_zb_njh-njhWest', 
	id: 'cw_zb_njh-njhWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.cw_zb_njh.njhTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});