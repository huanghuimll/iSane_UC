Ext.define('isane.view.aq_kjgl_zltj.zltjList',{
	extend:'Ext.grid.Panel',
	alias:'widget.aq_kjgl_zltj-zltjList',
	id: 'aq_kjgl_zltj-zltjList-id',
	store: Ext.create('isane.store.aq_kjgl_zltj.zltj',{storeId: 'aq_kjgl_zltj-zltjList-storeId'}),
	border: 0,
	tbar:[
  	{
	 	text: '增加',
	 	id: 'aq_kjgl_zltj-zltjList-addButton',
	 	tooltip:'增加一条新数据',
        iconCls: 'add'
	},'-',
	{
		text: '明细',
		disabled: true,
		id: 'aq_kjgl_zltj-zltjList-viewButton',
		tooltip:'查看详细信息',
		iconCls: 'view'
	},'-',
	{
		text: '修改',
		disabled: true,
		id: 'aq_kjgl_zltj-zltjList-editButton',
		tooltip:'修改一条新数据',
        iconCls: 'edit'
	},'-',
	{
	    text: '删除',
	    disabled: true,
	    id: 'aq_kjgl_zltj-zltjList-removeButton',
	    tooltip:'删除一条新数据',
        iconCls: 'delete1'
	},'-',	      
	'日期:',
	{
		xtype:'numberfield',
		name: 'storeY',
		id: 'aq_kjgl_zltj-zltjList-storeY',
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
		id: 'aq_kjgl_zltj-zltjList-storeM',
		width: 70,
		minValue: 1,
		maxValue: 12,
		value: Ext.Date.format(new Date(), 'm')
	},'-',		
	{
		text: '搜索',
	    id: 'aq_kjgl_zltj-zltjList-searchButton',
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
         {header:'专利名称',dataIndex:'zlName', flex:4},
         {header:'专利类型',dataIndex:'zlType', flex:2},
         {header:'申请时间',dataIndex:'zlApplyTime', xtype: 'datecolumn', flex:2, 
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
		store: 'aq_kjgl_zltj-zltjList-storeId',
		width: 500,
		loadMask: true,
		displayInfo: true,
		id: 'aq_kjgl_zltj-zltjList-pageId'
	},
	initComponent:function(){
		this.callParent(arguments);
	}	       
});