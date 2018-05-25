Ext.define('isane.view.aq_aqgl.aqglPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_aqgl-aqglPanel',
	title:'安全管理',
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
           xtype: 'aq_aqgl-aqglWest'
   	},
   	{
   		region: 'center',
   		layout: 'border',
   		border: 0,
   		items: [
   		{
   			region: 'center',
   			border: 0,
   			xtype:'aq_aqgl-aqglList'
   		}
   		]
   	}	
   	]	
});