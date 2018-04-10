Ext.define('isane.view.mainview.MainNorth',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.mainview-MainNorth',
    width: '100%',
    border: 0,
	items:[
    {
	   	xtype: 'tbtext',
	   	//iconCls: 'menu_user'
	   	text: '当前用户:'
    },
	"<img src='img/menu_icon/menu_user.png'/>"+"<span style='color:blue'>"+Ext.get('top_div_userName').getValue()+"</span>",
	'->',
	'','','-', 
    { 
		text: '修改密码', 
		xtype: 'button',
		iconCls: 'menu_password'
	},
	'-',  	
	{
	 	text: '退出后台',
	 	xtype: 'button',
	 	iconCls: 'menu_go',
	 	id: 'exitButton',
	 	handler: function(){
	       	window.location.href = "loginExt";
	   		 //* 用来消除session
	   		 /*Ext.Ajax.request({
	   			scope: this,
	   			method: 'post',
	   			url: "clearSession",
	   			success: function(response){
	   			},
	   			failure: function(response){
	   			}
	   		});*/	        	
       }	            
	}
    ]    
});