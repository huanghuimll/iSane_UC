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
}