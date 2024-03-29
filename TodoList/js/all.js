let all_item = [];
let checked_item = [];
let unchecked_item = [];
const item_list = document.getElementById("item-list");

// 檢查列表狀態
const item_region = document.querySelector(".item-region");

function hideList() {
  if (all_item.length > 0) {
    item_region.setAttribute("class", "item-region item-region-working");
  } else {
    item_region.setAttribute("class", "item-region");
  }
}

// 切換分類
const item_category = document.getElementById("item-category");

item_category.addEventListener("click", (e) => {
  if (e.target.nodeName != "A") return;
  const all_category = document.querySelectorAll(".category-option");
  all_category.forEach((ele) => {
    ele.setAttribute("class", "category-option");
  });
  e.target.parentNode.setAttribute("class", "category-option active");
  renderDataByCategory();
});

function renderUncheckedData() {
  renderData();
  const items = document.querySelectorAll(".item-list li");
  items.forEach((ele) => {
    if (ele.getAttribute("data-state") == "checked"){
      ele.style.display = "none";
    } else {
      ele.style.display = "flex";
    }
  })
}

function renderCheckedData() {
  renderData();
  const items = document.querySelectorAll(".item-list li");
  items.forEach((ele) => {
    if (ele.getAttribute("data-state") == "unchecked"){
      ele.style.display = "none";
    } else {
      ele.style.display = "flex";
    }
  })
}

// 更動事項數目
const item_num = document.querySelector("#num-info em");

function setNumberOfItem() {
  let count = 0;
  all_item.forEach((ele) => {
    if (ele.state == "unchecked") count++;
  });
  item_num.textContent = count;
}

// 初始化
function renderData() {
  let str = "";
  all_item.forEach((ele, idx) => {
    str += `<li style="display: flex" data-state="${ele.state}">
      <label>
      <input type="checkbox" data-numId="${idx}" ${ele.state}/>
      <span>${ele.content}</span>
      </label>
      <input type="button" class="delete-item" id="delete-item" data-numId="${idx}" value="">
    </li>`;
  });
  item_list.innerHTML = str;
  setNumberOfItem();
  hideList();
}
renderData(all_item);

function renderDataByCategory() {
  const active_category = document.querySelector(".active");
  if (active_category.textContent == "全部") {
    renderData();
  } else if (active_category.textContent == "待完成") {
    renderUncheckedData();
  } else {
    renderCheckedData();
  }
}

// 添加事項
const new_item = document.getElementById("new-item");
const add_button = document.getElementById("add-button");

add_button.addEventListener("click", (e) => {
  const new_item_value = new_item.value;
  if (new_item_value == "") {
    alert("請輸入待辦事項內容！");
    return;
  }
  obj = {
    content: new_item_value,
    state: "unchecked",
  };
  all_item.push(obj);
  renderDataByCategory();
  new_item.value = "";
});

// 刪除事項
item_list.addEventListener("click", (e) => {
  if (e.target.type !== "button") return;
  let item_numId = e.target.getAttribute("data-numId");
  all_item.splice(item_numId, 1);
  renderDataByCategory();
});

// 點擊事項後整理版面
item_list.addEventListener("click", (e) => {
  if (e.target.type != "checkbox") return;
  let item_numId = e.target.getAttribute("data-numId");
  if (all_item[item_numId].state == "unchecked") {
    all_item[item_numId].state = "checked";
  } else {
    all_item[item_numId].state = "unchecked";
  }
  setTimeout(renderDataByCategory, 300);
});

// 清除所有已完成項目
const clear_all_button = document.getElementById("clear-all-finished");

clear_all_button.addEventListener("click", (e) => {
  all_item = all_item.filter((ele) => ele.state == "unchecked");
  renderDataByCategory();
});
