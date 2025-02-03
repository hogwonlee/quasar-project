DROP TABLE IF EXISTS `storeversion`;

CREATE TABLE `storeversion` (
  `version` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='check for update productlist'
