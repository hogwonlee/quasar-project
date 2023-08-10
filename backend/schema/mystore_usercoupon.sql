DROP TABLE IF EXISTS `usercoupon`;

CREATE TABLE `usercoupon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coupon_id` int NOT NULL,
  `user_id` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `gift_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `available` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin


