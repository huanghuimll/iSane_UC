Ext.define('isane.controller.aq_scfygl_scfy.scfyPanel', {
	extend : 'Ext.app.Controller',
	stores : ['scfy.scfy'],
	models : ['scfy'],	
	views : ['aq_scfygl_scfy.scfyPanel', 'aq_scfygl_scfy.scfyList'],
	init: function() {
		this.control({
			//scfy		
			'aq_scfygl_scfy-scfyList':{
				beforerender: this.afterrender
			},				
			'aq_scfygl_scfy-scfyList button[text=搜索]':{
				click:this.click_search
			},			
			'aq_scfygl_scfy-scfyList button[text=保存]':{
				click: this.saveAll
			},				
			'aq_scfygl_scfy-scfyList actioncolumn':{
				saveSingle: this.singleSave,
				singleDelete: this.singleDelete
			}  		
		});
	},
 
	afterrender: function(own){
		var startTime = Ext.getCmp('aq_scfygl_scfy-scfyList-startTime').getValue();
		var endTime = Ext.getCmp('aq_scfygl_scfy-scfyList-endTime').getValue();
		var plantCode = Ext.getCmp('aq_scfygl_scfy-scfyList-plantCode').getValue();
		var scfyType = Ext.getCmp('dl_zjrl-zjrlList-scfyType').getValue();
		var obt = {
				plantCode: plantCode,
				scfyType: scfyType,
				startTime: Ext.Date.format(new Date(startTime), 'Y-m-d H:i:s'),
				endTime: endTime == null ? '2099-01-01 08:00:00' : Ext.Date.format(new Date(endTime), 'Y-m-d H:i:s')
		};	
		//return;
		var store = own.getStore();	
		Ext.apply(store.proxy.extraParams, obt);
		store.load();
	},
	
	click_search: function(btn){
		this.afterrender(btn.up('grid'));
	},
	
	//保存单条数据
	singleSave: function(records, store, grid){
		//alert('singleSave');
		this.saveAll_but(records, store);
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
	
	saveAll_but: function(records, store){
		//alert('saveAllAdd_but');
        var arr = [];
        for(var i = 0;i < records.length; i++){
        	records[i].data.dataTime = records[i].data.dataTime ==  '' ? '1970-01-01 08:00:00' : Ext.Date.format(new Date(records[i].data.dataTime), 'Y-m-d H:i:s');
        	records[i].data.inputTime = records[i].data.inputTime ==  '' ? '1970-01-01 08:00:00' : Ext.Date.format(new Date(records[i].data.inputTime), 'Y-m-d H:i:s');
        	arr.push(records[i].data);
        };	
        //console.log(Ext.encode(arr));
        var url = store.proxy.api.add;   
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
	}
	
});
