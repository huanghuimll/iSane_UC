Ext.define('isane.controller.aq_rb_rl.rbPanel', {
	extend : 'Ext.app.Controller',
	stores : ['aq_rb_rl.rbTree'],
	models : ['organtree'],	
	views : ['aq_rb_rl.rbPanel', 'aq_rb_rl.rbWest', 'aq_rb_rl.rbList', 'aq_rb_rl.rbImportForm'],
	init: function() {
		this.control({
			//rb
			'aq_rb_rl-rbPanel':{
				beforerender: this.onBeforeRender
			},				
			'aq_rb_rl-rbWest':{
    			itemclick: this.itemclick_dt
    		},
    		'aq_rb_rl-rbList button[text=搜索]':{
				click:this.click_search
			},			
			'aq_rb_rl-rbList button[text=保存]':{
				click: this.saveAll
			},				
			'aq_rb_rl-rbList actioncolumn':{
				saveSingle: this.singleSave
			},
			'aq_rb_rl-rbList button[text=导入]':{
				click: this.importBtn
			},
			'aq_rb_rl-rbList button[text=模板]':{
				click: this.templeteBtn
			}			
		});
	},
	
	onBeforeRender: function(item){
		var own = Ext.getCmp('aq_rb_rl-rbWest-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {
			organKey: QJ_PlantCode,
			organLev: 1,
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
		Ext.getCmp('aq_rb_rl-rbList-organCode').setValue(organCode);
		Ext.getCmp('aq_rb_rl-rbList-searchButton').setDisabled(false);
		Ext.getCmp('aq_rb_rl-rbList-saveButton').setDisabled(false);		
		Ext.getCmp('aq_rb_rl-rbList-refresh').setDisabled(false);	
		
		var grid = Ext.getCmp('aq_rb_rl-rbList-id');
		this.afterrender(grid);
    	
    }, 	
 
	afterrender: function(panel){
		var storeY = Ext.getCmp('aq_rb_rl-rbList-storeY').getValue();
		var storeM = Ext.getCmp('aq_rb_rl-rbList-storeM').getValue();
		var storeD = Ext.getCmp('aq_rb_rl-rbList-storeD').getValue();
		var organCode = Ext.getCmp('aq_rb_rl-rbList-organCode').getValue();
		
		var obt = {
				plantCode: Ext.getCmp('aq_rb_rl-rbList-organCode').getValue(),
				dataType: 'HT-RB-XLS',
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
    	console.log(records);
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
		var grid = Ext.getCmp('aq_rb_rl-rbList-id');
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
	
	//电量导入
	importBtn: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '电量导入',
			modal: true,
			border: 0,
			items: [{xtype: 'aq_rb_rl-rbImportForm'}],
			buttons: [{scope: this,text: '确定', iconCls:'ok1', handler: this.importSave},{text: '取消', iconCls:'delete1',  handler: function(btn){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var storeY = Ext.getCmp('aq_rb_rl-rbList-storeY').getValue();
		var storeM = Ext.getCmp('aq_rb_rl-rbList-storeM').getValue();
		var storeD = Ext.getCmp('aq_rb_rl-rbList-storeD').getValue();
        if(storeY == null || storeY == '' || storeM == null || storeM == ''){
        	return;
        }
        var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-' + QJ_UtilEntity.month(storeD);  
		Ext.getCmp('aq_rb_rl-rbImportForm-storeDate').setValue(storeDate);
		
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
    			success: function(form, action){
    				win.close();
    				var obj = action.result;
                    if(!obj.success) { 
                    	Ext.example.msg("系统提示！",obj.message);
                    }
                    else {
                    	Ext.example.msg("系统提示！",obj.message);
                    	store.reload();
                    }    				
    			},
    		    failure: function(form, action) {
    		        switch (action.failureType) {
    		            case Ext.form.action.Action.CLIENT_INVALID:
    		            	Ext.example.msg('Failure', 'Form fields may not be submitted with invalid values');
    		                break;
    		            case Ext.form.action.Action.CONNECT_FAILURE:
    		            	Ext.example.msg('Failure', 'Ajax communication failed');
    		                break;
    		            case Ext.form.action.Action.SERVER_INVALID:
    		            	Ext.example.msg('Failure', action.result.message);
    		       }
    		    }
            });
        }		
	},
	
	//模板导出
	templeteBtn: function(){
		 window.location.href = 'api/OriginalType/exportTemplate?fileName=日报导入模板&fileCode=DR_AQ_RB.xls';
	}	
	
});
