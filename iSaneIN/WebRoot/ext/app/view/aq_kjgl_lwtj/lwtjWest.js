Ext.define('isane.view.aq_kjgl_lwtj.lwtjWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_kjgl_lwtj-lwtjWest', 
	id: 'aq_kjgl_lwtj-lwtjWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_kjgl_lwtj.lwtjTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});