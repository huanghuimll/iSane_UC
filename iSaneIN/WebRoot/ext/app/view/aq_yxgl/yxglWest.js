Ext.define('isane.view.aq_yxgl.yxglWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_yxgl-yxglWest', 
	id: 'aq_yxgl-yxglWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_yxgl.yxglTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});