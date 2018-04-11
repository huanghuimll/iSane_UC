Ext.define('isane.model.RoleMenu', {
    extend: 'Ext.data.Model',
    fields: ['id', 'menuTitle','roleId','childId','isAdd','isDelete','isModify','isQuery','isSpecial']
});