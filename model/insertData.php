<?php
include __DIR__ . '/db.php';

$dress = [
    [
        "product_name" => "Váy Chữ A Tay Dài Phối Nơ Thun Giấy DCATCU7",
        "category_id" => 1,
        "price" => 1500000,
        "stock_quantity" => 5,
        "description" => "Váy nữ dạ hội thiết kế sang trọng với chất liệu cao cấp, phù hợp cho các buổi tiệc tối hoặc sự kiện đặc biệt.",
        "image_url" => "dress1.png",
    ],
    [
        "product_name" => "Đầm Chữ A Phối Khoác Đính Nút Dáng Ngắn DCATCU6",
        "category_id" => 1,
        "price" => 1200000,
        "stock_quantity" => 8,
        "description" => "Váy maxi hoa nhí nhẹ nhàng, thoáng mát, thích hợp cho những ngày dạo phố hay du lịch biển.",
        "image_url" => "dress2.png",
    ],
    [
        "product_name" => "Đầm Chữ A Cổ Sơ Mi Đính Nút Dáng Ngắn DCATCU5",
        "category_id" => 1,
        "price" => 1300000,
        "stock_quantity" => 10,
        "description" => "Váy công sở xếp ly với thiết kế thanh lịch, phù hợp cho môi trường văn phòng, chất liệu thoáng mát dễ chịu.",
        "image_url" => "dress3.png",
    ],
    [
        "product_name" => "Đầm Chữ A Cúp Ngực Đính Nơ Dáng Ngắn DCATCU4",
        "category_id" => 1,
        "price" => 1400000,
        "stock_quantity" => 7,
        "description" => "Váy chữ A cài nút, kiểu dáng thời thượng với phần eo nhấn nhẹ, phù hợp cho nhiều dáng người.",
        "image_url" => "dress4.png",
    ],
    [
        "product_name" => "Váy Chữ A Cổ Sơ Mi Thắt Nơ Hai Nắp Túi DCATCU3",
        "category_id" => 1,
        "price" => 1100000,
        "stock_quantity" => 9,
        "description" => "Váy suông trơn đơn giản nhưng tinh tế, dễ phối đồ cho những ngày đi làm hay dạo phố.",
        "image_url" => "dress5.png",
    ],
    [
        "product_name" => "Váy Chữ A Cổ V Đính Nơ Tay Bồng DCATCU2",
        "category_id" => 1,
        "price" => 1500000,
        "stock_quantity" => 5,
        "description" => "Váy nữ dạ hội thiết kế sang trọng với chất liệu cao cấp, phù hợp cho các buổi tiệc tối hoặc sự kiện đặc biệt.",
        "image_url" => "dress6.png",
    ],
    [
        "product_name" => "Đầm Chữ A Cổ Thắt Nơ Phối Viền Trắng DCATCU1",
        "category_id" => 1,
        "price" => 1200000,
        "stock_quantity" => 8,
        "description" => "Váy maxi hoa nhí nhẹ nhàng, thoáng mát, thích hợp cho những ngày dạo phố hay du lịch biển.",
        "image_url" => "dress7.png",
    ],
    [
        "product_name" => "Váy 2 Dây Dáng Ngắn Cổ Thắt Nơ DHDTCU11",
        "category_id" => 1,
        "price" => 1300000,
        "stock_quantity" => 10,
        "description" => "Váy công sở xếp ly với thiết kế thanh lịch, phù hợp cho môi trường văn phòng, chất liệu thoáng mát dễ chịu.",
        "image_url" => "dress8.png",
    ],
    [
        "product_name" => "Đầm 2 Dây Ngực Thắt Nơ Nhún Hông DHDTCU2",
        "category_id" => 1,
        "price" => 1400000,
        "stock_quantity" => 7,
        "description" => "Váy chữ A cài nút, kiểu dáng thời thượng với phần eo nhấn nhẹ, phù hợp cho nhiều dáng người.",
        "image_url" => "dress9.png",
    ],
    [
        "product_name" => "Váy Chữ A Hoạ Tiết Hoa Hồng Dáng Xòe Tay Bồng VCAFM43",
        "category_id" => 1,
        "price" => 1100000,
        "stock_quantity" => 9,
        "description" => "Váy suông trơn đơn giản nhưng tinh tế, dễ phối đồ cho những ngày đi làm hay dạo phố.",
        "image_url" => "dress10.png",
    ]
];

$shirt = [
    [
        "product_name" => "Áo Thun Nữ Croptop Cổ Tròn In Chữ GOTUE ATFM14",
        "category_id" => 2,
        "price" => 350000,
        "stock_quantity" => 15,
        "description" => "Áo Thun Nữ Croptop Cổ Tròn In Chữ GOTUE ATFM14 thiết kế cổ điển, phù hợp cho môi trường công sở, chất liệu mềm mại, dễ chịu khi mặc cả ngày dài.",
        "image_url" => "shirt1.png",
    ],
    [
        "product_name" => "Áo Dài Cách Tân Nữ Cổ Yếm Thều Hoa ADTC5",
        "category_id" => 2,
        "price" => 980000,
        "stock_quantity" => 7,
        "description" => "Áo Dài Cách Tân Nữ Cổ Yếm Thều Hoa ADTC5 với thiết kế quyến rũ, giúp tôn dáng và mang lại vẻ đẹp sang trọng cho người mặc.",
        "image_url" => "shirt2.png",
    ],
    [
        "product_name" => "Áo Dài Cách Tân Nữ Tay Phồng Cổ Tròn Đính Nơ ADTC4",
        "category_id" => 2,
        "price" => 250000,
        "stock_quantity" => 25,
        "description" => "Áo Dài Cách Tân Nữ Tay Phồng Cổ Tròn Đính Nơ ADTC4 đơn giản, chất liệu cotton mềm mịn, thoáng mát, phù hợp để mặc hằng ngày hoặc khi tập thể thao.",
        "image_url" => "shirt3.png",
    ],
    [
        "product_name" => "Áo Dài Cách Tân Nữ Tay Lỡ Voan Tơ Thều Hoa Nhí ADTC3",
        "category_id" => 2,
        "price" => 1200000,
        "stock_quantity" => 10,
        "description" => "Áo Dài Cách Tân Nữ Tay Lỡ Voan Tơ Thều Hoa Nhí ADTC3 với thiết kế thướt tha, nhẹ nhàng, lý tưởng cho những buổi dạo phố hoặc đi biển.",
        "image_url" => "shirt4.png",
    ],
    [
        "product_name" => "Áo Dài Hiện Đại Nữ Trễ Vai Phối Nơ ADTC2",
        "category_id" => 2,
        "price" => 750000,
        "stock_quantity" => 5,
        "description" => "Áo Dài Hiện Đại Nữ Trễ Vai Phối Nơ ADTC2 phong cách trẻ trung, năng động, phù hợp cho những ngày trời se lạnh hoặc làm điểm nhấn thời trang.",
        "image_url" => "shirt5.png",
    ],
    [
        "product_name" => "Áo Dài Cách Tân Nữ Cổ Yếm Sát Nách ADTC1",
        "category_id" => 2,
        "price" => 1450000,
        "stock_quantity" => 8,
        "description" => "Áo Dài Cách Tân Nữ Cổ Yếm Sát Nách ADTC1 với thiết kế tinh tế, họa tiết ren sang trọng, phù hợp cho các buổi tiệc cưới hay sự kiện trang trọng.",
        "image_url" => "shirt6.png",
    ],
    [
        "product_name" => "Áo Dài Hiện Đại Nữ Cổ Tàu Tay Lỡ Đính Nút Ngọc ADFM10",
        "category_id" => 2,
        "price" => 1050000,
        "stock_quantity" => 12,
        "description" => "Áo Dài Hiện Đại Nữ Cổ Tàu Tay Lỡ Đính Nút Ngọc ADFM10 thời thượng, phù hợp khi kết hợp với quần jean hoặc chân váy cho phong cách năng động.",
        "image_url" => "shirt7.png",
    ],
    [
        "product_name" => "Áo Khoác Vest/Blazer Nữ Oversize Tay Lỡ 2 Túi Nắp AKBZFM5",
        "category_id" => 2,
        "price" => 890000,
        "stock_quantity" => 14,
        "description" => "Đầm suông trơn với thiết kế đơn giản, thanh lịch, phù hợp cho các buổi đi chơi hoặc hẹn hò nhẹ nhàng.",
        "image_url" => "shirt8.png",
    ],
    [
        "product_name" => "Áo Khoác Vest/Blazer Nữ Oversize 1 Lớp 2 Túi Nắp AKBZFM4",
        "category_id" => 2,
        "price" => 550000,
        "stock_quantity" => 20,
        "description" => "Áo Khoác Vest/Blazer Nữ Oversize 1 Lớp 2 Túi Nắp AKBZFM4 ấm áp, thoải mái, phù hợp cho những ngày lạnh và những ai yêu thích phong cách thể thao, năng động.",
        "image_url" => "shirt9.png",
    ],
    [
        "product_name" => "Áo Khoác Vest/Blazer Nữ Croptop 1 Nút AKBZFM2",
        "category_id" => 2,
        "price" => 1350000,
        "stock_quantity" => 6,
        "description" => "Áo Khoác Vest/Blazer Nữ Croptop 1 Nút AKBZFM2 thanh lịch, tinh tế với thiết kế giúp tôn lên vẻ đẹp thanh thoát và sang trọng của người mặc.",
        "image_url" => "shirt10.png",
    ]
];

function loop($pdo, $array, $categoryName, $description)
{
    $sql = "INSERT INTO categorys (category_name, description)
            VALUES (:category_name, :description)";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':category_name', $categoryName);
    $stmt->bindParam(':description', $description);
    $stmt->execute();

    echo 'ok' . $categoryName . '<br>';

    foreach ($array as $product) {
        insertData($pdo, $product['product_name'], $product['category_id'], $product['price'], $product['stock_quantity'], $product['description'], $product['image_url'],);
    }
}

function insertData($pdo, $name, $category, $price, $stock, $des, $url)
{
    $sql = "INSERT INTO products (product_name, category_id , price, stock_quantity, description , image_url)
            VALUES (:product_name, :category_id , :price, :stock_quantity, :description , :image_url)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':product_name', $name);
    $stmt->bindParam(':category_id', $category);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':stock_quantity', $stock);
    $stmt->bindParam(':description', $des);
    $stmt->bindParam(':image_url', $url);
    $stmt->execute();
    echo 'ok' . $name . '<br>';
}

loop($pdo, $dress, 'dress', 'Chất liệu vải tuyết mưa cao cấp làm chiếc đầm chữ A này có độ rơi tự nhiên và thanh thoát. Bạn có thể tự tin diện nó trong các sự kiện quan trọng như tiệc tùng, dạo phố hay cả môi trường làm việc. Màu sắc đa dạng với sự lựa chọn từ màu Be, Đen, Trắng giúp bạn thể hiện phong cách và cá tính của mình một cách tự tin.');
loop($pdo, $shirt, 'shirt', 'Chất liệu vải tuyết mưa cao cấp giúp áo khoác mềm mại và thoáng mát, mang đến sự thoải mái khi mặc. Áo có size S và M, phù hợp với nhiều vóc dáng khác nhau. Với họa tiết trơn đơn giản, áo khoác nữ xinh đẹp này tạo nên một vẻ ngoài giản dị nhưng không kém phần sang trọng. Thiết kế của áo Blazer giúp bạn có thể diện quanh năm không sợ lỗi thời.');
