 Ext.define('isane.view.user.UserImportForm',{
    extend:'Ext.form.Panel',
    alias:'widget.user-UserImportForm',
    border:0,
    bodyPadding:'5 5 5 5',
    frame: true, 
    items:[
    {
    	xtype: 'fieldset',
    	title: '基础信息',
    	defaults: {
    		margin: '5 5 5 5',
    		labelWidth: 60,
    		width: 400,
    		allowBlank: false,
    		labelAlign: 'right'
    	},
    	items: [
	    {
	    	xtype: 'filefield',
	    	name: 'uploadFile',
	    	fieldLabel: '文件',
	    	margin: '5 5 10 5',
	    	buttonText: '..',
	    	emptyText: '请选中文件..'
	    }
    	]
    }
    ]
 });