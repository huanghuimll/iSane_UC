Ext.define('isane.controller.aq_kkxgl.kkxglPanel', {
	extend : 'Ext.app.Controller',
	stores : ['aq_kkxgl.organtree', 'aq_kkxgl.yxzt' ],
	models : ['organtree', 'yxzt'],	
	views : ['aq_kkxgl.kkxglPanel', 'aq_kkxgl.kkxglWest', 'aq_kkxgl.kkxglList'],
	init: function() {
		this.control({
			//kkxgl
			'aq_kkxgl-kkxglPanel':{
				beforerender: this.onBeforeRender
			},				
    		'aq_kkxgl-kkxglWest':{
    			itemclick: this.itemclick_dt
    		},
			'aq_kkxgl-kkxglList button[text=搜索]':{
				click:this.click_search
			},			
			'aq_kkxgl-kkxglList button[text=保存]':{
				click: this.saveAll
			},				
			'aq_kkxgl-kkxglList actioncolumn':{
				saveSingle: this.singleSave,
				singleDelete: this.singleDelete
			}    		
		});
	},
	
	onBeforeRender: function(item){
		var own = Ext.getCmp('aq_kkxgl-kkxglWest-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {
			organKey: QJ_PlantCode,
			organLev: 3,
			organType: 1
		});		
		storeTre.load();
		storeTre.getRootNode().set('expanded', true);
	},
	
    itemclick_dt: function(own, record, item, index, e, eOpts){
    	this.record = record; 
		if(!record.data.leaf){
			return;
		}
		//console.log(record.data);
		var jzCode = record.data.organCode;
		var plantCode = record.data.organParentId;
		Ext.getCmp('aq_kkxgl-kkxglList-jzKey').setValue(jzCode);
		Ext.getCmp('aq_kkxgl-kkxglList-organCode').setValue(plantCode);
		
		var grid = Ext.getCmp('aq_kkxgl-kkxglList-id');
		/*var store = grid.getStore();
    	Ext.apply(store.proxy.extraParams, {jzKey:jzCode});
    	store.load();*/
		this.afterrender(grid);
    	
    }, 	
 
	afterrender: function(panel){
		var storeY = Ext.getCmp('aq_kkxgl-kkxglList-storeY').getValue();
		//var storeM = Ext.getCmp('aq_kkxgl-kkxglList-storeM').getValue();
		var jzKey = Ext.getCmp('aq_kkxgl-kkxglList-jzKey').getValue();
		
		var obt = {
				organCode: Ext.getCmp('aq_kkxgl-kkxglList-organCode').getValue(),
				jzKey: jzKey,
				startTime: storeY + '-01-01 00:00:00',
			};	
		var store = panel.getStore();	
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
        	records[i].data.startTime = records[i].data.startTime ==  '' ? '1970-01-01 08:00:00' : Ext.Date.format(new Date(records[i].data.startTime), 'Y-m-d H:i:s');
        	records[i].data.endTime = records[i].data.endTime ==  '' ? '1970-01-01 08:00:00' : Ext.Date.format(new Date(records[i].data.endTime), 'Y-m-d H:i:s');
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
			jsonData: Ext.encode(arr[0]),
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
		var grid = Ext.getCmp('aq_kkxgl-kkxglList-id');
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
