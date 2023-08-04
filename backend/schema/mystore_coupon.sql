DROP TABLE IF EXISTS `coupon`;

CREATE TABLE `coupon` (
  `id` int NOT NULL,
  `coupon_name` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL,
  `coupon_name_ko` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL,
  `gift_condition` int DEFAULT NULL,
  `coupon_price` int DEFAULT NULL,
  `use_condition` int DEFAULT NULL,
  `limit_date` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin
