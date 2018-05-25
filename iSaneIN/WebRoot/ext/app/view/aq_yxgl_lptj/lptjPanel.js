Ext.define('isane.view.aq_yxgl_lptj.lptjPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_yxgl_lptj-lptjPanel',
	title:'两票统计',
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
	    xtype: 'aq_yxgl_lptj-lptjWest'
  	},
  	{
  		region: 'center',
  		layout: 'border',
  		border: 0,
  		items: [
  		{
  			region: 'center',
  			border: 0,
  			xtype:'aq_yxgl_lptj-lptjList'
  		}
  		]
  	}	
  	]	
});