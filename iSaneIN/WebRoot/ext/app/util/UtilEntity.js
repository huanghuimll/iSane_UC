Ext.define('isane.util.UtilEntity' ,{
	onWin: function(records){
        if (!records.length) {
            Ext.MessageBox.show({
               title: '系统提示',
               msg: '请在表格中选择一个记录!',
               buttons: Ext.MessageBox.OK,
               icon: Ext.MessageBox.WARNING
            });
            return false;
        }else{
        	return true;
        }
	},	
	failWin: function(response){	
		var text = response.responseText;
		var rec = Ext.decode(text);	
		var status = response.status;
		var statusText = response.statusText;
		//Ext.example.msg('系统提示！', "删除失败！<br/>error:"+status+"<br/>errorText:"+statusText);
		Ext.Msg.alert('系统提示！', "失败！<br/>error:"+status+"<br/>errorText:<span style='color:red'>"+rec.message+"</span>");		
	},
	successwin: function(msg){
        Ext.MessageBox.show({
           title: '系统提示',
           msg: msg,
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.OK
        });		
	},
	setReadOnly: function(form){
		function setReadOnly(form){
			form.items.each(function(item){
				if(item.items){
					setReadOnly(item);
				}else if(item.readOnly == false){
					item.setReadOnly(true);
					//样式:灰色
					item.setFieldStyle('color:grey');	
				}
			});
		};
		setReadOnly(form);
	},
	notReadOnly: function(form){
		function notReadOnly(form){
			form.items.each(function(item){
				if(item.items){
					notReadOnly(item);
				}else if(item.readOnly == true){
					item.setReadOnly(false);
					//样式:黑色
					item.setFieldStyle('color:black');	
				}
			});
		};
		notReadOnly(form);
	},
	upItem: function(grid){
		var store = grid.getStore();
		var records = grid.getSelectionModel().getSelection();
		if(records){
			for(var i = 0; i< records.length; i++){
				var rec = records[i];
				var index = store.indexOf(rec);
				if(index > 0){
					store.removeAt(index);
					store.insert(index-1, rec);
					grid.getView().refresh();
					grid.getSelectionModel().selectRange(index-1, index-1);
				}
		
			}			
		}		
	},
	downItem: function(grid){
		var store = grid.getStore();
		var records = grid.getSelectionModel().getSelection();
		if(records){
			for(var i = 0; i< records.length; i++){
				var rec = records[i];
				var index = store.indexOf(rec);
				if(index < store.getCount()-1){
					store.removeAt(index);
					store.insert(index+1, rec);
					grid.getView().refresh();
					grid.getSelectionModel().selectRange(index+1, index+1);
				}
			}			
		}		
	},
	month: function(val){
		if(val < 10){
			val = "0" + val;
		}
		return val;
	}
});