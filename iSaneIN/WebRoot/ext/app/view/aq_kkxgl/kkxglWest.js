Ext.define('isane.view.aq_kkxgl.kkxglWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_kkxgl-kkxglWest', 
	id: 'aq_kkxgl-kkxglWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_kkxgl.organtree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '组织机构:',
		style: 'color:black'
	}
	]
});