package com.isane.in.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.persistent.type.DaoConst;
import com.isane.ragdoll.service.RagdollService;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.Menu;
import com.isane.in.entity.MenuNode;
import com.isane.in.entity.MenuNodeC;
import com.isane.in.entity.Role;
import com.isane.in.entity.User;
import com.isane.in.service.MenuService;
import com.isane.in.service.impl.MenuServiceImpl;

@Controller
@RequestMapping(value = "/api/Menu")
public class MenuController extends RagdollControllerImpl<Menu> {

	@Autowired
	private RagdollService<Menu> service;

	@Override
	public Menu getEmptyEntity() {
		return new Menu();
	}

	@Override
	public Class<Menu> getEntityClass() {
		return Menu.class;
	}

	@RequestMapping(value = MAPPING_TREE, method = RequestMethod.GET)
	@ResponseBody
	public List<Menu> listYB(Menu menu) {
		if (menu == null) {
			return null;
		}
		List<Menu> list = service.listCustom(menu, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT,
				"listIncludeChildCount");

		return list;
	}
	
	
	@RequestMapping(value = MAPPING_API_FOR_UNITY3D + MAPPING_ASYNC_TREE, method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public List<MenuNode> listTB(Menu menu, HttpServletRequest request) {
		MenuService menuService = new MenuServiceImpl();
		/*HttpSession session = request.getSession();
		User user = (User) session.getAttribute("USER");
		if (user == null) {
			throw new RuntimeException("not user in session.");
		} else {
			menu.setPlantCode(user.getPlantCode());
		}*/
		menu.setPlantCode("GZFGS");
		if (menu.getParentCode() == null || menu.getParentCode().equals("")) {
			menu.setParentCode("#");
		}
		List<Menu> list = service.listCustom(menu, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT,
				"listAllMenu");// sql中已经递归
		list = menuService.getMList(list);
		// 将menu结合转换成树形属性集合
		List<MenuNode> mnList = menuService.getNodeList(list);
		// 将树形集合转化成有子父结构的集合(获取子菜单)
		MenuNode mn = new MenuNode();
		mn.setMenuCode("#");
		List<MenuNode> endList = menuService.getChildMenu(mnList, mn);

		return endList;
	}
	
	//1、后台根据用户查询菜单
	@RequestMapping(value = "menuByUser", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public List<MenuNode> menuByUser(Menu menu, HttpServletRequest request) {
		MenuService menuService = new MenuServiceImpl();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("USER");
		if (user == null) {
			throw new RuntimeException("not user in session.");
		} else {
			menu.setUserCode(user.getUserCode());
		}
		if (menu.getParentCode() == null || menu.getParentCode().equals("")) {
			menu.setParentCode("#");
		}
		List<Menu> list = service.listCustom(menu, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT,
				"menuByUser");// sql中已经递归
		list = menuService.getMList(list);
		// 将menu结合转换成树形属性集合
		List<MenuNode> mnList = menuService.getNodeList(list);
		// 将树形集合转化成有子父结构的集合(获取子菜单)
		MenuNode mn = new MenuNode();
		mn.setMenuCode("#");
		List<MenuNode> endList = menuService.getChildMenu(mnList, mn);

		return endList;
	}
	
	//2、根据角色获取后台菜单(带复选框)
	@RequestMapping(value = "menuByRoleC", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public List<MenuNodeC> listByRoleC(Role role, int menuTypeId) {
		List<MenuNodeC> list = new ArrayList<MenuNodeC>();
		
		if(role == null || role.getRoleCode() == null){
			logger.error("param: role is null.");
			return list;
		}
		
		if(menuTypeId == 0){
			logger.error("param: menuTypeId is 0.");
			return list;
		}
		
		//1.查询出所有后台菜单
		List<Menu> allList = service.list(new Menu(), DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT);
		//2.查询出角色与后台菜单绑定的数据
		Menu m = new Menu();
		m.setRoleCode(role.getRoleCode());
		m.setMenuTypeId(menuTypeId);
		List<Menu> rmList = service.listCustom(m, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT, "menuByRole");
		//3.循环遍历1与2整合到一个集合中，并转化成具有复选框的树结构
		list = this.getMenuNodesC(rmList, allList);
		//4.转化成Ext树结构(递归)
		MenuNodeC mnc = new MenuNodeC();
		mnc.setMenuCode("#");
		list = this.getChildMenuC(list, mnc);
		return list;
	}	
	
	/**
	 * 获取角色菜单，带有复选框，并根据角色与菜单的绑定数据已经对复选框做出处理
	 * @param rmList 角色与菜单绑定数据
	 * @param list   所有菜单数据
	 * @return       返回具有复选框的角色数据
	 */
	public List<MenuNodeC> getMenuNodesC(List<Menu> rmList, List<Menu> list) {
		List<MenuNodeC> mnList = new ArrayList<MenuNodeC>();
		//1、复选框的角色数据
		for(Menu menu : list){
			MenuNodeC c = new MenuNodeC();
			c.copyFrom(menu);//关键步骤
			for(Menu rm : rmList){
				if(c.getMenuCode().equalsIgnoreCase(rm.getMenuCode())){
					c.setChecked(true);
					break;
				}
			}
			mnList.add(c);
		}
		//2.将叶子节点设置成true
		for (MenuNodeC menu : mnList) {
			//1.给父类节点leaf赋值
			for (MenuNodeC m : mnList) {
				if (menu.getMenuCode().equalsIgnoreCase(m.getParentCode())) {
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