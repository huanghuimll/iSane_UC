Ext.define('isane.controller.aq_yb_dc_fjhdl.fjhdlPanel', {
	extend : 'Ext.app.Controller',
	views : ['aq_yb_dc_fjhdl.fjhdlPanel'],
	init: function() {
		this.control({
			//fjhdl月报导出
			'aq_yb_dc_fjhdl-fjhdlPanel button[text=导出]':{
				click: this.exportBtn
			},
    		'aq_yb_dc_fjhdl-fjhdlPanel button[text=搜索]':{
				click:this.click_openHtml
			} 				    		
		});
	},
	
	exportBtn: function(btn){
		var organCode = Ext.getCmp('aq_yb_dc_fjhdl-fjhdlPanel-organCode').getValue();
		var storeY = Ext.getCmp('aq_yb_dc_fjhdl-fjhdlPanel-storeY').getValue();
		var storeM = Ext.getCmp('aq_yb_dc_fjhdl-fjhdlPanel-storeM').getValue();
		var storeD = Ext.getCmp('aq_yb_dc_fjhdl-fjhdlPanel-storeD').getValue();
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD);
		var tempName = null;
		var fileName = null;
		if(organCode = 'GZFGS'){
			tempName = 'GZFGS_Y_FJHDL_REPORT';
			fileName = '广州分公司_辅机耗电率月报统计';
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
	
	click_openHtml: function(btn){
		var organCode = Ext.getCmp('aq_yb_dc_fjhdl-fjhdlPanel-organCode').getValue();
		var storeY = Ext.getCmp('aq_yb_dc_fjhdl-fjhdlPanel-storeY').getValue();
		var storeM = Ext.getCmp('aq_yb_dc_fjhdl-fjhdlPanel-storeM').getValue();
		var storeD = Ext.getCmp('aq_yb_dc_fjhdl-fjhdlPanel-storeD').getValue();
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD);
		var tempName = null;
		var fileName = null;
		if(organCode = 'GZFGS'){
			tempName = 'GZFGS_Y_FJHDL_REPORT';
			fileName = '广州分公司_辅机耗电率月报统计';
		}
		
		var url = "api/IndexDat/DAndY/exportHtml01?";
		
		if(tempName != null){
			url += "&tempName="+tempName;
		}
		
		if(storeDate != null){
			url += "&storeDate="+storeDate;
		}
		
		var html = '/upload/excelTohtml/'+tempName+'.html';
		QJ_Mask.show();
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: url,		
			success: function(response){
				QJ_Mask.hide();
				//console.log(response);
				var html = Ext.decode(response.responseText);     
				//console.log(html);
				var htmlPanel = Ext.getCmp('aq_yb_dc_fjhdl-fjhdlPanel-html');
				htmlPanel.body.update(html);
				//htmlPanel.body.update('<iframe scrolling="auto" width="100%" height="100%" frameborder="0">'+html+'</iframe>')
				//htmlPanel.body.update('<iframe scrolling="auto" src="'+html+'" width="100%" height="100%" frameborder="0"></iframe>')
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});		
	}
	
});
