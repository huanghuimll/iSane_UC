Ext.define('isane.view.cw_zb.zbPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.cw_zb-zbPanel',
	title:'财务指标',
	closable:true,
	layout:'border',
	border: 0,
	items:[
	{
	    region: 'west',
        minWidth: 150,
        maxWidth: 500,
        width: 210,	  
        collapsible: true,
        header: false,
        split: true,        
        xtype: 'cw_zb-zbWest'
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
            title: '指标录入',
            border: 0,
            layout: 'fit',
    		items:[ 
            {
    			xtype: 'tabpanel',
    			items:[
    			{
    				title: '指标导入',
    				xtype:'cw_zb-zbListC'    				
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
    				title: '指标录入',
    				xtype:'cw_zb-zbListN'
    			}
    			]
    		}
    		]
    	}

		]
	}	
	]
});