//封装一个实现阶乘的方法

function jc(n) {
    if(n == 1) {
        return 1;
    }
    return n * jc(n - 1);
}
//封装一个方法，实现检测一个字符串的字节长度
//当字符位的unicode > 225,那么该字符的字节长度为2，如果 <= 255,那么该字符串长度为1
function bytextLength(str) {
    var count = str.length;    
    for(var i = 0;i < str.length;i++) {
        if(str.charCodeAt(i) > 255) {
            count ++;
        }
    }
    return count;
}
//封装一个方法，实现继承的圣杯模式
function inherit(Target,Origin) {
        function F() {};
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constuctor = Target;
        Target.prototype.uber = Origin.prototype;
}
//封装对象深拷贝的方法
// var obj = {
//     name : 'ke',
//     age : 33,
//     money : [22,333,444],
//     girl : {
//         friend : ['wenbing','fanbing','liuyan'],
//         age : 23,
//         height : 333
//     }
// }
// var obj1 = {};
function deepClone(origin,target) {
        var target = target || {},
            toStr = Object.prototype.toString,
            arrStr = '[object Array]';
     for(var prop in origin) {
        if(origin.hasOwnProperty(prop)) {
            if(origin[prop] !== null && typeof(origin[prop]) == "object") {
               if(toStr.call(origin[prop]) == arrStr) {
                console.log(prop);                   
                   target[prop] = [];
               }else {
                   target[prop] = {};
               }
               deepClone(origin[prop],target[prop]);
            }else {
               target[prop] = origin[prop];               
            }
            }
            
        }
        return target;
}
//封装判断数据类型方法
 function type(target) {
     var template = {
         "[object Array]" : "array",
         "[object Object]" : "object",
         "[object Number]" : "number - object",
         "[object Boolean]" : "boolean - object",
         "[object String]" : "string - object"
     }
     if(target === null) {
         return "null";
     }
     if(typeof(target) == "object") {
         var str = Object.prototype.toString.call(target);
         return template[str];
     }else {
         return typeof(target);
     }
 }
//数组原型上封装数组去重方法
Array.prototype.unique = function() {
    var template = {},
        arr = [],
        len = this.length;
    for(var i = 0;i < len;i++) {
        if(!template[this[i]]) {
            template[this[i]] = "abc";
            arr.push(this[i]);
        }
    }
    return arr;
}
//封装函数实现和insertBefore功能差不多的
Element.prototype.insertAfter = function(targetNode,afterNode) {
    console.log(targetNode,afterNode);
      var beforeNode = afterNode.nextElementSibling;
      if(beforeNode == null) {
          this.appendChild(targetNode);
      }else {
          this.insertBefore(targetNode,beforeNode);
      }
}
//封装浏览器滚动条滚动距离方法
function getScrollOffset() {
    if(window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    }else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,//有第一个就没有第二个，有第二个就没有第一个
            y: document.body.scrollTop + document.documentElement.scrollTop 
        }
    }
}
//获取整个网页的高度  document.documentElement.scrollHeight
//封装获取可视化窗口大小方法
function getViewPortoffset() {
    if(window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }else{
        if(document.compatMode == "backCompat") {
              return {
                  w: document.body.clientWidth,
                  h: document.body.clientHeight
              }
        }else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}
//封装兼容性方法获取实时元素样式表
   function getStyle(ele,prpo) {
       if(ele.currentStyle) {
           return ele.currentStyle[prpo];
       }else {
           return window.getComputedStyle(ele,null)[prpo]
       }
   }
//封装兼容性事件绑定方法
  function addEvent(ele,type,handle) {
       if(ele.addeventListener) {
           ele.addeventListener(type,handle,false)
       }else if(ele.attachEvent) {
           ele.attachEvent('on' + type,function() {
               handle.call(ele);
           })
       }else {
           ele['on' + type] = handle;
       }
  }

//封装兼容性阻止事件冒泡方法
function stopBubble(event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        }else {
            event.cancleBubble = true;
        }
}
//封装兼容性取消默认事件方法
function cancelHandler(event) {
    if(event.preventDefault) {
        event.preventDefault();
    }else {
        event.returnValue = false;
    }
}
//原型上改写getElementByClassName方法
Document.prototype.getByClassName = function(className) {
       var allTagDom = document.getElementsByTagName("*");
       var arrDom = Array.prototype.slice.call(allTagDom);
       var resArr = [];
       function delClassName(className) {
            var reg = /\s+/g;
            var lastName = className.replace(reg," ").trim();
            var arrName = lastName.split(' '); 
            return arrName;
       }
       arrDom.forEach(function(ele,ind) {
           var outEle = ele;
            var name = ele.className;
            var resName = delClassName(name);
            resName.forEach(function(ele,ind) {
                if(ele == className) {
                    resArr.push(outEle);
                }
            })
       })
       return resArr;
}
 console.log(document.getByClassName('hello'));
 //封装兼容性ajax方法
 function ajaxFunc(method,url,data,callback,flag) {
        var xrh = null;
        if(window.XMLHttpRequest) {
            xrh = new XMLHttpRequest();
        }else {
            xrh = new ActiveXObject('Microsofe.XMLHttp');
        }
        method = method.toUpperCase();
        if(method == 'GET') {
            xrh.open(method,url + '?' + data,flag);
            xrh.send();
        }else if(method == 'POST') {
            xrh.open(method,url,flag);
            xrh.setRequestHeader('Content-type','application/x-www-form-urlencoded')
            xrh.send(data);
        }
        xrh.onreadystatechange = function() {
            if(xrh.readyState == 4) {
                if(xrh.status == 200) {
                        callback(xrh.responseText)
                }
            }
        }
 }
 //封装管理cookie方法
 var manageCookie = {
     setCookie: function(name,val,time) {
           document.cookie = name + '=' + val  + ';max-age=' + time;
           return this;
     },
     removeCookie: function(name) {
           return this.setCookie(name,'','-1')
     },
     getCookie: function(name) {
          var cookieArr = document.cookie;
          console.log(cookieArr);
     }

 }
 manageCookie.setCookie('nvshen','wenbing',2000)
             .setCookie('laop','hepeiyu','3000')
             .getCookie('laop')