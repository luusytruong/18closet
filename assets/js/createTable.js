import {
  showEditDiscountModal,
  showEditProductModal,
  showRemoveDiscountModal,
  showRemoveProductModal,
} from "./modal.js";

export const createTableUser = (values) => {
  const tableElement = document.createElement("table");
  tableElement.className = "container__table";
  const headTable = document.createElement("tr");
  headTable.className = "container__row";
  headTable.innerHTML = `
                        <th class="container__col">MKH</th>
                        <th class="container__col">HỌ VÀ TÊN</th>
                        <th class="container__col">EMAIL</th>
                        <th class="container__col">SDT</th>
                        <th class="container__col">ĐỊA CHỈ</th>
                        <th class="container__col">MẬT KHẨU</th>
                        <th class="container__col">NGÀY ĐĂNG KÝ</th>
    `;
  tableElement.appendChild(headTable);

  values.map((value) => {
    const trElement = document.createElement("tr");
    trElement.classList.add("container__row");
    trElement.innerHTML = `
                <td class="container__col">${value.id}</td>
                <td class="container__col">${value.full_name}</td>
                <td class="container__col">${value.email}</td>
                <td class="container__col">${value.phone_number}</td>
                <td class="container__col">${value.address}</td>
                <td class="container__col">${value.password}</td>
                <td class="container__col">${value.created_at}</td>
        `;
    tableElement.appendChild(trElement);
  });

  return tableElement;
};

export const createTableProducts = (values) => {
  const tableElement = document.createElement("table");
  tableElement.className = "container__table";
  const headTable = document.createElement("tr");
  headTable.className = "container__row";
  headTable.innerHTML = `
                        <th class="container__col">MSP</th>
                        <th class="container__col">TÊN SẢN PHẨM</th>
                        <th class="container__col">DANH MỤC</th>
                        <th class="container__col">GIÁ</th>
                        <th class="container__col">KHO</th>
                        <th class="container__col">MÔ TẢ</th>
                        <th class="container__col">URL</th>
                        <th class="container__col">NGÀY THÊM</th>
                        <th class="container__col"></th>
    `;
  tableElement.appendChild(headTable);
  values.map((value) => {
    const trElement = document.createElement("tr");
    trElement.classList.add("container__row");
    trElement.innerHTML = `
                <td class="container__col">${value.id}</td>
                <td class="container__col">${value.product_name}</td>
                <td class="container__col">${value.category_id}</td>
                <td class="container__col">${value.price}</td>
                <td class="container__col">${value.stock_quantity}</td>
                <td class="container__col">${value.description}</td>
                <td class="container__col">${value.image_url}</td>
                <td class="container__col">${value.added_date}</td>
                <td class="container__col">
                    <div>
                        <i class="fa-solid fa-pen-to-square"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </td>
        `;
    const editIcon = trElement.querySelector(".fa-pen-to-square");
    editIcon.addEventListener("click", () => {
      showEditProductModal(
        value.id,
        value.product_name,
        value.category_id,
        value.price,
        value.stock_quantity,
        value.description,
        value.image_url,
        value.added_date
      );
    });
    const removeIcon = trElement.querySelector(".fa-trash");
    removeIcon.addEventListener("click", () => {
      showRemoveProductModal(value.id, value.product_name);
    });
    tableElement.appendChild(trElement);
  });

  return tableElement;
};

export const createTableCategorys = (values) => {
  const tableElement = document.createElement("table");
  tableElement.className = "container__table";
  const headTable = document.createElement("tr");
  headTable.className = "container__row";
  headTable.innerHTML = `
                          <th class="container__col">MÃ DANH MỤC</th>
                          <th class="container__col">TÊN DANH MỤC</th>
                          <th class="container__col">MÔ TẢ DANH MỤC</th>
      `;
  tableElement.appendChild(headTable);

  values.map((value) => {
    const trElement = document.createElement("tr");
    trElement.classList.add("container__row");
    trElement.innerHTML = `
                  <td class="container__col">${value.id}</td>
                  <td class="container__col">${value.category_name}</td>
                  <td class="container__col">${value.description}</td>
          `;
    tableElement.appendChild(trElement);
  });

  return tableElement;
};

export const createTableOders = (values) => {
  const tableElement = document.createElement("table");
  tableElement.className = "container__table";
  const headTable = document.createElement("tr");
  headTable.className = "container__row";
  headTable.innerHTML = `
                          <th class="container__col">MÃ ĐƠN HÀN</th>
                          <th class="container__col">MÃ KH</th>
                          <th class="container__col">NGÀY ĐẶT</th>
                          <th class="container__col">GIÁ TRỊ</th>
                          <th class="container__col">ĐỊA CHỈ</th>
                          <th class="container__col">TRẠNG THÁI</th>
      `;
  tableElement.appendChild(headTable);

  values.map((value) => {
    const trElement = document.createElement("tr");
    trElement.classList.add("container__row");
    trElement.innerHTML = `
                  <td class="container__col">${value.id}</td>
                  <td class="container__col">${value.customer_id}</td>
                  <td class="container__col">${value.order_date}</td>
                  <td class="container__col">${value.total_amount}</td>
                  <td class="container__col">${value.shipping_adress}</td>
                  <td class="container__col">${value.payment_status}</td>
          `;
    tableElement.appendChild(trElement);
  });

  return tableElement;
};

export const createTableDiscount = (values) => {
  const tableElement = document.createElement("table");
  tableElement.className = "container__table";
  const headTable = document.createElement("tr");
  headTable.className = "container__row";
  headTable.innerHTML = `
                          <th class="container__col">ID</th>
                          <th class="container__col">MÃ GIẢM GIÁ</th>
                          <th class="container__col">SỐ TIỀN GIẢM</th>
      `;
  tableElement.appendChild(headTable);

  values.map((value) => {
    const trElement = document.createElement("tr");
    trElement.classList.add("container__row");
    trElement.innerHTML = `
                  <td class="container__col">${value.id}</td>
                  <td class="container__col">${value.code}</td>
                  <td class="container__col">${value.discount}</td>
                  <td class="container__col">
                      <div>
                          <i class="fa-solid fa-pen-to-square"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </td>
          `;
    const editIcon = trElement.querySelector(".fa-pen-to-square");
    editIcon.addEventListener("click", () => {
      showEditDiscountModal(value.id, value.code, value.discount);
    });
    const removeIcon = trElement.querySelector(".fa-trash");
    removeIcon.addEventListener("click", () => {
      showRemoveDiscountModal(value.id, value.code);
    });
    tableElement.appendChild(trElement);
  });

  return tableElement;
};

export const createTableArray = [
  createTableUser,
  createTableProducts,
  createTableCategorys,
  createTableOders,
  createTableDiscount,
];
