Ext.define('isane.view.dl_fdl.fdlWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.dl_fdl-fdlWest', 
	id: 'dl_fdl-fdlWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.dl_fdl.zbTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});