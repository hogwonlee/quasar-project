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
(1,"娃哈哈*冰红茶",1300,"1yin_wahahabinghongcha","500ml","饮料l음료수",null,null,null,16500,0,1,15,101,null,0,null),
(2,"康师傅*冰红茶",1500,"1yin_kangshifubinghongcha","500ml","饮料l음료수",null,null,null,19500,0,1,15,102,null,0,null),
(3,"康师傅*绿茶",1500,"1yin_lvcha","500ml","饮料l음료수",null,null,null,33000,0,1,24,103,null,0,null),
(4,"康师傅*茉莉清茶",1500,"1yin_moliqingcha","500ml","饮料l음료수",null,null,null,33000,0,1,24,104,"茉莉清茶",0,null),
(5,"康师傅*茉莉花茶",1500,"1yin_molimicha","500ml","饮料l음료수",null,null,null,33000,0,1,24,105,"茉莉花茶",0,null),
(6,"冰糖雪梨",1500,"1yin_bingtangxueli","500ml","饮料l음료수",null,null,null,19500,0,1,15,106,null,0,null),
(7,"水蜜桃",1500,"1yin_shuimitao","500ml","饮料l음료수",null,null,null,19500,0,1,15,107,"水蜜桃",0,null),
(8,"鲜果橙",1500,"1yin_xianguocheng","500ml","饮料l음료수",null,null,null,21000,0,1,16,108,"鲜果橙",0,null),
(9,"红牛",3000,"1yin_hongniu","250ml","饮料l음료수",null,null,null,69000,0,1,24,109,null,0,null),
(10,"王老吉",2000,"1yin_wanglaoji","310ml","饮料l음료수","降火凉茶怕上火",null,null,45000,0,1,24,110,null,0,null),
(11,"酸梅汤",1500,"1yin_suanmeitang","500ml","饮料l음료수","生津止渴消暑",null,null,19500,0,1,15,111,null,0,null),
(12,"开卫",1500,"1yin_kaiwei","280g","饮料l음료수",null,null,null,19500,0,1,15,112,null,0,null),
(13,"椰汁",2000,"1yin_yezhi","245ml","饮料l음료수",null,0,0,45000,0,1,24,113,null,0,null),
(14,"奶茶",1500,"1yin_naicha","500ml","饮料l음료수",null,null,null,19500,0,1,15,114,null,0,null),
(15,"元气森林*苹果味",2000,"1yin_yuanqisenlin","480ml","饮料l음료수",null,null,null,27000,0,1,15,115,"苹果味",0,null),
(16,"元气森林*葡萄味",2000,"1yin_yuanqisenlin","480ml","饮料l음료수",null,null,null,27000,0,1,15,116,"葡萄味",0,null),
(17,"元气森林*白桃味",2000,"1yin_yuanqisenlin","480ml","饮料l음료수",null,null,null,27000,0,1,15,117,"白桃味",0,null),
(18,"元气森林*乳酸菌味",2000,"1yin_yuanqisenlin","480ml","饮料l음료수",null,null,null,27000,0,1,15,118,"乳酸菌味",0,null),
(19,"元气森林*酸梅汁味",2000,"1yin_yuanqisenlin","480ml","饮料l음료수",null,null,null,27000,0,1,15,119,"酸梅汁味",0,null),
(20,"茶π*蜜桃乌龙茶",1200,"1yin_chapaiwulongcha","500ml","饮料l음료수",null,0,0,15000,0,1,15,120,"蜜桃乌龙茶",0,null),
(21,"茶π*柚子绿茶",1200,"1yin_chapailvcha","500ml","饮料l음료수",null,0,0,15000,0,1,15,121,"柚子绿茶",0,null),
(22,"茶π*柠檬红茶",1200,"1yin_chapaihongcha","500ml","饮料l음료수",null,0,0,15000,0,1,15,122,"柠檬红茶",0,null),
(23,"茶π*荔枝红茶",1200,"1yin_chapailizhihongcha","500ml","饮料l음료수",null,0,0,15000,0,1,15,123,"荔枝红茶",0,null),
(24,"茶π*柚子茉莉花茶",1200,"1yin_chapaihuacha","500ml","饮料l음료수",null,0,0,15000,0,1,15,124,"柚子茉莉花茶",0,null),
(25,"荔枝汽水",1200,"1yin_lizhi","310ml","饮料l음료수","宏宝莱",0,0,25800,0,1,24,125,null,0,null),
(26,"旺仔牛奶",1500,"1yin_wangzainiunai",null,"饮料l음료수",null,0,0,69000,0,1,48,126,null,0,null),
(27,"AD钙奶",5000,"1yin_adgainai",null,"饮料l음료수",null,null,null,27000,0,1,6,127,null,0,null),
(28,"红烧牛肉面*袋装",1200,"2fang_hongshaodai",null,"方便速食l간편식","方便面",null,null,25800,0,1,24,201,null,0,null),
(29,"红烧牛肉面*桶装",2500,"2fang_hongshaotong",null,"方便速食l간편식","方便面",null,null,0,0,1,0,202,null,0,null),
(30,"香辣牛肉面*袋装",1200,"2fang_xiangladai",null,"方便速食l간편식","方便面",null,null,25800,0,1,24,203,null,0,null),
(31,"香辣牛肉面*桶装",2500,"2fang_xianglatong",null,"方便速食l간편식","方便面",null,null,0,0,1,0,204,null,0,null),
(32,"老坛酸菜牛肉面*袋装",1200,"2fang_laotandai",null,"方便速食l간편식","方便面",null,null,25800,0,1,24,205,null,0,null),
(33,"老坛酸菜牛肉面*桶装",2500,"2fang_laotantong",null,"方便速食l간편식","方便面",null,null,0,0,1,0,206,null,0,null),
(34,"红油面皮*麻辣*袋装",1800,"2fang_malamianpidai",null,"方便速食l간편식","方便面",null,null,33000,0,1,20,207,"麻辣",0,null),
(35,"红油面皮*麻辣*桶装",3000,"2fang_malamianpitong",null,"方便速食l간편식","方便面",null,null,0,0,1,0,208,"麻辣",0,null),
(36,"红油面皮*酸辣*袋装",1800,"2fang_suanlamianpidai",null,"方便速食l간편식","方便面",null,null,33000,0,1,20,209,"酸辣",0,null),
(37,"红油面皮*酸辣*桶装",3000,"2fang_suanlamianpitong",null,"方便速食l간편식","方便面",null,null,0,0,1,0,210,"酸辣",0,null),
(38,"麻辣烫粉*桶装",1500,"2fang_malatangfen",null,"方便速食l간편식","方便面",null,null,0,0,1,0,211,null,0,null),
(39,"酸辣粉*桶装",2500,"2fang_suanlafen",null,"方便速食l간편식","方便面",null,null,0,0,1,0,212,null,0,null),
(40,"螺蛳粉*桶装",6000,"2fang_luoshifen",null,"方便速食l간편식","方便面",null,null,0,0,1,0,213,null,0,null),
(41,"八宝粥",1750,"2fang_babaozhou","360g","方便速食l간편식",null,null,null,0,0,1,0,214,null,0,null),
(42,"红油榨菜",4500,"3zuo_zhacai",null,"佐餐类l반찬류",null,null,null,0,0,1,0,301,null,0,null),
(43,"橄榄菜",2800,"3zuo_ganlancai",null,"佐餐类l반찬류",null,null,null,0,0,1,0,302,null,0,null),
(44,"王致和*红方",3500,"3zuo_hongfang",null,"佐餐类l반찬류","腐乳",0,0,0,0,1,0,303,null,0,null),
(45,"王致和*青方",3500,"3zuo_qingfang",null,"佐餐类l반찬류","腐乳",0,0,0,0,1,0,304,null,0,null),
(46,"咸鸭蛋",4800,"3zuo_xianyadan",null,"佐餐类l반찬류",null,null,null,0,0,1,0,305,"咸鸭蛋",0,null),
(47,"松花蛋",4800,"3zuo_songhuadan",null,"佐餐类l반찬류",null,null,null,0,0,1,0,306,"松花蛋",0,null),
(48,"酸菜",2500,"3zuo_suancai",null,"佐餐类l반찬류",null,null,null,0,0,1,0,307,"酸菜",0,null),
(49,"琥珀豆干*香辣",2000,"4chuan_xiangladougan",null,"川味零食l별미간식",null,null,null,0,0,1,0,401,"香辣",0,null),
(50,"琥珀豆干*烧烤",2000,"4chuan_shaokaodougan",null,"川味零食l별미간식","下酒佐餐",null,null,0,0,1,0,402,"烧烤",0,null),
(51,"琥珀豆干*山椒",2000,"4chuan_paojiaodougan",null,"川味零食l별미간식","下酒佐餐",null,null,0,0,1,0,403,"山椒",0,null),
(52,"琥珀豆干*麻辣",2000,"4chuan_maladougan",null,"川味零食l별미간식",null,null,null,0,0,1,0,404,"麻辣",0,null),
(53,"香辣金针菇",4500,"4chuan_jinzhengu",null,"川味零食l별미간식",null,null,null,0,0,1,0,405,null,0,null),
(54,"金菇豆卷*香辣",3500,"4chuan_xiangladoujuan",null,"川味零食l별미간식",null,null,null,0,0,1,0,406,"香辣",0,null),
(55,"金菇豆卷*麻辣",3500,"4chuan_maladoujuan",null,"川味零食l별미간식",null,null,null,0,0,1,0,407,"麻辣",0,null),
(56,"卫龙*辣条",2000,"4chuan_latiao",null,"川味零食l별미간식","下酒佐餐",null,null,0,0,1,0,408,null,0,null),
(57,"麻辣素牛肚",2000,"4chuan_malasuniudu",null,"川味零食l별미간식",null,null,null,0,0,1,0,409,"麻辣素牛肚",0,null),
(58,"街边烤面筋",2500,"4chuan_kaomianjin",null,"川味零食l별미간식","下酒佐餐",null,null,0,0,1,0,410,"烤面筋",0,null),
(59,"鲜我所爱*海带结",2500,"4chuan_haidaijie",null,"川味零食l별미간식","下酒佐餐",null,null,0,0,1,0,411,null,0,null),
(60,"辣子鸡味素肉",2000,"4chuan_surou",null,"川味零食l별미간식","下酒佐餐",null,null,0,0,1,0,412,"辣子鸡味素肉",0,null),
(61,"素牛排",2000,"4chuan_suniupai",null,"川味零食l별미간식","下酒佐餐",null,null,0,0,1,0,413,"素牛排",0,null),
(62,"麻辣素牛肉",2000,"4chuan_malasuniurou",null,"川味零食l별미간식",null,null,null,0,0,1,0,414,"麻辣素牛肉",0,null),
(63,"香辣素牛肉",2000,"4chuan_xianglasuniurou",null,"川味零食l별미간식",null,null,null,0,0,1,0,415,"香辣素牛肉",0,null),
(64,"麻辣小鲜肉",500,"4chuan_malaxiaoxianrou",null,"川味零食l별미간식","下酒佐餐",null,null,7500,0,1,20,416,"麻辣小鲜肉",0,null),
(65,"烛山雪魔芋*香辣",500,"4chuan_xianglamoyu",null,"川味零食l별미간식",null,null,null,7500,0,1,20,417,"香辣",0,null),
(66,"烛山雪魔芋*麻辣",500,"4chuan_malamoyu",null,"川味零食l별미간식",null,null,null,7500,0,1,20,418,"麻辣",0,null),
(67,"家缘锅巴*香辣",2000,"5gua_xianglaguoba",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,501,"香辣",0,null),
(68,"家缘锅巴*麻辣",2000,"5gua_malaguoba",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,502,"麻辣",0,null),
(69,"家缘锅巴*孜然",2000,"5gua_ziranguoba",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,503,"孜然",0,null),
(70,"小米锅巴*麻辣香锅",500,"5gua_xiaomiguoba_mala",null,"炒货坚果l과자견과류",null,null,null,4500,0,1,10,504,"麻辣香锅味",0,null),
(71,"小米锅巴*蛋黄",500,"5gua_xiaomiguoba_danhuang",null,"炒货坚果l과자견과류",null,null,null,4500,0,1,10,505,"蛋黄",0,null),
(72,"沙琪玛",3600,"5gua_shaqima",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,506,null,0,null),
(73,"早餐饼",3000,"5gua_zaocanbing",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,507,null,0,null),
(74,"洽洽瓜子*五香",3500,"5gua_qiaqiawuxiang",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,508,"五香",0,null),
(75,"洽洽瓜子*原味",3500,"5gua_qiaqiayuanwei",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,509,"原味",0,null),
(76,"洽洽瓜子*椰香",3500,"5gua_qiaqiayexiang",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,510,"椰香",0,null),
(77,"洽洽瓜子*焦糖",3500,"5gua_qiaqiajiaotang",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,511,"焦糖",0,null),
(78,"黄飞红*香脆椒",8500,"5gua_xiangcuijiao","452g","炒货坚果l과자견과류",null,null,null,0,0,1,0,512,"香脆椒",0,null),
(79,"黄飞红*麻辣花生",3800,"5gua_malahuasheng",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,513,"麻辣花生",0,null),
(80,"挑逗*椒麻蚕豆",2000,"5gua_jiaomacandou",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,514,"椒麻蚕豆",0,null),
(81,"挑逗*回味蚕豆",2000,"5gua_huiweicandou",null,"炒货坚果l과자견과류",null,null,null,0,0,1,0,515,"回味蚕豆",0,null),
(82,"鱼皮花生",4000,"5gua_yupihuasheng","200g","炒货坚果l과자견과류",null,null,null,0,0,1,0,516,null,0,null),
(83,"蒜香豌豆",2500,"5gua_suanxiangwandou","80g","炒货坚果l과자견과류",null,null,null,0,0,1,0,517,"蒜香豌豆",0,null),
(84,"孜然心管",5000,"6rou_ziranxinguan",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,601,"孜然心管",0,null),
(85,"牛板筋",3500,"6rou_niubanjin",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,602,"牛板筋",0,null),
(86,"精武*鸭脖子",4000,"6rou_yabozi",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,603,"鸭脖子",0,null),
(87,"精武*鸭翅",4000,"6rou_yachi",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,604,"鸭翅",0,null),
(88,"精武*鸭舌",4000,"6rou_yashe",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,605,"鸭舌",0,null),
(89,"精武*鸭头",4000,"6rou_yatou",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,606,"鸭头",0,null),
(90,"精武*鸭爪",4000,"6rou_yazhua",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,607,"鸭爪",0,null),
(91,"精武*鸭胗",4000,"6rou_yazhen",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,608,"鸭胗",0,null),
(92,"金锣火腿肠*红色",1400,"6rou_hongjinluo",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,609,null,0,null),
(93,"金锣火腿肠*金色",1400,"6rou_huangjinluo",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,610,null,0,null),
(94,"乡巴佬*鸡爪",5000,"6rou_xiangbalaojizhua",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,611,"乡巴佬*鸡爪",0,null),
(95,"老哈*纯肉蒜香肠",4500,"6rou_suanxiangchang",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,612,"蒜香",0,null),
(96,"老哈*黑胡椒烤肠",5400,"6rou_heihujiaokaochang",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,613,"黑胡椒味",0,null),
(97,"老哈*麻辣烤肠",5400,"6rou_malakaochang",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,614,"麻辣",0,null),
(98,"老哈*原味烤肠",5400,"6rou_yuanweikaochang",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,615,"原味",0,null),
(99,"老哈*腊肠",3700,"6rou_lachang",null,"肉制品l육류가공식품",null,null,null,0,0,1,0,616,"腊肠",0,null),
(100,"笑脸*手抓饼",3500,"8leng_shouzhuabing","450g","冷冻冷藏l냉동냉장류",null,null,null,0,0,1,0,801,null,0,null),
(101,"水饺*白菜猪肉",6000,"8leng_baicaizhurou","400g","冷冻冷藏l냉동냉장류","饺子",null,null,0,0,1,0,802,"白菜猪肉",0,null),
(102,"水饺*芹菜猪肉",6000,"8leng_qincaizhurou","400g","冷冻冷藏l냉동냉장류","饺子",null,null,0,0,1,0,803,"芹菜猪肉",0,null),
(103,"水饺*酸菜猪肉",6000,"8leng_suancaizhurou","400g","冷冻冷藏l냉동냉장류","饺子",null,null,0,0,1,0,804,"酸菜猪肉",0,null),
(104,"糯米肠",5000,"8leng_nuomichang","450g","冷冻冷藏l냉동냉장류",null,null,null,0,0,1,0,805,null,0,null),
(105,"章鱼丸",4000,"8leng_zhangyuwan","400g","冷冻冷藏l냉동냉장류",null,null,null,0,0,1,0,806,"章鱼丸",0,null),
(106,"墨鱼丸",4000,"8leng_moyuwan","400g","冷冻冷藏l냉동냉장류",null,null,null,0,0,1,0,807,"墨鱼丸",0,null),
(107,"绿豆宽粉",2000,"9gan_kuanfen","180g","干货粉面l건어물면류",null,null,null,0,0,1,0,901,"宽粉",0,null),
(108,"龙口粉丝",1600,"9gan_fensi","200g","干货粉面l건어물면류",null,null,null,0,0,1,0,902,"粉丝",0,null),
(109,"粉耗子",2000,"9gan_fenhaozi","250g","干货粉面l건어물면류",null,null,null,0,0,1,0,903,null,0,null),
(110,"延吉冷面",8000,"9gan_lengmian","10人份/2KG","干货粉面l건어물면류",null,null,null,0,0,1,0,904,null,0,null),
(111,"延吉荞麦冷面",8000,"9gan_qiaomailengmian","10人份/2KG","干货粉面l건어물면류",null,null,null,0,0,1,0,905,"延吉荞麦冷面",0,null),
(112,"玉米面条",2500,"9gan_yumimiantiao","400g","干货粉面l건어물면류",null,null,null,0,0,1,0,906,null,0,null),
(113,"葡萄干",3000,"9gan_putaogan","200g","干货粉面l건어물면류",null,null,null,0,0,1,0,907,"葡萄干",0,null),
(114,"干豆腐",7500,"9gan_gandoufu","1KG","干货粉面l건어물면류",null,null,null,0,0,1,0,908,null,0,null),
(115,"挂面",3000,"9gan_guamian","500g","干货粉面l건어물면류",null,null,null,0,0,1,0,909,null,0,null),
(116,"烤鱼片",4800,"9gan_kaoyupian","80g","干货粉面l건어물면류",null,null,null,0,0,1,0,910,null,0,null),
(117,"银耳",4000,"9gan_yiner","50g","干货粉面l건어물면류",null,null,null,0,0,1,0,911,"银耳",0,null),
(118,"冷面汤",800,"10da_lengmiantang","330g","复合调味料l복합조미료",null,null,null,0,0,1,0,1001,null,0,null),
(119,"冷面汤料",2500,"10da_lengmiantangliao","5g","复合调味料l복합조미료",null,null,null,0,0,1,0,1002,"10包",0,null),
(120,"鸡精",2500,"10da_jijing","100g","复合调味料l복합조미료",null,null,null,0,0,1,0,1003,null,0,null),
(121,"鸡粉",22000,"10da_jifen","1KG","复合调味料l복합조미료",null,null,null,0,0,1,0,1004,null,0,null),
(122,"火锅蘸料*香辣",2500,"10da_xianglahuoguozhanliao","120g","复合调味料l복합조미료",null,null,null,0,0,1,0,1005,"火锅蘸料*香辣",0,null),
(123,"火锅蘸料*原味",2500,"10da_yuanweihuoguozhanliao","120g","复合调味料l복합조미료",null,null,null,0,0,1,0,1006,"火锅蘸料*原味",0,null),
(124,"火锅底料*微辣",2000,"10da_weiladiliao","228g","复合调味料l복합조미료",null,null,null,0,0,1,0,1007,"火锅底料*微辣",0,null),
(125,"火锅底料*麻辣",2000,"10da_maladiliao","500g","复合调味料l복합조미료",null,null,null,0,0,1,0,1008,"火锅底料*麻辣",0,null),
(126,"火锅底料*麻辣*小块",5000,"10da_maladiliaoxiao","90gX4","复合调味料l복합조미료",null,null,null,0,0,1,0,1009,"火锅底料*麻辣*小块",0,null),
(127,"红烧调味料",2000,"10da_hongshaotiaoweiliao","100g","复合调味料l복합조미료",null,null,null,0,0,1,0,1010,"红烧调味料",0,null),
(128,"水煮鱼调味料",3000,"10da_shuizhuyu","198g","复合调味料l복합조미료",null,null,null,0,0,1,0,1011,"水煮鱼调味料",0,null),
(129,"麻辣香锅调味料",3000,"10da_malaxiangguo","220g","复合调味料l복합조미료",null,null,null,0,0,1,0,1012,"麻辣香锅调味料",0,null),
(130,"麻婆豆腐调味料",2000,"10da_mapodoufu","80g","复合调味料l복합조미료",null,null,null,0,0,1,0,1013,"麻婆豆腐调味料",0,null),
(131,"冬阴功调味料",3000,"10da_dongyingongtangliao","200g","复合调味料l복합조미료",null,null,null,0,0,1,0,1014,"冬阴功调味料",0,null),
(132,"水煮肉片调味料",2500,"10da_shuizhuroupian","100g","复合调味料l복합조미료",null,null,null,0,0,1,0,1015,"水煮肉片调味料",0,null),
(133,"鱼香肉丝调味料",3500,"10da_yuxiangrousi","120g","复合调味料l복합조미료",null,null,null,0,0,1,0,1016,"鱼香肉丝调味料",0,null),
(134,"老干妈*风味豆鼓",4500,"10da_fengweidougu","280g","复合调味料l복합조미료",null,null,null,0,0,1,0,1017,"老干妈*风味豆鼓",0,null),
(135,"老干妈*风味鸡",4500,"10da_fengweiji","280g","复合调味料l복합조미료",null,null,null,0,0,1,0,1018,"老干妈*风味鸡",0,null),
(136,"老干妈*油辣椒",3500,"10da_youlajiao","275g","复合调味料l복합조미료",null,null,null,0,0,1,0,1019,"老干妈*油辣椒",0,null),
(137,"芝麻酱",3800,"10da_zhimajiang","225g","复合调味料l복합조미료","火锅",null,null,0,0,1,0,1020,null,0,null),
(138,"豆瓣酱",3500,"10da_doubanjiang","400g","复合调味料l복합조미료",null,null,null,0,0,1,0,1021,null,0,null),
(139,"甜面酱",3500,"10da_tianmianjiang","400g","复合调味料l복합조미료",null,null,null,0,0,1,0,1022,null,0,null),
(140,"黄豆酱",3000,"10da_huangdoujiang","340g","复合调味料l복합조미료",null,null,null,0,0,1,0,1023,"黄豆酱",0,null),
(141,"韭花酱",3500,"10da_jiuhuajiang","320g","复合调味料l복합조미료",null,null,null,0,0,1,0,1024,"韭花酱",0,null),
(142,"精姜粉",1500,"11you_jingjiangfen","50g","基本调味料l조미료",null,null,null,0,0,1,0,1101,"精姜粉",0,null),
(143,"五香粉",1500,"11you_wuxiangfen","30g","基本调味料l조미료",null,null,null,0,0,1,0,1102,"五香粉",0,null),
(144,"孜然粉",1500,"11you_ziranfen","30g","基本调味料l조미료",null,null,null,0,0,1,0,1103,"孜然粉",0,null),
(146,"辣椒面",5000,"11you_lajiaomian","200g","基本调味料l조미료",null,null,null,0,0,1,0,1105,"辣椒面",0,null),
(147,"干辣椒",3500,"11you_ganlajiao","40g","基本调味料l조미료",null,null,null,0,0,1,0,1106,"干辣椒",0,null),
(148,"大豆油",12000,"11you_dadouyou","1.8L","基本调味料l조미료",null,null,null,0,0,1,0,1107,"大豆油",0,null),
(149,"麻辣油",10000,"11you_malayou","400g","基本调味料l조미료",null,null,null,0,0,1,0,1108,"麻辣油",0,null),
(150,"麻油",10000,"11you_mayou","400g","基本调味料l조미료",null,null,null,0,0,1,0,1109,"麻油",0,null),
(151,"辣椒油",2500,"11you_lajiaoyou","60ml","基本调味料l조미료",null,null,null,0,0,1,0,1110,"辣椒油",0,null),
(152,"花椒油",6500,"11you_huajiaoyou","468ml","基本调味料l조미료",null,null,null,0,0,1,0,1111,"花椒油",0,null),
(153,"芥末油",2500,"11you_jiemoyou","60ml","基本调味料l조미료",null,null,null,0,0,1,0,1112,"芥末油",0,null),
(154,"藤椒油",8000,"11you_tengjiaoyou","468ml","基本调味料l조미료",null,null,null,0,0,1,0,1113,"藤椒油",0,null),
(155,"蚝油",4500,"11you_maoyou","725g","基本调味料l조미료",null,null,null,0,0,1,0,1114,"蚝油",0,null),
(156,"海鲜酱油",4500,"11you_jiangyou","500ml","基本调味料l조미료",null,null,null,0,0,1,0,1115,"海鲜酱油",0,null),
(157,"海鲜酱油*大桶",10000,"11you_jiangyouda","1.75L","基本调味料l조미료",null,null,null,0,0,1,0,1116,"海鲜酱油*大桶",0,null),
(158,"老抽",4500,"11you_laochou","500ml","基本调味料l조미료",null,null,null,0,0,1,0,1117,"老抽",0,null),
(159,"米醋",4500,"11you_micu","450ml","基本调味料l조미료",null,null,null,0,0,1,0,1118,"米醋",0,null),
(160,"陈醋",3000,"11you_chencu","420ml","基本调味料l조미료",null,null,null,0,0,1,0,1119,"陈醋",0,null),
(161,"食盐",1500,"11you_shiyan","500g","基本调味料l조미료",null,null,null,0,0,1,0,1120,"食盐*500g",0,null),
(162,"味精",3000,"11you_weijing","400g","基本调味料l조미료",null,null,null,0,0,1,0,1121,"味精*400g",0,null),
(163,"苏打",1500,"11you_suda","150g","基本调味料l조미료",null,null,null,0,0,1,0,1122,"苏打*150g",0,null),
(164,"冰糖",2000,"11you_bingtang","300g","基本调味料l조미료",null,null,null,0,0,1,0,1123,"冰糖*300g",0,null),
(165,"白糖",2500,"11you_baitang","400g","基本调味料l조미료",null,null,null,0,0,1,0,1124,"白糖*400g",0,null),
(166,"干酵母",800,"11you_jiaomu","15g","基本调味料l조미료",null,null,null,6000,0,1,10,1125,"干酵母*15g",0,null),
(167,"纯碱",1500,"11you_chunjian","150g","基本调味料l조미료",null,null,null,0,0,1,0,1126,"纯碱*150g",0,null),
(168,"扑克",2000,"12qi_puke",null,"其他l기타",null,null,null,0,0,1,0,1201,"扑克",0,null),
(169,"麻将",40000,"12qi_majiang",null,"其他l기타",null,null,null,0,0,1,0,1202,"麻将",0,null);

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
