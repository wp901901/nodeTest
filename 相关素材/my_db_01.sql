/*
Navicat MySQL Data Transfer

Source Server         : bendi
Source Server Version : 80019
Source Host           : 127.0.0.1:3306
Source Database       : my_db_01

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2022-12-30 15:35:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '这是用户的唯一标识',
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户的状态，是一个布尔值\\n0 表示用户状态正常\\n1 表示用户被禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`) USING BTREE,
  UNIQUE KEY `name_UNIQUE` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息表';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'tony stark', '098123', '0');
INSERT INTO `users` VALUES ('2', 'pdd', '888888', '0');
INSERT INTO `users` VALUES ('3', 'XY-ZA', 'hello2023', '1');
INSERT INTO `users` VALUES ('14', 'whereTest', '000000', '1');
INSERT INTO `users` VALUES ('15', 'root', 'admin123', '0');
INSERT INTO `users` VALUES ('19', 'XY-PYY', 'a11111', '0');

-- ----------------------------
-- Table structure for users_01
-- ----------------------------
DROP TABLE IF EXISTS `users_01`;
CREATE TABLE `users_01` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户的唯一标识',
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户的状态，0表示正常，1表示禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `1` (`id`,`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users_01
-- ----------------------------
INSERT INTO `users_01` VALUES ('1', 'pdd', '123', '0');
