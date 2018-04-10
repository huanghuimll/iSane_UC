Ext.define('isane.controller.menu.MenuPanel', {
	extend : 'Ext.app.Controller',
	stores : ['menu.MenuTree'],
	models : ['Menu'],
	views : ['menu.MenuPanel', 'menu.MenuWest', 'menu.MenuContext', 'menu.MenuForm'],
	init : function() { 
		this.control({
			'menu-menuPanel':{
				beforerender: this.onBeforeRender
			},	
			'menu-MenuWest':{
				itemcontextmenu: this.itemcontextmenu
			},
			'menu-MenuContext [text=增加子节点]':{
				click: this.click_add
			},
			'menu-MenuContext [text=删除该节点]':{
				click: this.click_delete
			},
			'menu-MenuContext [text=修改该节点]':{
				click: this.click_edit
			},
			'menu-MenuContext [text=刷新]':{
				click: this.click_refresh
			}		
		});
	},
	onBeforeRender: function(item){
		var own = Ext.getCmp('menuWest-menuWest-id');
		var storeTre = own.getStore();
		storeTre.load();
		storeTre.getRootNode().set('expanded', true);
	},
	itemcontextmenu:function(view, record, item, index, e, eOpts){
		var contextMenu = Ext.create('isane.view.menu.MenuContext');
		contextMenu.showAt(e.getX(), e.getY());
		e.preventDefault();		
	},
	click_add: function(menu, item, e, eOpts){
		//alert("click_add");
		var tree = Ext.getCmp('menuWest-MenuWest-id');
		var nodes = tree.getSelectionModel().getSelection();
		var win = Ext.create('Ext.window.Window',{
			title: '节点增加',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_add',
			border: 0,
			items: [{xtype: 'menu-MenuForm'}],
			buttons: [{scope: this, text:'添加', iconCls:'ok1', handler: this.click_add_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		
		if(nodes != null){
			
			var form = win.child('form');
			form.down('combobox[name=plantCode]').setValue(QJ_PlantCode);
			form.down('combobox[name=plantCode]').setReadOnly(true);
			form.down('combobox[name=plantCode]').setFieldStyle('color:grey');	
			
			var actionType = nodes[0].data.actionType;
			if(actionType != 0){
				form.down('combobox[name=actionType]').setValue(actionType);
			}
			
			var id = nodes[0].data.id;
			form.down('treepicker[name=parentId]').setValue(id);
			
			var menuCode = nodes[0].data.menuCode;
			if(menuCode != null && menuCode != ''){
				form.down('textfield[name=menuCode]').setValue(menuCode+"_");
			}
			win.show();		
		}
	},
	click_add_but: function(btn){
		//alert('增加');
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid()) return;
		//Object.proerty or Object[property]
		record['parentCode'] = getMenuById(record.parentId).menuCode;
		//var jsonString = Ext.encode(record);
		var treePanel = Ext.getCmp('menuWest-MenuWest-id');
		var store = treePanel.getStore();
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
				var node = Ext.create('Ext.data.NodeInterface');
				var parentNode = store.getNodeById(record.parentId);
				if(parentNode.data.leaf){
					parentNode.set('leaf', false);
				}				
				var newNode = parentNode.appendChild(node);
				newNode.set('id', rec.id);
				newNode.set('leaf', true);
				newNode.set('parentId', record.parentId);
				newNode.set('text',rec.menuTitle);				
				newNode.set('parentCode', rec.parentCode);
				newNode.set('plantCode', rec.plantCode);
				newNode.set('actionType', rec.actionType);
				newNode.set('iconUrl', rec.iconUrl);
				newNode.set('menuAction', rec.menuAction);
				newNode.set('menuCode', rec.menuCode);
				newNode.set('displayOrder', rec.displayOrder);
				//store.add(record);
				win.close();
				Ext.example.msg('系统提示！', "增加成功！");
			},
			failure: function(response){
				//statusText
				var text = response.responseText;
				var status = response.status;
				var statusText = response.statusText;
				Ext.example.msg('系统提示！', "增加失败！<br/>error:"+status+"<br/>errorText:"+statusText);
			}
		});
	},	
	click_delete: function(){
		//alert("click_delete");
		var tree = Ext.getCmp('menuWest-MenuWest-id');
		var nodes = tree.getSelectionModel().getSelection();
		if(nodes != null){
			if(nodes[0].data.text == 'ROOT'){
				Ext.example.msg('系统提示！', "ROOT不准删除！");
				return;
			}
			if(nodes[0].data.children.length > 0){
				Ext.example.msg('系统提示！', "存在字节点,不准删！");
				return;
			}
			Ext.Msg.confirm('删除', '您确定删除该节点吗?', function(button) {
				if (button == 'yes') {
					this.click_delete_but(nodes[0], tree, false);
				}
			}, this);		
		}
	},
	click_delete_but: function(node, treePanel){
		//alert("click_delete_but");
		var store = treePanel.getStore();
		var url = store.proxy.api.publicUrl;		
		Ext.Ajax.request({
			scope: this,
			method: 'delete',
			url: url+node.data.id,
			success: function(response){
				var text = response.responseText;
				var rec = Ext.decode(text);	
				var parentNode = store.getNodeById(node.data.parentId);
				parentNode.removeChild(node);
				Ext.example.msg('系统提示！', "删除成功！");
			},
			failure: function(response){
				//statusText
				var text = response.responseText;
				var status = response.status;
				var statusText = response.statusText;
				Ext.example.msg('系统提示！', "删除失败！<br/>error:"+status+"<br/>errorText:"+statusText);
			}
		});		
	},
	click_edit: function(){
		//alert("click_edit");
		var tree = Ext.getCmp('menuWest-MenuWest-id');
		var nodes = tree.getSelectionModel().getSelection();
		var win = Ext.create('Ext.window.Window',{
			title: '节点修改',
			modal: true,
			constrain:true,
			maximizable:true,
			autoScroll : true,			
			iconCls: 'list_edit',
			border: 0,
			items: [{xtype: 'menu-MenuForm'}],
			buttons: [{scope: this, text:'确认', iconCls:'ok1', handler: this.click_edit_but},{text:'取消', iconCls:'delete1', handler:function(btn,o){btn.ownerCt.ownerCt.close();}}],
			buttonAlign: 'right'
		});
		
		//console.log(nodes);
		if(nodes != null && nodes[0].data.text != 'ROOT'){
			var form = win.child('form');
			form.getForm().loadRecord(nodes[0]);
			
			form.down('combobox[name=plantCode]').setReadOnly(true);
			form.down('combobox[name=plantCode]').setFieldStyle('color:grey');	
			
			if(nodes[0].data.children.length > 0){
				form.down('textfield[name=menuCode]').setReadOnly(true);
				form.down('textfield[name=menuCode]').setFieldStyle('color:grey');	
			}
			win.show();		
		}
		
	},
	click_edit_but: function(btn){
		//alert("click_refresh");
		var win = btn.up('window');
		var form = win.down('form');
		var record = form.getForm().getValues();
		if(!form.isValid())return;
		record['parentCode'] = getMenuById(record.parentId).menuCode;
		var treePanel = Ext.getCmp('menuWest-MenuWest-id');
		var store = treePanel.getStore();
		var url = store.proxy.api.publicUrl;
		//return;
		Ext.Ajax.request({
			scope: this,
			method: 'PUT',
			dataType: 'json',
			url: url,
			params: record,
			success: function(response){
	        	form.getRecord().set(record);			
				win.close();
				Ext.example.msg('系统提示！', "修改成功！");
			},
			failure: function(response){
				//statusText
				var text = response.responseText;
				var status = response.status;
				var statusText = response.statusText;
				Ext.example.msg('系统提示！', "增加失败！<br/>error:"+status+"<br/>errorText:"+statusText);
			}
		});			
	},
	click_refresh: function(){
		//alert("click_refresh");
		var tree = Ext.getCmp('menuWest-MenuWest-id');
		var store = tree.getStore();
		store.reload();
	},
});
