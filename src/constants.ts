export const LICENSE_PRICES = {
  A1: 1500000,
  B1: 12000000,
  B2: 16500000,
  C: 22000000,
};

export const LICENSE_NAMES = {
  A1: 'Hạng A1 (Xe máy < 175cc)',
  B1: 'Hạng B1 (Ô tô số tự động)',
  B2: 'Hạng B2 (Ô tô số sàn)',
  C: 'Hạng C (Xe tải > 3.5 tấn)',
};

export const PROVINCES = [
  "Hà Nội", "TP Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ",
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
  "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
  "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông",
  "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang",
  "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình",
  "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu",
  "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định",
  "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên",
  "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị",
  "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
  "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang",
  "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

export const BANK_INFO = {
  accountName: 'NGUYEN VAN A',
  accountNumber: '1234567890',
  bankName: 'Vietcombank',
  branch: 'Hà Nội',
};

export const REVIEWS = [
  { name: 'Anh Minh', location: 'Hà Nội', content: 'Thủ tục nhanh gọn, giáo viên hướng dẫn nhiệt tình. Tôi đã thi đỗ ngay lần đầu!', rating: 5 },
  { name: 'Chị Lan', location: 'TP Hồ Chí Minh', content: 'Giá cả hợp lý, hỗ trợ hồ sơ từ A-Z. Rất hài lòng với dịch vụ.', rating: 5 },
  { name: 'Anh Tuấn', location: 'Đà Nẵng', content: 'Sân tập rộng rãi, xe mới. Lịch thi rất sớm đúng như cam kết.', rating: 4 },
  { name: 'Chị Hoa', location: 'Vĩnh Phúc', content: 'Đã nhận được bằng sau 2 tuần thi đỗ. Cảm ơn trung tâm rất nhiều.', rating: 5 },
];

export const EXAM_VENUES: Record<string, string[]> = {
  "Hà Nội": [
    "Sân thi Mỹ Đình",
    "Sân thi Hoàng Mai",
    "Sân thi Gia Lâm",
    "Sân thi Sài Đồng",
    "Sân thi Đông Anh"
  ],
  "TP Hồ Chí Minh": [
    "Sân thi Thủ Đức",
    "Sân thi Quận 12",
    "Sân thi Bình Tân",
    "Sân thi Nhà Bè",
    "Sân thi Củ Chi"
  ],
  "Đà Nẵng": [
    "Sân thi Hòa Cầm",
    "Sân thi Liên Chiểu",
    "Sân thi Sơn Trà"
  ],
  "Hải Phòng": [
    "Sân thi An Dương",
    "Sân thi Kiến An",
    "Sân thi Thủy Nguyên"
  ],
  "Cần Thơ": [
    "Sân thi Cái Răng",
    "Sân thi Bình Thủy",
    "Sân thi Ô Môn"
  ],
  "An Giang": [
    "Sân thi Long Xuyên",
    "Sân thi Châu Đốc",
    "Sân thi Tân Châu"
  ],
  "Bà Rịa - Vũng Tàu": [
    "Sân thi Vũng Tàu",
    "Sân thi Bà Rịa",
    "Sân thi Phú Mỹ"
  ],
  "Bắc Giang": [
    "Sân thi Bắc Giang",
    "Sân thi Việt Yên",
    "Sân thi Lục Nam"
  ],
  "Bắc Kạn": [
    "Sân thi Bắc Kạn",
    "Sân thi Chợ Mới",
    "Sân thi Ba Bể"
  ],
  "Bạc Liêu": [
    "Sân thi Bạc Liêu",
    "Sân thi Giá Rai",
    "Sân thi Hòa Bình"
  ],
  "Bắc Ninh": [
    "Sân thi Từ Sơn",
    "Sân thi Yên Phong",
    "Sân thi Quế Võ"
  ],
  "Bến Tre": [
    "Sân thi Bến Tre",
    "Sân thi Châu Thành",
    "Sân thi Mỏ Cày"
  ],
  "Bình Định": [
    "Sân thi Quy Nhơn",
    "Sân thi An Nhơn",
    "Sân thi Phù Cát"
  ],
  "Bình Dương": [
    "Sân thi Thuận An",
    "Sân thi Dĩ An",
    "Sân thi Thủ Dầu Một",
    "Sân thi Bến Cát"
  ],
  "Bình Phước": [
    "Sân thi Đồng Xoài",
    "Sân thi Chơn Thành",
    "Sân thi Bình Long"
  ],
  "Bình Thuận": [
    "Sân thi Phan Thiết",
    "Sân thi La Gi",
    "Sân thi Hàm Thuận"
  ],
  "Cà Mau": [
    "Sân thi Cà Mau",
    "Sân thi Năm Căn",
    "Sân thi Đầm Dơi"
  ],
  "Cao Bằng": [
    "Sân thi Cao Bằng",
    "Sân thi Trùng Khánh",
    "Sân thi Quảng Uyên"
  ],
  "Đắk Lắk": [
    "Sân thi Buôn Ma Thuột",
    "Sân thi Ea Kar",
    "Sân thi Krông Pắk"
  ],
  "Đắk Nông": [
    "Sân thi Gia Nghĩa",
    "Sân thi Đắk Mil",
    "Sân thi Cư Jút"
  ],
  "Điện Biên": [
    "Sân thi Điện Biên Phủ",
    "Sân thi Mường Lay",
    "Sân thi Tuần Giáo"
  ],
  "Đồng Nai": [
    "Sân thi Biên Hòa",
    "Sân thi Long Thành",
    "Sân thi Trảng Bom",
    "Sân thi Nhơn Trạch"
  ],
  "Đồng Tháp": [
    "Sân thi Cao Lãnh",
    "Sân thi Sa Đéc",
    "Sân thi Hồng Ngự"
  ],
  "Gia Lai": [
    "Sân thi Pleiku",
    "Sân thi An Khê",
    "Sân thi Ayun Pa"
  ],
  "Hà Giang": [
    "Sân thi Hà Giang",
    "Sân thi Đồng Văn",
    "Sân thi Bắc Quang"
  ],
  "Hà Nam": [
    "Sân thi Phủ Lý",
    "Sân thi Duy Tiên",
    "Sân thi Kim Bảng"
  ],
  "Hà Tĩnh": [
    "Sân thi Hà Tĩnh",
    "Sân thi Kỳ Anh",
    "Sân thi Hồng Lĩnh"
  ],
  "Hải Dương": [
    "Sân thi Hải Dương",
    "Sân thi Chí Linh",
    "Sân thi Kinh Môn"
  ],
  "Hậu Giang": [
    "Sân thi Vị Thanh",
    "Sân thi Ngã Bảy",
    "Sân thi Long Mỹ"
  ],
  "Hòa Bình": [
    "Sân thi Hòa Bình",
    "Sân thi Lương Sơn",
    "Sân thi Mai Châu"
  ],
  "Hưng Yên": [
    "Sân thi Hưng Yên",
    "Sân thi Mỹ Hào",
    "Sân thi Văn Lâm"
  ],
  "Khánh Hòa": [
    "Sân thi Nha Trang",
    "Sân thi Cam Ranh",
    "Sân thi Ninh Hòa"
  ],
  "Kiên Giang": [
    "Sân thi Rạch Giá",
    "Sân thi Phú Quốc",
    "Sân thi Hà Tiên"
  ],
  "Kon Tum": [
    "Sân thi Kon Tum",
    "Sân thi Đắk Hà",
    "Sân thi Ngọc Hồi"
  ],
  "Lai Châu": [
    "Sân thi Lai Châu",
    "Sân thi Tân Uyên",
    "Sân thi Mường Tè"
  ],
  "Lâm Đồng": [
    "Sân thi Đà Lạt",
    "Sân thi Bảo Lộc",
    "Sân thi Đức Trọng"
  ],
  "Lạng Sơn": [
    "Sân thi Lạng Sơn",
    "Sân thi Hữu Lũng",
    "Sân thi Cao Lộc"
  ],
  "Lào Cai": [
    "Sân thi Lào Cai",
    "Sân thi Sa Pa",
    "Sân thi Bát Xát"
  ],
  "Long An": [
    "Sân thi Tân An",
    "Sân thi Bến Lức",
    "Sân thi Đức Hòa"
  ],
  "Nam Định": [
    "Sân thi Nam Định",
    "Sân thi Mỹ Lộc",
    "Sân thi Hải Hậu"
  ],
  "Nghệ An": [
    "Sân thi Vinh",
    "Sân thi Cửa Lò",
    "Sân thi Diễn Châu"
  ],
  "Ninh Bình": [
    "Sân thi Ninh Bình",
    "Sân thi Tam Điệp",
    "Sân thi Gia Viễn"
  ],
  "Ninh Thuận": [
    "Sân thi Phan Rang",
    "Sân thi Ninh Hải",
    "Sân thi Thuận Nam"
  ],
  "Phú Thọ": [
    "Sân thi Việt Trì",
    "Sân thi Phú Thọ",
    "Sân thi Thanh Ba"
  ],
  "Phú Yên": [
    "Sân thi Tuy Hòa",
    "Sân thi Đông Hòa",
    "Sân thi Sông Cầu"
  ],
  "Quảng Bình": [
    "Sân thi Đồng Hới",
    "Sân thi Ba Đồn",
    "Sân thi Lệ Thủy"
  ],
  "Quảng Nam": [
    "Sân thi Tam Kỳ",
    "Sân thi Hội An",
    "Sân thi Điện Bàn"
  ],
  "Quảng Ngãi": [
    "Sân thi Quảng Ngãi",
    "Sân thi Đức Phổ",
    "Sân thi Sơn Tịnh"
  ],
  "Quảng Ninh": [
    "Sân thi Hạ Long",
    "Sân thi Cẩm Phả",
    "Sân thi Uông Bí"
  ],
  "Quảng Trị": [
    "Sân thi Đông Hà",
    "Sân thi Quảng Trị",
    "Sân thi Gio Linh"
  ],
  "Sóc Trăng": [
    "Sân thi Sóc Trăng",
    "Sân thi Vĩnh Châu",
    "Sân thi Ngã Năm"
  ],
  "Sơn La": [
    "Sân thi Sơn La",
    "Sân thi Mộc Châu",
    "Sân thi Mai Sơn"
  ],
  "Tây Ninh": [
    "Sân thi Tây Ninh",
    "Sân thi Hòa Thành",
    "Sân thi Trảng Bàng"
  ],
  "Thái Bình": [
    "Sân thi Thái Bình",
    "Sân thi Tiền Hải",
    "Sân thi Đông Hưng"
  ],
  "Thái Nguyên": [
    "Sân thi Thái Nguyên",
    "Sân thi Sông Công",
    "Sân thi Phổ Yên"
  ],
  "Thanh Hóa": [
    "Sân thi Thanh Hóa",
    "Sân thi Bỉm Sơn",
    "Sân thi Sầm Sơn"
  ],
  "Thừa Thiên Huế": [
    "Sân thi Huế",
    "Sân thi Hương Thủy",
    "Sân thi Phú Vang"
  ],
  "Tiền Giang": [
    "Sân thi Mỹ Tho",
    "Sân thi Cai Lậy",
    "Sân thi Gò Công"
  ],
  "Trà Vinh": [
    "Sân thi Trà Vinh",
    "Sân thi Duyên Hải",
    "Sân thi Cầu Ngang"
  ],
  "Tuyên Quang": [
    "Sân thi Tuyên Quang",
    "Sân thi Sơn Dương",
    "Sân thi Hàm Yên"
  ],
  "Vĩnh Long": [
    "Sân thi Vĩnh Long",
    "Sân thi Bình Minh",
    "Sân thi Trà Ôn"
  ],
  "Vĩnh Phúc": [
    "Sân thi Vĩnh Yên",
    "Sân thi Phúc Yên",
    "Sân thi Bình Xuyên"
  ],
  "Yên Bái": [
    "Sân thi Yên Bái",
    "Sân thi Nghĩa Lộ",
    "Sân thi Văn Yên"
  ]
};
