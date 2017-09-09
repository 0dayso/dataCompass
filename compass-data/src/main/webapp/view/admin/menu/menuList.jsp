<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>


<head>
	<base href="<%=basePath%>">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    

    <title>菜单管理</title>

    <link href="static/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/font-awesome.min.css" rel="stylesheet">

    <link href="static/css/animate.min.css" rel="stylesheet">
    <link href="static/css/style.min.css" rel="stylesheet">
    
    <script src="static/js/jquery-2.1.1.min.js"></script>
    
    <link href="static/css/page.css" rel="stylesheet">
	<style type="text/css">
		.curr{
			background-color: #A6DBD0;
		}
		.center {
		  text-align: center;
		}
	</style> 

</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
            <div id="user-box" class="col-sm-12">
                <div class="ibox">
                    <div class="ibox-content">
                       	<h2>菜单管理</h2>
                       <div class="hr-line-dashed"></div> 
                            <div class="tab-content">
                                <div class="tab-pane active">
                                    <div class="full-height-scroll">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover">
	                                            <thead>
					                                <tr>
					                                    <th class="col-md-1">序号</th>
					                                    <th class="col-md-1">菜单图标</th>
					                                    <th class="col-md-1">菜单名称</th>
					                                    <th class="col-md-2">资源路径</th>
					                                    <th class="col-md-1">菜单排序</th>
					                                    <th class="col-md-1">更新时间</th>
					                                    <th class="col-md-1">更新用户</th>
					                                    <th class="col-md-2 center">操作</th>
					                                </tr>
					                            </thead>
                                            
                                                <tbody>
                                                
                                                	<c:forEach items="${menus }" var="menu" varStatus="vs" >
                                                	<tr>
                                                		<td>${vs.index+1 }</td>
                                                        <td class="client-avatar">
                                                        	<i class="${menu.mIcon }"></i> 
                                                        </td>
                                                        <td>
                                                        	<button type="button" class="btn btn-primary btn-sm" onclick="edit_menu('${menu.mId}')" >${menu.mName }</button>
                                                        </td>
                                                        <td>
                                                        	<span>${menu.mPath }</span>
                                                        </td>
                                                        <td>
                                                        	<span>${menu.mOrder }</span>
                                                        </td>
                                                        <td>
                                                        	<span>
                                                        	<fmt:formatDate value="${menu.mLastUpTime }" pattern="yyyy-MM-dd HH:mm:ss" />
                                                        	</span>
                                                        </td>
                                                        <td>
                                                        	<span>${menu.mLastUpUser }</span>
                                                        </td>
                                                        </td>
                                                        <td>
                                                        	
                                                        	<button class="btn btn-outline btn-primary" type="button" onclick="show_menus('${menu.mId}',this)" show_type="no" menus_ids="_menus_ids_${menu.mId}" is_find="no" no_children="no" ><i class="fa fa-plus"></i> 展开</button>
									                        <button class="btn btn-outline btn-info" type="button" onclick="edit_menu('${menu.mId}')"><i class="fa fa-edit"></i> 编辑</button>
									                        <button class="btn btn-outline btn-danger" type="button" onclick="delete_menu('${menu.mId}','main')"><i class="fa fa-trash"></i> 删除</button>
                                                        </td>
                                                    </tr>
                                                	</c:forEach>
                                                </tbody>
                                            </table>
                                            <script type="text/javascript">
                                            function edit_menu(mId){
									       		layer.open({
													type : 2,
													area : [ '50%', '70%' ],
													title : '编辑菜单',
													shade : 0.3,
													fix : true, 
													shift :0,
													maxmin : false,
													closeBtn: 1,
													skin : 'layui-layer-molv',
													content : 'menus/goMenuEditView.do?mId='+mId 
												});
									       	}
                                            function delete_menu(mId,tp){
                                            	var message='确认删除该菜单吗？';
                                            	if(tp == 'main'){
                                            		message='删除该主菜单，对应的子菜单也一并删除，确认删除吗?';
                                            	}
	                                            layer.confirm(message,{shade:0.3,btn:['确认','取消'],icon:3},function(index){
	                                            	layer.close(index);
	                                            	layer.load(0,{shade:0.3});
	                                            	$.post('menus/deleteMenu.html',{mId:mId,tp:tp},function(data){
	                                            		
	                                            		if(data.RESPONSE_STATE == '200'){
	                                            			layer.msg('操作成功!',{icon:1,time:1*1000},function(){
	                                            				self.location.reload();
	                                            			});
	                                            		}else{
	                                            			layer.closeAll('loading');
                               								layer.alert(data.ERROR_INFO,{icon:0});
	                                            		}
	                                            	});
	                                            });
                                            }
                                            </script>
                                        </div>
                                    </div>
                        <div class="hr-line-dashed">
                       	<br>
                       	<button class="btn btn-outline btn-primary" type="button" onclick="add_menu()" ><i class="fa fa-plus"></i> 添加菜单</button>
                       	<script type="text/javascript">
				       	function add_menu(){
				       		layer.open({
								type : 2,
								area : [ '50%', '80%' ],
								title : '添加菜单',
								shade : 0.3,
								fix : true, 
								shift :0,
								maxmin : false,
								closeBtn: 1,
								skin : 'layui-layer-molv',
								content : 'menus/goMenuAddView.do' 
							});
				       	}
                       	</script>
                       </div>
                        <div class="text-center">
                        	${page.pageStr }
                            <!-- <div class="btn-group">
                                <button class="btn btn-white" type="button">上一页</button>
                                <button class="btn btn-white">1</button>
                                <button class="btn btn-white  active">2</button>
                                <button class="btn btn-white">3</button>
                                <button class="btn btn-white">4</button>
                                <button class="btn btn-white">5</button>
                                <button class="btn btn-white">6</button>
                                <button class="btn btn-white">7</button>
                                <button class="btn btn-white" type="button">下一页</button>
                            </div> -->
                        </div>
                                </div>
                               
                            </div>

                      
                    </div>
                </div>
            </div>
          
           
        </div>
    </div>

    <!-- 全局js -->
    <script src="static/js/bootstrap.min.js"></script>
	<script src="static/js/plugins/layer/layer.min.js"></script>
    <script src="static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

 

    <script>
    	var obj;
        $(function () {
            $('.full-height-scroll').slimScroll({
                height: '100%'
            });
            
        });
        /** 查看子菜单
         * @param show_type:是否显示；
         * @param is_find:是否已经进行过检索；
         * @param menus_ids：进行对子菜单集合的处理
         */
        function show_menus(mParentId,obj){
        	if($(obj).attr('show_type') == 'show'){// 展开/折叠
        		$('tr[id='+$(obj).attr('menus_ids')+']').hide();
        		$(obj).attr({'show_type':'no'}).html('<i class="fa fa-plus"></i> 展开');
        	}else{
        		if($(obj).attr('is_find') == 'yes'){// 缓存判断
        			if($(obj).attr('no_children') == 'yes'){
        				layer.msg('没有子菜单!!!',{icon:0});
        			}else{
	        			$('tr[id='+$(obj).attr('menus_ids')+']').show();
	        			$(obj).attr({'show_type':'show'}).html('<i class="fa fa-minus"></i> 折叠');
        			}
        		}else{
		        	layer.load(0,{shade:0.3});
		        	$.post('menus/getMenuByParentId.html',{mParentId:mParentId},function(data){
		        		layer.closeAll('loading');
		        		if(data.RESPONSE_STATE != '200'){
                            layer.alert(data.ERROR_INFO,{icon:0});
		        			return;
		        		}else if(data.menus.length == 0){
                            layer.msg('没有子菜单!!!',{icon:0});
		        			$(obj).attr({'no_children':'yes'});
		        		}else{
		        			set_menus(obj,data.menus);
		        		}
		        		$(obj).attr({'is_find':'yes'});
		        	});
	        	}
        	}
        }
        function set_menus(obj,menus){
         layer.load(0,{shade:0.3});
         var _length = menus.length;
         var str = '';
         var acute = "'";
         for(var i=0;i<_length;i++){
         	var menu = menus[i];
         	 str += '<tr id="'+$(obj).attr('menus_ids')+'">'
              		+'<td></td>'
                      +'<td class="client-avatar">'
                      +'</td>'
                      +'<td>'
                      	+'<button type="button" class="btn btn-default btn-sm">'+menu.mName+'</button>'
                      +'</td>'
                      +'<td>'
                      	+'<span>'+menu.mPath+'</span>'
                      +'</td>'
                      +'<td>'
                      +'	<span>'+menu.mOrder+'</span>'
                      +'</td>'
                      +'<td>'
                      	+'<span>'
                      	+menu.mLastUpTime
                      	+'</span>'
                      +'</td>'
                      +'<td>'
                      	+'<span>'+menu.mLastUpUser+'</span>'
                      +'</td>'
                      +'</td>'
                      +'<td>'
						+'<button class="btn btn-outline btn-info" type="button" onclick="edit_menu('+acute+menu.mId+acute+')"><i class="fa fa-edit"></i> 编辑</button>&nbsp;'
						+'<button class="btn btn-outline btn-danger" type="button" onclick="delete_menu('+acute+menu.mId+acute+','+acute+'chilrd'+acute+')"><i class="fa fa-trash"></i> 删除</button>'
                      +'</td>'
                +' </tr>';
         	}
         	
         	$(obj).attr({'show_type':'show'}).html('<i class="fa fa-minus"></i> 折叠').closest('tr').after(str);
         	layer.closeAll('loading');
        }
    </script>


</body>


</html>