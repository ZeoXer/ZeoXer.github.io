const search_mode = {
  byName: 1,
  byCategory: 2,
};

const sort_mode = {
  descend: 1,
  ascend: 2,
};

let search_result = [];

function renderData() {
  if (search_result.length == 0) {
    result_tbody.innerHTML = `<td colspan="7" class="default-text">查詢不到當日的交易資訊QQ</td>`;
    return;
  }
  let str = "";
  search_result.forEach((ele) => {
    str += `<tr class="result-row">
    <td>${ele["作物名稱"]}</td>
    <td>${ele["市場名稱"]}</td>
    <td>${ele["上價"]}</td>
    <td>${ele["中價"]}</td>
    <td>${ele["下價"]}</td>
    <td>${ele["平均價"]}</td>
    <td>${ele["交易量"]}</td>`;
  });
  result_tbody.innerHTML = str;
}

function getData(name, mode) {
  axios
    .get("https://hexschool.github.io/js-filter-data/data.json")
    .then((response) => {
      result = response.data;
      if (mode === search_mode.byName) {
        search_result = result.filter(
          (ele) => ele["作物名稱"] && ele["作物名稱"].match(name)
        );
      } else if (mode === search_mode.byCategory) {
        search_result = result.filter((ele) => ele["種類代碼"] === name);
      } else {
        console.log("Error!");
      }
      renderData(search_result);
    });
}

function sortByCategory(category, mode) {
  switch (mode) {
    case sort_mode.descend:
      search_result.sort((a, b) => b[`${category}`] - a[`${category}`]);
      break;
    case sort_mode.ascend:
      search_result.sort((a, b) => a[`${category}`] - b[`${category}`]);
      break;
  }
  renderData();
}

// 通用 DOM
const search_btn = document.getElementById("search-btn");
const result_tbody = document.getElementById("result-tbody");
const search_name = document.getElementById("search-name");
const show_search_name = document.getElementById("show-search-name");
const switch_category = document.getElementById("switch-category");
const render_select = document.querySelectorAll(".render-data");
const switch_order = document.querySelectorAll(".switch-order");

// 搜尋按鈕
search_btn.addEventListener("click", function (e) {
  e.preventDefault();
  const search_name_value = search_name.value;
  show_search_name.textContent = `查詢「${search_name_value}」的比價結果`;
  result_tbody.innerHTML = `<td colspan="7" class="default-text">資料載入中...</td>`;
  const present_active = document.querySelector(".active");
  if (present_active) present_active.setAttribute("class", "");
  render_select.forEach((ele) => {
    ele.value = "";
  });
  getData(search_name_value, 1);
});

// 切換大分類
switch_category.addEventListener("click", (e) => {
  show_search_name.textContent = `查詢「${e.target.textContent}」的比價結果`;
  result_tbody.innerHTML = `<td colspan="7" class="default-text">資料載入中...</td>`;
  const present_active = document.querySelector(".active");
  if (present_active) present_active.setAttribute("class", "");
  e.target.setAttribute("class", "active");
  search_name.value = "";
  render_select.forEach((ele) => {
    ele.value = "";
  });
  if (e.target.textContent === "蔬菜") {
    getData("N04", 2);
  } else if (e.target.textContent === "水果") {
    getData("N05", 2);
  } else {
    getData("N06", 2);
  }
});

// 排序選項
let previous_select = "";
render_select.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let present_select = e.target.value;
    if (present_select === previous_select) return;
    previous_select = present_select;
    if (present_select === "up") {
      sortByCategory("上價", sort_mode.descend);
    } else if (present_select === "mid") {
      sortByCategory("中價", sort_mode.descend);
    } else if (present_select === "down") {
      sortByCategory("下價", sort_mode.descend);
    } else if (present_select === "avg") {
      sortByCategory("平均價", sort_mode.descend);
    } else if (present_select === "amount") {
      sortByCategory("交易量", sort_mode.descend);
    }
  });
});

// 排序箭頭
switch_order.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.preventDefault();
    sortByCategory(
      e.target.getAttribute("data-class"),
      sort_mode[`${e.target.getAttribute("data-mode")}`]
    );
  });
});
