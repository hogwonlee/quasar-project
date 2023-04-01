# docker run
# docker 中下载 mysql
# docker pull mysql:5.7

#启动
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -d mysql:5.7

# docker exec -it mysql bash

#登录mysql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY '1234';


#添加远程登录用户
CREATE USER 'hogown'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'hogown'@'%';
