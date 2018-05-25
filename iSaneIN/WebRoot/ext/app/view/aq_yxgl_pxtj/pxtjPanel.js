Ext.define('isane.view.aq_yxgl_pxtj.pxtjPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_yxgl_pxtj-pxtjPanel',
	title:'培训统计',
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
	    xtype: 'aq_yxgl_pxtj-pxtjWest'
 	},
 	{
 		region: 'center',
 		layout: 'border',
 		border: 0,
 		items: [
 		{
 			region: 'center',
 			border: 0,
 			xtype:'aq_yxgl_pxtj-pxtjList'
 		}
 		]
 	}	
 	]
});