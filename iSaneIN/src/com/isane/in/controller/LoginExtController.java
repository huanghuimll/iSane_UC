package com.isane.in.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.isane.in.entity.User;
import com.isane.ragdoll.service.RagdollService;
import com.isane.ragdoll.utils.encrypt.MD5;
import com.isane.ragdoll.web.RagdollControllerImpl;

@Controller
public class LoginExtController extends RagdollControllerImpl<User> {
	
	@Override
	public Class<User> getEntityClass() {
		return User.class;
	}
	@Override
	public User getEmptyEntity() {
		return new User();
	}
	
	@RequestMapping(value = "/loginExt")
	public String loginExt(User user, HttpServletRequest request) {
		//return "forward:WEB-INF/login/login.jsp";
		return "forward:/login/login.jsp";
	}
	
	@RequestMapping(value = "/loginSubmitExt")
	public String loginSubmitExt(Model model, User user, HttpServletRequest request) {
		
		RagdollService<User> service = getService();
		
		HttpSession session = request.getSession();
		
		if(session == null){
			model.addAttribute("sessionNull", "访问断掉,重新登入...");
			return "forward:loginExt";
		}
		
		User userSess = (User) session.getAttribute("USER");
		//判断sessin中已经存在的user,单点登入的时候使用
		if(userSess != null && (user.getUserCode() == "" || user.getUserCode() == null)){
			
			return "forward:ext/main.jsp";
		}	
		
		//普通登入使用
		if(user.getUserCode() == "" || user.getUserCode() == null){
			//跳转
			model.addAttribute("userCodeNull", "用户编码不能为空...");
			return "forward:loginExt";
		}	
		
		if(user.getPassword() == "" || user.getPassword() == null){
			//跳转
			model.addAttribute("passWordNull", "用户密码不能为空...");
			return "forward:loginExt";
		}	
		
		User item = service.singleCustom(user, "login");
		//1、验证用户是否存在
		if(null == item){
			//跳转
			model.addAttribute("userError", "用户不存在...");
			return "forward:loginExt";
		}
		//2、验证密码是否正确
		if(!MD5.getMD5(user.getPassword()).equals(item.getPassword())){
			//跳转
			model.addAttribute("passWordError", "用户密码错误...");
			return "forward:loginExt";
		}
		//3、验证状态是否正常
		if(item.getCurrentStatus() != 1){
			//跳转
			model.addAttribute("userStatusError", "用户被禁用...");
			return "forward:loginExt";			
		}
		//4、验证是否在有效时间内
		/*if( null != item.getValidDate() && new Date().compareTo(item.getValidDate()) > 0){
			//跳转
			model.addAttribute("userValidDateError", "用户账号过时...");
			return "forward:loginExt";				
		}*/
		session.setAttribute("USER", item);
		return "forward:ext/main.jsp";
	}	
	
	@RequestMapping(value = "/main")
	public String loginMain(User user, HttpServletRequest request) {
		//System.out.println("USER IS:"+user);
		if(user == null || user.getUserCode() == null || user.getPassword() == null){
			//跳转
			return "forward:loginExt";
		}
		HttpSession session = request.getSession();
		if(session == null){
			//跳转
			return "forward:loginExt";
		}
		
		RagdollService<User> us = getService();
		User item = us.single(user);
		
		if(item == null){
			//跳转
			return "forward:loginExt";
		}
		
		session.setAttribute("USER", item);
		
		return "forward:ext/main.jsp";
	}


}
