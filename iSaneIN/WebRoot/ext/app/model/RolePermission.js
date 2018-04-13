Ext.define('isane.model.RolePermission', {
    extend: 'Ext.data.Model',
    fields: ['id', 'childId', 'childCode','roleId','roleCode', 'typeId', 'isAdd','isDelete','isModify','isQuery','isSpecial']
});