package com.isane.in.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.base.entity.User;
import com.isane.ragdoll.persistent.type.DaoConst;
import com.isane.ragdoll.service.RagdollService;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.Menu;
import com.isane.in.entity.MenuNode;
import com.isane.in.entity.MenuNodeC;
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
	
	@RequestMapping(value = "listByUser", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public List<MenuNode> listByUser(Menu menu, HttpServletRequest request) {
		MenuService menuService = new MenuServiceImpl();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("USER");
		if (user == null) {
			throw new RuntimeException("not user in session.");
		} else {
			menu.setPlantCode(user.getPlantCode());
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

	@RequestMapping(value = MAPPING_API_FOR_UNITY3D + MAPPING_ASYNC_TREE + "/c", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public List<MenuNodeC> listC(Menu menu, HttpServletRequest request) {
		MenuService menuService = new MenuServiceImpl();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("USER");
		if (user == null) {
			throw new RuntimeException("not user in session.");
		} else {
			menu.setPlantCode(user.getPlantCode());
		}
		if (menu.getParentCode() == null || menu.getParentCode().equals("")) {
			menu.setParentCode("#");
		}
		List<Menu> list = service.listCustom(menu, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT,
				"listAllMenuC");// sql中已经递归
		list = menuService.getMList(list);
		// 将menu结合转换成树形属性集合
		List<MenuNodeC> mnList = menuService.getNodeListC(list);
		// 将树形集合转化成有子父结构的集合(获取子菜单)
		MenuNodeC mn = new MenuNodeC();
		mn.setMenuCode("#");
		List<MenuNodeC> endList = menuService.getChildMenuC(mnList, mn);

		return endList;
	}
}