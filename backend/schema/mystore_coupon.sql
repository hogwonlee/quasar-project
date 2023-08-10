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

INSERT INTO `mystore`.`coupon`
(`id`,
`coupon_name`,
`coupon_name_ko`,
`gift_condition`,
`coupon_price`,
`use_condition`,
`limit_date`)
VALUES
(
1, '开业优惠券', '오픈 기념 쿠폰',0, 3000, 30000, 90
),
(2, '5353优惠券', '5353할인 쿠폰', 50000, 3000, 50000, 90
),
(3, '感恩优惠券', '감사 쿠폰', NULL, 3000, NULL, NULL
);
