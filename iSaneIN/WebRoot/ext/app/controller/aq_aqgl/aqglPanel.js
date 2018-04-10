Ext.define('isane.controller.aq_aqgl.aqglPanel', {
	extend : 'Ext.app.Controller',
	stores : ['aq_aqgl.aqgl'],
	models : ['aqgl'],	
	views : ['aq_aqgl.aqglPanel', 'aq_aqgl.aqglList'],
	init: function() {
		this.control({
			'aq_aqgl-aqglList':{
				afterrender:this.afterrender
				//itemclick: this.itemclick
			},
			'aq_aqgl-aqglList button[text=搜索]':{
				click:this.click_search
			},			
			'aq_aqgl-aqglList button[text=保存]':{
				click: this.saveAll
			},				
			'aq_aqgl-aqglList actioncolumn':{
				saveSingle: this.singleSave,
				singleDelete: this.singleDelete
			}
		});
	},
	
	afterrender: function(panel){
		var storeY = Ext.getCmp('aq_aqgl-aqglList-storeY').getValue();
		var storeM = Ext.getCmp('aq_aqgl-aqglList-storeM').getValue();
		
		var obt = {
				plantCode: QJ_PlantCode,
				dataTime: storeY + '-' + QJ_UtilEntity.month(storeM),
			};	
		var store = panel.getStore();	
		Ext.apply(store.proxy.extraParams, obt);
		store.load();
	},
	
	click_search: function(btn){
		this.afterrender(btn.up('grid'));
	},
	
	itemclick: function(grid){
		//var bts = Ext.getCmp('role-RoleList-id').query('button[disabled=true]');
		//console.log(bts);
//		Ext.getCmp('role-RoleList-viewButton').setDisabled(false);
//		Ext.getCmp('role-RoleList-editButton').setDisabled(false);
//		Ext.getCmp('role-RoleList-removeButton').setDisabled(false);
//		Ext.getCmp('role-RoleList-upButton').setDisabled(false);
//		Ext.getCmp('role-RoleList-downButton').setDisabled(false);
	},
	
	//保存单条数据
	singleSave: function(records, store, grid){
		
		this.saveAll_but(records, store);
	},	
	//保存多条
	saveAll: function(but){
		var grid = but.up('grid');
    	var store = grid.getStore();
		var storeY = grid.down('numberfield[name=storeY]').getValue();
		var storeM = grid.down('numberfield[name=storeM]').getValue();
        if(storeY == null || storeY == '' || storeM == null || storeM == ''){
        	return;
        }
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-01';  	
    	//获取修改后的数据
    	var records = store.getModifiedRecords();
		if(records.length > 0){
			Ext.Msg.confirm('保存', '您确定保存所有数据吗?', function(button) {
				if (button == 'yes') {
					this.saveAll_but(records, store, storeDate);
				}
			}, this);		
		}else{
			Ext.example.msg('系统提示','数据为空！');
		}
	},
	
	saveAll_but: function(records, store){
		//alert('saveAllAdd_but');
        var arr = [];
        for(var i = 0;i < records.length; i++){
        	arr.push(records[i].data);
        };	
        console.log(arr);
        var url = store.proxy.api.add;   
        //console.log(url);
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: url,
			jsonData: Ext.encode(arr),
			success: function(response){
				//var text = response.responseText;
				store.commitChanges();	
				Ext.example.msg('系统提示！', "保存成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});	   		
	},
	
	singleDelete: function(record){
		if(record){
			Ext.Msg.confirm('删除', '您确定删除该数据吗?', function(button) {
				if (button == 'yes') {
					this.singleDelete_but(record);
				}
			}, this);		
		}
	},	
	singleDelete_but: function(record){
		//alert('singleDelete');
		var grid = Ext.getCmp('aq_aqgl-aqglList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
		//console.log(record.data);
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'delete',
			url: url+record.data.id,
			success: function(response){
				store.remove(record);
				Ext.example.msg('系统提示！', "删除成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});			
	}	
	
});
