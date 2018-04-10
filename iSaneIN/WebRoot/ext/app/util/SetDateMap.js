Ext.define('isane.util.SetDateMap',{
	constructor:function(){
		//console.log("菜单初始化。。。。");
		/*var store = Ext.create('isane.store.util.Menu');
		store.load({
		    callback: function(records, operation, success) {
		    	var root = Ext.create('isane.model.Menu',{
	    			text: 'ROOT',
	    			id: 'root',
	    			menuCode: '#'		    		
		    	});
		    	records.push(root);		    	
		    	setMenuList(records);
		    }
		});	*/	
	
//		console.log("SystemItem初始化相关数据。。。。");
		var store = Ext.create('isane.store.system.systemitem');
		Ext.apply(store.proxy.extraParams, {limit : 100000});		
		store.load({
		    callback: function(records, operation, success) {
		    	setItemList(records);
		    }
		});
		
		var store = Ext.create('isane.store.system.systemitemvalue');
		Ext.apply(store.proxy.extraParams, {limit : 100000});
		store.load({
		    callback: function(records, operation, success) {
		    	setItemValueList(records);
		    }
		});		
		
		var store = Ext.create('isane.store.dimjz.dimjz');
		Ext.apply(store.proxy.extraParams, {limit : 100000});
		store.load({
			callback: function(records, operation, success) {
				setJzList(records);
			}
		});		
		
		/*
//		console.log("用户数据始化开始。。。。");
		var store = Ext.create('isane.store.util.UserUtil');
		store.load({
			callback: function(records, operation, success) {
				var map = new Ext.util.HashMap();
				for(var i = 0; i< records.length; i++){	
					map.add(records[i].data.userCode, records[i].data.userName);
				}
				setUserData(map);
			}
		});
		/*
		//console.log("部门初始化相关数据。。。。");
		var store = Ext.create('isane.store.dept.Dept');
		store.load({
			callback: function(records, operation, success) {
				var map = new Ext.util.HashMap();
				for(var i = 0; i< records.length; i++){	
					//map.add(records[i].data.id, records[i].data.deptCode);
					map.add(records[i].data.id, records[i]);
				}
				setDeptCode(map);
			}
		});
		/*
		var store = Ext.create('isane.store.employe.Employe');
		Ext.apply(store.proxy.extraParams, {limit : 100000});
		store.load({
			callback: function(records, operation, success) {
				var map = new Ext.util.HashMap();
				for(var i = 0; i< records.length; i++){	
					//map.add(records[i].data.workNumber, records[i].data.deptId);
					map.add(records[i].data.workNumber, records[i]);
				}
				setEmpAndDept(map);
			}
		});
		*/
	}
});

