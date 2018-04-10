package com.isane.in.service.impl;

import java.util.ArrayList;
import java.util.List;
import com.isane.ragdoll.service.RagdollServiceImpl;
import com.isane.in.entity.Menu;
import com.isane.in.entity.MenuNode;
import com.isane.in.entity.MenuNodeC;
import com.isane.in.service.MenuService;

public class MenuServiceImpl extends RagdollServiceImpl<Menu>implements MenuService {

	@Override
	public List<Menu> getMList(List<Menu> list) {
		for (Menu item : list) {
			// 1.给父类节点leaf赋值
			for (Menu m : list) {
				if (item.getMenuCode().equalsIgnoreCase(m.getParentCode()) ) {
					item.setLeaf(false);
					break;
				} else {
					item.setLeaf(true);
				}
			}
		}
		return list;
	}

	@Override
	public List<MenuNode> getNodeList(List<Menu> list) {
		List<MenuNode> mnList = new ArrayList<MenuNode>();
		for (Menu obj : list) {
			MenuNode mn = new MenuNode();
			mn.copyFrom(obj); // 关键步骤
			mnList.add(mn);
		}
		return mnList;
	}

	@Override
	public List<MenuNode> getChildMenu(List<MenuNode> mnList, MenuNode menuNode) {
		List<MenuNode> mndList = new ArrayList<MenuNode>();
		for(MenuNode mn : mnList){
			if (menuNode.getMenuCode().equalsIgnoreCase(mn.getParentCode()) ) {
				mndList.add(mn);
				//获取子菜单
				List<MenuNode> childList = getChildMenu(mnList, mn);
				mn.setChildren(childList);
			}
		}
		return mndList;
	}
	
	@Override
	public List<MenuNodeC> getNodeListC(List<Menu> list) {
		List<MenuNodeC> mnList = new ArrayList<MenuNodeC>();
		for (Menu obj : list) {
			MenuNodeC mn = new MenuNodeC();
			mn.copyFrom(obj); // 关键步骤
			mnList.add(mn);
		}
		return mnList;
	}

	@Override
	public List<MenuNodeC> getChildMenuC(List<MenuNodeC> mnList, MenuNodeC menuNode) {
		List<MenuNodeC> mndList = new ArrayList<MenuNodeC>();
		for(MenuNodeC mn : mnList){
			if (menuNode.getMenuCode().equalsIgnoreCase(mn.getParentCode()) ) {
				mndList.add(mn);
				//获取子菜单
				List<MenuNodeC> childList = getChildMenuC(mnList, mn);
				mn.setChildren(childList);
			}
		}
		return mndList;
	}

}