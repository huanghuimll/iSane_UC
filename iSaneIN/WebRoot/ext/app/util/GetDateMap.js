/*var menuList;
function setMenuList(date){
	this.menuList = date;
}
function getMenuById(id){
	for(var i = 0; i< this.menuList.length; i++){
		var item = this.menuList[i].data;
		if(item.id == id){
			return item;
		}
	}		
}*/


var itemList;
function setItemList(date){
	this.itemList = date;
}

function getItemNameByCode(code){
	for(var i = 0; i< this.itemList.length; i++){
		var item = this.itemList[i].data;
		if(item.itemCode == code){
			return item;
		}
	}		
}

var itemValueList;
function setItemValueList(date){
	this.itemValueList = date;
}

function getItemValueNameByCode(code){
	for(var i = 0; i< this.itemValueList.length; i++){
		var item = this.itemValueList[i].data;
		if(item.valueCode == code){
			return item;
		}
	}		
}

var jzList;
function setJzList(date){
	this.jzList = date;
}

function getJzNameByCode(code){
	for(var i = 0; i< this.jzList.length; i++){
		var item = this.jzList[i].data;
		if(item.jzKey == code){
			return item;
		}
	}		
}