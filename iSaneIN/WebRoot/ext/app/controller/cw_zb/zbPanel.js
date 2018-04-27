Ext.define('isane.controller.cw_zb.zbPanel', {
	extend : 'Ext.app.Controller',
	stores : ['original.original'],
	models : ['original'],	
	views : ['cw_zb.zbPanel', 'cw_zb.zbWest', 'cw_zb.zbListN', 'cw_zb.zbListC', 'cw_zb.importForm'],
	init: function() {
		this.control({
			//cw-west
			'cw_zb-zbPanel':{
				beforerender: this.onBeforeRender
			},				
			'cw_zb-zbWest':{
    			itemclick: this.itemclick_dt
    		},	
    		//cw-north
			'cw_zb-zbListN':{
				//afterrender:this.afterrenderN
			},	
			'cw_zb-zbListN button[text=搜索]':{
				click:this.click_searchN
			},
			'cw_zb-zbListN button[text=保存]': {
				click: this.saveAll
			},				
			'cw_zb-zbListN actioncolumn':{
				saveSingle: this.singleSave
			},				
			//cw-center
			'cw_zb-zbListC':{
				//afterrender:this.afterrenderC
			},	
			'cw_zb-zbListC button[text=搜索]':{
				click:this.click_searchC
			},	
			'cw_zb-zbListC button[text=保存]': {
				click: this.saveAll
			},				
			'cw_zb-zbListC actioncolumn':{
				saveSingle: this.singleSave
			},	
			'cw_zb-zbListC button[text=导入]':{
				click: this.importBtn
			}
		});
	},
	
	onBeforeRender: function(item){
		var own = Ext.getCmp('cw_zb-zbWest-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {
			organKey: QJ_PlantCode,
			organType: 3
		});
		storeTre.load();
		storeTre.getRootNode().set('expanded', true);
	},
	
    itemclick_dt: function(own, record, item, index, e, eOpts){
    	this.record = record; 
    	//console.log(record.data);
		if(record.data.id == 'root'){
			return;
		}
		//console.log(record.data);
		var organCode = record.data.organCode;
		//north
		Ext.getCmp('cw_zb-zbListN-organCode').setValue(organCode);
		Ext.getCmp('cw_zb-zbListN-searchButton').setDisabled(false);
		Ext.getCmp('cw_zb-zbListN-saveButton').setDisabled(false);		
		Ext.getCmp('cw_zb-zbListN-refresh').setDisabled(false);	
		
		var storeY = Ext.getCmp('cw_zb-zbListN-storeY').getValue();
		var storeM = Ext.getCmp('cw_zb-zbListN-storeM').getValue();
		var storeD = Ext.getCmp('cw_zb-zbListN-storeD').getValue();	
		var dateType = Ext.getCmp('cw_zb-zbListN-dateType').getValue();
		
		var grid = Ext.getCmp('cw_zb-zbListN-id');
		var obt = {
				plantCode: organCode,
				dataType: 'HT-CW-PAGE',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
				dateType: dateType
		};			
		this.afterrender(grid, obt);
		//center
		Ext.getCmp('cw_zb-zbListC-organCode').setValue(organCode);
		Ext.getCmp('cw_zb-zbListC-searchButton').setDisabled(false);
		Ext.getCmp('cw_zb-zbListC-saveButton').setDisabled(false);		
		Ext.getCmp('cw_zb-zbListC-importButton').setDisabled(false);		
		Ext.getCmp('cw_zb-zbListC-refresh').setDisabled(false);	
		
		var storeY = Ext.getCmp('cw_zb-zbListC-storeY').getValue();
		var storeM = Ext.getCmp('cw_zb-zbListC-storeM').getValue();
		var storeD = Ext.getCmp('cw_zb-zbListC-storeD').getValue();	
		var dateType = Ext.getCmp('cw_zb-zbListC-dateType').getValue();
		
		var grid = Ext.getCmp('cw_zb-zbListC-id');
		var obt = {
				plantCode: organCode,
				dataType: 'HT-CW-XLS',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
				dateType: dateType
		};	
		
		this.afterrender(grid, obt);
    },	
    
	afterrender: function(panel, obt){
		var store = panel.getStore();	
		Ext.apply(store.proxy.extraParams, obt);
		store.load();
	},  
	
	click_searchN: function(btn){
		var storeY = Ext.getCmp('cw_zb-zbListN-storeY').getValue();
		var storeM = Ext.getCmp('cw_zb-zbListN-storeM').getValue();
		var storeD = Ext.getCmp('cw_zb-zbListN-storeD').getValue();
		var organCode = Ext.getCmp('cw_zb-zbListN-organCode').getValue();
		var dateType = Ext.getCmp('cw_zb-zbListN-dateType').getValue();
		var obt = {
				plantCode: organCode,
				dataType: 'CW-PAGE',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
				dateType: dateType
		};			
		this.afterrender(btn.up('grid'), obt);
	},
	
	
	click_searchC: function(btn){
		var storeY = Ext.getCmp('cw_zb-zbListC-storeY').getValue();
		var storeM = Ext.getCmp('cw_zb-zbListC-storeM').getValue();
		var storeD = Ext.getCmp('cw_zb-zbListC-storeD').getValue();
		var organCode = Ext.getCmp('cw_zb-zbListC-organCode').getValue();
		var dateType = Ext.getCmp('cw_zb-zbListC-dateType').getValue();
		var obt = {
				plantCode: organCode,
				dataType: 'CW-XLS',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
				dateType: dateType
		};			
		this.afterrender(btn.up('grid'), obt);
	},
	
	//保存单条数据
	singleSave: function(records, store, grid){
		var storeY = grid.ownerCt.down('numberfield[name=storeY]').getValue();
		var storeM = grid.ownerCt.down('numberfield[name=storeM]').getValue();
        if(storeY == null || storeY == '' || storeM == null || storeM == ''){
        	return;
        }
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-01';
		this.saveAll_but(records, store, storeDate);
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
			params: {
				storeDate: storeDate
			},
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
	//电量导入
	/*importBtn: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '电量导入',
			modal: true,
			border: 0,
			items: [{xtype: 'cw_zb-zbImportForm'}],
			buttons: [{scope: this,text: '确定', iconCls:'ok1', handler: this.importSave},{text: '取消', iconCls:'delete1',  handler: function(btn){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		win.show();		
	},*/
	
	importBtn: function(btn){
		//alert('importBtn');
		var win = Ext.create('Ext.window.Window',{
			title: '财务导入',
			modal: true,
			border: 0,
			items: [{xtype: 'cw_zb-importForm'}],
			buttons: [{scope: this,text: '确定', iconCls:'ok1', handler: this.importSave},{text: '取消', iconCls:'delete1',  handler: function(btn){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		
		//var plantCode = Ext.getCmp('cw_zb-zbListC-organCode').getValue();
		//Ext.getCmp('cw_zb-importForm-plantCode').setValue(plantCode);
		
		var storeY = Ext.getCmp('cw_zb-zbListC-storeY').getValue();
		var storeM = Ext.getCmp('cw_zb-zbListC-storeM').getValue();
        if(storeY == null || storeY == '' || storeM == null || storeM == ''){
        	return;
        }
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM);  
		Ext.getCmp('cw_zb-importForm-storeDate').setValue(storeDate);
		win.show();		
	},
	
	importSave: function(btn){
    	var win = btn.up('window');
    	var form = win.down('form').getForm();
    	/*var grid = Ext.getCmp('aq_yb_lr_hb-hbList-id');
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
