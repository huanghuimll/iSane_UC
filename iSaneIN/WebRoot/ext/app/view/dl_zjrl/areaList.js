Ext.define('isane.view.dl_zjrl.areaList',{
	extend:'Ext.grid.Panel',
	alias:'widget.dl_zjrl-areaList',
	id: 'dl_zjrl-areaList-id',
	store: Ext.create('isane.store.dimarea.dimarea',{storeId: 'dl_zjrl-areaList-storeId'}),
	plugins: [
	    Ext.create('Ext.grid.plugin.CellEditing', {
	    	id: 'dl_zjrl_cellId',
	    	clicksToEdit: 2
	    })
	],
    selModel: { selType: 'cellmodel' },	
	border: 0,
	tbar:[      
	'区域名:',	      
	{
		xtype: 'textfield',
		name: 'areaName',
		id: 'dl_zjrl-areaList-areaName',
		emptyText: '请输入..'
	},'-',	
	{
		text: '搜索',
	    id: 'dl_zjrl-areaList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{
	 	text: '增加',
	 	id: 'dl_zjrl-areaList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add',
        handler : function(btn){
            var r = Ext.create('isane.model.dimarea', {
   	         id: 0,
   	         areaCode: null, 
   	         areaName: null, 
   	         areaDesc: null
            });
            var grid = btn.up('grid');
            var store = grid.getStore();
            store.insert(0, r);
            //var cell = Ext.getCmp('dl_zjrl_cellId');
            //console.log(cell);
            //cell.startEditByPosition({row: 0, column: 1});
        }        
	},'-',	
	{
		text: '保存',
		tooltip: "<span style='color:red'>多条数据保存！</span>",
		iconCls: 'ok1',
		id: 'dl_zjrl-areaList-saveButton'
	},'-',
    ],
	columns:[
         {header:'选择',dataIndex:'id', width:50},
         {header:'编码',dataIndex:'areaCode', editor: 'textfield', flex:2},
         {header:'名称',dataIndex:'areaName', editor: 'textfield', flex:2},
         {header:'描述',dataIndex:'areaDesc', editor: 'textfield', flex:2},         
         {
        	 text:'操作', 
        	 xtype: 'actioncolumn', 
        	 align: 'center',
        	 flex: 2,
        	 items:[
    		 {
    			iconCls: 'list_save',
                tooltip: "<span style='color:red'>单条数据保存！</span>",
                handler: function(grid, rowIndex, colIndex) {
                	//alert('未开发..');
                	var store = grid.getStore();
                    var rec = store.getAt(rowIndex);
                    //console.log(rec);
                    if(rec.isModified('areaCode') || rec.isModified('areaName') || rec.isModified('areaDesc')){
                    	var arr = [];
                    	arr[0] = rec;
                    	this.fireEvent('saveSingle', arr, store, grid);
                    }
                }            
            },'',	
	        {
	        	iconCls: 'delete',
	        	tooltip: "<span style='color:red'>删除单条记录！</span>",
	        	handler: function(grid, rowIndex, colIndex) {
	        		//alert('未开发..');
	        		var store = grid.getStore();
		            var rec = store.getAt(rowIndex);
		           if(rec.data.id == null){
		            	store.remove(rec);
		            }else{
		            	this.fireEvent('singleDelete', rec, grid);
		            }
	        	}            
	        }    	        
            ] 
    	 }          
    ],
    bbar:{
		xtype:'pagingtoolbar',
		store: 'dl_zjrl-areaList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'dl_zjrl-areaList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});