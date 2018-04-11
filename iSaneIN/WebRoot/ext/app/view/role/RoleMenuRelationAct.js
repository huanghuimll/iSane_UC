/**
 * 将工作流的菜单权限集成到网站后台20160226
 * */
Ext.define('isane.view.role.RoleMenuRelationAct', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.role-RoleMenuRelationAct',
	id: 'role-RoleMenuRelationAct-Id',
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
		xtype: 'role-RoleMenuLTreeAct'
	},
	{
		region: 'center',
		width: '50%',
		minWidth: 400,			
		xtype: 'role-RoleMenuRGridAct'
	}
    ]
});
