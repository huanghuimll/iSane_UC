Ext.define('isane.view.dl_zjrl.zjrlList',{
	extend:'Ext.grid.Panel',
	alias:'widget.dl_zjrl-zjrlList',
	id: 'dl_zjrl-zjrlList-id',
	store: Ext.create('isane.store.zjrl.zjrl',{storeId: 'dl_zjrl-zjrlList-storeId'}),
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
		name: 'contentCode',
		id: 'dl_zjrl-zjrlList-contentCode',
		emptyText: '请输入..'
	},'-',
	'类型',
	{
		xtype:'combobox',
		store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['', '==NULL=='],['30LD', '30万级以下'], ['30L', '30万级'], ['60L', '60万级'], ['100L', '100万级']]}),
		name:'zjrlType',
		id: 'dl_zjrl-zjrlList-zjrlType',
		displayField : 'name',
		valueField : 'id',
		editable: false,
		allowBlank: true,
		value: '',
		emptyText: '--请选择--'		
	},'-',
	{
		text: '搜索',
	    id: 'dl_zjrl-zjrlList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-',
	{
	 	text: '增加',
	 	id: 'dl_zjrl-zjrlList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add',
        disabled: true,
        handler : function(btn){
            var r = Ext.create('isane.model.zjrl', {
   	         id: 0,
   	         contentCode: Ext.getCmp('dl_zjrl-zjrlList-contentCode').getValue(), 
   	         zjrlValue: null, 
   	         zjrlType: null,
   	         dataTime: null,
   	         inputTime: new Date(),
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
		id: 'dl_zjrl-zjrlList-saveButton'
	},'-',
    ],
	columns:[
         {header:'选择',dataIndex:'id', width:50},
         {header:'区域',dataIndex:'contentCode', flex:2},
         {header:'类型',dataIndex:'zjrlType', editor: {
			xtype:'combobox',
			store :  new Ext.data.ArrayStore({fields: ['id', 'name'],data: [['', '==NULL=='],['30LD', '30万级以下'], ['30L', '30万级'], ['60L', '60万级'], ['100L', '100万级']]}),
			name:'zjrlType',
			displayField : 'name',
			valueField : 'id',
			editable: false,
			allowBlank: true,
    		emptyText: '--请选择--'
         }, flex:2},
         {header:'值',dataIndex:'zjrlValue', editor: 'textfield', flex:2},         
         {header:'时间',dataIndex:'dataTime', flex:2,
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == '1970-01-01 08:00:00'){
        			 val = '';
        		 }
        		 return Ext.util.Format.date(val, 'Y-m-d H:i:s');
        	 },        	 
	         editor:{
	                 xtype: 'datefield',
	                 format: 'Y-m-d H:i:s',
	                 minValue: '2016-01-01'
	          }
         },         
         {header:'录入时间',dataIndex:'inputTime', editor: 'textfield', flex:2,
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == '1970-01-01 08:00:00'){
        			 val = '';
        		 }
        		 return Ext.util.Format.date(val, 'Y-m-d H:i:s');
        	 }        	 
    	 },         
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
                    if(rec.isModified('zjrlType') || rec.isModified('zjrlValue') || rec.isModified('dataTime')){
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
		store: 'dl_zjrl-zjrlList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'dl_zjrl-zjrlList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});