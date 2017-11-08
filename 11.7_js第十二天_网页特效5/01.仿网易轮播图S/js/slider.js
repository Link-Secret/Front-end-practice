window.onload = function() {
	    // 获取元素
    function $(id) {return document.getElementById(id);}
    var js_slider = $("js_slider");  // 获取最大盒子
    var slider_main_block = $("slider_main_block");  // 滚动图片的父亲
    var imgs = slider_main_block.children;  // 获得所有的图片组 需要滚动的部分
    var slider_ctrl = $("slider_ctrl");  // 获得 控制span 的 父盒子
    // 操作元素
    for(var i=0;i<imgs.length;i++){
    	var span = document.createElement("span");
    	span.innerHTML = imgs.length - i ;  /*向里面插入索引*/
    	span.className = "slider-ctrl-con";  /*添加类名*/
    	slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
    }
    
    var spans = slider_ctrl.children;
    spans[1].setAttribute("class","slider-ctrl-con current");  // 两个类名
    var scrollWidth = js_slider.clientWidth; // 得到大盒子的宽度 也就是  后面动画走的距离  310
    //  刚开始，按道理   第一张图片 留下   其余的人走到 310 的位置上
   
   for(var i = 1; i<imgs.length; i++) { // 从1 开始 因为第一张不需要计算

        imgs[i].style.left =  scrollWidth + "px";  // 其他人 先右移动到 310 的位置
    }
    
    var iNow = 0;
    for(var k in spans){
    	spans[k].onclick = function() {
    		if(this.className == "slider-ctrl-next"){
    			autoPlay();
    		}else if(this.className == "slider-ctrl-prev"){
    			animate(imgs[iNow],{left:scrollWidth});
    		    iNow--;
    		    if(iNow<0){
    		    	iNow = imgs.length-1;
    		    }
    		    imgs[iNow].style.left = -scrollWidth + "px";
    		    animate(imgs[iNow],{left:0});
    		}else {
    			var that = this.innerHTML-1;  /*得到点击的索引*/
    			if(that > iNow){
    				animate(imgs[iNow],{left:-scrollWidth});
    				imgs[that].style.left = scrollWidth + "px";
    				
    			}else if(that < iNow) {
    				animate(imgs[iNow],{left:scrollWidth});
    				imgs[that].style.left = -scrollWidth + "px";
    				
    			}else {}
    			    animate(imgs[that],{left:0});
    				iNow = that;
    		}
    	}
    }
    
    var timer = null;
    timer = setInterval(autoPlay,1500);
    function autoPlay() {
    	animate(imgs[iNow],{left:-scrollWidth});
    			iNow++;
    			if(iNow > imgs.length-1){
    				iNow = 0;
    			}
    			imgs[iNow].style.left = scrollWidth + "px";
    			animate(imgs[iNow],{left:0})
    }
    
    js_slider.onmouseover = function() {
    	clearInterval(timer);
    }
    js_slider.onmouseout = function() {
    	clearInterval(timer);
    	timer = setInterval(autoPlay,1500);
    }
    
}
