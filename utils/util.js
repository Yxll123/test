/*
***微信商城开发，
***微信号：k1009756987
***博客：htmlk.cn
***QQ群：654226989
*/
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 判断是不是全选了,list不为空
function validateIsAllSelected(list) {
  for (var i = 0; i < list.length; i++) {
    if (!list[i].selected) {
      return false;
    }
  }
  return true
}

// arg1 * arg2
function accMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

function accAdd(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return ((arg1 * m + arg2 * m) / m).toFixed(2);
}

function accSubtract(arg1, arg2) {
  // return parseFloat((arg1-arg2).toFixed(2));
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return ((arg1 * m - arg2 * m) / m).toFixed(2);
}

function utf16toEntities(str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则  
  // str = str.replace(patt, function (char) {
  //   var H, L, code;
  //   if (char.length === 2) {
  //     H = char.charCodeAt(0); // 取出高位  
  //     L = char.charCodeAt(1); // 取出低位  
  //     code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法  
  //     return "&#" + code + ";";
  //   } else {
  //     return char;
  //   }
  // });
  // return str;
  if (patt.test(str)) {
    wx.showToast({
      title: '不支持输入表情符号',
      icon: 'none',
      duration: 2000,
      mask: true,
    })
    return true
  }
  return false
} 

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  validateIsAllSelected: validateIsAllSelected,
  accMul: accMul,
  accAdd: accAdd,
  accSubtract: accSubtract,
  utf16toEntities: utf16toEntities
}
