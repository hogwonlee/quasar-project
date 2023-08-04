-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: mystore
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productinfo`
--

DROP TABLE IF EXISTS `productinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) CHARACTER SET gb2312 COLLATE gb2312_bin DEFAULT NULL,
  `price` int DEFAULT NULL,
  `img` varchar(45) CHARACTER SET gb2312 COLLATE gb2312_bin DEFAULT NULL,
  `tag` varchar(45) CHARACTER SET gb2312 COLLATE gb2312_bin DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `keyword` varchar(45) CHARACTER SET gb2312 COLLATE gb2312_bin DEFAULT NULL,
  `cutprice` int DEFAULT NULL COMMENT 'discount amount. Provided at a discount by the discount amount from the displayed amount.',
  `bonuscondition` int DEFAULT NULL COMMENT 'Minimum purchase quantity for bonus offer. Same as the 1+1 event held at the convenience store.',
  `boxprice` int DEFAULT NULL COMMENT 'Price when sold as a box. drinks only',
  `stock` int DEFAULT NULL COMMENT 'If inventory is entered, it will no longer be sold once the quantity is exhausted.',
  `stored` tinyint DEFAULT '1' COMMENT 'sale or not. When changed to 0, the product is not exposed. Remove from product list.',
  `boxcapacity` int DEFAULT NULL,
  `list_index` int DEFAULT NULL,
  `flavor_refer` varchar(45) CHARACTER SET gb2312 COLLATE gb2312_bin DEFAULT NULL,
  `shelf_life` int DEFAULT NULL,
  `production_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productinfo`
--

LOCK TABLES `productinfo` WRITE;
/*!40000 ALTER TABLE `productinfo` DISABLE KEYS */;
INSERT INTO `mystore`.`productinfo`
(`id`,
`product_name`,
`price`,
`img`,
`tag`,
`category`,
`keyword`,
`cutprice`,
`bonuscondition`,
`boxprice`,
`stock`,
`stored`,
`boxcapacity`,
`list_index`,
`flavor_refer`,
`shelf_life`,
`production_date`)
VALUES
(<{id: }>,
<{product_name: }>,
<{price: }>,
<{img: }>,
<{tag: }>,
<{category: }>,
<{keyword: }>,
<{cutprice: }>,
<{bonuscondition: }>,
<{boxprice: }>,
<{stock: }>,
<{stored: 1}>,
<{boxcapacity: }>,
<{list_index: }>,
<{flavor_refer: }>,
<{shelf_life: }>,
<{production_date: }>);

/*!40000 ALTER TABLE `productinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-24 18:18:27
