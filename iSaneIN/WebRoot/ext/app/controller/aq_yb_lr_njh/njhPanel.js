Ext.define('isane.controller.aq_yb_lr_njh.njhPanel', {
	extend : 'Ext.app.Controller',
	stores : ['aq_yb_lr_njh.njhTree'],
	models : ['organtree'],	
	views : ['aq_yb_lr_njh.njhPanel', 'aq_yb_lr_njh.njhWest', 'aq_yb_lr_njh.njhList'],
	init: function() {
		this.control({
			//年计划值
			'aq_yb_lr_njh-njhPanel':{
				beforerender: this.onBeforeRender
			},				
			'aq_yb_lr_njh-njhWest':{
    			itemclick: this.itemclick_dt
    		},
    		'aq_yb_lr_njh-njhList button[text=搜索]':{
				click:this.click_search
			},			
			'aq_yb_lr_njh-njhList button[text=保存]':{
				click: this.saveAll
			},				
			'aq_yb_lr_njh-njhList actioncolumn':{
				saveSingle: this.singleSave
			} 			
		});
	},
	
	onBeforeRender: function(item){
		var own = Ext.getCmp('aq_yb_lr_njh-njhWest-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {
			organKey: QJ_PlantCode,
			organLev: 2,
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
		var organCode = record.data.organCode;
		Ext.getCmp('aq_yb_lr_njh-njhList-organCode').setValue(organCode);
		Ext.getCmp('aq_yb_lr_njh-njhList-searchButton').setDisabled(false);
		Ext.getCmp('aq_yb_lr_njh-njhList-saveButton').setDisabled(false);		
		Ext.getCmp('aq_yb_lr_njh-njhList-refresh').setDisabled(false);		
		
		var grid = Ext.getCmp('aq_yb_lr_njh-njhList-id');
		this.afterrender(grid);
    }, 	
 
	afterrender: function(panel){
		var storeY = Ext.getCmp('aq_yb_lr_njh-njhList-storeY').getValue();
		var storeM = Ext.getCmp('aq_yb_lr_njh-njhList-storeM').getValue();
		var storeD = Ext.getCmp('aq_yb_lr_njh-njhList-storeD').getValue();
		var organCode = Ext.getCmp('aq_yb_lr_njh-njhList-organCode').getValue();
		
		var obt = {
				plantCode: Ext.getCmp('aq_yb_lr_njh-njhList-organCode').getValue(),
				dataType: 'HT-AQ-NJH-PAGE',
				dateType: 'Y',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
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
		var storeY = grid.ownerCt.down('numberfield[name=storeY]').getValue();
		var storeM = grid.ownerCt.down('numberfield[name=storeM]').getValue();
		var storeD = grid.ownerCt.down('numberfield[name=storeD]').getValue();
        if(storeY == null || storeY == '' || storeM == null || storeM == ''){
        	return;
        }
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-' + QJ_UtilEntity.month(storeD);  		
		this.saveAll_but(records, store, storeDate);
	},	
	//保存多条
	saveAll: function(but){
		var grid = but.up('grid');
    	var store = grid.getStore();
		var storeY = grid.down('numberfield[name=storeY]').getValue();
		var storeM = grid.down('numberfield[name=storeM]').getValue();
		var storeD = grid.down('numberfield[name=storeD]').getValue();
        if(storeY == null || storeY == '' || storeM == null || storeM == ''){
        	return;
        }
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-' + QJ_UtilEntity.month(storeD);  	
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
	
	saveAll_but: function(records, store, storeDate){
		//alert('saveAllAdd_but');
        var arr = [];
        for(var i = 0;i < records.length; i++){
        	arr.push(records[i].data);
        };	        
        var url = store.proxy.api.add;   
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: url,
			params:{
				storeDate: storeDate
			},			
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
	}
	
});
