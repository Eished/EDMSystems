/*
文件包含打印系统中所有函数

【自动读取日期函数】
【打印函数】
【预览写入网页函数】
【自动补全函数】
【数字金额大写转换(可以处理整数,小数,负数)】

作者Eished QQ：
*/

// 数据仅供测试使用
var data = [{
    label: "棉棒",
    category: "配件",
    unit: "个/包",
    price: "10",
    acreage: ""
  },
  {
    label: "墨垫",
    category: "配件",
    unit: "个/包",
    price: "10",
    acreage: ""
  },
  {
    label: "光栅",
    category: "配件",
    unit: "个/包",
    price: "10",
    acreage: ""
  },
  {
    label: "0.82无底纸光膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "164"
  },
  {
    label: "0.82无底纸哑膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "164"
  },
  {
    label: "0.914无底纸光膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "182.8"
  },
  {
    label: "0.914无底纸哑膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "182.8"
  },
  {
    label: "1.07无底纸光膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "214"
  },
  {
    label: "1.07无底纸哑膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "214"
  },
  {
    label: "1.27无底纸光膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "254"
  },
  {
    label: "1.27无底纸哑膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "254"
  },
  {
    label: "1.37无底纸光膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "274"
  },
  {
    label: "1.37无底纸哑膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "274"
  },
  {
    label: "1.52无底纸光膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "304"
  },
  {
    label: "1.52无底纸哑膜",
    category: "无底纸膜",
    unit: "卷",
    price: "1",
    acreage: "304"
  },
  {
    label: "户外墨水",
    category: "墨水",
    unit: "瓶",
    price: "100",
    acreage: ""
  },
  {
    label: "户内墨水",
    category: "墨水",
    unit: "瓶",
    price: "50",
    acreage: ""
  },
  {
    label: "UV墨水硬墨",
    category: "墨水",
    unit: "瓶",
    price: "500",
    acreage: ""
  },
  {
    label: "UV墨水软墨",
    category: "墨水",
    unit: "瓶",
    price: "500",
    acreage: ""
  },
  {
    label: "清洗液",
    category: "墨水",
    unit: "瓶",
    price: "100",
    acreage: ""
  },
  {
    label: "UV清洗液",
    category: "墨水",
    unit: "瓶",
    price: "100",
    acreage: ""
  },
];




//规格自动补全函数
$(function () {
  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function () {
      this._super();
      this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
    },
    _renderMenu: function (ul, items) {
      var that = this,
        currentCategory = "";
      $.each(items, function (index, item) {
        var li;
        if (item.category != currentCategory) {
          ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
          currentCategory = item.category;
        }
        li = that._renderItemData(ul, item);
        if (item.category) {
          li.attr("aria-label", item.category + " : " + item.label);
        }
      });
    }
  });

  $(".label > input").catcomplete({
    delay: 0,
    source: data
  });
});


//数字金额大写转换(可以处理整数,小数,负数)
var digitUppercase = function (n) {
  var fraction = ['角', '分'];
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(shiftRight(n, 1 + i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(shiftLeft(n, 1));
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
};
// 向右移位 解决精度问题
function shiftRight(number, digit) {
  digit = parseInt(digit, 10);
  var value = number.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + digit) : digit))
}
// 向左移位
function shiftLeft(number, digit) {
  digit = parseInt(digit, 10);
  var value = number.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - digit) : -digit))
}



//自动读取日期函数
Date.prototype.format = function (format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
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
$(".Date").text(new Date().format("yyyy年MM月dd日 hh:mm"))



//隐藏小时和分钟
var i = 0;

function hideTime() {
  if (i === 0) {
    $(".Date").text(new Date().format("yyyy年MM月dd日"));
    $("#hideTime").text("显示时间");
    i++;
  } else {
    $(".Date").text(new Date().format("yyyy年MM月dd日 hh:mm"));
    $("#hideTime").text("隐藏时间");
    i--;
  }
}


//打印函数
function doPrint() {
  //调用计算总金额函数
  calc();
  //调用预览函数，写入需要打印的内容
  view();

  //打印代码 注意要加上html里<!--startprint-->和<!--endprint--> 的这两个标记
  bdhtml = window.document.body.innerHTML;
  sprnstr = "<!--startprint-->";
  eprnstr = "<!--endprint-->";
  prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
  prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
  window.document.body.innerHTML = prnhtml;
  window.print();
  self.location = document.referrer;
}



//使用回车键读取数据库数据
document.onkeydown = function (event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode == 13) {
    // $("save_btn").click();
    //使用回车键读取数据库数据
    auto();
    calc();
  }
};

//预览+写入网页函数
var view = View.onclick = function () {
  //调用计算总金额函数
  calc();
  //拷贝对象到下一个表格
  $v = 0;
  $(".ReUser")[$v + 1].innerText = $(".ReUser > input")[$v].value;
  $(".tel")[$v + 1].innerText = $(".tel > input")[$v].value;
  $(".add")[$v + 1].innerText = $(".add > input")[$v].value;

  //遍历8行表格内容
  var $len = $("td > input").length / 6;
  for (; $v < parseInt($len); $v++) {
    $(".label")[$v + 8].innerText = $(".label > input")[$v].value;
    $(".unit")[$v + 8].innerText = $(".unit > input")[$v].value;
    $(".quantity")[$v + 8].innerText = $(".quantity > input")[$v].value;
    $(".price")[$v + 8].innerText = $(".price > input")[$v].value;
    $(".money")[$v + 8].innerText = $(".money > input")[$v].value;
    //判断备注是否为数字，是则用calc中的值，不是则用当前输入覆盖
    if (IsNum($(".remark > input")[$v].value)) {

    } else {
      $(".remark")[$v + 8].innerText = $(".remark > input")[$v].value;
    }
  }
  //显示隐藏内容
  $("#d2").css("display", "block");
}

//判断是否为数字
function IsNum(s) {
  if (s != null && s != "") {
    return !isNaN(s);
  }
  return false;
}

//自动填入对应规格所对应的数据库值
Auto.onclick = function () {
  auto();
}
var auto = function () {
  //引入对象集合
  var inputs = document.getElementsByTagName('input');
  //for循环读取input值，累加；
  var len1 = inputs.length; //9行每行循环一次
  var i1 = 3; //跳过前3格
  for (; i1 < len1; i1++) {
    var input = inputs[i1];
    var b = input.value;
    //遍历数组 如果数据匹配则一次输入数据值
    var len2 = data.length;
    var i2 = 0;
    // console.log(len2);
    for (; i2 < len2; i2++) {
      var c = data[i2].label;
      if (b == c) {
        i1++;
        // console.log(i1+"单位");
        inputs[i1].value = data[i2].unit;
        i1++;
        // console.log(i1+"数量");
        var quantity = inputs[i1].value;
        i1++;
        // console.log(i1+"单价");
        inputs[i1].value = data[i2].price;
        var price = inputs[i1].value;
        i1++;
        // console.log(i1+"金额");
        var money = 0;
        i1++;
        // console.log(i1+"平方");
        inputs[i1].value = data[i2].acreage;
        var acreage = inputs[i1].value;
        //判断备注是否是数字
        if (IsNum(acreage)) {
          money = Number(quantity) * Number(price) * Number(acreage);
          i1--;
          inputs[i1].value = Number(money.toFixed(f));
          i1++;
        } else {
          money = Number(quantity) * Number(price);
          i1--;
          inputs[i1].value = Number(money.toFixed(f));
          i1++;
        }
        break;
      }
    }
  }
}


//计算总金额
var f = 1; //统一保留小数位数
var f_money = 0; //总金额保留小数位数
//无底膜金额计算函数 宽度*长度*单价*数量 
//墨水金额计算函数 数量*单价
var calc = function () {
  var $len = $("input").length;
  var $i = 5;
  var all_money = 0;
  for (; $i < $len; $i = $i + 3) {
    var $quantity = $("input")[$i].value; //数量quantity
    $i++;
    var $price = $("input")[$i].value; //单价price
    $i++
    var $money = $("input")[$i].value; //金额money
    $i++
    var $acreage = $("input")[$i].value; //平方acreage
    //计算数量*单价*平方
    //判断备注是否是数字
    if (IsNum($acreage)) {
      $money = Number($quantity) * Number($price) * Number($acreage);
      // console.log($money);
      $i--;
      $("input")[$i].value = Number($money.toFixed(f));
      $i++;
      //把remark栏填充单位
      $r = ($i - 2) / 6 - 1;
      $(".remark")[$r + 8].innerText = $("input")[$i].value + "㎡ 200米";
    } else {
      $money = Number($quantity) * Number($price);
      if ($money > 0) {
        $i--;
        $("input")[$i].value = Number($money.toFixed(f));
        $i++;
      }
    }
    all_money = all_money + $money;
  }
  var $m = 0;
  for (; $m < 2; $m++) {
    $(".all_money")[$m].innerText = all_money.toFixed(f_money);
    //调用数字金额大写转换填入指定单元格
    $(".capitals")[$m].innerText = digitUppercase(all_money.toFixed(f_money));
  }

}