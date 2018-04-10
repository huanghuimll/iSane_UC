Ext.define('isane.view.actdevice.deviceList',{
	extend:'Ext.grid.Panel',
	alias:'widget.actdevice-deviceList',
	id: 'actdevice-deviceList-id',
	border: 0,
	store: Ext.create('isane.store.act.Device', {storeId:'actdevice-deviceList-storeId'}),
	tbar:[
	{
	 	text: '登记',
        iconCls: 'add',
        id: 'actdevice-deviceList-addButton'
	},'-',
	{
		text: '查看',
		disabled: true,
		iconCls: 'view',
		id: 'actdevice-deviceList-viewButton'
	}
    ],
	columns:[
     {header:'选择',dataIndex:'id',width:60},
     {header:'登记日期',dataIndex:'registDate',xtype:'datecolumn', format:'Y-m-d', width:80},
     {text: '申请人', dataIndex: 'registPersonName', width:100},
	 {header:'类别',dataIndex:'deviceType',flex:1,renderer: function(v) {
		 if(v=='001') return "<span style='color:blue'>新购</span>";
		 if(v=='002') return "<span style='color:blue'>新增</span>";
		 if(v=='003') return "<span style='color:blue'>调换</span>";
		 if(v=='004') return "<span style='color:blue'>借用</span>";
	 }},
	 {text: '设备名', dataIndex: 'deviceName', flex:4},
     {header:'状态',dataIndex:'registStatus',flex:1, renderer: function(v) {
    	//customProcessType 0登记  1申请人确认  2部门负责人审批  3信息中心审核  4信息中心审批  5行政部负责人审批  6分管领导审批  7厂长审批  8结束
    	 if(v==0) return "<span style='color:green'>登记</span>";
    	 if(v==1) return "<span style='color:gray'>申请人确认</span>";
    	 if(v==2) return "<span style='color:blue'>申请部门负责人审批</span>";
    	 if(v==3) return "<span style='color:blue'>信息中心审核</span>";
    	 if(v==4) return "<span style='color:blue'>信息中心批准</span>";
    	 if(v==5) return "<span style='color:blue'>行政部负责人审批</span>";
    	 if(v==6) return "<span style='color:blue'>分管领导审批</span>";
    	 if(v==7) return "<span style='color:blue'>厂长审批 </span>";
    	 if(v==8) return "<span style='color:red'>结束</span>";
	 }},
     {
    	 text:'操作(发布/修改/删除/撤销/下载)', 
    	 xtype: 'actioncolumn', 
    	 flex: 2,
    	 items:[
		{
            getClass: function(v, meta, rec) {     
            	var workNumber = Ext.get('workNumber').getValue();
                if (rec.get('registStatus') == 0 && rec.get('registPerson') == workNumber) {
                    return 'up';
                }else{
                	return 'x-hide-visibility';
                }
            },
            tooltip: "<span style='color:red'>启动发布！</span>",
            handler: function(grid, rowIndex, colIndex) {
            	var store = grid.getStore();
                var rec = store.getAt(rowIndex);
                this.fireEvent('startProcessEvent', rec);
            }            
        },'',    	        
		{
			getClass: function(v, meta, rec) {  
				var workNumber = Ext.get('workNumber').getValue();
				if (rec.get('registStatus') == 0 && rec.get('registPerson') == workNumber) {
					return 'edit';
				}else{
					return 'x-hide-visibility';
				}
			},
			tooltip: "<span style='color:red'>修改！</span>",
			handler: function(grid, rowIndex, colIndex) {
				var store = grid.getStore();
				var rec = store.getAt(rowIndex);
				this.fireEvent('updateEvent', rec);
			}            
		},'',    	        
        {
        	getClass: function(v, meta, rec) {    
        		var workNumber = Ext.get('workNumber').getValue();
        		if (rec.get('registStatus') == 0 && rec.get('registPerson') == workNumber) {
        			return 'remove';
        		}else{
        			return 'x-hide-visibility';
        		}
        	},
        	tooltip: "<span style='color:red'>删除！</span>",
        	handler: function(grid, rowIndex, colIndex) {
        		var store = grid.getStore();
        		var rec = store.getAt(rowIndex);
        		this.fireEvent('deleteEvent', rec);
        	}            
        },'',  
		{
			getClass: function(v, meta, rec) {      
				var workNumber = Ext.get('workNumber').getValue();
				if (rec.get('registStatus') != 0 && rec.get('registPerson') == workNumber) {
					return 'shandian';
				}else{
					return 'x-hide-visibility';
				}
			},
			tooltip: "<span style='color:red'>撤销流程！</span>",
			handler: function(grid, rowIndex, colIndex) {
				var store = grid.getStore();
				//alert('exportEvent');
         		var rec = store.getAt(rowIndex);
				this.fireEvent('deleteEventInst', rec);
			}            
		},'',        
		{
			getClass: function(v, meta, rec) {        
				if (rec.get('registStatus') == 8 ) {
					return 'list_export';
				}else{
					return 'x-hide-visibility';
				}
			},
			tooltip: "<span style='color:red'>下载申请单！</span>",
			handler: function(grid, rowIndex, colIndex) {
				var store = grid.getStore();
         		var rec = store.getAt(rowIndex);
         		 //console.log(rec.data);
         		var processInstanceId = rec.data.processInstanceId;
         		window.open("DeviceOutWord?processInstanceId="+processInstanceId);
			}            
		}
        ] 
	 }
    ],
	bbar:
	{
		xtype:'pagingtoolbar',
		store: 'actdevice-deviceList-storeId',
		pageSize: 30,
		width: 500,
		id:'actdevice-deviceList-pageId',
		loadMask:true,
		displayInfo:true,
		plugins: 'ProgressBarPager'
	},	
	initComponent:function(){
		this.callParent(arguments);
	}	       
});