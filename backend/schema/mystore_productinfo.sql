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
`production_date`,
`product_desc`,
`product_name_ko`
)
VALUES
(1,"白糖酥饼",3000,"binggan_baitangsubing","白糖酥饼","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,201,NULL,NULL,NULL,NULL,NULL,),
(2,"奶油爆米花电米",4000,"binggan_bmh_dm_naiyou","奶油爆米花","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,202,NULL,NULL,NULL,NULL,NULL,),
(3,"奶油爆米花小山驴",4500,"binggan_bmh_xsl_naiyou","奶油爆米花","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,203,NULL,NULL,NULL,NULL,NULL,),
(4,"奶油爆米花印第安",3000,"binggan_bmh_yda_naiyou","奶油爆米花","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,204,NULL,NULL,NULL,NULL,NULL,),
(5,"蛋黄酥蛋卷",5000,"binggan_danhuangdanjuan","蛋黄酥蛋卷","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,205,NULL,NULL,NULL,NULL,NULL,),
(6,"家缘锅巴麻辣味",1500,"binggan_jygb_mala","麻辣味锅巴","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,1,NULL,201,NULL,NULL,NULL,NULL,"궈바*마라맛",),
(7,"家缘锅巴五香味",1500,"binggan_jygb_wuxiang","五香味锅巴","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,1,NULL,202,NULL,NULL,NULL,NULL,"궈바*5향맛",),
(8,"家缘锅巴孜然味",1500,"binggan_jygb_ziran","孜然味锅巴","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,1,NULL,203,NULL,NULL,NULL,NULL,"궈바*쯔란맛",),
(9,"榴莲酥饼",3000,"binggan_liuliansubing","榴莲酥饼","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,209,NULL,NULL,NULL,NULL,NULL,),
(10,"榴莲酥卷",3500,"binggan_liuliansujuan","榴莲酥卷","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,1,NULL,204,NULL,NULL,NULL,NULL,"두리안롤과자",),
(11,"轻乳奶芙",4000,"binggan_qingrunaifu","轻乳奶芙","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,1,NULL,205,NULL,NULL,NULL,NULL,"사치마과자*우유맛",),
(12,"沙琪玛蛋黄味",5000,"binggan_shaqima_huang","蛋黄味沙琪玛","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,1,NULL,206,NULL,NULL,NULL,NULL,"사치마과자*계란맛",),
(13,"沙琪玛芝麻香",5000,"binggan_sqm_zmw","芝麻香沙琪玛","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,1,NULL,207,NULL,NULL,NULL,NULL,"사치마과자*깨알맛",),
(14,"台湾米饼",3500,"binggan_taiwanmibing","台湾米饼","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,214,NULL,NULL,NULL,NULL,NULL,),
(15,"卧龙锅巴五香",2000,"binggan_wolongguoba_wuxiang","五香锅巴","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,215,NULL,NULL,NULL,NULL,NULL,),
(16,"卧龙锅巴爆辣",3000,"binggan_wolongguoba_baola","爆辣锅巴","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,216,NULL,NULL,NULL,NULL,NULL,),
(17,"卧龙锅巴麻辣",2000,"binggan_wolongguoba_mala","麻辣锅巴","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,0,NULL,217,NULL,NULL,NULL,NULL,NULL,),
(18,"早餐饼",3500,"binggan_zaocanbing","早餐饼","饼干虾条薯片l과자",NULL,NULL,NULL,NULL,NULL,1,NULL,208,NULL,NULL,NULL,NULL,"우유부먹과자",),
(19,"康师傅红烧牛肉面袋装",1500,"fbm_ksfdz_hsnrm_","红烧牛肉面","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,301,NULL,NULL,NULL,NULL,"캉스푸*홍소우육면",),
(20,"康师傅香辣牛肉面袋装",1500,"fbm_ksfdz_xlnrm","香辣牛肉面","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,302,NULL,NULL,NULL,NULL,"캉스푸*향라우육면",),
(21,"红油面皮袋装麻辣",2000,"fbm_hympdz_mala","红油面皮","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,303,"麻辣味",NULL,NULL,NULL,"홍유맨피*마라맛",),
(22,"红油面皮袋装酸辣",2000,"fbm_hympdz_suanla","红油面皮","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,304,"酸辣味",NULL,NULL,NULL,"홍유맨피*쏸라맛",),
(23,"红油面皮袋装酱香",2000,"fangbianmian_hymp_jx","红油面皮","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,305,"酱香味",NULL,NULL,NULL,"홍유맨피*땅콩소스맛",),
(24,"烤冷面",4000,"fbm_kaolengmian","烤冷面","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,306,NULL,NULL,NULL,NULL,"구운냉면",),
(25,"柳州螺蛳粉",6000,"fbm_lzlsf","螺蛳粉","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,307,NULL,NULL,NULL,NULL,"뤄쓰펀",),
(26,"麻辣米线",3000,"fbm_malamixian","麻辣米线","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,308,NULL,NULL,NULL,NULL,"마라쌀국수",),
(27,"麻辣烫粉",2000,"fbm_mltf","麻辣烫粉","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,309,NULL,NULL,NULL,NULL,"마라탕당면",),
(28,"美味肉蓉面",1000,"fbm_mwrrm","上海面","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,310,NULL,NULL,NULL,NULL,"상하이맨",),
(29,"嗨吃家酸辣粉",2000,"fbm_tz_suanlafen","酸辣粉","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,311,NULL,NULL,NULL,NULL,"쏸라펀",),
(30,"头道温面",4000,"fbm_tdwm","头道温面","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,0,NULL,312,NULL,NULL,NULL,NULL,NULL,),
(31,"土豆细粉条",3500,"fbm_tudouxifentiao","土豆细粉条","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,0,NULL,313,NULL,NULL,NULL,NULL,NULL,),
(32,"统一红椒牛肉面桶装",1500,"fbm_tz_hjnrm","红椒牛肉面","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,0,NULL,314,NULL,NULL,NULL,NULL,NULL,),
(33,"康师傅红烧牛肉面桶装",2500,"fbm_tz_hsnrm","红烧牛肉面","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,312,NULL,NULL,NULL,NULL,"캉스푸*홍소우육면",),
(34,"康师傅香辣牛肉面桶装",2500,"fbm_tz_xlnrm","香辣牛肉面","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,313,NULL,NULL,NULL,NULL,"캉스푸*향라우육면",),
(35,"桶装红油面皮酸辣",3000,"fbm_tz_hymp_sl","红油面皮","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,314,"酸辣味",NULL,NULL,NULL,"홍유맨피*쏸라맛",),
(36,"桶装红油面皮麻辣",3000,"fangbianmian_hymptz_ml","红油面皮","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,315,"麻辣味",NULL,NULL,NULL,"홍유맨피*마라맛",),
(37,"麻辣粉",2500,"fbm_tz_mlf","麻辣粉","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,316,NULL,NULL,NULL,NULL,"마라당면",),
(38,"麻辣宽粉",2500,"fbm_tz_mlkf","麻辣宽粉","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,1,NULL,317,NULL,NULL,NULL,NULL,"마라넓적당면",),
(39,"酸辣粉",2000,"fbm_tz_suanlafen","酸辣粉","方便面类l라면류",NULL,NULL,NULL,NULL,NULL,0,NULL,321,NULL,NULL,NULL,NULL,NULL,),
(40,"等你捞豆油皮",2000,"ganhuo_dengnilaodouyoupi","豆油皮","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,0,NULL,402,NULL,NULL,NULL,NULL,NULL,),
(41,"豆浆粉",8000,"ganhuo_doujiangfen","豆浆粉","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,0,NULL,401,NULL,NULL,NULL,NULL,NULL,),
(42,"豆油皮",2000,"ganhuo_douyoupi","豆油皮","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,401,NULL,NULL,NULL,NULL,"두유피",),
(43,"火锅炖粉",2500,"ganhuo_hgdf","火锅炖粉","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,402,NULL,NULL,NULL,NULL,"훠궈당면",),
(44,"红薯火锅炖粉",2500,"ganhuo_hshgdf","红薯火锅炖粉","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,403,NULL,NULL,NULL,NULL,"훠궈적고구마당면",),
(45,"五粮煎饼",3000,"ganhuo_jianbing","五粮煎饼","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,404,NULL,NULL,NULL,NULL,"5량전병",),
(46,"红枣煎饼",3000,"ganhuo_hzjb","红枣煎饼","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,405,NULL,NULL,NULL,NULL,"대추전병",),
(47,"烤鱼片",8000,"ganhuo_kaoyupian","烤鱼片","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,406,NULL,NULL,NULL,NULL,"코위팬",),
(48,"金沙河挂面宽",2000,"ganhuo_kuanguamian","挂面","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,407,"宽面",NULL,NULL,NULL,"넓적칼국수",),
(49,"金沙河挂面细",2000,"ganhuo_guamiancu","挂面","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,408,"细面",NULL,NULL,NULL,"칼국수소면",),
(50,"南方黑芝麻",5500,"ganhuo_nanfangheizhima","南方黑芝麻","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,409,NULL,NULL,NULL,NULL,"검은깨가루",),
(51,"玉带面宽",3500,"ganhuo_yudaimian","玉带面","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,410,"宽面",NULL,NULL,NULL,"넓적칼국수",),
(52,"麦香面细",3500,"ganhuo_maixiangmian","麦香面","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,411,"细面",NULL,NULL,NULL,"칼국수소면",),
(53,"葡萄干",3000,"ganhuo_putaogan","葡萄干","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,412,NULL,NULL,NULL,NULL,"건포도",),
(54,"东北淀粉",3000,"ganhuo_shiyongdianfen","东北淀粉","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,0,NULL,414,NULL,NULL,NULL,NULL,NULL,),
(55,"水磨糯米粉",4000,"ganhuo_shuimonuomifen","水磨糯米粉","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,413,NULL,NULL,NULL,NULL,"찹쌀가루",),
(56,"台南刀削面",4500,"ganhuo_tainandaoxiaomian","台南刀削面","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,414,NULL,NULL,NULL,NULL,"대만도삭면",),
(57,"文锋腐竹",2500,"ganhuo_wenfengfuzhu","腐竹","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,415,NULL,NULL,NULL,NULL,"푸주",),
(58,"延边锅巴",4000,"ganhuo_yanbianguoba","锅巴","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,0,NULL,418,NULL,NULL,NULL,NULL,NULL,),
(59,"玉米面大",8500,"ganhuo_yumimiantiao","玉米面","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,416,NULL,NULL,NULL,NULL,"옥수수국수",),
(60,"玉米面小",2000,"ganhuo_yumimiantiaoxiao","玉米面","食材干货l마른식재",NULL,NULL,NULL,NULL,NULL,1,NULL,417,NULL,NULL,NULL,NULL,"옥수수국수",),
(61,"老街口大粒香瓜子",6000,"guazi_laojiekoushanhetao","五香瓜子","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,501,NULL,NULL,NULL,NULL,"옛골목*5향해바라기",),
(62,"老街口山核桃瓜子",6000,"guazi_ljk_sht","核桃瓜子","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,502,NULL,NULL,NULL,NULL,"옛골목*호두해바라기",),
(63,"老街口焦糖味瓜子",6000,"guazi_ljk_jt","焦糖瓜子","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,503,NULL,NULL,NULL,NULL,"옛골목*카라멜해바라기",),
(64,"恰恰五香瓜子",3000,"guazi_qiaqiawuxiang","五香瓜子","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,504,NULL,NULL,NULL,NULL,"챠챠*5향해바라기",),
(65,"恰恰原味瓜子",3000,"guazi_qiaqiayuanwei","原味瓜子","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,505,NULL,NULL,NULL,NULL,"챠챠*해바라기",),
(66,"恰恰山核桃瓜子",3000,"guazi_qq_sht","核桃瓜子","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,506,NULL,NULL,NULL,NULL,"챠챠*호두해바라기",),
(67,"恰恰椰香瓜子",3000,"guazi_qq_yx","椰香瓜子","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,507,NULL,NULL,NULL,NULL,"챠챠*코코넛해바라기",),
(68,"老奶奶花生",2000,"huasheng_laonainaihuasheng","花生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,508,NULL,NULL,NULL,NULL,"할머니땅콩",),
(69,"老街口原香花生",5500,"huasheng_ljk_huasheng","花生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,509,NULL,NULL,NULL,NULL,"옛골목*땅콩",),
(70,"黄飞红麻辣花生",4500,"huasheng_malahuasheng","麻辣花生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,510,NULL,NULL,NULL,NULL,"황비홍*마라땅콩",),
(71,"蟹黄味蚕豆",5000,"huasheng_xhwcd","蟹黄味蚕豆","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,511,NULL,NULL,NULL,NULL,"게알맛잠두",),
(72,"黄飞红香脆椒",9500,"huasheng_xiangcuijiao","黄飞红香脆椒","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,512,NULL,NULL,NULL,NULL,"황비홍*바삭고추",),
(73,"香酥豆",2000,"huasheng_xiangsudou","香酥豆","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,513,NULL,NULL,NULL,NULL,"볶음콩",),
(74,"香辣花生麻辣味",2000,"huasheng_xlhs_mala","香辣花生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,0,NULL,514,"麻辣味",NULL,NULL,NULL,NULL,),
(75,"香辣花生原味",2000,"huasheng_xlhs_yuanwei","香辣花生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,0,NULL,515,"原味",NULL,NULL,NULL,NULL,),
(76,"鱼皮花生",2000,"huasheng_yupihuasheng","鱼皮花生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,514,NULL,NULL,NULL,NULL,"어피땅콩",),
(77,"酱香花生",2000,"huasheng_jiangxiang","酱香花生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,515,NULL,NULL,NULL,NULL,"장향땅콩",),
(78,"酒配鱼鲜生麻辣",4000,"huasheng_yxs_mala","酒配鱼鲜生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,516,"麻辣味",NULL,NULL,NULL,"술안주마라땅콩",),
(79,"酒配鱼鲜生原味",4000,"huasheng_ypyxs_yw","酒配鱼鲜生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,1,NULL,517,"原味",NULL,NULL,NULL,"술안주땅콩",),
(80,"酒配鱼鲜生藤椒",4000,"huasheng_yxs_tengjiao","酒配鱼鲜生","炒货坚果l과자견과류",NULL,NULL,NULL,NULL,NULL,0,NULL,520,"藤椒味",NULL,NULL,NULL,NULL,),
(81,"德庄4块火锅底料",6000,"huoguoliao_4kdl_dezhuang","火锅底料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,601,NULL,NULL,NULL,NULL,NULL,),
(82,"桥头4块火锅底料",6000,"huoguoliao_4kdl_qiaotou","火锅底料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,602,NULL,NULL,NULL,NULL,NULL,),
(83,"德庄麻辣火锅底料",4000,"huoguoliao_hgdldz_mala","火锅底料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,603,NULL,NULL,NULL,NULL,NULL,),
(84,"德庄十年火锅底料",4000,"huoguoliao_hgdldz_shinian","火锅底料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,604,NULL,NULL,NULL,NULL,NULL,),
(85,"海底捞麻辣火锅底料",4000,"huoguoliao_hgdlhdl_mala","麻辣底料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,1,NULL,601,NULL,NULL,NULL,NULL,"하이디로*마라훠궈소스",),
(86,"好人家火锅底料山楂清油",4000,"huoguoliao_hgdlhrj_szqy","麻辣底料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,606,NULL,NULL,NULL,NULL,NULL,),
(87,"海底捞清汤火锅汤料",4000,"huoguoliao_hgtl_qingtang","清汤汤料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,1,NULL,602,NULL,NULL,NULL,NULL,"하이디로*백탕소스",),
(88,"海底捞香辣蘸料",2500,"huoguoliao_hgzl__hdl_xiangla","火锅蘸料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,1,NULL,603,"香辣味",NULL,NULL,NULL,"하이디로*향라찍먹소스",),
(89,"海底捞原味蘸料",2500,"huoguoliao_hgzl_hdl_yuanwei","火锅蘸料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,1,NULL,604,"原味",NULL,NULL,NULL,"하이디로*찍먹소스",),
(90,"德庄火锅蘸料",2000,"huoguoliao_hgzl_dezhuang","火锅蘸料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,610,NULL,NULL,NULL,NULL,NULL,),
(91,"川崎蘸料海鲜",2500,"huoguoliao_hgzl_cq_haixian","川崎火锅蘸料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,605,"海鲜味",NULL,NULL,NULL,NULL,),
(92,"川崎蘸料麻辣",2500,"huoguoliao_hgzl_cq_mala","川崎火锅蘸料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,1,NULL,606,"麻辣味",NULL,NULL,NULL,"촨치*마라찍먹소스",),
(93,"川崎蘸料香辣",2500,"huoguoliao_hgzl_cq_xiangla","川崎火锅蘸料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,1,NULL,607,"香辣味",NULL,NULL,NULL,"촨치*향라찍먹소스",),
(94,"等你捞麻辣龙虾料",3500,"huoguoliao_mllx_dengnilao","麻辣龙虾调料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,614,NULL,NULL,NULL,NULL,NULL,),
(95,"桥头麻辣龙虾料",3500,"huoguoliao_mllx_qiaotou","麻辣龙虾调料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,615,NULL,NULL,NULL,NULL,NULL,),
(96,"王家渡麻辣龙虾料",3500,"huoguoliao_mllx_wangjiadu","麻辣龙虾调料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,1,NULL,611,NULL,NULL,NULL,NULL,"왕쟈두*마라룽샤소스",),
(97,"好人家麻辣烫料",2000,"huoguoliao_mlt_haorenjia","麻辣烫底料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,617,NULL,NULL,NULL,NULL,NULL,),
(98,"等你捞麻辣香锅调料",3500,"huoguoliao_mlxg_dengnilao","麻辣香锅调料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,618,NULL,NULL,NULL,NULL,NULL,),
(99,"海底捞麻辣香锅调料",3500,"huoguoliao_mlxg_haidilao","麻辣香锅调料","调味料l조미료",NULL,NULL,NULL,NULL,NULL,0,NULL,619,NULL,NULL,NULL,NULL,NULL,),
(100,"粉耗子细",2500,"lengcang_fenhaozi","粉耗子","冷藏l냉장",NULL,NULL,NULL,NULL,NULL,0,NULL,701,NULL,NULL,NULL,NULL,NULL,);

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

