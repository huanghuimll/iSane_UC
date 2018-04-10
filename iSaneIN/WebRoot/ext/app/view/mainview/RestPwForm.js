 Ext.define('isane.view.mainview.RestPwForm',{
    extend:'Ext.form.Panel',
    alias:'widget.mainview-RestPwForm',
    border:0,
    bodyPadding:'5 5 5 5',
    frame: true, 
    items:[
    {
        xtype: 'fieldset',
        title: '基础信息',
        defaults: {
            margin: '10 5 10 5',
            labelWidth: 60,
            width: 400,
            allowBlank: false,
            labelAlign: 'left'
        },
        items: [
        {
            xtype : 'textfield',
            name:'oldPassword',
            id: 'mainview-RestPwForm-oldPassword',
            fieldLabel : '旧密码:',
            inputType:'password',
            emptyText: '请输入旧密码...'
        },
        {
            xtype : 'textfield',
            fieldLabel : '输入密码',
            vtype:'alphanum',
               vtypeText:'密码只能由数字、字母和下划线组成',
            inputType:'password',
               emptyText: '请输入密码...'
        },
        {
            xtype : 'textfield',
            name:'password',
            fieldLabel : '确认密码',
            id: 'mainview-RestPwForm-password',
            vtype:'alphanum',
               vtypeText:'密码只能由数字、字母和下划线组成',
            inputType:'password',
            validator:function(value){
                    var pw = this.previousSibling().value;
                    if(value != pw){
                        return '两次输入的密码不一致';
                    }else{
                        return true;
                    }
                },
                emptyText: '请输入确认密码...'
        }            
        ]
    }
    ]
 });