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
-- Table structure for table `addressinfo`
--

DROP TABLE IF EXISTS `addressinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addressinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_code` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `address1` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `is_default` tinyint DEFAULT NULL,
  `recipient` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `recipient_phone` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `user_id` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `address2` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `address_tag` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `address3` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `address_active` tinyint DEFAULT '1',

  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addressinfo`
--

LOCK TABLES `addressinfo` WRITE;
/*!40000 ALTER TABLE `addressinfo` DISABLE KEYS */;
INSERT INTO `addressinfo` VALUES (1,'08365','서울 구로구 천왕로 56(천왕동, 천왕 이펜하우스 3단지)303-1503',0,'호권','01084920526','hogwon',NULL,NULL,NULL,1),(29,'08365','서울 구로구 천왕로 56',1,'호권','01084920526','we',' (천왕동, 천왕 이펜하우스 3단지)','홈','303-1503',1),(30,'08365','서울 구로구 천왕로 56',0,'호권','01084920526','we',' (천왕동, 천왕 이펜하우스 3단지)','도서관','303-1503',1);
/*!40000 ALTER TABLE `addressinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-24 18:18:28
