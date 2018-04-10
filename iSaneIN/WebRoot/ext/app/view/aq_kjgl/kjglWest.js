Ext.define('isane.view.aq_kjgl.kjglWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_kjgl-kjglWest', 
	id: 'aq_kjgl-kjglWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_kjgl.kjglTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});