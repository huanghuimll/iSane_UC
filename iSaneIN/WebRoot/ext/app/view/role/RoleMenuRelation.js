Ext.define('isane.view.role.RoleMenuRelation', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.role-RoleMenuRelation',
	id: 'role-RoleMenuRelation-Id',
	bodyPadding: 1,
    layout : 'border',
    items: [
	{
		region: 'west',
		width: '50%',
		minwidth: 400,
		collapsible: true,
		split: true,
		header: false,
		xtype: 'role-RoleMenuLTree'
	},
	{
		region: 'center',
		width: '50%',
		minWidth: 400,			
		xtype: 'role-RoleMenuRGrid'
	}
    ]
});
