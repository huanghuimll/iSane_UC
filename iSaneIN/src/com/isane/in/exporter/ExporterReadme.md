# 关于广州项目的报表导出功能使用

## 注意
### 该功能并不包含下列功能
1. 文件模版的管理，需要使用者自己处理模版的上传、修改、删除
2. 指标数据只负责读取，既不增加也不会修改指标数据

## 基本描述
- 项目 iSaneIN
- 包 com.isane.in.exporter
- 数据库
	- IN_EXPORT_TEMPLATE 存储报表模版主信息
	- IN_EXPORT_CELL 存储模版中的单元格信息
		- 不自己画模版界面的话，只使用cellType=(DATETIME,INDEX)
	- IN_EXPORT_MERGE 存储模版中的合并单元格信息
		- 不自己画模版界面的话，用不到该表
- 接口
	- ExportTemplateUpdater
		- 模版解析
		- 将模版文件、模版单元格、合并信息存储到表中
	- ReportExport
		- 模版导出
		- 需要给定数据日期，模版名称，导出流（可以使用文件流，也可是使用Servlet的Response中的流）

# 参考
## 配置与测试
- 项目iSaneUCTestPOI
	- 尤其注意app4mysql5-permission.xml中的typeAliasesPackage与mapperLocations

## 模版中单元格中配置日期
- 格式
	- (date,'DateFormat')

## 模版中单元格自定义内容
- 格式
	- [type,content]
	- type，字符串(不需要引号)
	- content，字符串(不需要引号)

- type取值范围
 type | content | 含义
 --: | --- | :--
 DayCounter | MC | 给定日期的月当前天数
 DayCounter | MB | 给定日期的月当前天数之前的天数(不含当天)
 DayCounter | MA | 给定日期的月当前天数之后的天数(不含当天)
 DayCounter | MT | 给定日期的当月总共天数
 DayCounter | YC | 给定日期的年当前天数
 DayCounter | YB | 给定日期的年当前天数之前的天数(不含当天)
 DayCounter | YA | 给定日期的年当前天数之后的天数(不含当天)
 DayCounter | YT | 给定日期的当年总共天数


## 模版中单元格中配置指标
- 格式
	- {idx,dateType,modifyEnable,unitConvert}

- 系统按照逗号对{}中的内容分割，放入字符串数组
	- 字符串数组[0]
		- 指标编码
		- 必须不为空
	- 字符串数组[1]
		- 日期类型
		- 可为空，为空时=DQ=当期
		- 取值范围
			- > 指标日期类型定义表格
	- 字符串数组[2]
		- 是否允许修改
		- 可为空，为空时=N=不运行修改
		- 取值范围
			- [Y,N]
			- [y,n]
	- 字符串数组[3]
		- 单位转换计算公式
		- 可为空，为空时=无转换处理=空字符串
		- 不为空时，转换公式写在''内容（小括号内），且指标值必须写成#value；不需要写等号
		- 举例：将指标值由吨改成公斤，写成'#value * 1000'
	- 字符串数组[4]及后续的字符串
		- 	系统不处理

- 指标日期类型定义表格
 日期类型名称 | 日期类型编码 | 日期类型描述
 --- | --: | ---
 当期 | DQ | 可不填写，默认为当期</br>当日、当月、当年的意思
 上月 | SY |
 同期 | TQ |
 年累计(累加) | NLJ |
 年累计(平均) | NPJ |
 同期年累计(累加) | QNLJ |
 同期年累计(平均) | QNPJ |
