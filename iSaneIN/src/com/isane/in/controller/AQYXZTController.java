package com.isane.in.controller;

import java.text.DecimalFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isane.in.entity.AQYXZT;
import com.isane.ragdoll.service.RagdollService;
import com.isane.ragdoll.web.RagdollControllerImpl;


@Controller
@RequestMapping(value = "/api/AQYXZT")
public class AQYXZTController extends RagdollControllerImpl<AQYXZT> {

	@Override
	public AQYXZT getEmptyEntity() {
		return new AQYXZT();
	}

	@Override
	public Class<AQYXZT> getEntityClass() {
		return AQYXZT.class;
	}
	
	@PostMapping("addAndUpdate")
	@ResponseBody
	public List<AQYXZT> addAndUpdate(@RequestBody AQYXZT item) {
		RagdollService<AQYXZT>  service = getService();

		long id = item.getId();
		if (id == 0) {
			List<AQYXZT> list = service.listCustom(item, 0, 1000000, "selectByDesc");
			System.out.println("list is:"+list.size());
			//增加
			service.create(item);
			//算出上一条持续天数 //修改上一条结束时间
			if(list != null && list.size() >0){
				AQYXZT temp = list.get(0);
				temp.setEndTime(item.getStartTime());
				Date tempStart = temp.getStartTime();
				Date tempEnd = temp.getEndTime();
				double dayCount = (double)(tempEnd.getTime() - tempStart.getTime()) / (24*60*60*1000);
				DecimalFormat df = new DecimalFormat("#.00");
				temp.setDayCount(Float.parseFloat(df.format(dayCount)));
				service.modify(temp);
			}
		}
		if (id != 0) {
			//修改
			service.modify(item);
		}

		return null;
	}		

	@PostMapping("addAndUpdates")
	@ResponseBody
	public List<AQYXZT> addAndUpdates(@RequestBody List<AQYXZT> pageList) {
		if (pageList.size() == 0 || pageList == null) {
			return null;
		}
		List<AQYXZT> insertList = pageList.stream().filter(c -> c.getId() == 0).collect(Collectors.toList());
		List<AQYXZT> updateList = pageList.stream().filter(c -> c.getId() > 0).collect(Collectors.toList());

		if (insertList.size() != 0) {
			getService().createMulti(AQYXZT.class, insertList);
		}
		if (updateList.size() != 0) {
			getService().modifyMulti(AQYXZT.class, updateList);
		}

		return null;
	}	
}