Ext.define('isane.controller.mainview.Main', {
    extend: 'Ext.app.Controller',
    stores: ['mainview.MenuTree'],
	models: ['Menu'],
    views: ['mainview.MainNorth','mainview.MainCenter', 
            'mainview.MainMenuA', 'mainview.MainMenuB', 'mainview.MainMenuC', 'mainview.MainMenuD','mainview.RestPwForm', 'mainview.MainNorth'],
    init: function() { 
    	this.control({
    		'#mainview-mWest-id':{
    			//afterrender: this.afterrender
    		},
    		'mainview-MainMenuA':{
    			itemclick: this.itemclick_dt
    		},
    		'mainview-MainMenuB':{
    			itemclick: this.itemclick_dt
    		},
    		'mainview-MainMenuC':{
    			itemclick: this.itemclick_dt
    		},
    		'mainview-MainMenuD':{
    			itemclick: this.itemclick_dt
    		},
    		'mainview-mCenter':{
    			afterrender: this.afterrender
    		},
    		'mainview-MainNorth button[text=修改密码]':{
    			click: this.resetPwId
    		}
    	});
    },
    // TODO
    afterrender: function(own){
    	//console.log('afterrender');
    	/*console.log(own);
    	var A = Ext.getCmp('mainview-MainMenuA-id');
    	own.add(A);
    	var B = Ext.getCmp('mainview-MainMenuB-id');
    	own.add(B);
    	var C = Ext.getCmp('mainview-MainMenuC-id');
    	own.add(C);*/
    },
    
    itemclick_dt: function(own, record, item, index, e, eOpts){
    	this.record = record; 
		if(!record.data.leaf){
			return;
		}
    	var mCenter = Ext.getCmp('mainview-MainCenter-id');
    	var url = record.get('menuAction');
    	var icon = record.get('icon');
    	var arr = url.split('.');
    	var action = arr[2]+"."+arr[3];
    	//console.log("action is:"+action+",icon is:"+icon);
		if(Ext.ClassManager.isCreated(action)){
		}else{
			application.getController(action);
		}       	
    	var tabs = mCenter.items;
		for(var i=0;i<tabs.getCount();i++){
			var activeId = tabs.getAt(i).activeId;
			if(tabs.getAt(i).id == "UC-"+record.data.id){
				mCenter.setActiveTab(tabs.getAt(i));
				return;
			}
		}
		var panel = Ext.create(url, {id:'UC-'+record.data.id, icon:icon});
		//console.log(panel);
		mCenter.add(panel);
		mCenter.setActiveTab(panel);        	
    }, 
    
	//修改用户密码
	resetPwId: function(){
		Ext.create('Ext.window.Window',{
			title: '密码修改',
			modal: true,
			constrain:true,
			iconCls: 'menu_password',
			border: 0,
			items: [{xtype: 'mainview-RestPwForm'}],
			buttons: [{scope: this, text:'保存', iconCls:'ok1', handler: this.saveResetPwBtn},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		}).show();		
	},
	
	//保存修改密码
    saveResetPwBtn: function(btn){
    	var oldPK = Ext.getCmp('mainview-RestPwForm-oldPassword').getValue();
    	oldPK = hex_md5(oldPK).toUpperCase(); //MD5中的方法
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(!form.isValid()){
    		return;
    	};
    	if(QJ_PassWord != oldPK){
    		Ext.MessageBox.show({
				title : '系统提示',
				msg : '旧密码输入错误！',
	            buttons: Ext.Msg.YES,
	            icon: Ext.MessageBox.QUESTION				
    		});
    		return;
    	};
    	
    	var password = Ext.getCmp('mainview-RestPwForm-password').getValue();
    	//password = hex_md5(password).toUpperCase();
    	var obt = {
    		plantCode: QJ_PlantCode,
    		userCode: QJ_UserCode,
    		password: password,
    		id: QJ_UserId
    	}
    	
		Ext.Ajax.request({
			scope: this,
			method: 'put',
			url: 'api/User/updateByCode',
			params: obt,
			success: function(response){
				win.close();
				Ext.example.msg('系统提示！', "修改成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});	    
		
    }    

});