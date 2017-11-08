window.onload = function() {
    // 获取元素
    function $(id) {return document.getElementById(id);}
    var js_slider = $("js_slider");  // 获取最大盒子
    var slider_main_block = $("slider_main_block");  // 滚动图片的父亲
    var imgs = slider_main_block.children;  // 获得所有的图片组 需要滚动的部分
    var slider_ctrl = $("slider_ctrl");  // 获得 控制span 的 父盒子
    // 操作元素
    // 生成小span
    
    for(var i=0;i<imgs.length;i++){
    	var span = document.createElement("span");
    	span.className = "slider-ctrl-con";
    	span.innerHTML = imgs.length - i;
    	/*由于是倒着插入的，所以数值为长度减去当前第几个*/
    	slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
    	/*插入到第二个span前面，插入后就是新的第二个*/
    	
    }

    // 下面的第一个小span  是默认的蓝色
    var spans = slider_ctrl.children;   // 得到所有的 span
    spans[1].setAttribute("class","slider-ctrl-con current");  // 两个类名

    var scrollWidth = js_slider.clientWidth; // 得到大盒子的宽度 也就是  后面动画走的距离  310
    //  刚开始，按道理   第一张图片 留下   其余的人走到 310 的位置上
    for(var i = 1; i<imgs.length; i++) { // 从1 开始 因为第一张不需要计算

        imgs[i].style.left =  scrollWidth + "px";  // 其他人 先右移动到 310 的位置
    }

   var iNow = 0;
    /*遍历8个按钮*/
   for(var k in spans){
   	  spans[k].onclick = function() {
   	  	if(this.className == "slider-ctrl-prev"){
   	  		console.log("左边");
   	  		animate(imgs[iNow],{left:scrollWidth});
   	  		iNow--;
   	  		if(iNow<0){
   	  			iNow = imgs.length-1;
   	  		}
   	  		imgs[iNow].style.left = -scrollWidth + "px";
   	  		animate(imgs[iNow],{left:0});
   	  		setSquare();   /*设置下面小方块的样式*/
   	  	}else if(this.className == "slider-ctrl-next"){
   	  		autoPlay();
   	  	}else {
   	  		console.log("下边");
   	  		var that = this.innerHTML - 1; /*得到点击的span中的索引号*/
   	  		if(that>iNow){   /*右边的图片显示出来*/
   	  			animate(imgs[iNow],{left:-scrollWidth});  /*当前图片向左移动*/
   	  			imgs[that].style.left = scrollWidth + "px" /*目标图片先在舞台右边准备*/
   	  			animate(imgs[that],{left:0})     /*目标图片向左移动*/
   	  		}else if(that<iNow){
   	  			animate(imgs[iNow],{left:scrollWidth}) /*当前图片向右移动*/
   	  			imgs[that].style.left = -scrollWidth + "px" /*目标图片在舞台左边等着*/
   	  			animate(imgs[that],{left:0}) /*目标图片向右移动*/
   	  		}
   	  		iNow = that;     /*iNow得到目标地点的索引值*/
   	  		setSquare();   /*设置下面小方块的样式*/
   	  	}
   	  }
   }
   
   function setSquare() {  /*设置小方块*/
   	  for(var i=1;i<spans.length-1;i++){    /*去掉第一个和最后一个按钮不用设置*/
   	 	spans[i].className = "slider-ctrl-con";
   	  }
   	  spans[iNow +1 ].className = "slider-ctrl-con current";
   }
   
   
   var timer = null;   /*定时器*/
   timer = setInterval(autoPlay,1500);  /*开启定时器*/
   function autoPlay() {  /*相当于点击右边按钮*/
   	console.log(autoPlay);
   	  //console.log("右边");
   	  		animate(imgs[iNow],{left:-scrollWidth});
   	  		/*当前显示的图片向左移动到一个图片的距离*/
   	  		iNow ++ ;
   	  		if(iNow>imgs.length-1){
   	  			iNow = 0;
   	  		}
   	  		imgs[iNow].style.left = scrollWidth + "px";  
   	  		/*下一个将要出现的图片先把它放在舞台右边*/
   	  		animate(imgs[iNow],{left:0});
   	  		/*下一个图片向左移动一个图片的距离*/
   	  		setSquare();   /*设置下面小方块的样式*/
   }
   
   js_slider.onmouseover = function() {
   	 clearInterval(timer);   /*关闭定时器*/
   }
   js_slider.onmouseout = function() {
   	timer = setInterval(autoPlay,1500);  /*开启定时器*/
   }
}