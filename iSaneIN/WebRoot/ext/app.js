Ext.application({
	name:'isane',
	appFolder:'ext/app',
	requires:['isane.util.TabCloseMenu','isane.util.TreePicker','isane.util.ProgressBarPager'],
	models: ['systemitem', 'systemitemvalue', 'Plant'],
	stores: ['system.systemitem', 'system.systemitemvalue', 'util.Plant'],
	controllers:['mainview.Main'],
	launch:function(){ 
		Ext.apply(Ext.form.field.VTypes, {
			//ip验证
		    IPAddress: function(v) {
		        return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
		    },
		    IPAddressText: '请输入正确的 IP',
		    IPAddressMask: /[\d\.]/i,
		    //身份证验证
		    cardId: function(v) {
		        return /(^\d{15}$)|(^\d{18}$)/.test(v);
		    },
		    cardIdText: '中国身份证号是15位或者18位',
		    //正整数
		    integer: function(v){
		    	return /^[0-9]*[1-9][0-9]*$/.test(v);
		    },
		    integerText: '请输入正整数'
		    /*,
		    menuCode: function(v){
		    	console.log('这个编码已经存在'+v);
		    	return false;
		    },
		    menuCodeText:'这个编码已经存在！'
		    */
		});			
		//application = this;
		application = isane.getApplication()// 同上
		QJ_UtilEntity = Ext.create('isane.util.UtilEntity');
		QJ_DateArray = Ext.create('isane.util.SetDateMap');
		//QJ_PlantCode = 'GZFGS';
		QJ_PlantCode = Ext.get('top_div_plantCode').getValue();
		QJ_UserCode = Ext.get('top_div_userCode').getValue();
		QJ_UserName = Ext.get('top_div_userName').getValue();
		QJ_PassWord = Ext.get('top_div_password').getValue();
		QJ_UserId = Ext.get('top_div_userId').getValue();		
		//加载公共Control
		//application.getController('isane.controller.util.EmployePanel');
		Ext.create('Ext.container.Viewport',{
			layout: 'border',
	        items:[
            { 
	       	    region: 'north',	            	  
			    xtype: 'panel',
			    frame: true,
			    //collapsible: true,
			    //split: true,
			    header: false,
			    //hight: 130,
			    //minHeight: 100,
			    border: 0,
			    //contentEl: 'top_div_id',
			    //html: "<div id='top_div_id'></div>",
			    bbar: {xtype: 'mainview-MainNorth'}
             },	               
             {
            	region: 'west',
            	title: '<em>功能导航</em>',
            	collapsible: true,
		        //header: false,
		        split: true,
		        border: 1,
		        minWidth: 150,
		        maxWidth: 400,
		        width: 220,
		        margins:'1 1 1 2',
		        layout:{
		        	type: 'accordion',
		        	titleCollapse: true,
		        	//activeOnTop: true,
		        	//hideCollapseTool: true,
		        	//animate: false,
		        	
		        },
		        items: [
                {
                	title: '业务管理',
                	xtype: 'mainview-MainMenuA'
                },
                {
                	title: '报表统计',
                	xtype: 'mainview-MainMenuB'
                },
		        {
		        	title: '报表录入',
		        	xtype: 'mainview-MainMenuC'
		        },
		        {
		        	title: '系统管理',
		        	xtype: 'mainview-MainMenuD'
		        }
                ]
             },
             {
            	region: 'center',
		        bodyPadding: 1,
		        margins:'0 2 0 0',
            	xtype: 'mainview-MainCenter'
             }
             ,{
            	region: 'south',
            	//xtype: 'panel',
            	//border: 0,
            	//frame: true,
            	//html: "<div style='text-align:center'>Copyright ©2017 ISane.All Rights Reserved.</div >"
             }
             ]
		});
	}
});