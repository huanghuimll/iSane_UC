Ext.define('isane.controller.aq_rb_dc.rbPanel', {
	extend : 'Ext.app.Controller',
	views : ['aq_rb_dc.rbPanel'],
	init: function() {
		this.control({
			//rb日报导出
			'aq_rb_dc-rbPanel button[text=导出]':{
				click: this.exportBtn
			},
    		'aq_rb_dc-rbPanel button[text=搜索]':{
				click:this.click_openHtml
			} 				
		});
	},
	
	exportBtn: function(btn){
		var organCode = Ext.getCmp('aq_rb_dc-rbPanel-organCode').getValue();
		var storeY = Ext.getCmp('aq_rb_dc-rbPanel-storeY').getValue();
		var storeM = Ext.getCmp('aq_rb_dc-rbPanel-storeM').getValue();
		var storeD = Ext.getCmp('aq_rb_dc-rbPanel-storeD').getValue();
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
	
	click_openHtml: function(btn){
		var organCode = Ext.getCmp('aq_rb_dc-rbPanel-organCode').getValue();
		var storeY = Ext.getCmp('aq_rb_dc-rbPanel-storeY').getValue();
		var storeM = Ext.getCmp('aq_rb_dc-rbPanel-storeM').getValue();
		var storeD = Ext.getCmp('aq_rb_dc-rbPanel-storeD').getValue();
		var storeDate = storeY + '-' + QJ_UtilEntity.month(storeM) + '-'+ QJ_UtilEntity.month(storeD);
		var tempName = null;
		var fileName = null;
		if(organCode = 'GZFGS'){
			tempName = 'GZFGS_D_REPORT';
			fileName = '广州分公司_日报';
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
				console.log(html);
				var htmlPanel = Ext.getCmp('aq_rb_dc-rbPanel-html');
				console.log(htmlPanel);
				htmlPanel.body.dom.innerHTML= html;
				//htmlPanel.body.clean(true);
				//htmlPanel.body.update(html);
				//htmlPanel.body.update('<iframe scrolling="auto" width="100%" height="100%" frameborder="0">'+html+'</iframe>')
				//htmlPanel.body.update('<iframe scrolling="auto" src="'+html+'" width="100%" height="100%" frameborder="0"></iframe>')
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});		
	}	
});
