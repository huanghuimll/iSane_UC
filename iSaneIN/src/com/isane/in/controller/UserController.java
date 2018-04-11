package com.isane.in.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.persistent.entity.Operation;
import com.isane.ragdoll.utils.encrypt.MD5;
import com.isane.ragdoll.utils.json.JacksonUtil;
import com.isane.ragdoll.web.Errors;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.User;

@Controller
@RequestMapping(value = "/api/User")
public class UserController extends RagdollControllerImpl<User> {
	
	@Override
	public User getEmptyEntity() {
		return new User();
	}

	@Override
	public Class<User> getEntityClass() {
		return User.class;
	}

	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	@ResponseBody
	public Operation addUser(User user) {
		logMsg = "增加";
		Operation op = new Operation();
		String url = null;
		
		String password = user.getPassword();
		if (null == password || "".equals(password)) {
			password = "123456";
		}
		
		user.setPassword(MD5.getMD5(password));
		user.setPhotoUrl(url);
		
		if("请输入联系方式...".equals(user.getPhoneNum())){
			user.setPhoneNum("");
		}
		if("请输入备注...".equals(user.getUserDesc())){
			user.setUserDesc("");
		}
		
		user = getService().create(user);
		
		if (user.getId() != 0) {
			op.setSuccess(true);
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("用户增加成功");
			op.setObjJson(JacksonUtil.toJson(user));
		} else {
			op.setSuccess(false);
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("用户增加失败");
			op.setObjJson(JacksonUtil.toJson(user));
		}
		
		return op;
	}
	
	@RequestMapping(value = "/updateUser", method = RequestMethod.POST)
	@ResponseBody
	public Operation update(User user) {
		logMsg = "修改";
		Operation op = new Operation();
		String url = null;
		String password = user.getPassword();
		if (null == password || "".equals(password)) {
			password = "123456";
		}
		user.setPassword(MD5.getMD5(password));
		user.setPhotoUrl(url);
		
		int count = getService().modify(user);
		
		if (count > 0) {
			op.setSuccess(true);
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("用户修改成功");
			op.setObjJson(JacksonUtil.toJson(user));
		} else {
			op.setSuccess(false);
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("用户修改失败");
			op.setObjJson(JacksonUtil.toJson(user));
		}
		
		return op;
	}	
	
	@RequestMapping(value = "/updateByCode", method = { RequestMethod.PUT, RequestMethod.POST })
	@ResponseBody
	public Operation updateByCode(User user) {
		return updateByCodeInner(user);
	}	
	
	private Operation updateByCodeInner(User user) {
		logMsg = "修改密码";
		Operation op = new Operation();
		user.setPassword(MD5.getMD5(user.getPassword()));
		if (user.getId() == 0) {
			User temp = getService().singleCustom(user, "findByCode");
			user.setId(temp.getId());
		}
		int count = getService().modifyCustom(user, "updateByCode");
		if (count > 0) {
			op.setSuccess(true);
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("密码修改成功");
			op.setObjJson(JacksonUtil.toJson(user));
		} else {
			op.setSuccess(false);
			op.setErrCode(Errors.ERROR_NO_ERROR);
			op.setMessage("密码修改失败");
			op.setObjJson(JacksonUtil.toJson(user));
		}
		return op;
	}	
}