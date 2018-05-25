Ext.define('isane.view.aq_kjgl_kjxm.kjxmWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_kjgl_kjxm-kjxmWest', 
	id: 'aq_kjgl_kjxm-kjxmWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_kjgl_kjxm.kjxmTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});