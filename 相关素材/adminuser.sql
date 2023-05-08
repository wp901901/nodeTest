/*
Navicat MySQL Data Transfer

Source Server         : bendi
Source Server Version : 80019
Source Host           : 127.0.0.1:3306
Source Database       : adminsql

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2023-05-08 17:40:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for adminuser
-- ----------------------------
DROP TABLE IF EXISTS `adminuser`;
CREATE TABLE `adminuser` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名称',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '邮箱',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `password2` varchar(255) NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户头像',
  `date` timestamp(3) NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '注册时间',
  `identity` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id_uni` (`id`) USING BTREE,
  UNIQUE KEY `name_uni` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of adminuser
-- ----------------------------
INSERT INTO `adminuser` VALUES ('1', 'root@admin.com', 'root@admin.com', '$2a$10$VhzcwlwWWK.bhbxV8sAddO4dgxVz/BsuURdk2kw7J2qMFAbqxPH8G', '', '//www.gravatar.com/avatar/da5954877ecf9bbe8ba0f4b36ffbb0c3?s=200&r=pg&d=mm', '2023-04-27 15:05:24.261', '');
INSERT INTO `adminuser` VALUES ('2', 'test@icloud.com', 'test@icloud.com', '$2a$10$HEJhFZYqLOVvE2NDhn0hE.VAodOPg97J5BAXd5bLyNgd7FCqEWGpq', '', '//www.gravatar.com/avatar/9c26aa1515412655c6d7e739afb7bdfe?s=200&r=pg&d=mm', '2023-04-27 15:16:09.646', '');
INSERT INTO `adminuser` VALUES ('3', '超级管理员', 'root@icloud.com', '$2a$10$EpXs.z0hy86ZC8S1O8BP9uDnEWKsDCXE3cEKjdWcJdWWu.qt8bON6', 'admin123', '//www.gravatar.com/avatar/768bf729404eb371f43c00f32bfc9006?s=200&r=pg&d=mm', '2023-04-27 17:48:22.148', 'employee');
