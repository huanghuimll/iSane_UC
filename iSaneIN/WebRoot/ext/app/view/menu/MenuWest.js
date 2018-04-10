Ext.define('isane.view.menu.MenuWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.menu-MenuWest', 
	id: 'menuWest-MenuWest-id',
	//rootVisible: false, 
	store: Ext.create('isane.store.menu.MenuTree'),
	columns: {
	    items: [
		{
		    xtype: 'treecolumn',
		    text: '菜单名',
		    flex: 1,
		    sortable: true,
		    dataIndex: 'text'
		},	            
		{
			text: "编码",
			flex: 1,
			dataIndex: "menuCode"
		},
		{
			text: "所属单位编码",
			flex: 1,
			dataIndex: "plantCode"
		},
        {
            text: "父节点",
            flex: 1,
            dataIndex: "parentId"
        },
        {
        	text: "资源类型",
        	flex: 1,
        	dataIndex: "actionType",
        	renderer: function(v){
        		if(v == 1){
        			return '组织架构';
        		}else if(v == 2){
        			return '业务管理';
        		}else if(v == 3){
        			return '系统管理';
        		}else if(v ==4){
        			return '工作流管理';
        		}else{
        			return '';
        		}
        	}
        },
        {
            text: "资源",
            flex: 1,
            dataIndex: "menuAction"
        },
        {
        	text: "iconUrl",
        	flex: 1,
        	dataIndex: "iconUrl"
        }
	    ]
	}
	/*
	,
	listeners:{
		itemcontextmenu:function(view, record, item, index, e, eOpts){
			var contextMenu = Ext.create('Ext.menu.Menu', {
				width: 100,
				items: [
		        {
					text: '增加子节点',
					iconCls: 'add'
				},
				{
					text: '删除该节点',
					iconCls: 'delete'
				},
				{
					text: '修改该节点',
					iconCls: 'edit'
				},
				{
					text: '刷新',
					iconCls: 'refresh'
				}
				]
			});	
			contextMenu.showAt(e.getX(), e.getY());
			e.preventDefault();
		}
	}	
	*/
});