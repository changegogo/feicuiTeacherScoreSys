


//解决移动端click延迟事
/*window.addEventListener( "load", function() {
	fastClick.attach(document.body);
}, false );*/




$(function(){
	var now = { row:1, col:1 }, last = { row:0, col:0};
	const towards = { up:1, right:2, down:3, left:4};
	var isAnimating = false;

	s=window.innerHeight/500;
	ss=250*(1-s);

	$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');

	document.addEventListener('touchmove',function(event){event.preventDefault(); },false);

	$(".page.pageCanSwipe").swipeUp(function(){
		upSwipping();
		function upSwipping(){
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if (last.row != 16) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
		}
	});

	$(".page.pageCanSwipe").swipeDown(function(){
		downSwipping();
		function downSwipping(){
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}
		}
	});


	function pageMove(tw){
		var lastPage = ".page-"+last.row+"-"+last.col;
		var nowPage = ".page-"+now.row+"-"+now.col;
		switch(tw) {
			case towards.up:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case towards.right:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case towards.down:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case towards.left:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
		}
		isAnimating = true;
		$(nowPage).removeClass("hide");

		$(lastPage).addClass(outClass);
		$(nowPage).addClass(inClass);

		setTimeout(function(){
			$(lastPage).removeClass('page-current');
			$(lastPage).removeClass(outClass);
			$(lastPage).addClass("hide");
			$(lastPage).find("img").addClass("hide");

			$(nowPage).addClass('page-current');
			$(nowPage).removeClass(inClass);
			$(nowPage).find("img").removeClass("hide");

			isAnimating = false;
		},600);
	}

  // 全局对象，取到所有字段的值
	var temp = {};
  $(".headingBtn").on("click",function(){
		if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != 16) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}

	});
	//得到大区的字段
	$(".area").on('singleTap',function(){
		$(this).css("background","#14c6d0");
		console.log($(this).html());
		temp.large_Area = $(this).html();
	});
	//点击大区选项进入校区选项
	var branches=[
		['北京中关村','北京国贸', '北京通州', '北京回龙观','北京艾特',
			'翡翠昌平', '天津南开','天津新安','石家庄民族路'],
		['完美上海虹口区东江湾','卓新上海虹口区东江湾校区','上海徐汇',
			'上海珠洲口','上海浦东'],
		['完美先雁塔区小寨校区','卓新智趣西安第二分公司','西安华融',
			'西安太白','西安钟楼','太原小店','太原长风街','郑州金水','郑州国泰'],
		['长沙书院','长沙雨花','长沙中扬','武汉洪山','武汉江汉',
			'常婵红谷滩','南昌二分'],
		['济南历下','济南新','青岛南区','沈阳沈河','沈阳和平','大连中山'],
		['深圳华强北','深圳罗湖','深圳福田','广州黄埔','广州元岗',
			'广州长兴','柳州广场路','南宁西乡塘','福州台江'],
		['合肥新都会','合肥长江路','南京玄武','南京雨花台','苏州姑苏','常州钟楼',
			'无锡滨湖','杭州下城','卓新智趣杭州第二分公司','宁波***州'],
		['重庆沙坪坝','重庆天陈','重庆渝中','成都武侯','成都青羊','成都牛王庙','贵阳南明']

	];

	function schoolChoice(){
		$(".area").on("singleTap",function(){
			$(".area").css({"background":"","color":"#14c6d0"});
			$(this).css({"background":"#14c6d0","color":"#fff"});
			/*$(".fakeBox").css("display","none");*/
			$("#confirm").css({"display":"block","background":"#14c6d0"});
      $(".kuang").show(5000);
			$("#schools").css({"display":"block"});

			/*$(".page-2-1").css({"background":"#000","opacity":"0.4"});*/
			$(this).css("display","block");
			/*$(this).parents('.flex-container').css("display","none");*/

			var index=$(this).index();   //大区的下标
			var list="";
			for(var i=0;i<branches[index].length;i++){
				list+="<li>"+branches[index][i]+"</li>" ;
				$("#schools").html(list);
				$("li").on("singleTap",function(){
					$("li").css({"border":"","color":""});
					$(this).css({"border":"1px solid #14c6d0","color":"#14c6d0"});

					/*$("#schools").css("display","none");
					$(".kuang").css("display","none");*/
					$("#confirm").on("singleTap",function(){
						if (isAnimating) return;
						last.row = now.row;
						last.col = now.col;
						if (last.row != 12) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}

					});

					//得到每个校区名字
					/*alert($(this).html());*/
					var liIndex = $(this).index();
					var schoolName=$(this).html();
					temp.sch_Name = schoolName;
					/*temp.sch_Name = liIndex;*/
					console.log(temp.sch_Name);

					/*wholeDataArr = eval('('+(JSON.stringify(schoolObj)+JSON.stringify(json2)).replace(/}{/,',')+')');*/
				})
			}
		});
	}
	schoolChoice();

	//点击学校名称页面的×号，关闭页面
	$(".modal-close-btn").on("singleTap",function(){
		$("#schools").css("display","none");
		$(".kuang").css("display","none");
		$("#confirm").css("display","none");
	});

	//得到专业的value值
	$(".profession").on("singleTap",function(){
		/*$(this).css("background","#f48268");*/
		$(".profession").css({"border":"","color":""});
		$(this).css({"border":"1px solid #14c6d0","color":"#14c6d0"});

		$(".professionBtn").css("background","#14c6d0");
		$(".professionBtn").on("singleTap",function(){
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if (last.row != 12) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}

		});
		/*alert($(this).html());*/
		temp.cus_Name = $(this).html();

	});
	//得到教师的名字
	$("#uName").blur(function(){
		temp.tea_Name = $(this).val();
	});

	$("#uName").bind("input propertychang",function(){
		var taValue = $("#uName").val();
		var len = getCharSize(taValue);
		if (len >= 4 && len <= 8) {
			$(".btn").css("background","#14c6d0");
		}else if(len < 4){
			$(".btn").css("background","#ccc");
		}
		$(".btn").click(function(){
			var user = $("#uName").val();
			var patten= new RegExp("^([\u4E00-\u9FA5]{2,4})$");
			if(patten.test(user)) {
				if (isAnimating) return;
				last.row = now.row;
				last.col = now.col;
				if (last.row != 12) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
				return true;
			}else{
				$(".nameRemindWords").html("非法字符");
				$(".nextQuestion").css("background","#ccc");
				return false;
			}


		});
	});



	//建议框的提示文字
	$("#suggestions").bind("input propertychang",function(){
		var taValue = $("#suggestions").val();
		temp.stu_Advice= taValue;

	});
	function urlWxId(){
		var href = window.location.href;
		return href.split("=")[1] || "";
	}
	//id的假数据
	temp.user_Id = urlWxId();

	//表单验证
	//当失去焦点的时候，判断不能为空
	$("#uName").blur(function(){
		if($("#uName").val() == ""){
			$(".nameRemindWords").html("姓名不能为空");
		}else{
			$(".nameRemindWords").html("");
		}
		/*ckname();*/
	});

	$("#courses").blur(function(){
		if($("#courses").val() == ""){
			$(".courseRemindWords").html("课程不能为空");
		}else{
			$(".courseRemindWords").html("");
		}

	});

	//获得字符串的字符数
	function getCharSize(str){
	 var realLength = 0, len = str.length, charCode = -1;
	 for (var i = 0; i < len; i++) {
	 charCode = str.charCodeAt(i);
	 if (charCode >= 0 && charCode <= 128) realLength += 1;
	 else realLength += 2;
	 }
	 return realLength;
	 }

	//当滑动整个表单页面的时候，判断是否为空
	$(".page-4-1").on("swipe",function(){
		if($("#uName").val() == ""){
			$(".nameRemindWords").html("姓名不能为空");
		}
		if($("#courses").val() == ""){
			$(".courseRemindWords").html("课程不能为空");
		}
	});

	//判断教师姓名这一页如果没填的，禁止滚动
  $(".page-4-1").on("swipe",function() {
		if ($("#uName").val() == "") {
			$(this).unbind();
		}
	});
	////判断教师姓名这一页如果填了，开始滚动
	$("#uName").change(function(){
		$(".page-4-1").on("swipe",function(){
			//向上滑动
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if (last.row != 12) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
		})
	});


	//单选框中name的值的数组
	//单选框中id的值的数组
	var dataObj =
		[
		["alway","sometimes","nolate","always","everyday","every"],
		["noOrder","canBut","canUnderstan","tuChu","mindClea","bothClear"],
		["noQuestion","strangeQuestion","rareQuestion","goodQuestions","goodQuestion","excellentQuestion"],
		["noResponse","noAblility","avoid","hard","patient","patientAndGood"],
		["tutorAfterClass","noCare","solvedOnClass","farFetched","patientButNoAccurate","patientAndAccurate"],
		["disOrder","noGood","noInfluence","somePersons","good","goodOrder"],
		["noSkills","ownOpinin","arrange","onAccept","rangeFromResponse","active"],
		["noThinkAboutClass","noThinkAboutFact","goodButGood","goodContentButDifficult","burden","goodContent"],
		["noExample","rare","normalInfluence","goodInfluence","rich","oneAndThree"],
		["never","s","everyDayButNever","everydaySome","everydayAndAlways","accurate"]
		];




	var tag = "讲师";
	switch(tag){
		case "讲师":
			projectManagerScore();
			break;
		case "班主任":
			masterScore();
			break;
		case "就业":
			employmentManagerScore();
			break;
	}
	//得到后台的json数据
	function projectManagerScore(){
		$.getJSON('/json/projectManager.json',function(data){
			recycleDiv(data);
	});
	}
	function masterScore(){
		$.getJSON('/json/headmaster.json',function(data){
			recycleDiv(data);
		});
	}
	function employmentManagerScore(){
		$.getJSON('/json/employmentManager.json',function(data){
			recycleDiv(data);
		});
	}
	/**改变点选框的默认样式**/
/*	$("input[type = 'radio'] ").css("display","none");*/
	//单选框的name属性取出来循环
	var nameArr= ["attendance","onClass","questions","answers","tutorAfterClass",
		"discipline","skills","progress","explain","works"];
	var scoreNames = {attendance:"tea_Attendance",onClass:"cls_Explain",
		questions:"cls_Quesions", answers:"ques_Answer", tutorAfterClass:"cls_Coach",
		discipline:"cls_Discipline",skills:"cls_Skill",progress:"cls_Progress",
		explain:"exam_Explain", works:"class_Homework"};
	function recycleDiv(data){
		for(var h= 0;h<nameArr.length;h++){
			var arrStr=nameArr[h];
			$("input[name ="+arrStr+"]").click(function(){  //选中的单选框
				console.log($(this).attr('name')+'-->',parseInt($(this).val()));
				var key = $(this).attr('name');
				var val = scoreNames[key];
				console.log(val);
				temp[val] = parseInt($(this).val());

				//点击单选框选项的时候，下一题的按钮颜色变化&& 页面滑动到下一页
				$(".nextQuestion").css("background","");
				$(this).parent(".pageChoice").siblings('.nextQuestion').
					css("background","#14c6d0");
				//点击下一题
				$(this).parent(".pageChoice").siblings('.nextQuestion')
					.on("singleTap", function(){

					//取到当前页面的value值，来改变页码数
					var value = Number.parseInt($(this).parents(".page").attr('value'));
					//改变当前页面的class的page-5-1的值
					var nowDiv = $(this).parents(".page")
						.removeClass()
						.addClass("page-"+(value+2)+"-1")
						.addClass("hide")
						.addClass("page")
						.attr('value',value+2);
					$(this).parents(".page").next().after(nowDiv);

					//题卡到第十题的时候，停止循环
					if(value>12){
						nowDiv.removeClass("page-"+(value+2)+"-1");
					}
					//点击下一题页面滑动
					if (isAnimating) return;
					last.row = now.row;
					last.col = now.col;
					if (last.row != 15) { now.row = last.row+1; now.col = 1;
							pageMove(towards.up);}
					//题卡的页数1/10
					var pageNum = nowDiv.find(".pageNum");
					var page = $(pageNum).html(value-2);

					//修改input的name值
					var inputArr = nowDiv.find("input");
						for(var i=0;i<inputArr.length;i++){
						inputArr[i].name=nameArr[value-3];

					}
					//修改题卡的标题
					if(value<13){
						/*$(this).parents(".page").next().after(nowDiv);*/
						nowDiv.find('.page-title').html(data.subject[value-3].title);

						//改变单选框id的值
						var labelArr = nowDiv.find("label");
						labelArr.each(function(index,item){
							$(item).attr("for",dataObj[value-3][index]);
						});

						//改变题卡的选项内容
						labelArr.each(function(index,item){
							$(item).html(data.subject[value-3].options[index]);
						});

						//清除所有被选中的单选框
						var radios = $("input[type='radio']");
						for(var i=0;i<radios.length;i++){
							if(radios[i].checked){
								radios[i].checked = false;
							}else{
								$(".nextQuestion").unbind();
							}
						}
						//改变单选框id的值
						var inputArr = nowDiv.find("input[type='radio']");
						$(inputArr).each(function(index,item){
							$(item).attr("id",dataObj[value-3][index]);
						});
					}
				});
			});
		}
	}





	//全部提交按钮，传输数据
	$(".lastSubmit").click(function(){
		//如果建议没有填的话，传空字符传上去
		if(!(temp.stu_Advice)){
			temp.stu_Advice = "";
		}
		var jslength=0;
		for(var js2 in temp){
			jslength++;
		}
		console.log(temp);
		//向上滑动
		/*if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != 12) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}*/
		if(true){
			var url="/score";
			$.ajax({
				type:"POST",
				data:temp,
				url:url,
				success:function(data){
					var bigData = data;
					if(bigData.code === 100){
						alert(bigData.msg);
						return;
					}
					
					//向上滑动
					if (isAnimating) return;
					last.row = now.row;
					last.col = now.col;
					if (last.row != 12) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}

					//获取标题
					var strtit =  (bigData.data)[0].subject;
					var lartit =  (bigData.data)[0].area;


					// 基于准备好的dom,初始化echarts实例
					var teacherName = [];
					var teacherScore = [];
					var teaName = [];//动态获取的老师的姓名
					var teaSc = [];//动态获取的老师的分数
					for(var i = 0;i<bigData.data.length;i++){
						teacherName.push(bigData.data[i].name);
						teacherScore.push(bigData.data[i].average);
					}
					for(var i = 0;i<5;i++){
						teaName.push(teacherName[i]);
						teaSc.push(teacherScore[i]);
					}
					// 指定图表的配置项和数据
					var option = {
						title: {
							text: 'ECharts 入门示例'
						},
						tooltip: {},
						legend: {
							itemWidth:20,
							backgroundColor:'#52a245'
						},
						color:['#52a245','#000', '#00f', '#f00', '#0f0'],
						xAxis: {
							data: teaName,
//                    name:"老师",
							axisLabel:{
								textStyle:{
									fontSize:14
								},
								interval:0
							}
						},
						yAxis: {
							axisLabel:{
								textStyle:{
									fontSize:15
								}
							},
							name:"平均分数",
							axisLabel:{
								textStyle:{
									fontSize:20
								},
								interval:0
							}
						},
						series: [{
							name: '销量',
							type: 'bar',
							data:teaSc
						}]
					};
					var myChart = echarts.init(document.getElementById('main'));
					myChart.setOption(option);
					$("#bTit").html(lartit+"大区"+strtit+"排行");
					alert(bigData.msg);
				}
			});
		}else{
				alert("aaa");
		}





	});

});


