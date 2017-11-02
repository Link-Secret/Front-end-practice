/**
 * Created by zjl on 2017/10/31.
 */


/***
 * ========================================================================
 * Edit on 2017/10/31
 * */

/*通过id，找到对象*/
function $(id) {return document.getElementById(id);}

/*封装几个支持不同浏览器的scroll,页面向上卷动的距离*/
function scroll() {
    if(window.pageYOffset != null)  //  ie9+ 和其他浏览器
    {
        return {                     /*以json格式来存储数据*/
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode == "CSS1Compat")  // 声明的了 DTD
    // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return { //  剩下的肯定是怪异模式的
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}

/*对象出现，对象隐藏*/
function show(obj){ return obj.style.display = "block"; }
function hide(obj){ return obj.style.display = "none"; }
