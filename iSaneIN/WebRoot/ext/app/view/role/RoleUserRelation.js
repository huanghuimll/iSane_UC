Ext.define('isane.view.role.RoleUserRelation', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.role-RoleUserRelation',
	layout : 'border',
	bodyPadding : 1,
	items : [
	{
		region: 'west', 
		width: '50%',
	    collapsible: true,
	  	header: false,
	  	split: true,
		layout : 'border',
		border: 0,
		id: 'role-RoleUserRelation-west',
		items:[
        {
        	region: 'center',
        	xtype: 'role-RoleUserListL'
        }
	    ]
	},
	{
	    region: 'center',
	    layout : 'border',
	    border: 0,
	    items:[
    	{
	        	region: 'center',
	        	xtype: 'role-RoleUserListR'
        }
        ]
    }
	],
	initComponent:function(){
		this.callParent(arguments);
	}	        
});
