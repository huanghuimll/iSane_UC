Ext.define('isane.view.aq_kjgl_lwtj.lwtjPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_kjgl_lwtj-lwtjPanel',
	title:'论文统计',
	closable:true,
	border: 0,
	layout:'border',	
	items:[
 	{
 	     region: 'west',
         minWidth: 150,
         maxWidth: 500,
         width: 210,	  
         collapsible: true,
         header: false,
         split: true,        
         xtype: 'aq_kjgl_lwtj-lwtjWest'
 	},
 	{
 		region: 'center',
 		layout: 'border',
 		border: 0,
 		items: [
 		{
 			region: 'center',
 			border: 0,
 			xtype:'aq_kjgl_lwtj-lwtjList'
 		}
 		]
 	}	
 	]	
});