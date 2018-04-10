Ext.define('isane.view.dl_zjrl.zjrlPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.dl_zjrl-zjrlPanel',
	title:'装机容量、利用小时',
	closable:true,
	layout:'border',	
	items:[
	{
	    region: 'west',
	    id: 'dl_zjrl-zjrlPanel-west',
	    title: '区域列表',
    	collapsible: true,
        header: false,
        split: true,
        border: 0,
        width: '30%',
        minWidth: 150,
        layout: 'border',
		items: [
		{
			region: 'north',
			title: '区域列表',
		    minHeight: 250,
		    maxHeight: '70%',
		    height: '35%',
		    split: true,
		    collapsible: true,
		    header: false,
		    border: 0,
		    layout: 'fit',
		    items:[
		    {
		    	xtype: 'tabpanel',
		    	items:[
    	        {
    	    	   title: '区域',
    	    	   xtype: 'dl_zjrl-areaList'
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
		    	border: 0,
		    	items:[
    	        {
    	    	   title: '子区域',
    	    	   xtype: 'dl_zjrl-areacontentList'
    	        }
    	        ]		           
		    }
            ]
		}
		]
	},
	{
		region: 'center',
		border: 0,
		layout: 'border',
		items: [
		{
			region: 'center',
			xtype: 'tabpanel',
			id: 'dl_zjrl-zjrlPanel-center',
			split: true,
			collapsible: true,
			header: false,
            collapsed: false,
            titleCollapse: true,
            border: 0,
			items:[
    		{
    			title: '装机容量',
				border: 0,
				xtype: 'dl_zjrl-zjrlList'
            },
            {
            	title: '利用小时',
            	border: 0,
        		xtype: 'dl_zjrl-lyxsList'
            }
			]
		}
		]
	}
	]
});