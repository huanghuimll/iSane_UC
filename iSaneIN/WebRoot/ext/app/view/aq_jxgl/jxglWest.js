Ext.define('isane.view.aq_jxgl.jxglWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_jxgl-jxglWest', 
	id: 'aq_jxgl-jxglWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_jxgl.jxgltree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '检修类型:',
		style: 'color:black'
	}
	]
});