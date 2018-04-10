Ext.define('isane.controller.dl_zjrl.zjrlPanel', {
	extend : 'Ext.app.Controller',
	stores : ['dimarea.dimarea', 'dimareacontent.dimareacontent', 'zjrl.zjrl', 'lyxs.lyxs'],
	models : ['dimarea', 'dimareacontent'],	
	views : ['dl_zjrl.zjrlPanel', 'dl_zjrl.areaList', 'dl_zjrl.areacontentList', 'dl_zjrl.zjrlList', 'dl_zjrl.lyxsList'],
	init: function() {
		this.control({
			//区域
			'dl_zjrl-areaList':{
				afterrender:this.afterrenderN,
				itemclick: this.itemclickN
			},	
			'dl_zjrl-areaList button[text=搜索]':{
				click:this.click_searchN
			},
			'dl_zjrl-areaList button[text=保存]': {
				click: this.saveAll
			},				
			'dl_zjrl-areaList actioncolumn':{
				saveSingle: this.singleSave,
				singleDelete: this.singleDelete
			},			
			//子区域	
			'dl_zjrl-areacontentList':{
				itemclick: this.itemclickC
			},			
			'dl_zjrl-areacontentList button[text=保存]': {
				click: this.saveAll
			},				
			'dl_zjrl-areacontentList actioncolumn':{
				saveSingle: this.singleSave,
				singleDelete: this.singleDelete
			},
			//装机容量
			'dl_zjrl-zjrlList button[text=搜索]':{
				click: this.click_searchR
			},			
			'dl_zjrl-zjrlList button[text=保存]': {
				click: this.saveAllR
			},				
			'dl_zjrl-zjrlList actioncolumn':{
				saveSingle: this.singleSaveR,
				singleDelete: this.singleDelete
			},			
			//利用小时
			'dl_zjrl-lyxsList button[text=搜索]':{
				click: this.click_searchL
			},			
			'dl_zjrl-lyxsList button[text=保存]': {
				click: this.saveAllR
			},				
			'dl_zjrl-lyxsList actioncolumn':{
				saveSingle: this.singleSaveR,
				singleDelete: this.singleDelete
			},			
			
		});
	},
	
	afterrenderN: function(panel){
		var areaName = Ext.getCmp('dl_zjrl-areaList-areaName').getValue();
		
		var store = panel.getStore();	
		
		if(areaName != null){
			var obt = {
					areaName: areaName
			};			
			Ext.apply(store.proxy.extraParams, obt);
		}
		store.load();
	},
	
	click_searchN: function(btn){
		this.afterrenderN(btn.up('grid'));
	},
	
	itemclickN: function(own){
		var grid = own.up('grid');
		var rowRecord = grid.getView().getSelectionModel().getSelection()[0];
		
		Ext.getCmp('dl_zjrl-areacontentList-areaCode').setValue(rowRecord.data.areaCode);
		Ext.getCmp('dl_zjrl-areacontentList-areaCode').setReadOnly(true);
		Ext.getCmp('dl_zjrl-areacontentList-areaCode').setFieldStyle('color:gray');
		Ext.getCmp('dl_zjrl-areacontentList-addButton').setDisabled(false);
		
		var gridC = Ext.getCmp('dl_zjrl-areacontentList-id');
		var storeC = gridC.getStore();
		var obt = {
				areaCode: rowRecord.data.areaCode
		};
		Ext.apply(storeC.proxy.extraParams, obt);
		storeC.reload();
	},
	/**********************子区域*******************************/
	itemclickC: function(own){
		var grid = own.up('grid');
		var rowRecord = grid.getView().getSelectionModel().getSelection()[0];
		
		Ext.getCmp('dl_zjrl-zjrlList-contentCode').setValue(rowRecord.data.contentCode);
		Ext.getCmp('dl_zjrl-zjrlList-contentCode').setReadOnly(true);
		Ext.getCmp('dl_zjrl-zjrlList-contentCode').setFieldStyle('color:gray');
		Ext.getCmp('dl_zjrl-zjrlList-addButton').setDisabled(false);
		Ext.getCmp('dl_zjrl-lyxsList-contentCode').setValue(rowRecord.data.contentCode);
		Ext.getCmp('dl_zjrl-lyxsList-contentCode').setReadOnly(true);
		Ext.getCmp('dl_zjrl-lyxsList-contentCode').setFieldStyle('color:gray');
		Ext.getCmp('dl_zjrl-lyxsList-addButton').setDisabled(false);
		
		var gridC = Ext.getCmp('dl_zjrl-zjrlList-id');
		var storeC = gridC.getStore();
		var obt = {
				contentCode: rowRecord.data.contentCode
		};
		Ext.apply(storeC.proxy.extraParams, obt);
		storeC.reload();
		
		var gridL = Ext.getCmp('dl_zjrl-lyxsList-id');
		var storeL = gridL.getStore();
		var obt = {
				contentCode: rowRecord.data.contentCode
		};
		Ext.apply(storeL.proxy.extraParams, obt);
		storeL.reload();
	},
	
	/*****************装机容量*********************/
	//保存单条数据
	singleSaveR: function(records, store, grid){
		//alert('singleSave');
		this.saveAll_butR(records, store);
	},	
	//保存多条
	saveAllR: function(but){
		var grid = but.up('grid');
    	var store = grid.getStore();
    	//获取修改后的数据
    	var records = store.getModifiedRecords();
		if(records.length > 0){
			Ext.Msg.confirm('保存', '您确定保存所有数据吗?', function(button) {
				if (button == 'yes') {
					this.saveAll_butR(records, store);
				}
			}, this);		
		}else{
			Ext.example.msg('系统提示','数据为空！');
		}
	},
	
	saveAll_butR: function(records, store){
		//alert('saveAllAdd_but');
        var arr = [];
        for(var i = 0;i < records.length; i++){
        	records[i].data.dataTime = records[i].data.dataTime ==  '' ? '1970-01-01 08:00:00' : Ext.Date.format(new Date(records[i].data.dataTime), 'Y-m-d H:i:s');
        	records[i].data.inputTime = records[i].data.inputTime ==  '' ? '1970-01-01 08:00:00' : Ext.Date.format(new Date(records[i].data.inputTime), 'Y-m-d H:i:s');
        	arr.push(records[i].data);
        };	
        //console.log(Ext.encode(arr));
        var url = store.proxy.api.add;   
        //console.log(url);
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: url,
			jsonData: Ext.encode(arr),
			success: function(response){
				store.reload();
				//store.commitChanges();	
				Ext.example.msg('系统提示！', "保存成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});	   		
	},
	
	click_searchR: function(own){
		var contentCode = Ext.getCmp('dl_zjrl-zjrlList-contentCode').getValue();
		var zjrlType = Ext.getCmp('dl_zjrl-zjrlList-zjrlType').getValue();
		
		var grid = own.up('grid');
		var store = grid.getStore();	
		var obt = {
				contentCode: contentCode,
				zjrlType: zjrlType
		};			
		Ext.apply(store.proxy.extraParams, obt);
		store.load();
	},	
	/*****************利用小时*********************/
	click_searchL: function(own){
		
		var grid = own.up('grid');
		
		var contentCode = Ext.getCmp('dl_zjrl-lyxsList-contentCode').getValue();
		
		var storeY = grid.down('numberfield[name=storeY]').getValue();
		var storeM = grid.down('numberfield[name=storeM]').getValue();
		
        if(storeY == null || storeY == '' || storeM == null || storeM == ''){
        	return;
        }
		var dataTime = storeY + '-' + QJ_UtilEntity.month(storeM) + '-01';  
		
		var store = grid.getStore();	
		var obt = {
				contentCode: contentCode,
				dataTime: dataTime
		};			
		Ext.apply(store.proxy.extraParams, obt);
		store.load();
	},	
	
	/*****************公用方法*********************/
	//保存单条数据
	singleSave: function(records, store, grid){
		this.saveAll_but(records, store, null);
	},	
	
	//保存多条
	saveAll: function(but){
		var grid = but.up('grid');
    	var store = grid.getStore();
    	//获取修改后的数据
    	var records = store.getModifiedRecords();
		if(records.length > 0){
			Ext.Msg.confirm('保存', '您确定保存所有数据吗?', function(button) {
				if (button == 'yes') {
					this.saveAll_but(records, store, null);
				}
			}, this);		
		}else{
			Ext.example.msg('系统提示','数据为空！');
		}
	},
	
	saveAll_but: function(records, store, storeDate){
		//alert('saveAllAdd_but');
        var arr = [];
        for(var i = 0;i < records.length; i++){
        	arr.push(records[i].data);
        };	
        
        var url = store.proxy.api.add;   
		
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
	
	singleDelete: function(record, grid){
		if(record){
			Ext.Msg.confirm('删除', '您确定删除该数据吗?', function(button) {
				if (button == 'yes') {
					this.singleDelete_but(record, grid);
				}
			}, this);		
		}
	},		
	
	singleDelete_but: function(record, grid){
		//alert('singleDelete');
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
	},	
	/**************************************/
});
