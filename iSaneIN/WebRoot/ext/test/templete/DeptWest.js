Ext.define('isane.view.dept.DeptWest',{
	extend:'Ext.tree.Panel',
	alias:'widget.dept-DeptWest', 
	id: 'dept-DeptWest-id',
	//rootVisible: false, 
	store: Ext.create('isane.store.dept.DeptTree'),
	tbar:[
	'单位:',
    {
		xtype: 'combobox',
		name: 'deptCode',
		id: 'dept-DeptWest-deptName',
		displayField: 'deptName',
		valueField: 'deptCode',
		store: Ext.create('isane.store.dept.Dept'),
		editable: false,
		width: 250,
		emptyText: '--选择--',
		listeners:{
			beforerender: function(item){
				
				var obt= {
						deptType: '3',//1 = 集团\n 2 = 分公司\n 3 = 电厂\n 4 = 根部门
						deptCode: QJ_PlantCode
				};    				
				var store = item.getStore();
				Ext.apply(store.proxy.extraParams, obt);
				store.load();
				
				this.setValue(QJ_PlantCode);
				
				this.setReadOnly(true);
				
				this.setFieldStyle('color:gray');
			}
		}
	 },'-', 
	 {
		text: '搜索',
	    id: 'dept-DeptWest-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-' 
    ],
	columns: {
	    items: [
		{
		    xtype: 'treecolumn',
		    text: '部门名',
		    flex: 2,
		    sortable: true,
		    dataIndex: 'text'
		},		                        
		{
			text: "编码",
			flex: 1,
			dataIndex: "deptCode"
		},	            
        {
            text: "父节点",
            flex: 1,
            dataIndex: "parentId"
        },
		{
			text: "排序",
			flex: 1,
			dataIndex: "dispOrder"
		}		
	    ]
	}
});