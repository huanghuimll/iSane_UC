Ext.define('isane.view.aq_kjgl_hlhjy.hlhjyPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_kjgl_hlhjy-hlhjyPanel',
	title:'合理化建议',
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
          xtype: 'aq_kjgl_hlhjy-hlhjyWest'
  	},
  	{
  		region: 'center',
  		layout: 'border',
  		border: 0,
  		items: [
  		{
  			region: 'center',
  			border: 0,
  			xtype:'aq_kjgl_hlhjy-hlhjyList'
  		}
  		]
  	}	
  	]	
});