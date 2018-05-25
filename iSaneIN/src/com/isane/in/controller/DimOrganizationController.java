package com.isane.in.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.ragdoll.persistent.dao.Dao;
import com.isane.ragdoll.persistent.type.DaoConst;
import com.isane.ragdoll.service.RagdollService;
import com.isane.ragdoll.web.RagdollControllerImpl;
import com.isane.in.entity.DimOrganNode;
import com.isane.in.entity.DimOrganization;
import com.isane.in.entity.SystemItemValue;

@Controller
@RequestMapping(value = "/api/DimOrganization")
public class DimOrganizationController extends RagdollControllerImpl<DimOrganization> {
	
	@Autowired
	@Qualifier("dao")
	private Dao<SystemItemValue> systemValueDao;
	@Override
	public DimOrganization getEmptyEntity() {
		return new DimOrganization();
	}

	@Override
	public Class<DimOrganization> getEntityClass() {
		return DimOrganization.class;
	}

	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<DimOrganization> addAndUpdate(@RequestBody List<DimOrganization> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<DimOrganization> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<DimOrganization> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(DimOrganization.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(DimOrganization.class, updateList);
		}

		return null;
	}
	
	@RequestMapping(value = "selectCTE", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public List<DimOrganization> selectCTE(DimOrganization organ) {
		
				
		RagdollService<DimOrganization> service = getService();
		
		List<DimOrganization> list = service.listCustom(organ, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT, "selectCTE");
		
		if(list == null || list.size() == 0){
			return null;
		}
		//logger.debug("====>数据量:"+list.size());
		return list;
	}	
	
	
	@RequestMapping(value = "selectTree", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public List<DimOrganNode> selectTree(DimOrganization organ) {
		
		List<DimOrganNode> nodeList = new ArrayList<DimOrganNode>();
				
		RagdollService<DimOrganization> service = getService();
		
		List<DimOrganization> list = service.listCustom(organ, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT, "selectCTE");
		
		if(list == null || list.size() == 0){
			return null;
		}
		//logger.debug("====>数据量:"+list.size());
		//1、将menu结合转换成树形属性集合
		nodeList = getNodeList(list); 
		//logger.debug("====>数据量:"+nodeList.size());
		//2、转化成Ext树结构(递归)
		DimOrganNode root = new DimOrganNode();
		
		root.copyFrom(getRoot(list, organ));
		nodeList = getChildMenu(nodeList, root);
		//System.out.println(root);
		//加上根目录
		root.setChildren(nodeList);
		if(nodeList.size() != 0){
			root.setLeaf(false);
			root.setId(System.currentTimeMillis());
		}
		List<DimOrganNode> ownList = new ArrayList<DimOrganNode>();
		ownList.add(root);
		return ownList;
	}	
	/**
	 * 含有检修类型的组织架构
	 *  *****这是一个特定的方法**********
	 * @param organ
	 * @return
	 */
	@RequestMapping(value = "selectTreeJX", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public List<DimOrganNode> selectTreeJX(DimOrganization organ) {
		
		List<DimOrganNode> nodeList = new ArrayList<DimOrganNode>();
				
		RagdollService<DimOrganization> service = getService();
		
		List<DimOrganization> list = service.listCustom(organ, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT, "selectCTE");
		//System.out.println("====>:"+list);
		if(list == null || list.size() == 0){
			return null;
		}
		//0、获取所有检修类型
		SystemItemValue siv = new SystemItemValue();
		siv.setItemCode("AQSC_JXGL_JXLX");
		List<SystemItemValue> sivList = systemValueDao.select(siv, DaoConst.PAGE_DEFAULT_START, DaoConst.PAGE_DEFAULT_LIMIT);
		//System.out.println("===>:"+sivList);
		if(sivList == null || sivList.size() == 0){
			return null;
		}		
		//01、结构重组，放入 List<DimOrganization> tempList
		 List<DimOrganization> tempList = new ArrayList<DimOrganization>();
		 int lg = 0;//用来控制ID使集合中的实例ID不重复
		 for (SystemItemValue s : sivList) {
			 lg++;
			 DimOrganization item = new DimOrganization();
			 item.setOrganKey(s.getValueCode());
			 item.setOrganName(s.getValueName());
			 item.setOrganParentId(organ.getOrganKey());
			 item.setId(lg);
			 tempList.add(item);
			 for (DimOrganization d : list) {
				if(d.getOrganLev() == 3){
					lg++;
					DimOrganization item2 = new DimOrganization();
					item2.setOrganKey(d.getOrganKey());
					item2.setOrganName(d.getOrganName());
					item2.setOrganParentId(s.getValueCode());
					item2.setOrganParentId1(d.getOrganParentId());//用来记住旧的
					item2.setId(lg);//ID永远不重复
					tempList.add(item2);
				}
			}
			
		}
		//logger.debug("====>数据量:"+list.size());
		//1、将menu结合转换成树形属性集合
		nodeList = getNodeList(tempList); 
		//System.out.println(nodeList);
		//logger.debug("====>数据量:"+nodeList.size());
		//2、转化成Ext树结构(递归)
		DimOrganNode root = new DimOrganNode();
		root.copyFrom(getRoot(list, organ));
		nodeList = getChildMenu(nodeList, root);
		//加上根目录
		root.setChildren(nodeList);
		if(nodeList.size() != 0){
			root.setLeaf(false);
			root.setId(lg+1);
		}
		List<DimOrganNode> ownList = new ArrayList<DimOrganNode>();
		ownList.add(root);
		return ownList;
	}
	
	public List<DimOrganNode> getNodeList(List<DimOrganization> list) {
		List<DimOrganNode> mnList = new ArrayList<DimOrganNode>();
		for (DimOrganization obj : list) {
			DimOrganNode mn = new DimOrganNode();
			mn.copyFrom(obj); // 关键步骤
			//2.将叶子节点设置成true
			for(DimOrganization temp: list){
				if(obj.getOrganKey().equalsIgnoreCase(temp.getOrganParentId())){
					mn.setLeaf(false);
					break;
				}else{
					mn.setLeaf(true);
				}
			}
			
			mnList.add(mn);
		}
		return mnList;
	}

	public List<DimOrganNode> getChildMenu(List<DimOrganNode> mnList, DimOrganNode root) {
		List<DimOrganNode> mndList = new ArrayList<DimOrganNode>();
		for(DimOrganNode mn : mnList){
			
			if (root.getOrganKey().equalsIgnoreCase(mn.getOrganParentId()) ) {
				mndList.add(mn);
				//获取子菜单
				List<DimOrganNode> childList = getChildMenu(mnList, mn);
				mn.setChildren(childList);
			}
		}
		
		return mndList;
	}
	
	private DimOrganization getRoot(List<DimOrganization> list, DimOrganization organ){
		for(DimOrganization item: list){
			if(organ.getOrganKey().equalsIgnoreCase(item.getOrganKey())){
				organ = item;
			}
		}
		return organ;
	}
}