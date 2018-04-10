Ext.define('isane.view.aq_rb_rl.rbWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.aq_rb_rl-rbWest', 
	id: 'aq_rb_rl-rbWest-id',
	rootVisible: true, 
	store: Ext.create('isane.store.aq_rb_rl.rbTree'),
	tbar:[
	{
		xtype: 'tbtext',
		text: '导航:',
		style: 'color:black'
	}
	]
});