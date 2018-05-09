Ext.define('isane.controller.aq_yb_lr_zh.zhPanel', {
	extend : 'Ext.app.Controller',
	stores : ['aq_yb_lr_zh.zhTree'],
	models : ['organtree'],	
	views : ['aq_yb_lr_zh.zhPanel', 'aq_yb_lr_zh.zhWest', 'aq_yb_lr_zh.zhList', 'aq_yb_lr_zh.importForm', 'aq_yb_lr_zh.zhListC'],
	init: function() {
		this.control({
			//zh-west
			'aq_yb_lr_zh-zhPanel':{
				beforerender: this.onBeforeRender
			},				
			'aq_yb_lr_zh-zhWest':{
    			itemclick: this.itemclick_dt
    		},
    		//zh-north
    		'aq_yb_lr_zh-zhList button[text=搜索]':{
				click:this.click_search
			},			
			'aq_yb_lr_zh-zhList button[text=保存]':{
				click: this.saveAll
			},				
			'aq_yb_lr_zh-zhList actioncolumn':{
				saveSingle: this.singleSave
			}, 
			'aq_yb_lr_zh-zhList button[text=导入]':{
				click: this.importBtn
			},
			//zh-center
    		'aq_yb_lr_zh-zhListC button[text=搜索]':{
				click:this.click_searchC
			},			
			'aq_yb_lr_zh-zhListC button[text=保存]':{
				click: this.saveAll
			},
			'aq_yb_lr_zh-zhListC actioncolumn':{
				saveSingle: this.singleSave
			}			
		});
	},
	
	onBeforeRender: function(item){
		var own = Ext.getCmp('aq_yb_lr_zh-zhWest-id');
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
    	
		if(record.data.id == 'root'){
			return;
		}
		//console.log(record.data);
		var organCode = record.data.organCode;
		//north
		Ext.getCmp('aq_yb_lr_zh-zhList-organCode').setValue(organCode);
		Ext.getCmp('aq_yb_lr_zh-zhList-searczhutton').setDisabled(false);
		Ext.getCmp('aq_yb_lr_zh-zhList-saveButton').setDisabled(false);		
		Ext.getCmp('aq_yb_lr_zh-zhList-importButton').setDisabled(false);		
		Ext.getCmp('aq_yb_lr_zh-zhList-refresh').setDisabled(false);	
		
		var storeY = Ext.getCmp('aq_yb_lr_zh-zhList-storeY').getValue();
		var storeM = Ext.getCmp('aq_yb_lr_zh-zhList-storeM').getValue();
		var storeD = Ext.getCmp('aq_yb_lr_zh-zhList-storeD').getValue();	
		
		var grid = Ext.getCmp('aq_yb_lr_zh-zhList-id');
		var obt = {
				plantCode: organCode,
				dataType: 'HT-ZH-XLS',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
		};			
		this.afterrender(grid, obt);
		//center
		Ext.getCmp('aq_yb_lr_zh-zhListC-organCode').setValue(organCode);
		Ext.getCmp('aq_yb_lr_zh-zhListC-searczhutton').setDisabled(false);
		Ext.getCmp('aq_yb_lr_zh-zhListC-saveButton').setDisabled(false);		
		//Ext.getCmp('aq_yb_lr_zh-zhListC-importButton').setDisabled(false);		
		Ext.getCmp('aq_yb_lr_zh-zhListC-refresh').setDisabled(false);		
		var grid = Ext.getCmp('aq_yb_lr_zh-zhListC-id');
		var obt = {
				plantCode: organCode,
				dataType: 'HT-ZH-PAGE',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
		};			
		this.afterrender(grid, obt);
    }, 	
 
	afterrender: function(panel, obt){
		var store = panel.getStore();	
		Ext.apply(store.proxy.extraParams, obt);
		store.load();
	},
	
	click_search: function(btn){
		var storeY = Ext.getCmp('aq_yb_lr_zh-zhList-storeY').getValue();
		var storeM = Ext.getCmp('aq_yb_lr_zh-zhList-storeM').getValue();
		var storeD = Ext.getCmp('aq_yb_lr_zh-zhList-storeD').getValue();
		var organCode = Ext.getCmp('aq_yb_lr_zh-zhList-organCode').getValue();
		var obt = {
				plantCode: organCode,
				dataType: 'HT-ZH-XLS',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
		};			
		this.afterrender(btn.up('grid'), obt);
	},
	
	click_searchC: function(btn){
		var storeY = Ext.getCmp('aq_yb_lr_zh-zhListC-storeY').getValue();
		var storeM = Ext.getCmp('aq_yb_lr_zh-zhListC-storeM').getValue();
		var storeD = Ext.getCmp('aq_yb_lr_zh-zhListC-storeD').getValue();
		var organCode = Ext.getCmp('aq_yb_lr_zh-zhListC-organCode').getValue();
		var obt = {
				plantCode: organCode,
				dataType: 'HT-ZH-PAGE',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
		};			
		this.afterrender(btn.up('grid'), obt);
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
		var grid = Ext.getCmp('aq_yb_lr_zh-zhList-id');
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
	//检修文档导入
	importBtn: function(btn){
		//alert('importBtn');
		var win = Ext.create('Ext.window.Window',{
			title: '环保指标导入',
			modal: true,
			border: 0,
			items: [{xtype: 'aq_yb_lr_zh-importForm'}],
			buttons: [{scope: this,text: '确定', iconCls:'ok1', handler: this.importSave},{text: '取消', iconCls:'delete1',  handler: function(btn){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		
		//var plantCode = Ext.getCmp('aq_yb_lr_zh-zhList-organCode').getValue();
		//Ext.getCmp('aq_yb_lr_zh-importForm-plantCode').setValue(plantCode);
		
		var storeY = Ext.getCmp('aq_yb_lr_zh-zhList-storeY').getValue();
		var storeM = Ext.getCmp('aq_yb_lr_zh-zhList-storeM').getValue();
        if(storeY == null || storeY == '' || storeM == null || storeM == ''){
        	return;
        }
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM);  
		Ext.getCmp('aq_yb_lr_zh-importForm-storeDate').setValue(storeDate);
		win.show();		
	},
	
	importSave: function(btn){
    	var win = btn.up('window');
    	var form = win.down('form').getForm();
    	/*var grid = Ext.getCmp('aq_yb_lr_zh-zhList-id');
    	var store = grid.getStore();*/
    	//var url = store.proxy.api.upload;
    	var url = 'api/Import/in';
    	//alert('111');
    	//return;
        if(form.isValid()){
            form.submit({
            	scope: this,
                url: url,
                waitMsg: 'Uploading...',
    			success: function(response){
    				win.close();
    				Ext.example.msg('系统提示！', "导入成功！");
    				//store.load();
    			},
    			failure: function(response){
    				QJ_UtilEntity.failWin(response);
    			}
            });
        }		
	}	
	
});
