/*
 Navicat Premium Data Transfer

 Source Server         : raps
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : 127.0.0.1:3306
 Source Schema         : db_perpustakaan

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 31/01/2022 16:44:45
*/

-- SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for buku
-- ----------------------------
DROP TABLE IF EXISTS `buku`;
CREATE TABLE `buku`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_kategori` int NOT NULL,
  `judul_buku` varchar(300) NOT NULL,
  `nama_pengarang` varchar(300) NOT NULL,
  `nama_penerbit` varchar(200) NOT NULL,
  `ketebalan` varchar(10) NOT NULL,
  `tahun_terbit` date NOT NULL,
  `edisi_buku` varchar(10) NOT NULL,
  `jumlah_buku` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_by` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_buku_kategori`(`id_kategori`) USING BTREE,
  CONSTRAINT `fk_buku_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_buku` (`id_kategori`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 15  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of buku
-- ----------------------------
INSERT INTO `buku` VALUES (14, 24, 'Kancil Dan Buaya', 'Sultan', 'Havelicious', '20', '2022-01-24', 'Baru', 4, '2022-01-24 04:34:02', '2022-01-31 06:45:09', 'Ricky Ananda Pardomuan Sitorus');
INSERT INTO `buku` VALUES (15, 25, 'Kasih Suci', 'Raps', 'Raps', '2000', '2022-01-24', 'Baru', 3, '2022-01-24 04:53:28', '2022-01-24 04:53:28', 'Ricky Ananda Pardomuan Sitorus');

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for kategori_buku
-- ----------------------------
DROP TABLE IF EXISTS `kategori_buku`;
CREATE TABLE `kategori_buku`  (
  `id_kategori` int NOT NULL AUTO_INCREMENT,
  `nama_kategori` varchar(100) NOT NULL,
  `deskripsi` varchar(300) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_by` varchar(255) NOT NULL,
  PRIMARY KEY (`id_kategori`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kategori_buku
-- ----------------------------
INSERT INTO `kategori_buku` VALUES (24, 'Fiksi', 'Fiksi bagus', '2022-01-24 04:33:16', '2022-01-24 04:33:16', 'Ricky Ananda Pardomuan Sitorus');
INSERT INTO `kategori_buku` VALUES (25, 'Dongeng', 'Dongeng baru', '2022-01-24 04:52:46', '2022-01-24 04:52:46', 'Ricky Ananda Pardomuan Sitorus');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member`  (
  `id_member` int NOT NULL AUTO_INCREMENT,
  `nama_member` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `no_telp` varchar(15) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id_member`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES (33, 'Kevin', 'Jakarta', '081317125125', '2003-01-27', '2022-01-24 04:31:52', '2022-01-24 04:32:31');

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '2014_10_12_100000_create_password_resets_table', 1);
INSERT INTO `migrations` VALUES (3, '2019_08_19_000000_create_failed_jobs_table', 1);

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  INDEX `password_resets_email_index`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for peminjaman
-- ----------------------------
DROP TABLE IF EXISTS `peminjaman`;
CREATE TABLE `peminjaman`  (
  `id_peminjaman` int NOT NULL AUTO_INCREMENT,
  `id_member` int NOT NULL,
  `id_buku` int NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `lama` varchar(10) NULL DEFAULT NULL,
  `denda` varchar(100) NULL DEFAULT NULL,
  `administrasi` varchar(100) NULL DEFAULT NULL,
  `total_biaya` varchar(100) NULL DEFAULT NULL,
  `keadaan` varchar(100) NOT NULL,
  `updated_by` varchar(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_peminjaman`) USING BTREE,
  INDEX `fk_member`(`id_member`) USING BTREE,
  INDEX `fk_users`(`id`) USING BTREE,
  INDEX `fk_buku`(`id_buku`) USING BTREE,
  CONSTRAINT `fk_buku` FOREIGN KEY (`id_buku`) REFERENCES `buku` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_member` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of peminjaman
-- ----------------------------
INSERT INTO `peminjaman` VALUES (1, 33, 14, 18, '2022-01-24 04:43:21', '2022-01-24 04:53:55', '0', '0', '5000', '5000', 'Sudah Dikembalikan', 'Ricky Ananda Pardomuan Sitorus');
INSERT INTO `peminjaman` VALUES (2, 33, 14, 19, '2022-01-31 06:44:56', '2022-01-31 06:45:09', '0', '0', '5000', '5000', 'Sudah Dikembalikan', 'admin');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (18, 'Ricky Ananda Pardomuan Sitorus', 'ricky.metal09@gmail.com', NULL, '$2y$10$JmI16Mqc1eo6PV1za4bnuuT9KxfqUoBHcfoICVz1T208XQxE2i3EC', NULL, '2022-01-24 04:29:01', '2022-01-24 04:29:01');
INSERT INTO `users` VALUES (19, 'admin', 'admin@gmail.com', NULL, '$2y$10$ndOtTVTmaewIzpxNjneoye.fGeqLi4ijaor/i.VBLayh0i9oFAlvi', NULL, '2022-01-31 06:38:30', '2022-01-31 06:38:30');

SET FOREIGN_KEY_CHECKS = 1;
