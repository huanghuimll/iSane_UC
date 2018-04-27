Ext.define('isane.controller.dl_fdl.fdlPanel', {
	extend : 'Ext.app.Controller',
	stores : ['original.original'],
	models : ['original'],	
	views : ['dl_fdl.fdlPanel', 'dl_fdl.fdlWest', 'dl_fdl.fdlListN', 'dl_fdl.fdlListC', 'dl_fdl.fdlImportForm'],
	init: function() {
		this.control({
			//cw-west
			'dl_fdl-fdlPanel':{
				beforerender: this.onBeforeRender
			},				
			'dl_fdl-fdlWest':{
    			itemclick: this.itemclick_dt
    		},
    		//cw-north
			'dl_fdl-fdlListN':{
				//afterrender:this.afterrenderN
			},	
			'dl_fdl-fdlListN button[text=搜索]':{
				click:this.click_searchN
			},
			//cw-center
			'dl_fdl-fdlListC':{
				//afterrender:this.afterrenderC
			},	
			'dl_fdl-fdlListC button[text=搜索]':{
				click:this.click_searchC
			},	
			'dl_fdl-fdlListN button[text=保存]': {
				click: this.saveAll
			},				
			'dl_fdl-fdlListN actioncolumn':{
				saveSingle: this.singleSave
			},	
			'dl_fdl-fdlListC button[text=保存]': {
				click: this.saveAll
			},				
			'dl_fdl-fdlListC actioncolumn':{
				saveSingle: this.singleSave
			},	
			'dl_fdl-fdlListC button[text=导入]':{
				click: this.importBtn
			},
			'dl_fdl-fdlListC button[text=模板]':{
				click: this.templeteBtn
			}				
		});
	},
	
	onBeforeRender: function(item){
		var own = Ext.getCmp('dl_fdl-fdlWest-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {
			organKey: QJ_PlantCode,
			organType: 2
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
		Ext.getCmp('dl_fdl-fdlListN-organCode').setValue(organCode);
		Ext.getCmp('dl_fdl-fdlListN-searchButton').setDisabled(false);
		Ext.getCmp('dl_fdl-fdlListN-saveButton').setDisabled(false);		
		Ext.getCmp('dl_fdl-fdlListN-refresh').setDisabled(false);	
		
		var storeY = Ext.getCmp('dl_fdl-fdlListN-storeY').getValue();
		var storeM = Ext.getCmp('dl_fdl-fdlListN-storeM').getValue();
		var storeD = Ext.getCmp('dl_fdl-fdlListN-storeD').getValue();	
		var dateType = Ext.getCmp('dl_fdl-fdlListN-dateType').getValue();
		
		var grid = Ext.getCmp('dl_fdl-fdlListN-id');
		var obt = {
				plantCode: organCode,
				dataType: 'HT-DL-PAGE',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
				dateType: dateType
		};			
		this.afterrender(grid, obt);
		//center
		Ext.getCmp('dl_fdl-fdlListC-organCode').setValue(organCode);
		Ext.getCmp('dl_fdl-fdlListC-searchButton').setDisabled(false);
		Ext.getCmp('dl_fdl-fdlListC-saveButton').setDisabled(false);		
		Ext.getCmp('dl_fdl-fdlListC-importButton').setDisabled(false);		
		Ext.getCmp('dl_fdl-fdlListC-refresh').setDisabled(false);	
		
		var storeY = Ext.getCmp('dl_fdl-fdlListC-storeY').getValue();
		var storeM = Ext.getCmp('dl_fdl-fdlListC-storeM').getValue();
		var storeD = Ext.getCmp('dl_fdl-fdlListC-storeD').getValue();	
		var dateType = Ext.getCmp('dl_fdl-fdlListC-dateType').getValue();		
		
		var grid = Ext.getCmp('dl_fdl-fdlListC-id');
		var obt = {
				plantCode: organCode,
				dataType: 'HT-DL-XLS',
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
		var storeY = Ext.getCmp('dl_fdl-fdlListN-storeY').getValue();
		var storeM = Ext.getCmp('dl_fdl-fdlListN-storeM').getValue();
		var storeD = Ext.getCmp('dl_fdl-fdlListN-storeD').getValue();
		var organCode = Ext.getCmp('dl_fdl-fdlListN-organCode').getValue();
		var dateType = Ext.getCmp('dl_fdl-fdlListN-dateType').getValue();
		var obt = {
				plantCode: organCode,
				dataType: 'HT-DL-PAGE',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
				dateType: dateType
		};			
		this.afterrender(btn.up('grid'), obt);
	},	
	
	click_searchC: function(btn){
		var storeY = Ext.getCmp('dl_fdl-fdlListC-storeY').getValue();
		var storeM = Ext.getCmp('dl_fdl-fdlListC-storeM').getValue();
		var storeD = Ext.getCmp('dl_fdl-fdlListC-storeD').getValue();
		var organCode = Ext.getCmp('dl_fdl-fdlListC-organCode').getValue();
		var dateType = Ext.getCmp('dl_fdl-fdlListC-dateType').getValue();
		var obt = {
				plantCode: organCode,
				dataType: 'HT-DL-XLS',
				storeDate: storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD),
				dateType: dateType
		};			
		this.afterrender(btn.up('grid'), obt);
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
	importBtn: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '电量导入',
			modal: true,
			border: 0,
			items: [{xtype: 'dl_fdl-fdlImportForm'}],
			buttons: [{scope: this,text: '确定', iconCls:'ok1', handler: this.importSave},{text: '取消', iconCls:'delete1',  handler: function(btn){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var storeY = Ext.getCmp('dl_fdl-fdlListC-storeY').getValue();
		var storeM = Ext.getCmp('dl_fdl-fdlListC-storeM').getValue();
        if(storeY == null || storeY == '' || storeM == null || storeM == ''){
        	return;
        }
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM);  
		Ext.getCmp('dl_fdl-fdlImportForm-storeDate').setValue(storeDate);
		
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
	},
	//模板导出
	templeteBtn: function(){
		 window.location.href = 'api/OriginalType/exportTemplate?fileName=电力市场模板&fileCode=GZFGS_DR_DL.xlsx';
	}	
});
