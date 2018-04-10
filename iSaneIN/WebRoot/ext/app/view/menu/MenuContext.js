Ext.define('isane.view.menu.MenuContext',{
	extend:'Ext.menu.Menu',
	alias:'widget.menu-MenuContext',
	width: 100,
	items: [
    {
		text: '增加子节点',
		iconCls: 'add'
	},
	{
		text: '修改该节点',
		iconCls: 'edit'
	},
	{
		text: '删除该节点',
		iconCls: 'delete'
	},
	{
		text: '刷新',
		iconCls: 'refresh'
	}
	]
});