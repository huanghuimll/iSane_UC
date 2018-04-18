package com.isane.in.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.persistent.type.DaoConst;
import com.isane.ragdoll.service.RagdollService;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.DimNav;
import com.isane.in.entity.DimNavNodeC;
import com.isane.in.entity.Role;


@Controller
@RequestMapping(value = "/api/DimNav")
public class DimNavController extends RagdollControllerImpl<DimNav> {
	
	@Autowired
	private RagdollService<DimNav> service;
	
	@Override
	public DimNav getEmptyEntity() {
		return new DimNav();
	}

	@Override
	public Class<DimNav> getEntityClass() {
		return DimNav.class;
	}
	
	//2、根据角色获取后台菜单(带复选框)
	@RequestMapping(value = "navByRoleC", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public List<DimNavNodeC> listByRoleC(Role role, int menuTypeId) {
		List<DimNavNodeC> list = new ArrayList<DimNavNodeC>();
		
		if(role == null || role.getRoleCode() == null){
			logger.error("param: role is null.");
			return list;
		}
		
		if(menuTypeId == 0){
			logger.error("param: menuTypeId is 0.");
			return list;
		}
		
		//1.查询出所有后台菜单
		List<DimNav> allList = service.list(new DimNav(), DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT);
		System.out.println(allList);
		//2.查询出角色与后台菜单绑定的数据
		DimNav m = new DimNav();
		m.setRoleCode(role.getRoleCode());
		m.setMenuTypeId(menuTypeId);
		List<DimNav> rmList = service.listCustom(m, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT, "navByRole");
		//3.循环遍历1与2整合到一个集合中，并转化成具有复选框的树结构
		list = this.getMenuNodesC(rmList, allList);
		//4.转化成Ext树结构(递归)
		DimNavNodeC mnc = new DimNavNodeC();
		mnc.setNavCode("#");
		list = this.getChildMenuC(list, mnc);
		return list;
	}	
	
	/**
	 * 获取角色菜单，带有复选框，并根据角色与菜单的绑定数据已经对复选框做出处理
	 * @param rmList 角色与菜单绑定数据
	 * @param list   所有菜单数据
	 * @return       返回具有复选框的角色数据
	 */
	public List<DimNavNodeC> getMenuNodesC(List<DimNav> rmList, List<DimNav> list) {
		List<DimNavNodeC> mnList = new ArrayList<DimNavNodeC>();
		//1、复选框的角色数据
		for(DimNav menu : list){
			DimNavNodeC c = new DimNavNodeC();
			c.copyFrom(menu);//关键步骤
			for(DimNav rm : rmList){
				if(c.getNavCode().equalsIgnoreCase(rm.getNavCode())){
					c.setChecked(true);
					break;
				}
			}
			mnList.add(c);
		}
		//2.将叶子节点设置成true
		for (DimNavNodeC menu : mnList) {
			//1.给父类节点leaf赋值
			for (DimNavNodeC m : mnList) {
				if (menu.getNavCode().equalsIgnoreCase(m.getParentCode())) {
					menu.setLeaf(false);
					break;
				}else {
					menu.setLeaf(true);
				}
			}		
		}
		
		return mnList;
	}	
	/**
	 * 转化成Ext树结构
	 * @param mnList
	 * @param menuNode
	 * @return
	 */
	public List<DimNavNodeC> getChildMenuC(List<DimNavNodeC> mnList, DimNavNodeC menuNode) {
		List<DimNavNodeC> mndList = new ArrayList<DimNavNodeC>();
		for(DimNavNodeC mn : mnList){
			if (menuNode.getNavCode().equalsIgnoreCase(mn.getParentCode()) ) {
				mndList.add(mn);
				//获取子菜单
				List<DimNavNodeC> childList = getChildMenuC(mnList, mn);
				mn.setChildren(childList);
			}
		}
		return mndList;
	}		

}