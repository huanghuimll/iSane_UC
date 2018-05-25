Ext.define('isane.view.aq_yxgl_pxtj.pxtjWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_yxgl_pxtj-pxtjWest', 
	id: 'aq_yxgl_pxtj-pxtjWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_yxgl_pxtj.pxtjTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});