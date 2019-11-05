-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 04-Nov-2019 às 16:40
-- Versão do servidor: 5.7.26
-- versão do PHP: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mercadoverde`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `conta`
--

DROP TABLE IF EXISTS `conta`;
CREATE TABLE IF NOT EXISTS `conta` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint(10) NOT NULL,
  `cartao` varchar(255) CHARACTER SET utf8 NOT NULL,
  `validade` varchar(5) CHARACTER SET utf8 NOT NULL,
  `cvv` int(3) NOT NULL,
  `saldo` float DEFAULT NULL,
  `limite` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `conta`
--

INSERT INTO `conta` (`id`, `id_usuario`, `cartao`, `validade`, `cvv`, `saldo`, `limite`) VALUES
(1, 1, '9999 9999 9999 9999', '01/26', 123, 500, 1020),
(2, 2, '8888 8888 8888 8888', '02/27', 365, 65.6, 254.2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
