Ext.define('isane.view.dl_fdl.fdlPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.dl_fdl-fdlPanel',
	title:'电力录入',
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
        xtype: 'dl_fdl-fdlWest'
	},	
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
    	{
    		region: 'north',
            minHeight: 250,
            height: '45%',	
            collapsible: true,
            split: true,
            header: false,	
            title: '电量录入',
            border: 0,
            layout: 'fit',
    		items:[ 
            {
    			xtype: 'tabpanel',
    			items:[
    			{
    				title: '电量录入',
    				xtype:'dl_fdl-fdlListN'
    			}
    			]
    		}
    		]
    	},
    	{
    		region: 'center',
    		border: 0,
            layout: 'fit',
    		items:[ 
            {
    			xtype: 'tabpanel',
    			items:[
    			{
    				title: '电量导入',
    				xtype:'dl_fdl-fdlListC'
    			}
    			]
    		}
    		]
    	}
		]
	}	
	]
});