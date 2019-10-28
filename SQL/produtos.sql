-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 28-Out-2019 às 23:01
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
-- Estrutura da tabela `produtos`
--

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `valor` float NOT NULL,
  `unidades` int(255) DEFAULT NULL,
  `kg` int(255) DEFAULT NULL,
  `id_produtor` bigint(10) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `vendas` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `valor`, `unidades`, `kg`, `id_produtor`, `icon`, `vendas`) VALUES
(2, 'Alface', 1.5, 10, NULL, 1, 'alface', 3),
(1, 'Tomate', 5.98, NULL, 20, 1, 'tomate', 1),
(3, 'Feijão', 3.58, NULL, 20, 1, 'feijao', 4),
(4, 'Batata', 0.99, NULL, 60, 1, 'batata', 2),
(5, 'Beterraba', 7, NULL, 40, 1, 'beterraba', 5),
(6, 'Banana', 2.5, NULL, 20, 1, 'banana', 6);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
