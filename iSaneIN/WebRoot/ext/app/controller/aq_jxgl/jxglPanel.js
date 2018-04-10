Ext.define('isane.controller.aq_jxgl.jxglPanel', {
	extend : 'Ext.app.Controller',
	stores : ['aq_jxgl.jxgltree', 'aq_jxgl.jxgl'],
	models : ['jxgltree', 'attachment'],	
	views : ['aq_jxgl.jxglPanel', 'aq_jxgl.jxglWest', 'aq_jxgl.jxglList', 'aq_jxgl.importForm'],
	init: function() {
		this.control({
			//jxgl
			'aq_jxgl-jxglPanel':{
				beforerender: this.onBeforeRender
			},				
    		'aq_jxgl-jxglWest':{
    			itemclick: this.itemclick_dt
    		},
			'aq_jxgl-jxglList button[text=搜索]':{
				click:this.click_search
			},							
			'aq_jxgl-jxglList actioncolumn':{
				singleDelete: this.singleDelete
			},    	
			'aq_jxgl-jxglList button[text=上传]':{
				click: this.importBtn
			}    		
		});
	},
	
	onBeforeRender: function(item){
		var own = Ext.getCmp('aq_jxgl-jxglWest-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {uid:0});
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
		var plantCode = record.data.parentCode;
		Ext.getCmp('aq_jxgl-jxglList-jzCode').setValue(jzCode);
		Ext.getCmp('aq_jxgl-jxglList-plantCode').setValue(plantCode);
		Ext.getCmp('aq_jxgl-jxglList-searchButton').setDisabled(false);
		Ext.getCmp('aq_jxgl-jxglList-importButton').setDisabled(false);
		
		var grid = Ext.getCmp('aq_jxgl-jxglList-id');
		
		this.afterrender(grid);
    	
    }, 	
 
	afterrender: function(panel){
		var startTime = Ext.getCmp('aq_jxgl-jxglList-startTime').getValue();
		var endTime = Ext.getCmp('aq_jxgl-jxglList-endTime').getValue();
		var plantCode = Ext.getCmp('aq_jxgl-jxglList-plantCode').getValue();
		var jzCode = Ext.getCmp('aq_jxgl-jxglList-jzCode').getValue();
		
		var obt = {
				plantCode: plantCode ,
				jzCode: jzCode,
				startTime: Ext.Date.format(new Date(startTime), 'Y-m-d H:i:s'),
				endTime: endTime == null ? '2099-01-01 08:00:00' : Ext.Date.format(new Date(endTime), 'Y-m-d H:i:s')
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
		var grid = Ext.getCmp('aq_jxgl-jxglList-id');
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
	
	//检修文档上传
	importBtn: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '文档上传',
			modal: true,
			border: 0,
			items: [{xtype: 'aq_jxgl-importForm'}],
			buttons: [{scope: this,text: '确定', iconCls:'ok1', handler: this.importSave},{text: '取消', iconCls:'delete1',  handler: function(btn){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		
		var plantCode = Ext.getCmp('aq_jxgl-jxglList-plantCode').getValue();
		var jzCode = Ext.getCmp('aq_jxgl-jxglList-jzCode').getValue();
		Ext.getCmp('aq_jxgl-importForm-plantCode').setValue(plantCode);
		Ext.getCmp('aq_jxgl-importForm-ownCode').setValue(jzCode);
		win.show();		
	},
	
	importSave: function(btn){
    	var win = btn.up('window');
    	var form = win.down('form').getForm();
    	var grid = Ext.getCmp('aq_jxgl-jxglList-id');
    	var store = grid.getStore();
    	var url = store.proxy.api.upload;
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
    				store.load();
    			},
    			failure: function(response){
    				QJ_UtilEntity.failWin(response);
    			}
            });
        }		
	}		
	
});
