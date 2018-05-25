Ext.define('isane.view.aq_kjgl_hlhjy.hlhjyList',{
	extend:'Ext.grid.Panel',
	alias:'widget.aq_kjgl_hlhjy-hlhjyList',
	id: 'aq_kjgl_hlhjy-hlhjyList-id',
	store: Ext.create('isane.store.aq_kjgl_hlhjy.hlhjy',{storeId: 'aq_kjgl_hlhjy-hlhjyList-storeId'}),
	border: 0,
	tbar:[
  	'所属单位:',	      
	{
		xtype: 'textfield',
		name: 'plantCode',
		width: 100,
		emptyText: '所属单位..',
		id: 'aq_kjgl_hlhjy-hlhjyList-organCode',
		readOnly: true,
		fieldStyle: 'color:gray'
	},'-',	      
  	{
	 	text: '增加',
	 	id: 'aq_kjgl_hlhjy-hlhjyList-addButton',
	 	disabled: true,
	 	tooltip:'增加一条新数据',
        iconCls: 'add'
	},'-',
	{
		text: '明细',
		disabled: true,
		id: 'aq_kjgl_hlhjy-hlhjyList-viewButton',
		tooltip:'查看详细信息',
		iconCls: 'view'
	},'-',
	{
		text: '修改',
		disabled: true,
		id: 'aq_kjgl_hlhjy-hlhjyList-editButton',
		tooltip:'修改一条新数据',
        iconCls: 'edit'
	},'-',
	{
	    text: '删除',
	    disabled: true,
	    id: 'aq_kjgl_hlhjy-hlhjyList-removeButton',
	    tooltip:'删除一条新数据',
        iconCls: 'delete1'
	},'-',	      
	'日期:',
	{
		xtype:'numberfield',
		name: 'storeY',
		id: 'aq_kjgl_hlhjy-hlhjyList-storeY',
		width: 70,
		minValue: 2016,
		value: Ext.Date.format(new Date(), 'Y')
	},
	{
		xtype:'text',
		text: '--'
	},
	{
		xtype:'numberfield',
		name: 'storeM',
		id: 'aq_kjgl_hlhjy-hlhjyList-storeM',
		width: 70,
		minValue: 1,
		maxValue: 12,
		value: Ext.Date.format(new Date(), 'm')
	},'-',		
	{
		text: '搜索',
	    id: 'aq_kjgl_hlhjy-hlhjyList-searchButton',
	    tooltip:'搜索数据',
        iconCls: 'search'		
	},'-'/*,
	{	
		text: '重置',
		tooltip:'重置',
		//iconCls: 'search'	
		handler: function(won){
			//won.up('toolbar').down('textfield[name=userName]').reset();
		}
		
	},'-'	*/
    ],
	columns:[
         {header:'选择',dataIndex:'id', width:50},
         {header:'单位',dataIndex:'unit', flex:4},
         {header:'项目名称',dataIndex:'projectName', flex:4},
         {header:'实施时间',dataIndex:'dataTime', xtype: 'datecolumn', flex:2, 
        	 renderer: function(val, metadata){
        		 metadata.tdAttr = 'data-qtip="<span style=color:red>双击编辑!</span>"';
        		 if(val == null){
        			 val = new Date();
        		 }
        		 return Ext.util.Format.date(val, 'Y-m-d');
        	 },        	 
	         editor:{
	                 xtype: 'datefield',
	                 format: 'Y-m-d',
	                 minValue: '2016-01-01'
	          }
         }  	 
    ],
    bbar:{
		xtype:'pagingtoolbar',
		store: 'aq_kjgl_hlhjy-hlhjyList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'aq_kjgl_hlhjy-hlhjyList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});