Ext.define('isane.view.rl_zb_njh.njhWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.rl_zb_njh-njhWest', 
	id: 'rl_zb_njh-njhWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.rl_zb_njh.njhTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});