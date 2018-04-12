package com.isane.in.service;

import java.util.List;
import com.isane.ragdoll.service.RagdollService;
import com.isane.in.entity.Menu;
import com.isane.in.entity.MenuNode;
import com.isane.in.entity.MenuNodeC;

public interface MenuService extends RagdollService<Menu>{
	public List<Menu> getMList(List<Menu> list);
	
	public List<MenuNode> getNodeList(List<Menu> list);
	
	public List<MenuNode> getChildMenu(List<MenuNode> mnList, MenuNode mn);
	
	public List<MenuNodeC> getNodeListC(List<Menu> list);
	
	public List<MenuNodeC> getChildMenuC(List<MenuNodeC> mnList, MenuNodeC mn);
	/**
	 * 获取角色菜单，带有复选框，并根据角色与菜单的绑定数据已经对复选框做出处理
	 * @param rmList 角色与菜单绑定数据
	 * @param list   所有菜单数据
	 * @return       返回具有复选框的角色数据
	 */
	//List<MenuNodeC> getMenuNodesC(List<Menu>rmList, List<Menu> list);
}