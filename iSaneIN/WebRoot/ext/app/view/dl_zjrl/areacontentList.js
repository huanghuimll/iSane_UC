Ext.define('isane.view.dl_zjrl.areacontentList',{
	extend:'Ext.grid.Panel',
	alias:'widget.dl_zjrl-areacontentList',
	id: 'dl_zjrl-areacontentList-id',
	store: Ext.create('isane.store.dimareacontent.dimareacontent',{storeId: 'dl_zjrl-areacontentList-storeId'}),
	plugins: [
	    Ext.create('Ext.grid.plugin.CellEditing', {
	    	id: 'dl_zjrl_cellId',
	    	clicksToEdit: 2
	    })
	],
    selModel: { selType: 'cellmodel' },	
	border: 0,
	tbar:[      
	'区域:',	      
	{
		xtype: 'textfield',
		name: 'areaCode',
		id: 'dl_zjrl-areacontentList-areaCode',
		emptyText: '请输入..'
	},'-',	
	/*{
		text: '搜索',
	    id: 'dl_zjrl-areacontentList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',*/
	{
	 	text: '增加',
	 	id: 'dl_zjrl-areacontentList-addButton',
	 	disabled: true,
	 	tooltip:'增加一条新数据',
        iconCls: 'add',
        handler : function(btn){
            var r = Ext.create('isane.model.dimareacontent', {
   	          id: 0,
	   	      contentCode: null, 
	   	      contentName: null, 
	   	      contentDesc: null,
	   	      areaCode: Ext.getCmp('dl_zjrl-areacontentList-areaCode').getValue(),
            });
            var grid = btn.up('grid');
            var store = grid.getStore();
            store.insert(0, r);
        }        
	},'-',	
	{
		text: '保存',
		tooltip: "<span style='color:red'>多条数据保存！</span>",
		iconCls: 'ok1',
		id: 'dl_zjrl-areacontentList-saveButton'
	},'-'
    ],
	columns:[
         {header:'选择',dataIndex:'id', width:50},
         {header:'区域编码',dataIndex:'areaCode', flex:2},
         {header:'编码',dataIndex:'contentCode', editor: 'textfield', flex:2},
         {header:'名称',dataIndex:'contentName', editor: 'textfield', flex:2},         
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
                    if(rec.isModified('areaCode') || rec.isModified('contentCode') || rec.isModified('contentName')){
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
		store: 'dl_zjrl-areacontentList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'dl_zjrl-areacontentList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});