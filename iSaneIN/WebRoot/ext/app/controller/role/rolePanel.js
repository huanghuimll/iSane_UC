Ext.define('isane.controller.role.rolePanel', {
	extend : 'Ext.app.Controller',
	stores: ['role.Role', 'role.RoleUserL', 'role.RoleUserR', 'role.RoleMenuTree'],
	models: ['Role', 'RoleUser', 'RoleMenuTree'],
	views: ['role.rolePanel', 'role.roleList', 'role.roleForm', 
	        'role.RoleUserRelation', 'role.RoleUserListL','role.RoleUserListR',
	        'role.RoleMenuTree'
	        ],
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
			//角色与后台菜单
			'role-RoleMenuTree #role-RoleMenuTree-ZS':{
				click: this.openAndClose
			},
			'role-RoleMenuTree button[text=选取所有]':{
				click: this.selectAll
			},
			'role-RoleMenuTree button[text=取消所有]':{
				click: this.removeAll
			},
			'role-RoleMenuTree button[text=权限保存]':{
				click: this.menuSave
			},
			'role-RoleMenuTree':{
				checkchange: this.checkchange
			}
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
		Ext.getCmp('role-RoleMenuTree-saveQX').setDisabled(false);
		
		var roleCode = record.data.roleCode;	
		Ext.getCmp("role-RoleUserListL-roleCode").setValue(roleCode);
		Ext.getCmp("role-RoleUserListR-roleCode").setValue(roleCode);
		
		var btnL = Ext.getCmp('role-RoleUserListL-btn')
		this.RoleUserSearchL(btnL);
		
		var btnR = Ext.getCmp('role-RoleUserListR-btn')
		this.RoleUserSearchR(btnR);
		
		var mr = {
			roleCode: roleCode,
			menuTypeId: 1
		}
		var rmt = Ext.getCmp('role-RoleMenuTree-id');
		var rmtStore = rmt.getStore();
		Ext.apply(rmtStore.proxy.extraParams, mr);
		rmtStore.reload();
		rmtStore.getRootNode().set('expanded', true);
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
		var RoleMenuTree = this.getStore('role.RoleMenuTree');
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
		        	//初始化数据:'role.RoleUserR','role.RoleUserL','role.RoleMenuTree','role.RoleMenuR','role.RoleDevicePicL','role.RoleDevicePicR'
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
	   var tree = Ext.getCmp('role-RoleMenuTree-id');
	   var rootnode = tree.getStore().getRootNode();
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
		   var tree = Ext.getCmp('role-RoleMenuTree-id');
		   var rootnode = tree.getStore().getRootNode();
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

	menuSave:function(){
	   //1、获取所选角色编码
	   var roleGrid = Ext.getCmp('role-roleList-id');
	   var models = roleGrid.getSelectionModel().getSelection();
	   var roleCode = models[0].data.roleCode;
	   //2、获取已经勾选的节点，并放到数组中
	   var menuTree = Ext.getCmp('role-RoleMenuTree-id');
	   var store = menuTree.getStore();
	   var records = menuTree.getChecked();
	   var values = [];
	   for(var i = 0;i < records.length; i++){  
			if(records[i].data.id=='root'){
				continue;
			}
			var menuCode = records[i].data.menuCode;
			var record =  Ext.create('isane.model.RolePermission',{
				childCode: menuCode,
				roleCode: roleCode,
				typeId: 1,
				isAdd: 1,
				isDelete: 1,
				isModify: 1,
				isQuery: 1,
				isSpecial: 1
			})
	    	values.push(record.data);
       };
       console.log(values);
       console.log(Ext.encode(values));
       //return;
	   Ext.Ajax.request({
	       	scope: this,
	        timeout: 5000,
	        url: 'api/RolePermission/addAndRemove',
	        jsonData: Ext.encode(values),
    	    success: function(response){		       		                    	    	
    	    	var obj = Ext.decode(response.responseText);
                if(!obj.success) { 
                	Ext.example.msg("系统提示！",obj.message);
                }
                else {
                	Ext.example.msg("系统提示！",obj.message);
                	store.reload();
                }
    	    },
    	    failure: function(){
    	    	Ext.example.msg("系统提示！","保存失败！");
    	    }
    	});		
	},
	//角色与设备图
   
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
    }
});
