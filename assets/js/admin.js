import { startGETFetch, routes } from "./startFetch.js";
import { createTableArray } from "./createTable.js";
import { showAddModal } from "./modal.js";

const sidebars = Array.from(document.querySelectorAll(".sidebar__item"));
const tableList = Array.from(document.querySelectorAll(".table__wrapper"));
const displayTitle = document.querySelector(".display__title");
const actionElement = document.querySelector(".actions");

export let sidebarActiveNow = sidebars[1];

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
    const title = sidebar.querySelector("span").innerText;
    unActiveTable(title);
    sidebar.classList.add("active");
    tableList[index].classList.add("active");
    const route = routes[index];
    if (index === 1) {
      actionElement.style.display = "inline-flex";
    }

    try {
      const data = await startGETFetch("GET", route); // Wait for the data
      console.log(data)
      const tableOld = tableList[index].querySelector("table");
      const newTable = createTableArray[index](data)

      tableOld.replaceWith(newTable);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
});

const btnAddProduct = document.querySelector(".actions__add");
btnAddProduct.addEventListener("click", () => {
  showAddModal()
});

//
sidebarActiveNow.click();
