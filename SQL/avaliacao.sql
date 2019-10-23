-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 23-Out-2019 às 03:58
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
-- Estrutura da tabela `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
CREATE TABLE IF NOT EXISTS `avaliacao` (
  `id_pedido` bigint(10) NOT NULL,
  `nome_produtor` varchar(255) NOT NULL,
  `id_produtor` bigint(10) NOT NULL,
  `urlImagem` varchar(255) DEFAULT NULL,
  `estrelas` int(1) NOT NULL,
  PRIMARY KEY (`id_pedido`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `avaliacao`
--

INSERT INTO `avaliacao` (`id_pedido`, `nome_produtor`, `id_produtor`, `urlImagem`, `estrelas`) VALUES
(1, 'José dos Tomates', 1, 'teste.com', 5),
(2, 'José dos Tomates', 1, 'teste.com', 3),
(3, 'José dos Mamões', 2, 'teste.com', 3),
(4, 'José dos Mamões', 2, 'teste.com', 4),
(5, 'José dos Chuchus', 3, 'teste.com', 5),
(6, 'José dos Chuchus', 3, 'teste.com', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
