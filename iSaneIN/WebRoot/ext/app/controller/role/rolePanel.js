Ext.define('isane.controller.role.rolePanel', {
	extend : 'Ext.app.Controller',
	/*stores : ['role.Role','role.RoleUserR','role.RoleUserL','role.RoleMenuLTree','role.RoleMenuR', 'role.RoleNewsTypeTreeL','role.RoleNewsTypeTreeR',
	          'role.ProjectTreeL', 'role.RoleProjectR'//,'role.RoleMenuLTreeAct', 'role.RoleMenuRAct'
	          ],
	models : ['Role','UserRole','RoleMenuLTree', 'RoleNewsTypeTree'],
	views : ['role.rolePanel','role.roleSearch', 'role.roleList', 'role.roleForm',
			 'role.RoleUserRelation','role.RoleUserSearchL','role.RoleUserListL','role.RoleUserSearchR','role.RoleUserListR',
			 'role.RoleMenuRelation','role.RoleMenuLTree','role.RoleMenuRGrid', 'role.RoleNewsTypeRelation', 'role.RoleNewsTypeTreeL', 'role.RoleNewsTypeTreeR',
			  'role.RoleMenuRGridAct', 'role.ProjectRelation', 'role.ProjectTreeL', 'role.ProjectGridR',
			 'role.mergeForm'//'role.RoleMenuRelationAct', 'role.RoleMenuLTreeAct',
			 ],*/
	stores: ['role.Role', 'role.RoleUserL', 'role.RoleUserR'],
	models: ['Role', 'RoleUser'],
	views: ['role.rolePanel', 'role.roleList', 'role.roleForm', 'role.RoleUserRelation', 'role.RoleUserListL','role.RoleUserListR'],
	utilWin: null,			 
	init: function() {
		//this.utilWin = Ext.create('isane.util.Win');
		//application.getController("isane.controller.roleutil.roleutilPanel");
		this.control({		
			'role-roleList':{
				afterrender:this.afterrender,
				itemclick:this.itemclick
			},
			'role-roleList button[text=增加]' : { // 增加
				click : this.add
			},
			'role-roleList button[text=查看]' : { // 查看
				click : this.view
			}, 
			'role-roleList button[text=删除]' : { // 删除
				click : this.remove
			},
			'role-roleList button[text=修改]' : { // 修改
				click : this.update
			},
			//角色与用户
			'role-RoleUserListL #RoleUserListL-SelectAll-id': {
				click: this.SelectAllL
			},
			'role-RoleUserListR #RoleUserListR-SelectAll-id': {
                click: this.SelectAllR
            },
            'role-RoleUserListL': {
            	viewdrop: this.roleDropL
            },
            'role-RoleUserListR': {
                viewdrop: this.roleDropR
            },
			'role-RoleUserListL button[text=查询]':{
				click: this.RoleUserSearchL
			},
			'role-RoleUserListR button[text=查询]':{
				click: this.RoleUserSearchR
			},
			
			/*
			//角色与网站菜单
			'role-RoleMenuLTree #role-RoleMenuLTree-ZS':{
				click: this.openAndClose
			},
			'role-RoleMenuLTree button[text=选取所有]':{
				click: this.selectAll
			},
			'role-RoleMenuLTree button[text=取消所有]':{
				click: this.removeAll
			},
			'role-RoleMenuLTree button[text=权限保存]':{
				click: this.menuSave
			},
			'role-RoleMenuLTree':{
				checkchange: this.checkchange
			},
			'role-RoleMenuRGrid #role-RoleMenuRGrid-modifybt':{
				click: this.roleMenuUpdate
			},
			//角色与资讯类型
			'role-RoleNewsTypeRelation':{
				beforerender: this.onBeforeRender
			},
			'role-RoleNewsTypeTreeL #role-RoleNewsTypeTreeL-ZS':{
				click: this.openAndClose
			},
			'role-RoleNewsTypeTreeL button[text=选取所有]':{
				click: this.selectAll_RoleNewsTypeTreeL
			},
			'role-RoleNewsTypeTreeL button[text=取消所有]':{
				click: this.removeAll_RoleNewsTypeTreeL
			},
			'role-RoleNewsTypeTreeL button[text=权限保存]':{
				click: this.menuSave_RoleNewsTypeTreeL
			},
			'role-RoleNewsTypeTreeL':{
				checkchange: this.checkchange
			},
			'role-RoleNewsTypeTreeR #role-RoleNewsTypeTreeR-ZS':{
				click: this.openAndClose
			},*/
			//角色与工作流菜单
//			'role-RoleMenuLTreeAct #role-RoleMenuLTreeAct-ZS':{
//				click: this.openAndClose
//			},
//			'role-RoleMenuLTreeAct button[text=选取所有]':{
//				click: this.selectAll_Act
//			},
//			'role-RoleMenuLTreeAct button[text=取消所有]':{
//				click: this.removeAll_Act
//			},
//			'role-RoleMenuLTreeAct button[text=权限保存]':{
//				click: this.menuSave_Act
//			},
//			'role-RoleMenuLTreeAct':{
//				checkchange: this.checkchange
//			},
//			'role-RoleMenuRGridAct #role-RoleMenuRGridAct-modifybt':{
//				click: this.roleMenuUpdate_Act
//			},
			//角色与专题
			/*'role-ProjectRelation':{
				beforerender: this.onBeforeRender_project
			},
			'role-ProjectTreeL #role-RoleMenuLTreeAct-ZS':{
				click: this.openAndClose
			},
			'role-ProjectTreeL':{
				checkchange: this.checkchange
			},			
			'role-ProjectTreeL button[text=选取所有]':{
				click: this.selectAll_ProjectTreeL
			},
			'role-ProjectTreeL button[text=取消所有]':{
				click: this.removeAll_ProjectTreeL
			},
			'role-ProjectTreeL button[text=权限保存]':{
				click: this.menuSave_ProjectTreeL
			},
			'role-ProjectGridR #role-ProjectGridR-modifybt':{
				click: this.roleMenuUpdate
			}	*/	
		});
	},

	afterrender: function(panel){
		var store = panel.getStore();
		Ext.apply(store.proxy.extraParams, {});
		store.load();
	},
	
	itemclick:function(grid,record){
		Ext.getCmp('role-roleList-viewButton').setDisabled(false);
		Ext.getCmp('role-roleList-editButton').setDisabled(false);
		Ext.getCmp('role-roleList-removeButton').setDisabled(false);
		//控制权限按钮
		/*Ext.getCmp('role-RoleMenuLTree-saveQX').setDisabled(false);
		Ext.getCmp('role-RoleMenuRGrid-modifybt').setDisabled(false);
		Ext.getCmp('role-RoleNewsTypeTreeL-saveQX').setDisabled(false);
		Ext.getCmp('role-ProjectTreeL-saveQX').setDisabled(false);//专题
		Ext.getCmp('role-ProjectGridR-modifybt').setDisabled(false);//专题	
*/		
		var roleCode = record.data.roleCode;	
		Ext.getCmp("role-RoleUserListL-roleCode").setValue(roleCode);
		Ext.getCmp("role-RoleUserListR-roleCode").setValue(roleCode);
		
		//var value1 = '{"roleId":"'+id+'"}';
		
		var btnL = Ext.getCmp('role-RoleUserListL-btn')
		this.RoleUserSearchL(btnL);
		
		var btnR = Ext.getCmp('role-RoleUserListR-btn')
		this.RoleUserSearchR(btnR);
		
		/*
		var RoleUserL=this.getStore('role.RoleUserL');
		Ext.apply(RoleUserL.proxy.extraParams,{ jsonString: value1});
		Ext.getCmp('RoleUserListLPaging-id').moveFirst();		
		
		var treeStore = this.getStore('role.RoleMenuLTree');
		Ext.apply(treeStore.proxy.extraParams,{ jsonString: value2});
		treeStore.reload();

		var value3 = "{'roleId':"+id+",'typeId':1}";
		var menuRStore = Ext.getStore('role.RoleMenuR');
		Ext.apply(menuRStore.proxy.extraParams,{ jsonString: value3});
		Ext.getCmp('role-RoleMenuRGrid-pagingAreaR').moveFirst();
		//role<->newstype
		var treeStore = this.getStore('role.RoleNewsTypeTreeL');
		Ext.apply(treeStore.proxy.extraParams,{ jsonString: value1});
		treeStore.reload();	
		
		var treeStore = this.getStore('role.RoleNewsTypeTreeR');
		Ext.apply(treeStore.proxy.extraParams,{ jsonString: value1});
		treeStore.reload();	*/
				
	},	
	
	// 弹出增加窗口
	add: function() {
		Ext.create('Ext.window.Window',{
			title:'角色增加',
			modal:true,
			border: 0,
			closable: false,
			buttons:[{scope: this, xtype:'button',text:'添加',handler: this.click_add_but},{xtype:'button',text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign:'right',
			items:[{xtype:'role-roleForm'}]
		}).show();
	},
	
	click_add_but: function(btn){
		//alert('click_add');
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;		
		var grid = Ext.getCmp('role-roleList-id');
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
	
	// 弹出查看窗口
	view: function(own) {
		var grid = own.up('grid');
		var records = grid.getSelectionModel().getSelection();
		
		var win = Ext.create('Ext.window.Window',{
			title:'角色查看',
			modal:true,
			closable: false,
			border: 0,
			buttons:[{xtype:'button',text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign:'right',
			items:[ {xtype:'role-roleForm'}]
		});	
		
		win.child('form').getForm().loadRecord(records[0]);
		QJ_UtilEntity.setReadOnly(win.down('form'));
		win.show();
	},	
	
	// 弹出修改窗口
	update: function(own){ 
		var grid = own.up('grid');
		var records = grid.getSelectionModel().getSelection();
		var win = Ext.create('Ext.window.Window',{
			title:'角色修改',
			modal:true,
			border: 0,
			closable: false,
			buttons:[{scope: this, xtype:'button',text:'修改',handler:this.click_edit_but},{xtype:'button',text:'取消',handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign:'right',
			items:[
				{xtype:'role-roleForm'}
			]
		});
		win.child('form').getForm().loadRecord(records[0]);
		win.down('form').down('textfield[name=roleCode]').setReadOnly(true);
        win.down('form').down('textfield[name=roleCode]').setFieldStyle('color:grey');			
		win.show();
	},
	
	click_edit_but: function(btn){
		//alert("click_edit_but");
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid())return;
		var grid = Ext.getCmp('role-roleList-id');
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
	
	remove: function(btn){
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
	
	//确认删除
	/*confirmDelete: function(record, grid, forceDelete){
		var store = grid.getStore();
		var url = store.proxy.api.destroy;
		var jsonString = {
			id: record.data.id,
			roleName: record.data.roleName
		};
		jsonString = Ext.encode(jsonString);
		var RoleUserR = this.getStore('role.RoleUserR');
		var RoleUserL = this.getStore('role.RoleUserL');
		var RoleMenuLTree = this.getStore('role.RoleMenuLTree');
		var RoleMenuR = this.getStore('role.RoleMenuR');
		Ext.Ajax.request({
			scope: this,
		    url: url,
		    params: {
		        jsonString: jsonString,
		        forceDelete: forceDelete
		    },
		    success: function(response){
		        var result = Ext.decode(response.responseText);
		        var flag  = result.success;
		        if(flag){
		        	store.remove(record);
		        	//初始化数据:'role.RoleUserR','role.RoleUserL','role.RoleMenuLTree','role.RoleMenuR','role.RoleDevicePicL','role.RoleDevicePicR'
		        	RoleUserR.removeAll();
		        }else{	        	
		        	if(result.forceDelete){
		        		//出现关联关系，导致的失败
			        	Ext.Msg.confirm('系统提示', result.message, function(button){
			        		if(button == 'yes'){
			        			this.confirmDelete(record, grid, true);
			        		}
			        	}, this);		        		
		        	}else{
		        		//普通通失败
		        		Ext.create('isane.util.Win').failwin(result.message);
		        	}
		        }
		    }
		});			
	},*/
	//右下角收缩控制
    showOrHideroleList: function(button) {
        Ext.getCmp('role-RoleUserRelation-west').toggleCollapse();
    },
	SelectAllR: function(){
		Ext.getCmp('role-RoleUserListR-id').getSelectionModel().selectAll();		
	},
	SelectAllL: function(){
		Ext.getCmp('role-RoleUserListL-id').getSelectionModel().selectAll();		
	},
	
    roleDropR: function(node, data, dropRec, dropPosition) {
    	var gridL = Ext.getCmp('role-RoleUserListL-id');
    	var sm = gridL.getStore();
    	
    	var gridR = Ext.getCmp('role-RoleUserListR-id');
    	var sr = gridL.getStore(); 
    	
        var values_1 = [];
        for(var i = 0;i < data.records.length; i++){                       
            values_1.push(data.records[i].data);
        };   
        //console.log(values_1);
        //return;
        Ext.Ajax.request({
            url: 'api/RoleUser/addRoleUsers',
            scope: this,
            timeout: 5000,
            jsonData: Ext.encode(values_1),
            //params: '['+values_1+']'
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(!obj.success) {
                    this.addToUserRolesFailure(sm, sr, data.records);
                }
                else {
                    //isane.util.StoreUtil.refreshPagingToolbar("RoleUserListLPaging-id",0);
                    //isane.util.StoreUtil.refreshPagingToolbar("RoleUserListRPaging-id",1);                    
                    sm.commitChanges();
                    sr.commitChanges();
                }
            },
            failure: function() {
               this.addToUserRolesFailure(sm, sr, data.records);
            }
        });
    },
    
    roleDropL: function(node, data, dropRec, dropPosition) {
//    	alert('roleDropL');
    	var gridL = Ext.getCmp('role-RoleUserListL-id');
    	var sm = gridL.getStore();
    	
    	var gridR = Ext.getCmp('role-RoleUserListR-id');
    	var sr = gridL.getStore();
        
        var values_1 = [];
        for(var i = 0;i < data.records.length; i++){                       
            values_1.push(data.records[i].data);
        };  
        
        //console.log(values_1);
    	//return;
        Ext.Ajax.request({
        	scope: this,
            timeout: 5000,
            url: 'api/RoleUser/deleteRoleUsers',
            jsonData: Ext.encode(values_1),
            //params: '['+values_1+']'
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(!obj.success) {
                    this.deleteFromUserRolesFailure(sm, sr, data.records);
                }
                else {
                    sm.commitChanges();
                    sr.commitChanges();
                }    
            },
            failure: function() {
                this.deleteFromUserRolesFailure(sm, sr, data.records);
            }
        });
    },
    
    addToUserRolesFailure: function(storeRole, storeRelation, records) {
        storeRelation.remove(records);
        storeRole.add(records);

        storeRelation.commitChanges();
        storeRole.commitChanges();
    },
    
	//左下角与右下胶查询
	RoleUserSearchL: function(btn){
		var grid = btn.up('grid');
        var obt ={
        	roleCode: Ext.getCmp('role-RoleUserListL-roleCode').getValue(),
        	userName: Ext.getCmp('role-RoleUserListL-userName').getValue()
        }
        var store = grid.getStore();
        Ext.apply(store.proxy.extraParams, obt);
        store.reload();
	},
	RoleUserSearchR: function(btn){
		var grid = btn.up('grid');
        var obt ={
            	roleCode: Ext.getCmp('role-RoleUserListR-roleCode').getValue(),
            	userName: Ext.getCmp('role-RoleUserListR-userName').getValue()
            }
		var store = grid.getStore();
		Ext.apply(store.proxy.extraParams, obt);
		store.reload();
	},
	
	//角色与菜单
	checkchange: function( node, checked, eOpts){
		var changeCheck = function(node, checked, children){
			//parent
			if(checked){
				if(node.parentNode){
					node.parentNode.set('checked', checked);
					changeCheck(node.parentNode, checked, false);
				}
			} else {
				//判断父节点下面有没有选中的，如果一个都没有，则取消父节点的选中
/*				if(node.parentNode){
					childNode = function(nodeP){
						if(nodeP.childNodes){
//							var arr = [];
							nodeP.set('checked', false);
							nodeP.eachChild(function(child){
								if(child.checked){  
									nodeP.set('checked', true);
									return false;
								}
							});	
						}
					};
					childNode(node.parentNode);					
				}//else 否则去掉本身的选中即可
*/			
			}
			
			if(!children) {
				return ;
			}
			//children
			if(checked) {
				if(node.childNodes){
					node.eachChild(function(child){
						child.set('checked', checked); 
						changeCheck(child, checked, true);
					});					
				}
			} else {
				if(node.childNodes){
					node.eachChild(function(child){
						child.set('checked', checked); 
						changeCheck(child, checked, true);
					});
				}
			}
		};
		
		changeCheck(node, checked, true);
	},
	/**如果子节点都没有选中,去除父节点的选中*/
	isChildChecked: function(node){
		childNode = function(node){
			if(node.childNodes){
				node.eachChild(function(child){
					if(child.checked){
						childNode(node);
					}else{
						node.set('checked', false);
					}
				});	
			}
		};
		childNode(node);
	},
	
	selectAll:function(){
	   var rootnode = this.getStore('role.RoleMenuLTree').getRootNode();
	   rootnode.set('checked',true);
	   var treechecktrue=function(node){
		   if(node.hasChildNodes()){
			   node.eachChild(function(child){		                    	    		
				   child.set('checked',true);
				   treechecktrue(child);		                    	    			   
			   });
		   }
	   };
	   treechecktrue(rootnode);		
	},
	selectAll_RoleNewsTypeTreeL:function(){
	   var rootnode = this.getStore('role.RoleNewsTypeTreeL').getRootNode();
	   rootnode.set('checked',true);
	   var treechecktrue=function(node){
		   if(node.hasChildNodes()){
			   node.eachChild(function(child){		                    	    		
				   child.set('checked',true);
				   treechecktrue(child);		                    	    			   
			   });
		   }
	   };
	   treechecktrue(rootnode);		
	},
	removeAll:function(){
		   var rootnode = this.getStore('role.RoleMenuLTree').getRootNode();
		   rootnode.set('checked', false);
//		   rootnode.checked = false;
		   var treechecktrue=function(node){
			   if(node.hasChildNodes()){
				   node.eachChild(function(child){		                    	    		
					   child.set('checked', false);
//					   child.checked = false;
					   treechecktrue(child);		                    	    			   
				   });
			   }
		   };
		   treechecktrue(rootnode);		
		},	
	removeAll_RoleNewsTypeTreeL:function(){
	   var rootnode = this.getStore('role.RoleNewsTypeTreeL').getRootNode();
	   rootnode.set('checked', false);
//	   rootnode.checked = false;
	   var treechecktrue=function(node){
		   if(node.hasChildNodes()){
			   node.eachChild(function(child){		                    	    		
				   child.set('checked', false);
//				   child.checked = false;
				   treechecktrue(child);		                    	    			   
			   });
		   }
	   };
	   treechecktrue(rootnode);		
	},
	menuSave:function(){
	   var records = Ext.getCmp('role-RoleMenuLTree-id').getChecked();
	   var values_1 = [];
	   for(var i = 0;i < records.length; i++){  
			if(records[i].data.id=='root'){
				continue;
			}
	    	record = "{'id':'"+records[i].data.id+"'}";
	    	values_1.push(record);
       };
	   Ext.Ajax.request({
	   		scope: this,
    	    url: 'addRoleMenu',
    	    params: {
		        jsonString:'['+values_1+']',
		        roleId:Ext.getCmp("role-RoleUserSearchL-roleId").getValue(),
		        typeId: 1 //1是菜单2是资讯
		    },
    	    success: function(response){		       		                    	    	
    	    	var obj = Ext.decode(response.responseText);
                if(!obj.success) { 
//                	Ext.Msg.alert("系统提示！","保存失败！");
                	Ext.example.msg("系统提示！","保存失败！");
                }
                else {
                	Ext.Msg.alert("系统提示！","保存成功！");
                	var storeL = this.getStore('role.RoleMenuR');
                	storeL.reload();
                }
    	    },
    	    failure: function(){
    	    	Ext.example.msg("系统提示！","保存失败！");
    	    }
    	});		
	},
	menuSave_RoleNewsTypeTreeL:function(){
	   var records = Ext.getCmp('role-RoleNewsTypeTreeL-id').getChecked();
	   var values_1 = [];
	   for(var i = 0;i < records.length; i++){  
			if(records[i].data.id=='root'){
				continue;
			}
	    	record = "{'id':'"+records[i].data.id+"'}";
	    	values_1.push(record);
       };
	   Ext.Ajax.request({
	   		scope: this,
    	    url: 'addRoleMenu',
    	    params: {
		        jsonString:'['+values_1+']',
		        roleId:Ext.getCmp("role-RoleUserSearchL-roleId").getValue(),
		        typeId: 2 //1是菜单2是资讯
		    },
    	    success: function(response){		       		                    	    	
    	    	var obj = Ext.decode(response.responseText);
                if(!obj.success) { 
//                	Ext.Msg.alert("系统提示！","保存失败！");
                	Ext.example.msg("系统提示！","保存失败！");
                }
                else {
                	Ext.Msg.alert("系统提示！","保存成功！");
                	var storeL = this.getStore('role.RoleNewsTypeTreeR');
                	storeL.reload();
                }
    	    },
    	    failure: function(){
    	    	Ext.example.msg("系统提示！","保存失败！");
    	    }
    	});		
	},
    roleMenuUpdate: function(bt){
		var grid = bt.ownerCt.ownerCt;
		var store = grid.getStore();
		var records = []; 
		records = store.getModifiedRecords();
		if(records.length <= 0){
			Ext.MessageBox.show({
				title : '系统提示',
				msg : '设置没有改动!',
				buttons : Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
			return;			
		}
		var grid = Ext.getCmp('role-roleList-id');
		var items = grid.getSelectionModel().getSelection();
		var flag = Ext.create('isane.util.Win').onWin(items);
		if(!flag){return;};		
		var item = items[0];
		var roleId = item.data.id;
		var json = '[';
		for(var i = 0; i < records.length; i++){
			var record = records[i];
			var data = record.data;
			var id = data.id;
			var isAdd = this.changeInt(data.isAdd);
			var isDelete = this.changeInt(data.isDelete);
			var isModify = this.changeInt(data.isModify);
			var isQuery = this.changeInt(data.isQuery);
			var isSpecial = this.changeInt(data.isSpecial);	
			if(i!=records.length-1){
				json = json + '{id:'+id+',roleId:'+roleId+',isAdd:'+isAdd+',isDelete:'+isDelete+',isModify:'+isModify+',isQuery:'+isQuery+',isSpecial:'+isSpecial+'},';
			}else{
				json = json + '{id:'+id+',roleId:'+roleId+',isAdd:'+isAdd+',isDelete:'+isDelete+',isModify:'+isModify+',isQuery:'+isQuery+',isSpecial:'+isSpecial+'}]';
			}
		};	
		Ext.Ajax.request({
			url: 'roleMenuUpdate',
			params: {jsonString:json },
			success: function(response){
				var result = response.responseText;
				var value = Ext.decode(result);
				Ext.Msg.alert('系统信息！',value.message);
//				grid.getStore().reload();
				bt.ownerCt.ownerCt.getStore().commitChanges();
			},
			failure: function(response){
				Ext.Msg.alert('系统信息！','访问出错！');
			}
		});
    },
	//角色与设备图
    devicedropL: function(node, data, dropRec, dropPosition) {
        var sr = this.getStore('role.RoleDevicePicR');
        var sm = this.getStore('role.RoleDevicePicL');
        var values_1 = [];
        for(var i = 0;i < data.records.length; i++){                       
            record = Ext.encode(data.records[i].data);
            values_1.push(record);
        };
        var url = sm.proxy.api.destroy;
        Ext.Ajax.request({
        	scope: this,
            timeout: 5000,
            url: url,
            params: {
                jsonString: '['+values_1+']'
            },
            success: function(response){
                var obj = Ext.decode(response.responseText);
                    if(!obj.success) {
//                        this.deleteFromUserRolesFailure(sm, sr, data.records);
                    }
                    else {
//                        GLSG.ux.StoreUtil.refreshPagingToolbar("role-pagingAreaR",0);
//                        GLSG.ux.StoreUtil.refreshPagingToolbar("role-pagingAreaL",1);
                        sm.commitChanges();
                        sr.commitChanges();
                    }
                    //刷新store
                    sr.reload();
            },
            failure: function() {
//                this.deleteFromUserRolesFailure(sm, sr, data.records);
            }
      	});
    },

    devicedropR: function(node, data, dropRec, dropPosition) {
        var sr = this.getStore('role.RoleDevicePicR');
        var sm = this.getStore('role.RoleDevicePicL');
        //获取roleId;
        var records = Ext.getCmp('role-roleList-id').getSelectionModel().getSelection();
        if(records.length == 0 ){
        	return;
        }
        var roleId = records[0].data.id;
        var values_1 = [];
        for(var i = 0;i < data.records.length; i++){ 
        	data.records[i].set('roleId', roleId);
        	data.records[i].set('typeId', 2);
            record = Ext.encode(data.records[i].data);
            values_1.push(record);
        }; 
        var url = sr.proxy.api.create;
        Ext.Ajax.request({
            url: url,
            scope: this,
            timeout: 5000,
            params: {
                jsonString:'['+values_1+']'
            },
            success: function(response){
                var obj = Ext.decode(response.responseText);
                if(!obj.success) { 
//                        this.addToUserRolesFailure(sm, sr, data.records);
                }
                else {
//                        GLSG.ux.StoreUtil.refreshPagingToolbar("role-pagingAreaR",1);
//                        GLSG.ux.StoreUtil.refreshPagingToolbar("role-pagingAreaL",0);
                    sm.commitChanges();
                    sr.commitChanges();
                }
                sm.reload();
            },
            failure: function(){
               this.addToUserRolesFailure(sm, sr, data.records);
            }
          
        });
    },
    
    searchBtL: function(btn){
        var form = btn.up('form');
        var records = Ext.getCmp('role-roleList-id').getSelectionModel().getSelection();
        if(records.length == 0 ) return;    
        Ext.getCmp('role-RoleDevicePicSearchL-roleId').setValue(records[0].data.id);
        Ext.getCmp('role-RoleDevicePicSearchL-typeId').setValue(2);
        if(form.getValues().roleId == "") return;
        var values = Ext.encode(form.getValues());  
        var storeL=this.getStore('role.RoleDevicePicL');
        Ext.apply(storeL.proxy.extraParams,{ jsonString: values}); 
        Ext.getCmp('RoleDevicePicListL-page-id').moveFirst();     	
    },
    
    searchBtR: function(btn){
        var form = btn.up('form');
        var records = Ext.getCmp('role-roleList-id').getSelectionModel().getSelection();
        if(records.length == 0 ) return;    
        Ext.getCmp('role-RoleDevicePicSearchR-roleId').setValue(records[0].data.id);
        Ext.getCmp('role-RoleDevicePicSearchR-typeId').setValue(2);
        if(form.getValues().roleId == "") return;
        var values = Ext.encode(form.getValues());  
        var storeL=this.getStore('role.RoleDevicePicR');
        Ext.apply(storeL.proxy.extraParams,{ jsonString: values}); 
        Ext.getCmp('RoleDevicePicListR-page-id').moveFirst();     	
    },
    
    RoleAreaL_SelectAll: function(){
    	Ext.getCmp('role-RoleAreaL-id').getSelectionModel().selectAll();
    },
    RoleAreaR_SelectAll: function(){
    	Ext.getCmp('role-RoleAreaR-id').getSelectionModel().selectAll();
    	
    },
    deleteFromUserRolesFailure: function(storeRole, storeRelation, records) {
        storeRelation.add(records);
        storeRole.remove(records);

        storeRelation.commitChanges();
        storeRole.commitChanges();
    },
    addToUserRolesFailure: function(storeRole, storeRelation, records) {
        storeRelation.remove(records);
        storeRole.add(records);

        storeRelation.commitChanges();
        storeRole.commitChanges();
    }, 
    
    changeInt: function(bol){
    	if(bol){
    		bol = 1;
    	}else{
    		bol = 0;
    	};
    	return bol;
    },
    openAndClose: function(btn){
    	var text = btn.getText();
    	var tree = btn.up('panel');
    	if(text == '展开'){
    		tree.expandAll();
    		btn.setText("收起");
    	}else{
    		tree.collapseAll();
    		btn.setText("展开");
    	}
    },
    
	RoleDevicePicListL: function(){
		Ext.getCmp('role-RoleDevicePicListL-id').getSelectionModel().selectAll();
	},
	
	RoleDevicePicListR: function(){
		Ext.getCmp('role-RoleDevicePicListR-id').getSelectionModel().selectAll();
	},
	onBeforeRender: function(){
		var own = Ext.getCmp('role-RoleNewsTypeTreeL-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {});
		storeTre.load();
		storeTre.getRootNode().set('expanded', true);
		
		var own = Ext.getCmp('role-RoleNewsTypeTreeR-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {});
		storeTre.load();
		storeTre.getRootNode().set('expanded', true);
	},
	//角色与网站菜单
	selectAll_Act:function(){
	   var rootnode = this.getStore('role.RoleMenuLTreeAct').getRootNode();
	   rootnode.set('checked',true);
	   var treechecktrue=function(node){
		   if(node.hasChildNodes()){
			   node.eachChild(function(child){		                    	    		
				   child.set('checked',true);
				   treechecktrue(child);		                    	    			   
			   });
		   }
	   };
	   treechecktrue(rootnode);		
	},
	removeAll_Act: function(){
	   var rootnode = this.getStore('role.RoleMenuLTreeAct').getRootNode();
	   rootnode.set('checked',false);
	   var treechecktrue=function(node){
		   if(node.hasChildNodes()){
			   node.eachChild(function(child){		                    	    		
				   child.set('checked',false);
				   treechecktrue(child);		                    	    			   
			   });
		   }
	   };
	   treechecktrue(rootnode);		
	},
	menuSave_Act: function(){
	   var records = Ext.getCmp('role-roleList-id').getSelectionModel().getSelection();
	   var roleId = records[0].data.id;
	   var records = Ext.getCmp('role-RoleMenuLTreeAct-id').getChecked();
	   var values_1 = [];
	   for(var i = 0;i < records.length; i++){  
			if(records[i].data.id=='root'){
				continue;
			}
	    	record = "{'id':'"+records[i].data.id+"'}";
	    	values_1.push(record);
       };
	   Ext.Ajax.request({
	   		scope: this,
    	    url: isane.util.URL.URLACT+'addRoleMenu',
    	    params: {
		        jsonString:'['+values_1+']',
		        roleId: roleId,
		        typeId: 1 //1是菜单2是资讯
		    },
    	    success: function(response){		       		                    	    	
    	    	var obj = Ext.decode(response.responseText);
                if(!obj.success) { 
                	Ext.example.msg("系统提示！","保存失败！");
                }
                else {
                	Ext.Msg.alert("系统提示！","保存成功！");
                	var storeL = this.getStore('role.RoleMenuRAct');
                	storeL.reload();
                }
    	    },
    	    failure: function(){
    	    	Ext.example.msg("系统提示！","保存失败！");
    	    }
    	});		
	},	
    roleMenuUpdate_Act: function(bt){
		var grid = bt.ownerCt.ownerCt;
		var store = grid.getStore();
		var records = []; 
		records = store.getModifiedRecords();
		if(records.length <= 0){
			Ext.MessageBox.show({
				title : '系统提示',
				msg : '设置没有改动!',
				buttons : Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
			return;			
		}
		var grid = Ext.getCmp('role-roleList-id');
		var items = grid.getSelectionModel().getSelection();
		var flag = Ext.create('isane.util.Win').onWin(items);
		if(!flag){return;};		
		var item = items[0];
		var roleId = item.data.id;
		var json = '[';
		for(var i = 0; i < records.length; i++){
			var record = records[i];
			var data = record.data;
			var id = data.id;
			var isAdd = this.changeInt(data.isAdd);
			var isDelete = this.changeInt(data.isDelete);
			var isModify = this.changeInt(data.isModify);
			var isQuery = this.changeInt(data.isQuery);
			var isSpecial = this.changeInt(data.isSpecial);	
			if(i!=records.length-1){
				json = json + '{id:'+id+',roleId:'+roleId+',isAdd:'+isAdd+',isDelete:'+isDelete+',isModify:'+isModify+',isQuery:'+isQuery+',isSpecial:'+isSpecial+'},';
			}else{
				json = json + '{id:'+id+',roleId:'+roleId+',isAdd:'+isAdd+',isDelete:'+isDelete+',isModify:'+isModify+',isQuery:'+isQuery+',isSpecial:'+isSpecial+'}]';
			}
		};	
		Ext.Ajax.request({
			url: isane.util.URL.URLACT+'roleMenuUpdate',
			params: {jsonString:json },
			success: function(response){
				var result = response.responseText;
				var value = Ext.decode(result);
				Ext.Msg.alert('系统信息！',value.message);
//				grid.getStore().reload();
				bt.ownerCt.ownerCt.getStore().commitChanges();
			},
			failure: function(response){
				Ext.Msg.alert('系统信息！','访问出错！');
			}
		});
    },
    //-----------------------角色与专题资讯-----------------------------------------------
	onBeforeRender_project: function(){
		var own = Ext.getCmp('role-ProjectTreeL-id');
		var storeTre = own.getStore();
		Ext.apply(storeTre.proxy.extraParams, {});
		storeTre.load();
		storeTre.getRootNode().set('expanded', true);
		
//		var own = Ext.getCmp('role-RoleNewsTypeTreeR-id');
//		var storeTre = own.getStore();
//		Ext.apply(storeTre.proxy.extraParams, {});
//		storeTre.load();
//		storeTre.getRootNode().set('expanded', true);
	}, 
	selectAll_ProjectTreeL:function(){
	   var treeL = Ext.getCmp('role-ProjectTreeL-id');
	   var storeL = treeL.getStore();
	   var rootNode = storeL.getRootNode();
	   rootNode.set('checked',true);
	   var treechecktrue=function(node){
		   if(node.hasChildNodes()){
			   node.eachChild(function(child){		                    	    		
				   child.set('checked',true);
				   treechecktrue(child);		                    	    			   
			   });
		   }
	   };
	   treechecktrue(rootNode);		
	},	
	removeAll_ProjectTreeL: function(){
	   var treeL = Ext.getCmp('role-ProjectTreeL-id');
	   var storeL = treeL.getStore();
	   var rootNode = storeL.getRootNode();		
	   rootNode.set('checked',false);
	   var treechecktrue=function(node){
		   if(node.hasChildNodes()){
			   node.eachChild(function(child){		                    	    		
				   child.set('checked',false);
				   treechecktrue(child);		                    	    			   
			   });
		   }
	   };
	   treechecktrue(rootNode);		
	},	
	menuSave_ProjectTreeL: function(){
	   var records = Ext.getCmp('role-roleList-id').getSelectionModel().getSelection();
	   var roleId = records[0].data.id;
	   var records = Ext.getCmp('role-ProjectTreeL-id').getChecked();
	   var values_1 = [];
	   for(var i = 0;i < records.length; i++){  
			if(records[i].data.id =='root' || records[i].data.id <= 0){
				continue;
			}
	    	record = "{'id':'"+records[i].data.id+"'}";
	    	values_1.push(record);
       };
//       console.log(values_1);
	   Ext.Ajax.request({
	   		scope: this,
    	    url:'addRoleProject',
    	    params: {
		        jsonString:'['+values_1+']',
		        roleId: roleId,
		        typeId: 3 //1是菜单2是资讯3专题
		    },
    	    success: function(response){		       		                    	    	
    	    	var obj = Ext.decode(response.responseText);
                if(!obj.success) { 
                	Ext.example.msg("系统提示！","保存失败！");
                }
                else {
                	Ext.Msg.alert("系统提示！","保存成功！");
                	var treeR = Ext.getCmp('role-ProjectGridR-id');
                	var storeR = treeR.getStoe();
                	treeR.reload();
                }
    	    },
    	    failure: function(){
    	    	Ext.example.msg("系统提示！","保存失败！");
    	    }
    	});		
	}
});
