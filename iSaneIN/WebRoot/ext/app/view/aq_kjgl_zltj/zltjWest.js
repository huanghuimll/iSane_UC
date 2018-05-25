Ext.define('isane.view.aq_kjgl_zltj.zltjWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_kjgl_zltj-zltjWest', 
	id: 'aq_kjgl_zltj-zltjWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_kjgl_zltj.zltjTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});