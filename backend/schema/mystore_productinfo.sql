-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: mystore
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET "name"S utf8 */;
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
  `product_"name"` varchar(45) CHARACTER SET gb2312 COLLATE gb2312_bin DEFAULT NULL,
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
(1,"name",1300,"1yin_wahahabinghongcha","500ml","category",null,0,0,16500,0,1,15,101,null,0,null),
(2,"name",1500,"1yin_kangshifubinghongcha","500ml","category","keyword",0,0,19500,0,1,15,102,null,0,null),
(3,"name",1500,"1yin_lvcha","500ml","category","keyword",0,0,33000,0,1,24,103,null,0,null),
(4,"name",1500,"1yin_moliqingcha","500ml","category","keyword",0,0,33000,0,1,24,104,"flavor_refer",0,null),
(5,"name",1500,"1yin_molimicha","500ml","category","keyword",0,0,33000,0,1,24,105,"flavor_refer",0,null),
(6,"name",1500,"1yin_bingtangxueli","500ml","category","keyword",0,0,19500,0,1,15,106,null,0,null),
(7,"name",1500,"1yin_shuimitao","500ml","category","keyword",0,0,19500,0,1,15,107,"flavor_refer",0,null),
(8,"name",1500,"1yin_xianguocheng","500ml","category","keyword",0,0,21000,0,1,16,108,"flavor_refer",0,null),
(9,"name",3000,"1yin_hongniu","250ml","category","keyword",0,0,69000,0,1,24,109,null,0,null),
(10,"name",2000,"1yin_wanglaoji","310ml","category","keyword",0,0,45000,0,1,24,110,null,0,null),
(11,"name",1500,"1yin_suanmeitang","500ml","category","keyword",0,0,19500,0,1,15,111,null,0,null),
(12,"name",1500,"1yin_kaiwei","280g","category","keyword",0,0,19500,0,1,15,112,null,0,null),
(13,"name",2000,"1yin_yezhi","245ml","category",null,0,0,45000,0,1,24,113,null,0,null),
(14,"name",1500,"1yin_naicha","500ml","category","keyword",0,0,19500,0,1,15,114,null,0,null),
(15,"name",2000,"1yin_yuanqisenlin","480ml","category","keyword",0,0,27000,0,1,15,115,"flavor_refer",0,null),
(16,"name",2000,"1yin_yuanqisenlin","480ml","category","keyword",0,0,27000,0,1,15,116,"flavor_refer",0,null),
(17,"name",2000,"1yin_yuanqisenlin","480ml","category","keyword",0,0,27000,0,1,15,117,"flavor_refer",0,null),
(18,"name",2000,"1yin_yuanqisenlin","480ml","category","keyword",0,0,27000,0,1,15,118,"flavor_refer",0,null),
(19,"name",2000,"1yin_yuanqisenlin","480ml","category","keyword",0,0,27000,0,1,15,119,"flavor_refer",0,null),
(20,"name",1200,"1yin_chapaiwulongcha","500ml","category",null,0,0,15000,0,1,15,120,"flavor_refer",0,null),
(21,"name",1200,"1yin_chapailvcha","500ml","category",null,0,0,15000,0,1,15,121,"flavor_refer",0,null),
(22,"name",1200,"1yin_chapaihongcha","500ml","category",null,0,0,15000,0,1,15,122,"flavor_refer",0,null),
(23,"name",1200,"1yin_chapailizhihongcha","500ml","category",null,0,0,15000,0,1,15,123,"flavor_refer",0,null),
(24,"name",1200,"1yin_chapaihuacha","500ml","category",null,0,0,15000,0,1,15,124,"flavor_refer",0,null),
(25,"name",1200,"1yin_lizhi","310ml","category","keyword",0,0,25800,0,1,24,125,null,0,null),
(26,"name",1500,"1yin_wangzainiunai",null,"category",null,0,0,69000,0,1,48,126,null,0,null),
(27,"name",5000,"1yin_adgainai",null,"category","keyword",0,0,27000,0,1,6,127,null,0,null),
(28,"name",1200,"2fang_hongshaodai",null,"category","keyword",0,0,25800,0,1,24,201,null,0,null),
(29,"name",2500,"2fang_hongshaotong",null,"category","keyword",0,0,0,0,1,0,202,null,0,null),
(30,"name",1200,"2fang_xiangladai",null,"category","keyword",0,0,25800,0,1,24,203,null,0,null),
(31,"name",2500,"2fang_xianglatong",null,"category","keyword",0,0,0,0,1,0,204,null,0,null),
(32,"name",1200,"2fang_laotandai",null,"category","keyword",0,0,25800,0,1,24,205,null,0,null),
(33,"name",2500,"2fang_laotantong",null,"category","keyword",0,0,0,0,1,0,206,null,0,null),
(34,"name",1800,"2fang_malamianpidai",null,"category","keyword",0,0,33000,0,1,20,207,"flavor_refer",0,null),
(35,"name",3000,"2fang_malamianpitong",null,"category","keyword",0,0,0,0,1,0,208,"flavor_refer",0,null),
(36,"name",1800,"2fang_suanlamianpidai",null,"category","keyword",0,0,33000,0,1,20,209,"flavor_refer",0,null),
(37,"name",3000,"2fang_suanlamianpitong",null,"category","keyword",0,0,0,0,1,0,210,"flavor_refer",0,null),
(38,"name",1500,"2fang_malatangfen",null,"category","keyword",0,0,0,0,1,0,211,null,0,null),
(39,"name",2500,"2fang_suanlafen",null,"category","keyword",0,0,0,0,1,0,212,null,0,null),
(40,"name",6000,"2fang_luoshifen",null,"category","keyword",0,0,0,0,1,0,213,null,0,null),
(41,"name",1750,"2fang_babaozhou","360g","category",null,0,0,0,0,1,0,214,null,0,null),
(42,"name",4500,"3zuo_zhacai",null,"category","keyword",0,0,0,0,1,0,301,null,0,null),
(43,"name",2800,"3zuo_ganlancai",null,"category","keyword",0,0,0,0,1,0,302,null,0,null),
(44,"name",3500,"3zuo_hongfang",null,"category","keywordkeyword",0,0,0,0,1,0,303,null,0,null),
(45,"name",3500,"3zuo_qingfang",null,"category","keyword",0,0,0,0,1,0,304,null,0,null),
(46,"name",4800,"3zuo_xianyadan",null,"category","keyword",0,0,0,0,1,0,305,null,0,null),
(47,"name",4800,"3zuo_songhuadan",null,"category","keyword",0,0,0,0,1,0,306,null,0,null),
(48,"name",2500,"3zuo_suancai",null,"category","keyword",0,0,0,0,1,0,307,null,0,null),
(49,"name",2000,"4chuan_xiangladougan",null,"category","keyword",0,0,0,0,1,0,401,"flavor_refer",0,null),
(50,"name",2000,"4chuan_shaokaodougan",null,"category","u4e0bu9152",0,0,0,0,1,0,402,"flavor_refer",0,null),
(51,"name",2000,"4chuan_paojiaodougan",null,"category","u4e0bu9152",0,0,0,0,1,0,403,"flavor_refer",0,null),
(52,"name",2000,"4chuan_maladougan",null,"category","keyword",0,0,0,0,1,0,404,"flavor_refer",0,null),
(53,"name",4500,"4chuan_jinzhengu",null,"category","keyword",0,0,0,0,1,0,405,null,0,null),
(54,"name",3500,"4chuan_xiangladoujuan",null,"category","keyword",0,0,0,0,1,0,406,"flavor_refer",0,null),
(55,"name",3500,"4chuan_maladoujuan",null,"category","keyword",0,0,0,0,1,0,407,"flavor_refer",0,null),
(56,"name",2000,"4chuan_latiao",null,"category","u4e0bu9152",0,0,0,0,1,0,408,null,0,null),
(57,"name",2000,"4chuan_malasuniudu",null,"category","keyword",0,0,0,0,1,0,409,null,0,null),
(58,"name",2500,"4chuan_kaomianjin",null,"category","u4e0bu9152",0,0,0,0,1,0,410,null,0,null),
(59,"name",2500,"4chuan_haidaijie",null,"category","u4e0bu9152",0,0,0,0,1,0,411,null,0,null),
(60,"name",2000,"4chuan_surou",null,"category","u4e0bu9152",0,0,0,0,1,0,412,"flavor_refer",0,null),
(61,"name",2000,"4chuan_suniupai",null,"category","u4e0bu9152",0,0,0,0,1,0,413,"flavor_refer",0,null),
(62,"name",2000,"4chuan_malasuniurou",null,"category","keyword",0,0,0,0,1,0,414,"flavor_refer",0,null),
(63,"name",2000,"4chuan_xianglasuniurou",null,"category","keyword",0,0,0,0,1,0,415,"flavor_refer",0,null),
(64,"name",500,"4chuan_malaxiaoxianrou",null,"category","u4e0bu9152",0,0,7500,0,1,20,416,null,0,null),
(65,"name",500,"4chuan_xianglamoyu",null,"category","keyword",0,0,7500,0,1,20,417,"flavor_refer",0,null),
(66,"name",500,"4chuan_malamoyu",null,"category","keyword",0,0,7500,0,1,20,418,"flavor_refer",0,null),
(67,"name",2000,"5gua_xianglaguoba",null,"category","keyword",0,0,0,0,1,0,501,"flavor_refer",0,null),
(68,"name",2000,"5gua_malaguoba",null,"category","keyword",0,0,0,0,1,0,502,"flavor_refer",0,null),
(69,"name",2000,"5gua_ziranguoba",null,"category","keyword",0,0,0,0,1,0,503,"flavor_refer",0,null),
(70,"name",500,"5gua_xiaomiguoba_mala",null,"category","keyword",0,0,4500,0,1,10,504,"flavor_refer",0,null),
(71,"name",500,"5gua_xiaomiguoba_danhuang",null,"category","keyword",0,0,4500,0,1,10,505,"flavor_refer",0,null),
(72,"name",3600,"5gua_shaqima",null,"category","keyword",0,0,0,0,1,0,506,null,0,null),
(73,"name",3000,"5gua_zaocanbing",null,"category","keyword",0,0,0,0,1,0,507,null,0,null),
(74,"name",3500,"5gua_qiaqiawuxiang",null,"category","keyword",0,0,0,0,1,0,508,"flavor_refer",0,null),
(75,"name",3500,"5gua_qiaqiayuanwei",null,"category","keyword",0,0,0,0,1,0,509,"flavor_refer",0,null),
(76,"name",3500,"5gua_qiaqiayexiang",null,"category","keyword",0,0,0,0,1,0,510,"flavor_refer",0,null),
(77,"name",3500,"5gua_qiaqiajiaotang",null,"category","keyword",0,0,0,0,1,0,511,"flavor_refer",0,null),
(78,"name",8500,"5gua_xiangcuijiao","452g","category","keyword",0,0,0,0,1,0,512,null,0,null),
(79,"name",3800,"5gua_malahuasheng",null,"category","keyword",0,0,0,0,1,0,513,null,0,null),
(80,"name",2000,"5gua_jiaomacandou",null,"category","keyword",0,0,0,0,1,0,514,"flavor_refer",0,null),
(81,"name",2000,"5gua_huiweicandou",null,"category","keyword",0,0,0,0,1,0,515,"flavor_refer",0,null),
(82,"name",4000,"5gua_yupihuasheng","200g","category","keyword",0,0,0,0,1,0,516,null,0,null),
(83,"name",2500,"5gua_suanxiangwandou","80g","category","keyword",0,0,0,0,1,0,517,null,0,null),
(84,"name",5000,"6rou_ziranxinguan",null,"category","keyword",0,0,0,0,1,0,601,null,0,null),
(85,"name",3500,"6rou_niubanjin",null,"category","keyword",0,0,0,0,1,0,602,null,0,null),
(86,"name",4000,"6rou_yabozi",null,"category","keyword",0,0,0,0,1,0,603,"keyword",0,null),
(87,"name",4000,"6rou_yachi",null,"category","keyword",0,0,0,0,1,0,604,"flavor_refer",0,null),
(88,"name",4000,"6rou_yashe",null,"category","keyword",0,0,0,0,1,0,605,"flavor_refer",0,null),
(89,"name",4000,"6rou_yatou",null,"category","keyword",0,0,0,0,1,0,606,"flavor_refer",0,null),
(90,"name",4000,"6rou_yazhua",null,"category","keyword",0,0,0,0,1,0,607,"flavor_refer",0,null),
(91,"name",4000,"6rou_yazhen",null,"category","keyword",0,0,0,0,1,0,608,"flavor_refer",0,null),
(92,"name",1400,"6rou_hongjinluo",null,"category","keyword",0,0,0,0,1,0,609,null,0,null),
(93,"name",1400,"6rou_huangjinluo",null,"category","keyword",0,0,0,0,1,0,610,null,0,null),
(94,"name",5000,"6rou_xiangbalaojizhua",null,"category","keyword",0,0,0,0,1,0,611,null,0,null),
(95,"name",4500,"6rou_suanxiangchang",null,"category","keyword",0,0,0,0,1,0,612,"flavor_refer",0,null),
(96,"name",5400,"6rou_heihujiaokaochang",null,"category","keyword",0,0,0,0,1,0,613,"flavor_refer",0,null),
(97,"name",5400,"6rou_malakaochang",null,"category","keyword",0,0,0,0,1,0,614,"flavor_refer",0,null),
(98,"name",5400,"6rou_yuanweikaochang",null,"category","keyword",0,0,0,0,1,0,615,"flavor_refer",0,null),
(99,"name",3700,"6rou_lachang",null,"category","keyword",0,0,0,0,1,0,616,"flavor_refer",0,null),
(100,"name",3500,"8leng_shouzhuabing","450g","category","keyword",0,0,0,0,1,0,801,null,0,null),
(101,"name",6000,"8leng_baicaizhurou","400g","category","keyword",0,0,0,0,1,0,802,"flavor_refer",0,null),
(102,"name",6000,"8leng_qincaizhurou","400g","category","keyword",0,0,0,0,1,0,803,"flavor_refer",0,null),
(103,"name",6000,"8leng_suancaizhurou","400g","category","keyword",0,0,0,0,1,0,804,"flavor_refer",0,null),
(104,"name",5000,"8leng_nuomichang","450g","category",null,0,0,0,0,1,0,805,null,0,null),
(105,"name",4000,"8leng_zhangyuwan","400g","category",null,0,0,0,0,1,0,806,"flavor_refer",0,null),
(106,"name",4000,"8leng_moyuwan","400g","category",null,0,0,0,0,1,0,807,"flavor_refer",0,null),
(107,"name",2000,"9gan_kuanfen","180g","category","keyword",0,0,0,0,1,0,901,"flavor_refer",0,null),
(108,"name",1600,"9gan_fensi","200g","category","keyword",0,0,0,0,1,0,902,"flavor_refer",0,null),
(109,"name",2000,"9gan_fenhaozi","250g","category","keyword",0,0,0,0,1,0,903,null,0,null),
(110,"name",8000,"9gan_lengmian","10u4eba/2KG","category",null,0,0,0,0,1,0,904,null,0,null),
(111,"name",8000,"9gan_qiaomailengmian","10u4eba/2KG","category",null,0,0,0,0,1,0,905,"flavor_refer",0,null),
(112,"name",2500,"9gan_yumimiantiao","400g","category",null,0,0,0,0,1,0,906,null,0,null),
(113,"name",3000,"9gan_putaogan","200g","category",null,0,0,0,0,1,0,907,null,0,null),
(114,"name",7500,"9gan_gandoufu","1KG","category",null,0,0,0,0,1,0,908,null,0,null),
(115,"name",3000,"9gan_guamian","500g","category",null,0,0,0,0,1,0,909,null,0,null),
(116,"name",4800,"9gan_kaoyupian","80g","category","keyword",0,0,0,0,1,0,910,null,0,null),
(117,"name",4000,"9gan_yiner","50g","category",null,0,0,0,0,1,0,911,null,0,null),
(118,"name",800,"10da_lengmiantang","330g","category",null,0,0,0,0,1,0,1001,null,0,null),
(119,"name",2500,"10da_lengmiantangliao","5g","category",null,0,0,0,0,1,0,1002,null,0,null),
(120,"name",2500,"10da_jijing","100g","category",null,0,0,0,0,1,0,1003,null,0,null),
(121,"name",22000,"10da_jifen","1KG","category",null,0,0,0,0,1,0,1004,null,0,null),
(122,"name",2500,"10da_xianglahuoguozhanliao","120g","category","keyword",0,0,0,0,1,0,1005,"flavor_refer",0,null),
(123,"name",2500,"10da_yuanweihuoguozhanliao","120g","category","keyword",0,0,0,0,1,0,1006,"flavor_refer",0,null),
(124,"name",2000,"10da_weiladiliao","228g","category","keyword",0,0,0,0,1,0,1007,"flavor_refer",0,null),
(125,"name",2000,"10da_maladiliao","500g","category","keyword",0,0,0,0,1,0,1008,"flavor_refer",0,null),
(126,"name",5000,"10da_maladiliaoxiao","90gX4","category","keyword",0,0,0,0,1,0,1009,"flavor_refer",0,null),
(127,"name",2000,"10da_hongshaotiaoweiliao","100g","category",null,0,0,0,0,1,0,1010,"flavor_refer",0,null),
(128,"name",3000,"10da_shuizhuyu","198g","category",null,0,0,0,0,1,0,1011,"flavor_refer",0,null),
(129,"name",3000,"10da_malaxiangguo","220g","category",null,0,0,0,0,1,0,1012,"flavor_refer",0,null),
(130,"name",2000,"10da_mapodoufu","80g","category",null,0,0,0,0,1,0,1013,"flavor_refer",0,null),
(131,"name",3000,"10da_dongyingongtangliao","200g","category",null,0,0,0,0,1,0,1014,"flavor_refer",0,null),
(132,"name",2500,"10da_shuizhuroupian","100g","category",null,0,0,0,0,1,0,1015,"flavor_refer",0,null),
(133,"name",3500,"10da_yuxiangrousi","120g","category",null,0,0,0,0,1,0,1016,"flavor_refer",0,null),
(134,"name",4500,"10da_fengweidougu","280g","category",null,0,0,0,0,1,0,1017,"flavor_refer",0,null),
(135,"name",4500,"10da_fengweiji","280g","category",null,0,0,0,0,1,0,1018,"flavor_refer",0,null),
(136,"name",3500,"10da_youlajiao","275g","category",null,0,0,0,0,1,0,1019,"flavor_refer",0,null),
(137,"name",3800,"10da_zhimajiang","225g","category","keyword",0,0,0,0,1,0,1020,null,0,null),
(138,"name",3500,"10da_doubanjiang","400g","category",null,0,0,0,0,1,0,1021,null,0,null),
(139,"name",3500,"10da_tianmianjiang","400g","category",null,0,0,0,0,1,0,1022,null,0,null),
(140,"name",3000,"10da_huangdoujiang","340g","category",null,0,0,0,0,1,0,1023,null,0,null),
(141,"name",3500,"10da_jiuhuajiang","320g","category",null,0,0,0,0,1,0,1024,null,0,null),
(142,"name",1500,"11you_jingjiangfen","50g","category",null,0,0,0,0,1,0,1101,null,0,null),
(143,"name",1500,"11you_wuxiangfen","30g","category",null,0,0,0,0,1,0,1102,null,0,null),
(144,"name",1500,"11you_ziranfen","30g","category",null,0,0,0,0,1,0,1103,null,0,null),
(146,"name",5000,"11you_lajiaomian","200g","category",null,0,0,0,0,1,0,1105,null,0,null),
(147,"name",3500,"11you_ganlajiao","40g","category",null,0,0,0,0,1,0,1106,null,0,null),
(148,"name",12000,"11you_dadouyou","1.8L","category",null,0,0,0,0,1,0,1107,null,0,null),
(149,"name",10000,"11you_malayou","400g","category",null,0,0,0,0,1,0,1108,null,0,null),
(150,"name",10000,"11you_mayou","400g","category",null,0,0,0,0,1,0,1109,null,0,null),
(151,"name",2500,"11you_lajiaoyou","60ml","category",null,0,0,0,0,1,0,1110,null,0,null),
(152,"name",6500,"11you_huajiaoyou","468ml","category",null,0,0,0,0,1,0,1111,null,0,null),
(153,"name",2500,"11you_jiemoyou","60ml","category",null,0,0,0,0,1,0,1112,null,0,null),
(154,"name",8000,"11you_tengjiaoyou","468ml","category",null,0,0,0,0,1,0,1113,null,0,null),
(155,"name",4500,"11you_maoyou","725g","category",null,0,0,0,0,1,0,1114,null,0,null),
(156,"name",4500,"11you_jiangyou","500ml","category",null,0,0,0,0,1,0,1115,null,0,null),
(157,"name",10000,"11you_jiangyouda","1.75L","category",null,0,0,0,0,1,0,1116,null,0,null),
(158,"name",4500,"11you_laochou","500ml","category",null,0,0,0,0,1,0,1117,null,0,null),
(159,"name",4500,"11you_micu","450ml","category",null,0,0,0,0,1,0,1118,null,0,null),
(160,"name",3000,"11you_chencu","420ml","category",null,0,0,0,0,1,0,1119,null,0,null),
(161,"name",1500,"11you_shiyan","500g","category",null,0,0,0,0,1,0,1120,null,0,null),
(162,"name",3000,"11you_weijing","400g","category",null,0,0,0,0,1,0,1121,null,0,null),
(163,"name",1500,"11you_suda","150g","category",null,0,0,0,0,1,0,1122,null,0,null),
(164,"name",2000,"11you_bingtang","300g","category",null,0,0,0,0,1,0,1123,null,0,null),
(165,"name",2500,"11you_baitang","400g","category",null,0,0,0,0,1,0,1124,null,0,null),
(166,"name",800,"11you_jiaomu","15g","category",null,0,0,6000,0,1,10,1125,null,0,null),
(167,"name",1500,"11you_chunjian","150g","category",null,0,0,0,0,1,0,1126,null,0,null),
(168,"name",2000,"12qi_puke",null,"category","keyword",0,0,0,0,1,0,1201,null,0,null),
(169,"name",40000,"12qi_majiang",null,"category","keyword",0,0,0,0,1,0,1202,null,0,null);

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
