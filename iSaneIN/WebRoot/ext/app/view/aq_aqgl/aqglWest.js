Ext.define('isane.view.aq_aqgl.aqglWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_aqgl-aqglWest', 
	id: 'aq_aqgl-aqglWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_aqgl.aqglTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});