-- MySQL dump 10.13  Distrib 5.1.69, for redhat-linux-gnu (x86_64)
--
-- Host: localhost    Database: cheese
-- ------------------------------------------------------
-- Server version	5.1.69

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `arrivals`
--

DROP TABLE IF EXISTS `arrivals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arrivals` (
  `arrival_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `source_id` bigint(20) NOT NULL,
  `arrival` datetime NOT NULL,
  `temperature` double NOT NULL,
  `amount` double NOT NULL,
  `raw` double NOT NULL,
  `price` double NOT NULL,
  `haccp` tinyint(4) NOT NULL,
  `initials` varchar(5) NOT NULL,
  `notes` text,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`arrival_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `batches`
--

DROP TABLE IF EXISTS `batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `batches` (
  `batch_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `creation_datetime` datetime NOT NULL,
  `notes` text,
  `milks` text NOT NULL,
  PRIMARY KEY (`batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cheese_types`
--

DROP TABLE IF EXISTS `cheese_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cheese_types` (
  `type_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `description` text,
  `creation_datetime` datetime NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cheeses`
--

DROP TABLE IF EXISTS `cheeses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cheeses` (
  `cheese_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `type_id` bigint(20) NOT NULL,
  `rennents` text,
  `cultures` text,
  `smalls` tinyint(4) NOT NULL DEFAULT '0',
  `mediums` tinyint(4) NOT NULL DEFAULT '0',
  `larges` varchar(45) NOT NULL DEFAULT '0',
  `batch_id` bigint(20) NOT NULL,
  PRIMARY KEY (`cheese_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cultures`
--

DROP TABLE IF EXISTS `cultures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cultures` (
  `culture_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `creation_datetime` datetime NOT NULL,
  `expiration_datetime` datetime NOT NULL,
  `description` text,
  PRIMARY KEY (`culture_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `milks`
--

DROP TABLE IF EXISTS `milks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `milks` (
  `milk_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `source_id` bigint(20) unsigned NOT NULL,
  `arrival_id` bigint(20) unsigned NOT NULL,
  `amount` double NOT NULL,
  `created` datetime NOT NULL,
  `updated` varchar(45) NOT NULL,
  PRIMARY KEY (`milk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rennents`
--

DROP TABLE IF EXISTS `rennents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rennents` (
  `rennent_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `creation_datetime` datetime NOT NULL,
  `expiration_datetime` datetime NOT NULL,
  `description` text,
  PRIMARY KEY (`rennent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sources`
--

DROP TABLE IF EXISTS `sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources` (
  `source_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `fullname` varchar(64) NOT NULL,
  `type` tinyint(4) NOT NULL COMMENT '1 - milk\n2 - rennent\n3 - culture',
  `phone` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `notes` text,
  `created` datetime NOT NULL,
  `address` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-01-12 20:38:10
