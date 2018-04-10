Ext.define('isane.view.aq_yb_lr_zh.zhPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.aq_yb_lr_zh-zhPanel',
	title:'综合指标录入',
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
        xtype: 'aq_yb_lr_zh-zhWest'
	},
	{
		region: 'center',
		layout: 'border',
		border: 0,
		items: [
		{
			region: 'north',
	        minHeight: 250,
	        height: '50%',	
	        collapsible: true,
	        split: true,
	        header: false,	
	        title: '指标录入',
	        border: 0,
			//xtype:'cw_zb-zbListN'
	        layout: 'fit',
	        items:[
            {
	   			xtype: 'tabpanel',
	   			items:[
	   			{
	   				title: '指标导入',
	   				xtype:'aq_yb_lr_zh-zhList'
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
					xtype:'aq_yb_lr_zh-zhListC'
				}
				]
			}
			]
		}
		]
	}	
	]
});