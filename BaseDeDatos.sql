CREATE DATABASE  IF NOT EXISTS `encomiendas` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `encomiendas`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: encomiendas
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `camiones`
--

DROP TABLE IF EXISTS `camiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camiones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `placa` varchar(255) DEFAULT NULL,
  `propietario` varchar(255) DEFAULT NULL,
  `peso` double DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camiones`
--

LOCK TABLES `camiones` WRITE;
/*!40000 ALTER TABLE `camiones` DISABLE KEYS */;
INSERT INTO `camiones` VALUES (1,'ABC-1111','Juanito',200,'Ocupado'),(2,'ABC-2222','Pepito',150,'Ocupado'),(3,'3','3',150,'Disponible'),(4,'4','4',150,'Disponible');
/*!40000 ALTER TABLE `camiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `cedula` varchar(255) DEFAULT NULL,
  `nombres` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'07051','Luis Valladolid','0911111111','Machala'),(2,'07052','Mia Lozano','0922222222','Pasaje');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encomiendas`
--

DROP TABLE IF EXISTS `encomiendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encomiendas` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `peso` double DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `costo_envio` double DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encomiendas`
--

LOCK TABLES `encomiendas` WRITE;
/*!40000 ALTER TABLE `encomiendas` DISABLE KEYS */;
INSERT INTO `encomiendas` VALUES (1,10,'Machala',10,'Pendiente'),(2,20,'Machala',20,'Entregado'),(3,140,'Machala',140,'Entregado'),(4,20,'Machala',20,'Entregado'),(5,100,'Machala',100,'Enviado'),(6,50,'Machala',50,'Enviado');
/*!40000 ALTER TABLE `encomiendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio`
--

DROP TABLE IF EXISTS `envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_camion` int DEFAULT NULL,
  `peso_total` double DEFAULT NULL,
  `total_recaudado` double DEFAULT NULL,
  `porcentaje_entrega` double DEFAULT NULL,
  `num_viajes` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_envio_camiones_idx` (`id_camion`),
  CONSTRAINT `fk_envio_camiones` FOREIGN KEY (`id_camion`) REFERENCES `camiones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio`
--

LOCK TABLES `envio` WRITE;
/*!40000 ALTER TABLE `envio` DISABLE KEYS */;
INSERT INTO `envio` VALUES (1,1,190,190,75,3),(2,2,150,150,0,0);
/*!40000 ALTER TABLE `envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio_encomienda`
--

DROP TABLE IF EXISTS `envio_encomienda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio_encomienda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_envio` int DEFAULT NULL,
  `codigo_encomienda` int DEFAULT NULL,
  `estado_entrega` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_envio_envio_idx` (`id_envio`),
  KEY `fk_envio_encomienda_idx` (`codigo_encomienda`),
  CONSTRAINT `fk_envio_encomienda` FOREIGN KEY (`codigo_encomienda`) REFERENCES `encomiendas` (`codigo`),
  CONSTRAINT `fk_envio_envio` FOREIGN KEY (`id_envio`) REFERENCES `envio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio_encomienda`
--

LOCK TABLES `envio_encomienda` WRITE;
/*!40000 ALTER TABLE `envio_encomienda` DISABLE KEYS */;
INSERT INTO `envio_encomienda` VALUES (223,1,1,'No Entregado'),(224,1,2,'Entregado'),(225,1,3,'Entregado'),(226,1,4,'Entregado'),(227,2,5,'Entregado'),(228,2,6,'Entregado');
/*!40000 ALTER TABLE `envio_encomienda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'encomiendas'
--

--
-- Dumping routines for database 'encomiendas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-26 21:44:27
