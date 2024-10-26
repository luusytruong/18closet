import { startGETFetch, routes } from "./startFetch.js";
import { createTableArray } from "./createTable.js";
import { showDiscountAddModal, showProductAddModal } from "./modal.js";
import { readDataForm, startFetch, startFetchAsync } from "./formActions.js";
import { beginToast } from "./toast.js";
import { showForm } from "./userActions.js";

const sidebars = Array.from(document.querySelectorAll(".sidebar__item"));
const tableList = Array.from(document.querySelectorAll(".table__wrapper"));
const displayTitle = document.querySelector(".display__title");
const actionElement = document.querySelector(".actions");

let indexSidebar = 1;
export let sidebarActiveNow = sidebars[indexSidebar];

indexSidebar = parseInt(localStorage.getItem("active-sidebar"));
if (!indexSidebar && indexSidebar !== 0) indexSidebar = 1;
sidebarActiveNow = sidebars[indexSidebar];
const app = document.querySelector(".app");
export const loadAdmin = () => {
  console.log(sidebarActiveNow);
  const unActiveTable = (title) => {
    sidebars.map((bar) => {
      bar.classList.remove("active");
    });
    tableList.map((table) => {
      table.classList.remove("active");
    });
    actionElement.style.display = "none";
    displayTitle.innerText = title;
  };

  sidebars.map((sidebar, index) => {
    sidebar.addEventListener("click", async () => {
      sidebarActiveNow = sidebar;
      indexSidebar = index;
      const title = sidebar.querySelector("span").innerText;
      unActiveTable(title);
      sidebar.classList.add("active");
      tableList[index].classList.add("active");
      const readRoutes = routes.filter((route) =>
        route.includes("readData.php")
      );
      const route = readRoutes[index];
      console.log("route: ", route);
      if (index === 1 || index === 4) {
        actionElement.style.display = "inline-flex";
      }

      try {
        const data = await startGETFetch("GET", route);
        console.log(data);
        const tableOld = tableList[index].querySelector("table");
        const newTable = createTableArray[index](data);

        tableOld.replaceWith(newTable);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      localStorage.setItem("active-sidebar", index);
    });
  });

  const btnAddProduct = document.querySelector(".actions__add");
  btnAddProduct.addEventListener("click", () => {
    console.log(indexSidebar);
    if (indexSidebar === 1) showProductAddModal();
    if (indexSidebar === 4) showDiscountAddModal();
  });

  //

  // Lấy nút Quay Lên Đầu
  const btnToTop = document.getElementById("btn__to__top");
  const wrapperTabless = document.querySelectorAll(".table__wrapper");

  // Hàm để kiểm tra vị trí cuộn
  const checkScrollPosition = () => {
    const wrapper = wrapperTabless[indexSidebar];
    const scrollPosition = wrapper.scrollTop; // Vị trí cuộn hiện tại
    const documentHeight = wrapper.scrollHeight; // Chiều cao của tài liệu

    // Nếu vị trí cuộn vượt quá 1/4 chiều cao tài liệu, hiển thị nút
    if (scrollPosition > documentHeight / 4) {
      btnToTop.style.display = "block"; // Hiển thị nút
    } else {
      btnToTop.style.display = "none"; // Ẩn nút
    }
  };

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    const wrapper = wrapperTabless[indexSidebar];
    wrapper.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
  };

  // Gắn sự kiện cuộn
  wrapperTabless.forEach((wrapper, index) => {
    wrapper.addEventListener("scroll", checkScrollPosition);
  });

  // Gắn sự kiện click cho nút
  btnToTop.addEventListener("click", scrollToTop);
};

async function Load() {
  const data = {
    case: "admin",
  };
  const path = "http://localhost/fashion-store/controller/checkLogin.php";
  const result = await startFetchAsync(path, data);
  console.log(result);
  if (result.status === "success") {
    beginToast(result.status, result.title, result.content);
    loadAdmin();
    app.style.display = "unset";
    sidebarActiveNow.click();
  } else {
    beginToast(result.status, result.title, result.content);
    showForm();
    return;
  }
}
window.onload = await Load();
