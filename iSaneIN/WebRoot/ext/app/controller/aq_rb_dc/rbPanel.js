Ext.define('isane.controller.aq_rb_dc.rbPanel', {
	extend : 'Ext.app.Controller',
	//stores : ['aq_rb_dc.rbTree'],
	//models : ['organtree'],	
	views : ['aq_rb_dc.rbPanel', 'aq_rb_dc.rbList'],
	init: function() {
		this.control({
			//rb日报导出
			'aq_rb_dc-rbList button[text=导出]':{
				click: this.exportBtn
			},
			/*'aq_rb_dc-rbPanel':{
				beforerender: this.onBeforeRender
			},				
			'aq_rb_dc-rbWest':{
    			itemclick: this.itemclick_dt
    		},
    		'aq_rb_dc-rbList button[text=搜索]':{
				click:this.click_search
			},			
			'aq_rb_dc-rbList button[text=保存]':{
				click: this.saveAll
			},				
			'aq_rb_dc-rbList actioncolumn':{
				saveSingle: this.singleSave
			}*/    		
		});
	},
	
	exportBtn: function(btn){
		var organCode = Ext.getCmp('aq_rb_dc-rbList-organCode').getValue();
		var storeY = Ext.getCmp('aq_rb_dc-rbList-storeY').getValue();
		var storeM = Ext.getCmp('aq_rb_dc-rbList-storeM').getValue();
		var storeD = Ext.getCmp('aq_rb_dc-rbList-storeD').getValue();
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD);
		var tempName = null;
		var fileName = null;
		if(organCode = 'GZFGS'){
			tempName = 'GZFGS_D_REPORT';
			fileName = '广州分公司_日报';
		}
		
		var url = "api/IndexDat/DAndY/export?";
		
		if(tempName != null){
			url += "&tempName="+tempName;
		}
		if(fileName != null){
			url += "&fileName="+fileName;
		}
		if(storeDate != null){
			url += "&storeDate="+storeDate;
		}
		
		window.location.href = url;
	},
	
	onBeforeRender: function(item){
		var own = Ext.getCmp('aq_rb_dc-rbWest-id');
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
		var organCode = record.data.organCode;
		Ext.getCmp('aq_rb_dc-rbList-organCode').setValue(organCode);
		
		var grid = Ext.getCmp('aq_rb_dc-rbList-id');
		this.afterrender(grid);
    	
    }, 	
 
	afterrender: function(panel){
		var storeY = Ext.getCmp('aq_rb_dc-rbList-storeY').getValue();
		var storeM = Ext.getCmp('aq_rb_dc-rbList-storeM').getValue();
		var storeD = Ext.getCmp('aq_rb_dc-rbList-storeD').getValue();
		var organCode = Ext.getCmp('aq_rb_dc-rbList-organCode').getValue();
		
		var obt = {
				plantCode: Ext.getCmp('aq_rb_dc-rbList-organCode').getValue(),
				dataType: 'RB_PT',
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
		var grid = Ext.getCmp('aq_rb_dc-rbList-id');
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
