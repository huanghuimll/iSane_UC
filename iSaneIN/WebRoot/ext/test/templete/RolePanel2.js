Ext.define('isane.controller.role.RolePanel', {
	extend : 'Ext.app.Controller',
	stores : ['role.Role'],
	models : ['Role', 'RoleUser', 'RoleMenu'],
	views : ['role.RolePanel', 'role.RoleList', 'role.RoleForm', 'role.RoleUserListL', 'role.RoleUserListR', 'role.RoleMenu', 'role.RoleResource'],
	init: function() {
		this.control({	
			'role-RoleList':{
				afterrender:this.afterrender,
				itemclick: this.itemclick
			},	
			'role-RoleList button[text=增加]': {
				click: this.click_add
			},	
			'role-RoleList button[text=明细]': { 
				click : this.click_view
			}, 
			'role-RoleList button[text=修改]':{
				click: this.click_update
			},
			'role-RoleList button[text=删除]':{
				click: this.click_delete
			},
			'role-RoleList button[text=搜索]':{
				click: this.click_search
			},
			'role-RoleList button[text=上移]':{
				click: this.click_up
			},
			'role-RoleList button[text=下移]':{
				click: this.click_down
			},
			/****角色用户*****/
			'role-RoleList actioncolumn':{
				showPermissWin: this.showPermissWin
			},
			'role-RoleUserListL #role-RoleUserListL-searchButton':{
				click: this.click_RoleUserListL
			},			
			'role-RoleUserListR #role-RoleUserListR-searchButton':{
				click: this.click_RoleUserListR
			},	
            'role-RoleUserListR': {
                viewdrop: this.roleDropR
            },
            'role-RoleUserListL': {
                viewdrop: this.roleDropL
            },
            'role-RoleUserListL #role-RoleUserListL-remove': {
            	click: this.click_remove
            },
            'role-RoleUserListR #role-RoleUserListR-put': {
            	click: this.click_put
            },
            /*****角色菜单********/
			'role-RoleMenu':{
				beforerender: this.rendRoleMenu
			},
			'role-RoleMenu button[text=保存配置]':{
				click: this.click_RoleMenu_Save
			},
			/******角色资源*********/
			'role-RoleResource':{
				beforerender: this.rendRoleResource
			},			
			'role-RoleResource actioncolumn':{
				singleAdd: this.singleAdd,
				singleDelete: this.singleDelete,
				showIpForm: this.showIpForm
				
			},			
			'role-RoleResource button[text=保存所有]':{
				saveAllAdd: this.saveAllAdd
			}
		});
	},
	afterrender: function(panel){
		//panel.getStore().load();	
		var store = panel.getStore();
		Ext.apply(store.proxy.extraParams, {plantCode: QJ_PlantCode});
		Ext.getCmp('role-RoleList-pageId').moveFirst();		
	},
	itemclick: function(grid){
		//var bts = Ext.getCmp('role-RoleList-id').query('button[disabled=true]');
		//console.log(bts);
		Ext.getCmp('role-RoleList-viewButton').setDisabled(false);
		Ext.getCmp('role-RoleList-editButton').setDisabled(false);
		Ext.getCmp('role-RoleList-removeButton').setDisabled(false);
		Ext.getCmp('role-RoleList-upButton').setDisabled(false);
		Ext.getCmp('role-RoleList-downButton').setDisabled(false);
	},
	click_add: function(){
		//alert('click_add');
		var win = Ext.create('Ext.window.Window',{
			title: '角色增加',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_add',
			border: 0,
			items: [{xtype: 'role-RoleForm'}],
			buttons: [{scope: this, text:'添加', iconCls:'ok1', handler: this.click_add_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});	
		if(QJ_PlantCode){
			var form = win.down('form');
			form.down('combobox[name=plantCode]').setValue(QJ_PlantCode);
			form.down('combobox[name=plantCode]').setReadOnly(true);
			form.down('combobox[name=plantCode]').setFieldStyle('color:grey');
			
			form.down('textfield[name=roleCode]').setValue(QJ_PlantCode+"_"+"ROLE_");
			
			win.show();	
		}
	},
	click_add_but: function(btn){
		//alert('click_add');
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;		
		var grid = Ext.getCmp('role-RoleList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: url,
			params: record,
			success: function(response){
				var text = response.responseText;
				var rec = Ext.decode(text);
				store.add(rec);
				win.close();
				Ext.example.msg('系统提示！', "增加成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});	
	},
	click_view: function(own) {
		var grid = own.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var win = Ext.create('Ext.window.Window',{
			title:'角色查看',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_view',			
			border: 0,
			items:[{xtype:'role-RoleForm'}],
			buttons: [{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign:'right'
		});	
		if(records[0]){
			win.child('form').getForm().loadRecord(records[0]);
			QJ_UtilEntity.setReadOnly(win.down('form'));
			win.show();
		}
	},
	click_update: function(btn){
		var win = Ext.create('Ext.window.Window',{
			title: '角色修改',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_update',			
			border: 0,
			items: [{xtype: 'role-RoleForm'}],
			buttons: [{scope: this, text:'修改', iconCls:'ok1', handler: this.click_edit_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();
		if(records[0]){
			var form = win.down('form');
			form.loadRecord(records[0]);
			
			form.down('combobox[name=plantCode]').setReadOnly(true);
			form.down('combobox[name=plantCode]').setFieldStyle('color:grey');			
			win.show();
		}
	},	
	click_edit_but: function(btn){
		//alert("click_refresh");
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid())return;
		var grid = Ext.getCmp('role-RoleList-id');
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'put',
			url: url,
			params: record,
			success: function(response){
	        	form.getRecord().set(record);
                store.commitChanges();				
				win.close();
				Ext.example.msg('系统提示！', "修改成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});			
	},	

	click_delete: function(btn){
		//alert("click_delete");
		var grid = btn.up('grid');
		var records = grid.getSelectionModel().getSelection();		
		if(records[0]){
			Ext.Msg.confirm('删除', '您确定删除该数据吗?', function(button) {
				if (button == 'yes') {
					this.click_delete_but(records[0], grid, false);
				}
			}, this);		
		}
	},
	click_delete_but: function(record, grid){
		//alert("click_delete_but");
		var store = grid.getStore();
		var url = store.proxy.api.publicUrl;	
		Ext.Ajax.request({
			scope: this,
			method: 'delete',
			url: url+record.data.id,
			success: function(response){
				var text = response.responseText;
				var rec = Ext.decode(text);	
				store.remove(record);
				Ext.example.msg('系统提示！', "删除成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});		
	},
	click_search: function(btn){
		var roleName = Ext.getCmp('role-RoleList-roleName').getValue();
		var roleNameFl;
		var reg = /^[a-zA-Z]*$/;//英文表达式
		if(reg.test(roleName)){			
			roleNameFl = roleName;
			roleName= '';
		}
		var obt = {
				plantCode: QJ_PlantCode,
				roleName: roleName,
				roleNameFl: roleNameFl
		};
		
		var grid = btn.up('grid');
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, obt);
		Ext.getCmp('role-RoleList-pageId').moveFirst();		
	},
	click_up: function(btn){
		var grid = btn.up('grid');
		QJ_UtilEntity.upItem(grid);
	},
	click_down: function(btn){
		var grid = btn.up('grid');
		QJ_UtilEntity.downItem(grid);		
	},
	showPermissWin: function(rec){
		//alert('showPermissWin');
		//console.log(rec);
		var win = Ext.create('Ext.window.Window',{
			title: '用户、权限<span style="color:red; font-style: italic">('+rec.data.roleName+')</span>',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_update',			
			border: 0,
			width: 1000,
			height: 500,
			border: 0,
			layout: 'fit',
			items: [
			{
				xtype: 'tabpanel',
				items:[
				{
					title: '用户设置',
					layout: 'border',
					items:[
					{
						region: 'west',
						width: '50%',
						split: true,
						collapsible: true,
						title: '已配置',
						header: false,
						xtype: 'role-RoleUserListL'
					},
					{
						region: 'center',
						width: '50%',
						title: '未配置',
						header: false,
						xtype: 'role-RoleUserListR'
					}      
			        ]
					
				},
				{
					title: '后台菜单配置',
					xtype: 'role-RoleMenu'
				},
				{
					title: '权限配置',
					xtype: 'role-RoleResource'
				}       
		        ]
			}       
	        ],
			buttons: [{text:'关闭', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
		});
		if(rec){
			win.show();	
			
			Ext.getCmp('role-RoleUserListL-plantCode').setValue(rec.data.plantCode);
			Ext.getCmp('role-RoleUserListL-roleCode').setValue(rec.data.roleCode);
			Ext.getCmp('role-RoleUserListL-roleName').setValue(rec.data.roleName);
			
			Ext.getCmp('role-RoleUserListR-plantCode').setValue(rec.data.plantCode);
			Ext.getCmp('role-RoleUserListR-roleCode').setValue(rec.data.roleCode);
			//更新数据
			var obt = {
					plantCode: rec.data.plantCode,	
					roleCode: rec.data.roleCode,	
			};
			var gridL = Ext.getCmp('role-RoleUserListL-id');
			var storeL = gridL.getStore();
			Ext.apply(storeL.proxy.extraParams, obt);
			Ext.getCmp('role-RoleUserListL-PageId').moveFirst();	
			
			var gridR = Ext.getCmp('role-RoleUserListR-id');
			var storeR = gridR.getStore();
			Ext.apply(storeR.proxy.extraParams, obt);
			Ext.getCmp('role-RoleUserListR-PageId').moveFirst();			
		}
	},	
	click_RoleUserListL: function(btn){
		var grid = btn.up('grid');
		var store = grid.getStore();
		var obt = {
			plantCode: Ext.getCmp('role-RoleUserListL-plantCode').getValue(),	
			roleCode: Ext.getCmp('role-RoleUserListL-roleCode').getValue(),
			userName: Ext.getCmp('role-RoleUserListL-userName').getValue()
		};
		Ext.apply(store.proxy.extraParams, obt);
		Ext.getCmp('role-RoleUserListL-PageId').moveFirst();				
	},	
	click_RoleUserListR: function(btn){
		var grid = btn.up('grid');
		var store = grid.getStore();
		var obt = {
			plantCode: Ext.getCmp('role-RoleUserListR-plantCode').getValue(),	
			roleCode: Ext.getCmp('role-RoleUserListR-roleCode').getValue(),
			userName: Ext.getCmp('role-RoleUserListR-userName').getValue()
		};
		Ext.apply(store.proxy.extraParams, obt);
		Ext.getCmp('role-RoleUserListR-PageId').moveFirst();				
	},
    roleDropL: function(node, data, dropRec, dropPosition) {
    	//alert('roleDropL');
    	var gridL = Ext.getCmp('role-RoleUserListL-id');
    	var gridR = Ext.getCmp('role-RoleUserListR-id');
    	var storeL = gridL.getStore();
    	var storeR = gridR.getStore();
        var arr = [];
        for(var i = 0;i < data.records.length; i++){
        	data.records[i].data['roleCode'] = Ext.getCmp('role-RoleUserListL-roleCode').getValue();
        	arr.push(data.records[i].data);
        };
        //console.log(arr);
        gridL.view.refresh();
    	//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: 'api/RoleUser/createm',
			jsonData: Ext.encode(arr),
			//params: Ext.encode(arr),
			success: function(response){
				var text = response.responseText;
				Ext.example.msg('系统提示！', "增加成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
				storeL.remove(data.records);
				storeR.add(data.records);
			}
		});	    	
    },    
    roleDropR: function(node, data, dropRec, dropPosition) {
    	//alert('roleDropR');
    	var gridL = Ext.getCmp('role-RoleUserListL-id');
    	var gridR = Ext.getCmp('role-RoleUserListR-id');
    	var storeL = gridL.getStore();
    	var storeR = gridR.getStore();
    	var arr = [];
    	for(var i = 0;i < data.records.length; i++){
    		arr.push(data.records[i].data);
    	};
    	//console.log(arr);
    	//gridL.view.refresh();
    	//return;
    	Ext.Ajax.request({
    		scope: this,
    		method: 'delete',
    		url: 'api/RoleUser/deletem',
    		jsonData: Ext.encode(arr),
    		//params: Ext.encode(arr),
    		success: function(response){
    			var text = response.responseText;
    			Ext.example.msg('系统提示！', "删除成功！");
    		},
    		failure: function(response){
    			QJ_UtilEntity.failWin(response);
    			storeL.add(data.records);
    			storeR.remove(data.records);
    		}
    	});	    	
    },  
    click_remove: function(btn) {
    	//alert('click_remove');
    	var gridL = Ext.getCmp('role-RoleUserListL-id');
    	var gridR = Ext.getCmp('role-RoleUserListR-id');
    	var storeL = gridL.getStore();
    	var storeR = gridR.getStore();
    	var selections = gridL.getSelectionModel().getSelection();
    	if(selections.length == 0) return;
    	var arr = [];
    	for(var i = 0;i < selections.length; i++){
    		arr.push(selections[i].data);
    	};
    	//return;
    	Ext.Ajax.request({
    		scope: this,
    		method: 'delete',
    		url: 'api/RoleUser/deletem',
    		jsonData: Ext.encode(arr),
    		//params: Ext.encode(arr),
    		success: function(response){
    			var text = response.responseText;
    			Ext.example.msg('系统提示！', "删除成功！");
    			storeL.remove(selections);
    			storeR.add(selections);    			
    		},
    		failure: function(response){
    			QJ_UtilEntity.failWin(response);
    			storeL.add(selections);
    			storeR.remove(selections[0]);
    		}
    	});	    	
    },
    click_put: function(btn) {
    	//alert('click_put');
    	var gridL = Ext.getCmp('role-RoleUserListL-id');
    	var gridR = Ext.getCmp('role-RoleUserListR-id');
    	var storeL = gridL.getStore();
    	var storeR = gridR.getStore();
    	var selections = gridR.getSelectionModel().getSelection();
    	if(selections.length == 0) return;    	
        var arr = [];
        for(var i = 0;i < selections.length; i++){
        	selections[i].data['roleCode'] = Ext.getCmp('role-RoleUserListL-roleCode').getValue();
        	arr.push(selections[i].data);
        };
        //console.log(arr);
        gridL.view.refresh();
    	//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: 'api/RoleUser/createm',
			jsonData: Ext.encode(arr),
			//params: Ext.encode(arr),
			success: function(response){
				var text = response.responseText;
				Ext.example.msg('系统提示！', "增加成功！");
				storeL.add(selections);
    			storeR.remove(selections);				
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
				storeL.remove(selections);
				storeR.add(selections);
			}
		});	    	
    },  
	rendRoleMenu: function(plane){
		//alert('rendRoleMenu');
		var obt = {
			plantCode: 	QJ_PlantCode,
			roleCode: Ext.getCmp('role-RoleUserListL-roleCode').getValue(),
		};
		var storeMenu = plane.getStore();
		Ext.apply(storeMenu.proxy.extraParams, obt);		
		storeMenu.load();
		storeMenu.getRootNode().set('expanded', true);
	},  
	click_RoleMenu_Save: function(){
	   var records = Ext.getCmp('role-RoleMenu-id').getChecked();
	   var arr = [];
	   for(var i = 0;i < records.length; i++){  
			if(records[i].data.id=='root'){
				continue;
			}
			obt ={
				plantCode: records[i].data.plantCode,
				resourceType: 'menu',
				roleCode: Ext.getCmp('role-RoleUserListL-roleCode').getValue(),
				resource: records[i].data.menuCode
			};
			arr.push(obt);
       };
       //console.log(arr);
       //return;
       if(arr.length==0){ 
    	   Ext.example.msg('系统提示！', "没有选择节点！");
    	   return;
	   }
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: 'api/ResourcePermission/addMenuAndPer',
			jsonData: Ext.encode(arr),
			success: function(response){
				var text = response.responseText;
				Ext.example.msg('系统提示！', "保存成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});	   	
	},
	rendRoleResource: function(plane){
		//alert('rendRoleMenu');
		var obt = {
			plantCode: 	QJ_PlantCode,
			roleCode: Ext.getCmp('role-RoleUserListL-roleCode').getValue(),
			resourceType: 'general'
		};
		var storeResource = plane.getStore();
		Ext.apply(storeResource.proxy.extraParams, obt);		
		storeResource.load();
	},  
	singleAdd: function(record){
		//console.log(rec);
		var grid = Ext.getCmp('role-RoleResource-id');
		var store = grid.getStore();
		var url = store.proxy.api.singleAdd;
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: url,
			params: record.data,
			success: function(response){
				//var text = response.responseText;
				//var rec = Ext.decode(text);
				//store.add(record.data);
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
		var grid = Ext.getCmp('role-RoleResource-id');
		var store = grid.getStore();
		var url = store.proxy.api.singleDelete;
		//console.log(record.data);
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'delete',
			url: url,
			jsonData: Ext.encode(record.data),
			//params: record.data,
			success: function(response){
				store.remove(record);
				Ext.example.msg('系统提示！', "删除成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});			
	},
	showIpForm: function(rec){
		//console.log(rec.data);
		var id = rec.data.id;
		if(id == null){
			Ext.example.msg('系统提示','先保存数据！');
			return;
		}
		var create = rec.data.create;
		var remove = rec.data.remove;
		var modify = rec.data.modify;
		var query = rec.data.query;
		var batch = rec.data.batch;
		
		var resourceName;
		if(rec.data.resource){
			resourceName = getResourceById(rec.data.resource) == null ? rec.data.resource : getResourceById(rec.data.resource).name;
		};
		var win = Ext.create('Ext.window.Window',{
			title: 'IP设置<span style="color:red; font-style: italic">('+ resourceName+')</span>',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_update',			
			border: 0,
			width: 800,
			height: 400,
			border: 0,
			layout: 'fit',
			items: [
			{
				xtype: 'tabpanel',
				items:[]
			}       
	        ],
			buttons: [{text:'关闭', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
		});		
		win.show();
		
		var tab = win.down('tabpanel');
		if(query){
			var ipForm = Ext.create('isane.view.role.RoleResourceIpForm', {
				title:'查询',
				perId: rec.data.id,
				plantCode: rec.data.plantCode,
				roleCode: rec.data.roleCode,
				resourceType: rec.data.resourceType,
				resource: rec.data.resource,
				operation: 'Query',
			});
			ipForm.down('radiogroup').setFieldLabel('<span style="color:blue">查询</span>');
			var ipList = Ext.create('isane.view.role.RoleResoureIpList',{
				store: Ext.create('Ext.data.ArrayStore',{ fields: ['id', 'ip']}),
				plugins: [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })]
			});
			ipForm.down('[region=center]').add(ipList);
			tab.add(ipForm);
			tab.setActiveTab(ipForm);
			
			var saveBtn = ipForm.down('button[text=保存]');
			saveBtn.on({
				click: this.ipSaveBtn
			});
			var radio = ipForm.down('radiofield[boxLabel=自定义]');
			radio.on({
				change: this.ipRadioChange
			});
			var addBtn = ipList.down('button[text=增加]');
			addBtn.on({
				click: this.ipAddRow
			});
			var removeBtn = ipList.down('actioncolumn[text=移除]');
			removeBtn.on({
				click: this.ipRemoveBtn
			});
			
			ipForm.on({
				//afterrender: this.ipFormRender
				beforeactivate: this.ipFormRender
			});
		}
		if(create){
			var ipForm = Ext.create('isane.view.role.RoleResourceIpForm', {
				title:'增加',
				perId: rec.data.id,
				plantCode: rec.data.plantCode,
				roleCode: rec.data.roleCode,
				resourceType: rec.data.resourceType,
				resource: rec.data.resource,
				operation: 'Create',
			});
			ipForm.down('radiogroup').setFieldLabel('<span style="color:blue;">增加</span>');
			var ipList = Ext.create('isane.view.role.RoleResoureIpList',{
				store: Ext.create('Ext.data.ArrayStore',{ fields: ['id', 'ip']}),
			    plugins: [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })]  				
			});
			ipForm.down('[region=center]').add(ipList);
			tab.add(ipForm);
			tab.setActiveTab(ipForm);
			
			var saveBtn = ipForm.down('button[text=保存]');
			saveBtn.on({
				click: this.ipSaveBtn
			});
			var radio = ipForm.down('radiofield[boxLabel=自定义]');
			radio.on({
				change: this.ipRadioChange
			});	
			
			var addBtn = ipList.down('button[text=增加]');
			addBtn.on({
				click: this.ipAddRow
			});
			var removeBtn = ipList.down('actioncolumn[text=移除]');
			removeBtn.on({
				click: this.ipRemoveBtn
			});	
			
			ipForm.on({
				//afterrender: this.ipFormRender
				beforeactivate: this.ipFormRender
			});		
			
		}
		if(modify){
			var ipForm = Ext.create('isane.view.role.RoleResourceIpForm', {
				title:'修改',
				perId: rec.data.id,
				plantCode: rec.data.plantCode,
				roleCode: rec.data.roleCode,
				resourceType: rec.data.resourceType,
				resource: rec.data.resource,
				operation: 'Modify',
			});
			ipForm.down('radiogroup').setFieldLabel('<span style="color:blue;">修改</span>');
			var ipList = Ext.create('isane.view.role.RoleResoureIpList',{
				store: Ext.create('Ext.data.ArrayStore',{ fields: ['id', 'ip']}),
				plugins: [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })]
			});
			ipForm.down('[region=center]').add(ipList);
			tab.add(ipForm);
			tab.setActiveTab(ipForm);
			
			var saveBtn = ipForm.down('button[text=保存]');
			saveBtn.on({
				click: this.ipSaveBtn
			});
			var radio = ipForm.down('radiofield[boxLabel=自定义]');
			radio.on({
				change: this.ipRadioChange
			});
			
			var addBtn = ipList.down('button[text=增加]');
			addBtn.on({
				click: this.ipAddRow
			});
			var removeBtn = ipList.down('actioncolumn[text=移除]');
			removeBtn.on({
				click: this.ipRemoveBtn
			});
			
			ipForm.on({
				//afterrender: this.ipFormRender
				beforeactivate: this.ipFormRender
			});			
			
		}
		if(remove){
			var ipForm = Ext.create('isane.view.role.RoleResourceIpForm', {
				title:'删除',
				perId: rec.data.id,
				plantCode: rec.data.plantCode,
				roleCode: rec.data.roleCode,
				resourceType: rec.data.resourceType,
				resource: rec.data.resource,
				operation: 'Delete',
			});
			ipForm.down('radiogroup').setFieldLabel('<span style="color:blue;">删除</span>');
			var ipList = Ext.create('isane.view.role.RoleResoureIpList',{
				store: Ext.create('Ext.data.ArrayStore',{ fields: ['id', 'ip']}),
				plugins: [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })]
			});
			ipForm.down('[region=center]').add(ipList);
			tab.add(ipForm);
			tab.setActiveTab(ipForm);
			
			var saveBtn = ipForm.down('button[text=保存]');
			saveBtn.on({
				click: this.ipSaveBtn
			});
			var radio = ipForm.down('radiofield[boxLabel=自定义]');
			radio.on({
				change: this.ipRadioChange
			});	
			
			var addBtn = ipList.down('button[text=增加]');
			addBtn.on({
				click: this.ipAddRow
			});	
			var removeBtn = ipList.down('actioncolumn[text=移除]');
			removeBtn.on({
				click: this.ipRemoveBtn
			});
			
			ipForm.on({
				//afterrender: this.ipFormRender
				beforeactivate: this.ipFormRender
			});			
			
		}
		if(batch){
			var ipForm = Ext.create('isane.view.role.RoleResourceIpForm', {
				title:'导入',
				perId: rec.data.id,
				plantCode: rec.data.plantCode,
				roleCode: rec.data.roleCode,
				resourceType: rec.data.resourceType,
				resource: rec.data.resource,
				operation: 'Batch',
			});
			ipForm.down('radiogroup').setFieldLabel('<span style="color:blue;">导入</span>');
			var ipList = Ext.create('isane.view.role.RoleResoureIpList',{
				store: Ext.create('Ext.data.ArrayStore',{ fields: ['id', 'ip']}),
				plugins: [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })]
			});
			ipForm.down('[region=center]').add(ipList);
			tab.add(ipForm);
			tab.setActiveTab(ipForm);
			
			var saveBtn = ipForm.down('button[text=保存]');
			saveBtn.on({
				click: this.ipSaveBtn
			});
			var radio = ipForm.down('radiofield[boxLabel=自定义]');
			radio.on({
				change: this.ipRadioChange
			});	
			
			var addBtn = ipList.down('button[text=增加]');
			addBtn.on({
				click: this.ipAddRow
			});	
			var removeBtn = ipList.down('actioncolumn[text=移除]');
			removeBtn.on({
				click: this.ipRemoveBtn
			});		
			
			ipForm.on({
				//afterrender: this.ipFormRender
				beforeactivate: this.ipFormRender
			});			
		}
	},
	ipSaveBtn: function(btn){
		//alert('ipSaveBtn');
		var form = btn.up('form');
		var grid = form.down('grid');
		var store = grid.getStore();
		var records = store.data.items;
		var ipRange="";
		if(records.length > 0){
			for(var i = 0;i < records.length; i++){
				if(i == records.length -1){
					ipRange = ipRange + records[i].data.ip;
				}else{
					ipRange = ipRange + records[i].data.ip+",";
				}
			};	
		};
		var rg = form.down('radiogroup');
		var ipType = rg.getChecked()[0].inputValue;
		var obt = {
			id: form.perId,
			plantCode: form.plantCode,
			roleCode: form.roleCode,
			resourceType : form.resourceType,
			resource: form.resource,
			operation: form.operation,	
			ipType: ipType,
			ipRange: ipRange
		};
		var formStore = Ext.create('isane.store.role.RoleResourceIp');
		var url = formStore.proxy.api.ipAdd;
    	//return;
		Ext.Ajax.request({
			scope: this,
			method: 'put',
			url: url,
			params: obt,
			//jsonData: Ext.encode(arr),
			success: function(response){
				//var text = response.responseText;
				Ext.example.msg('系统提示！', "增加成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});	 		
		
	},
	ipRadioChange: function(own, nv, ov, eOpts){
		//console.log(nv+"-----"+ov);
		var grid = own.up('form').down('grid');
		if(nv){
			grid.setDisabled(false); 
		}else{
			grid.setDisabled(true); 
		}
	},
	ipAddRow: function(btn){
    	var store = btn.up('grid').getStore();
    	store.insert(0,{'ip':''});
	},	
	ipRemoveBtn: function(grid, html, rowIndex){
		var store = grid.getStore();
		var rec = store.getAt(rowIndex);
        if(rec.data.id == null){
        	store.remove(rec);
        	return;
        }
		/*if(rec){
			Ext.Msg.confirm('删除', '您确定删除该数据吗?', function(button) {
				if (button == 'yes') {
					this.ipDelete_but(grid, rec);
				}
			}, this);		
		} */  
        //console.log(this);
		//var btn = grid.up('form').down('button[text=保存]');
		//this.ipSaveBtn(btn);
        var btn = grid.up('form').down('button[text=保存]');
		var form = btn.up('form');
		store.remove(rec);
		var records = store.data.items;
		var ipRange="";
		if(records.length > 0){
			for(var i = 0;i < records.length; i++){
				if(i == records.length -1){
					ipRange = ipRange + records[i].data.ip;
				}else{
					ipRange = ipRange + records[i].data.ip+",";
				}
			};	
		};
		var rg = form.down('radiogroup');
		var ipType = rg.getChecked()[0].inputValue;
		var obt = {
			id: form.perId,
			plantCode: form.plantCode,
			roleCode: form.roleCode,
			resourceType : form.resourceType,
			resource: form.resource,
			operation: form.operation,	
			ipType: ipType,
			ipRange: ipRange
		};
		var formStore = Ext.create('isane.store.role.RoleResourceIp');
		var url = formStore.proxy.api.ipAdd;
		//console.log(obt);
    	//return;
		Ext.Ajax.request({
			scope: this,
			method: 'put',
			url: url,
			params: obt,
			//jsonData: Ext.encode(arr),
			success: function(response){
				//var text = response.responseText;
				Ext.example.msg('系统提示！', "删除成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});	         
	},
	ipDelete_but: function(grid, rec){
		var btn = grid.up('form').down('button[text=保存]');
		this.ipSaveBtn(btn);
		store.remove(rec);
	},	
	ipFormRender: function(form){
		//console.log('ipFormRender');
		var obt = {
				id: form.perId,
				plantCode: form.plantCode,
				roleCode: form.roleCode,
				resourceType : form.resourceType,
				resource: form.resource,
				operation: form.operation
		};	
		var formStore = Ext.create('isane.store.role.RoleResourceIp');
		formStore.load({
		    scope: this,
		    params: obt,
		    callback: function(records, operation, success) {
		    	//console.log(records);
		    	if(records.length > 0){
		    		form.down('radiofield[name=ipType]').setValue(records[0].data.ipType);
		    		if(records[0].data.ipList != null && records[0].data.ipList.length > 0){
		    			var gridStore = form.down('grid').getStore();
		    			gridStore.loadData(records[0].data.ipList);
		    			//console.log(gridStore);
		    		}
		    	}
		        //console.log(records);
		    }
		});		
	},
	saveAllAdd: function(grid){
		//console.log(grid);
    	var store = grid.getStore();
    	var records = store.data.items;
		if(records.length > 0){
			Ext.Msg.confirm('删除', '您确定保存所有数据吗?', function(button) {
				if (button == 'yes') {
					this.saveAllAdd_but(records, store);
				}
			}, this);		
		}else{
			Ext.example.msg('系统提示','数据为空！');
		}
	},
	saveAllAdd_but: function(records, store){
		//alert('saveAllAdd_but');
        var arr = [];
        for(var i = 0;i < records.length; i++){
        	arr.push(records[i].data);
        };	
        console.log(arr);
        var url = store.proxy.api.allAdd;
    	//return;
		Ext.Ajax.request({
			scope: this,
			method: 'post',
			url: url,
			jsonData: Ext.encode(arr),
			success: function(response){
				//var text = response.responseText;
				Ext.example.msg('系统提示！', "增加成功！");
			},
			failure: function(response){
				QJ_UtilEntity.failWin(response);
			}
		});	   		
	}
});
