const PRICES = [0, 130];
const allElements = document.querySelectorAll("*");
window.console.log("Num of Element: " + allElements.length);
var doneClick = true;
document.addEventListener("click", clickFn);
// document.addEventListener("keydown", keyFn);

function clickFn() {
  // window.console.log("Mouse Clicked.......................................");
  lineSum();
  lastSum();
}
function keyFn() {
  // window.console.log("Key Pressed.......................................");
  lineSum();
  lastSum();
}

allElements.forEach((item) => {
  item.onclick = () => {
    // window.console.log("Item Onclick: "+item);
    if (item.id == "reset-all") {
      resetAll();
      return;
    }
    if (item.id == "sum") {
      // window.console.log("Summmmmmmmmmmm");
      clickFn();
      return;
    }
    if (item.id.startsWith("input")) {
      item.select();
    }
  };
});

function resetAll() {
  // window.console.log("Resetting all-----------------------------");
  let index = 0;
  let elmTotal = document.getElementById("td-total-" + index);
  while (elmTotal != null && elmTotal != undefined) {
    elmTotal.innerText = "0k";
    index++;
    elmTotal = document.getElementById("td-total-" + index);
  }
  index = 0;
  let elmAmount = document.getElementById("input-amount-" + index);
  while (elmAmount != null && elmAmount != undefined) {
    elmAmount.value = "0";
    setColorByAmount(index, 0);
    index++;
    elmAmount = document.getElementById("input-amount-" + index);
  }
  document.getElementById("last-sum").innerText = "0 đ";
}

function lineSum() {
  // window.console.log("Line Sum.......................................");
  let index = 0;
  let elm = document.getElementById("input-amount-" + index);
  while (elm != null && elm != undefined) {
    // window.console.log("elm id: " + elm.id);
    // window.console.log("elm value: " + elm.value);
    let numAmount = parseInt(elm.value);
    setColorByAmount(index, numAmount);
    let price = document.getElementById("td-price-" + index);
    // window.console.log("price:" + parseCurrencies(price.innerText)+" - numAmount:" + numAmount);
    total = document.getElementById("td-total-" + index);
    total.innerText =
      splitCurrenciesByDot(
        (parseInt(parseCurrencies(price.innerText)) * numAmount) / 1000
      ) + "k";
    index++;
    elm = document.getElementById("input-amount-" + index);
  }
}

function lastSum() {
  // window.console.log("Last Sum.......................................");
  let index = 0;
  let elm = document.getElementById("td-total-" + index);
  let sum = 0;
  while (elm != null && elm != undefined) {
    let str = parseCurrencies(elm.innerText);
    sum += parseInt(str);
    index++;
    elm = document.getElementById("td-total-" + index);
  }
  let strSum = "" + splitCurrenciesByDot(sum) + " đ  ";
  document.getElementById("last-sum").innerText = strSum;
}

function setColorByAmount(row, amount) {
  row_id = "td-row-" + row;
  const elms = document.getElementsByClassName(row_id);
  if (elms == null || elms.length == 0) return;
  let str = "";
  for (let i = 0; i < elms.length; i++) {
    if (amount == 0) elms[i].setAttribute("style", "color:black;");
    else elms[i].setAttribute("style", "color:blue;");
  }
}

function splitCurrenciesByDot(num) {
  try {
    str = num + "";
    let count = 0;
    let result = "";
    for (var i = str.length - 1; i >= 0; i--) {
      count++;
      result = str.charAt(i) + result;
      if (count == 3 && i > 0) {
        result = "." + result;
        count = 0;
      }
    }
    return result;
  } catch (error) {
    return str;
  }
}

function parseCurrencies(str) {
  str = str.replace("k", "000");
  str = str.replace("K", "000");
  str = str.replace(".", "");
  return str;
}

function getLastString(id) {
  try {
    if (id != null && id != "" && id.length > 0) {
      for (var i = id.length - 1; i >= 0; i--) {
        if (id.charAt(i) == "-") {
          return id.slice(i + 1, id.length);
        }
      }
    }
    return id;
  } catch (error) {
    window.alert(error);
    return id;
  }
}

function getFirstString(id) {
  try {
    if (id != null && id != "" && id.length > 0) {
      for (var i = 0; i < id.length; i++) {
        if (id.charAt(i) == "-") {
          return id.slice(0, i);
        }
      }
    }
    return id;
  } catch (error) {
    window.alert(error);
    return id;
  }
}

function autoFillBGColor() {}
