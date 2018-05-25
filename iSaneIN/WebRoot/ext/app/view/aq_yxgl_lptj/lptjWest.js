Ext.define('isane.view.aq_yxgl_lptj.lptjWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_yxgl_lptj-lptjWest', 
	id: 'aq_yxgl_lptj-lptjWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_yxgl_lptj.lptjTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});