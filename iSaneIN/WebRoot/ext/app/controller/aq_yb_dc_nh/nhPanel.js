Ext.define('isane.controller.aq_yb_dc_nh.nhPanel', {
	extend : 'Ext.app.Controller',
	//stores : ['aq_yb_dc_nh.rbTree'],
	//models : ['organtree'],	
	views : ['aq_yb_dc_nh.nhPanel', 'aq_yb_dc_nh.nhList'],
	init: function() {
		this.control({
			//zh月报导出
			'aq_yb_dc_nh-nhList button[text=导出]':{
				click: this.exportBtn
			},
			/*'aq_yb_dc_nh-nhPanel':{
				beforerender: this.onBeforeRender
			},				
			'aq_yb_dc_nh-rbWest':{
    			itemclick: this.itemclick_dt
    		},
    		'aq_yb_dc_nh-nhList button[text=搜索]':{
				click:this.click_search
			},			
			'aq_yb_dc_nh-nhList button[text=保存]':{
				click: this.saveAll
			},				
			'aq_yb_dc_nh-nhList actioncolumn':{
				saveSingle: this.singleSave
			}*/    		
		});
	},
	
	exportBtn: function(btn){
		var organCode = Ext.getCmp('aq_yb_dc_nh-nhList-organCode').getValue();
		var storeY = Ext.getCmp('aq_yb_dc_nh-nhList-storeY').getValue();
		var storeM = Ext.getCmp('aq_yb_dc_nh-nhList-storeM').getValue();
		var storeD = Ext.getCmp('aq_yb_dc_nh-nhList-storeD').getValue();
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD);
		var tempName = null;
		var fileName = null;
		if(organCode = 'GZFGS'){
			tempName = 'GZFGS_Y_NH_REPORT';
			fileName = '广州分公司_能耗月报统计';
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
		var own = Ext.getCmp('aq_yb_dc_nh-rbWest-id');
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
		Ext.getCmp('aq_yb_dc_nh-nhList-organCode').setValue(organCode);
		
		var grid = Ext.getCmp('aq_yb_dc_nh-nhList-id');
		this.afterrender(grid);
    	
    }, 	
 
	afterrender: function(panel){
		var storeY = Ext.getCmp('aq_yb_dc_nh-nhList-storeY').getValue();
		var storeM = Ext.getCmp('aq_yb_dc_nh-nhList-storeM').getValue();
		var storeD = Ext.getCmp('aq_yb_dc_nh-nhList-storeD').getValue();
		var organCode = Ext.getCmp('aq_yb_dc_nh-nhList-organCode').getValue();
		
		var obt = {
				plantCode: Ext.getCmp('aq_yb_dc_nh-nhList-organCode').getValue(),
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
		var grid = Ext.getCmp('aq_yb_dc_nh-nhList-id');
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
