-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 23-Out-2019 às 04:00
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
-- Estrutura da tabela `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) CHARACTER SET utf8 NOT NULL,
  `id_cliente` bigint(10) NOT NULL,
  `nome_cliente` varchar(255) NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `id_produtor` bigint(10) NOT NULL,
  `produtos` varchar(255) CHARACTER SET utf8 NOT NULL,
  `tipo` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `valor` varchar(255) NOT NULL,
  `qtde` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `pedidos`
--

INSERT INTO `pedidos` (`id`, `status`, `id_cliente`, `nome_cliente`, `bairro`, `id_produtor`, `produtos`, `tipo`, `valor`, `qtde`) VALUES
(1, 'Aguardando', 1, 'Lucas Lima', 'Taquaril', 3, '1,2', 'kg,kg', '6.99,5.5', '2,2'),
(2, 'Aguardando', 1, 'Lucas Lima', 'Taquaril', 3, '1,2,3', 'kg,kg,unidades', '6.99,5.5,1.5', '2,5,3');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
