/*
文件包含打印系统中所有函数

【自动读取日期函数】
【打印函数】
【预览写入网页函数】
【自动补全函数】

作者Eished QQ：212179840
更新日期：2018年12月30日
*/


//自动读取日期函数
Date.prototype.format = function (format) {
           var args = {
               "M+": this.getMonth() + 1,
               "d+": this.getDate(),
               "h+": this.getHours(),
               "m+": this.getMinutes(),
               "s+": this.getSeconds(),
               "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
               "S": this.getMilliseconds()
           };

           if (/(y+)/.test(format))
               format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
           for (var i in args) {
               var n = args[i];
               if (new RegExp("(" + i + ")").test(format))
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
           }
           return format;
       };
//alert(new Date().format("yyyy-MM-dd hh:mm:ss:S"));
//alert(new Date().format("yyyy-MM-dd"));
document.getElementById("Date").innerHTML = new Date().format("yyyy 年 MM 月 dd 日 hh:mm");
document.getElementById("Date2").innerHTML = new Date().format("yyyy 年 MM 月 dd 日 hh:mm");


//打印函数
function doPrint() { 
  //调用预览函数，写入需要打印的内容
  view();
  //打印代码 注意要加上html里<!--startprint-->和<!--endprint--> 的这两个标记
  bdhtml=window.document.body.innerHTML;      
  sprnstr="<!--startprint-->";      
  eprnstr="<!--endprint-->";      
  prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);      
  prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));      
  window.document.body.innerHTML=prnhtml;   
  window.print();      
}      

//预览写入网页函数
var View = document.getElementById('View');
var view = View.onclick = function(){

  //引入对象集合
  var inputs = document.getElementsByTagName('input');
  //for循环读取input值，累加；
  var ilen = inputs.length;
  var i = 0;
  var a = 0;
  console.log(ilen);
    for (; i < ilen; i++) {
      var input = inputs[i];
      var b = input.value;
      console.log(b);
      //依次复制输入的内容去下表
      document.getElementsByTagName('span')[i].innerText = b;
    }
}


var Calc = document.getElementById('Calc');
Calc.onclick = function calc(){
  //调用预览函数，写入需要打印的内容
  view();
  //引入对象集合
  var inputs = document.getElementsByTagName('input');
  //for循环读取input值，累加；
  var len = inputs.length;
  var i = 7;
  var a = 0;
  console.log(len);
    for (; i < len; i = i + 6) {
      var input = inputs[i];
      var b = input.value;
      a = Number(a) + Number(b);
      // console.log(b);
      // console.log(new Number(a));

      document.getElementById("money").innerText = a.toFixed(0);
    }

}

 /*
<!--<input type="text" size="20" onkeyup="shu(this.value);"/>
<span id="txt">这里显示文本框的内容</span>-->
<!--<div id="demo"></div>
  <script>
  //第一种
      document.write("<p>你在干嘛！</p>");
  //第二种
   document.getElementById("Date").innerHTML = new Date().format("yyyy 年 MM 月 dd 日");
  //第三种，提示框
  alert("谁叫我吃饭啊！");
  </script>-->*/

//规格自动补全函数
$( function() {
    $.widget( "custom.catcomplete", $.ui.autocomplete, {
      _create: function() {
        this._super();
        this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
      },
      _renderMenu: function( ul, items ) {
        var that = this,
          currentCategory = "";
        $.each( items, function( index, item ) {
          var li;
          if ( item.category != currentCategory ) {
            ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
            currentCategory = item.category;
          }
          li = that._renderItemData( ul, item );
          if ( item.category ) {
            li.attr( "aria-label", item.category + " : " + item.label );
          }
        });
      }
    });

    // 数据仅供测试使用
    var data = [
      { label: "棉棒", category: "配件" },
      { label: "墨垫", category: "配件" },
      { label: "光栅", category: "配件" },
      { label: "0.914无底纸光膜", category: "无底纸膜" },
      { label: "0.914无底纸哑膜", category: "无底纸膜" },
      { label: "1.07无底纸光膜", category: "无底纸膜" },
      { label: "户外墨水", category: "墨水" },
      { label: "户内墨水", category: "墨水" },
      { label: "UV墨水", category: "墨水" }
    ];
 
    $( ".search" ).catcomplete({
      delay: 0,
      source: data
    });
  } );

