Ext.define('isane.view.aq_kjgl_hlhjy.hlhjyWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_kjgl_hlhjy-hlhjyWest', 
	id: 'aq_kjgl_hlhjy-hlhjyWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_kjgl_hlhjy.hlhjyTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});