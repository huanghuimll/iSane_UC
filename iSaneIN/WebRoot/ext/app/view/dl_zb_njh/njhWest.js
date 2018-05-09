Ext.define('isane.view.dl_zb_njh.njhWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.dl_zb_njh-njhWest', 
	id: 'dl_zb_njh-njhWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.dl_zb_njh.njhTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});