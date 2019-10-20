-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 20-Out-2019 às 03:28
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
-- Estrutura da tabela `cadastro`
--

DROP TABLE IF EXISTS `cadastro`;
CREATE TABLE IF NOT EXISTS `cadastro` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `tipo` char(1) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` int(11) NOT NULL,
  `sexo` char(1) NOT NULL,
  `cep` int(8) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `rua` varchar(255) NOT NULL,
  `numero` int(10) NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `urlImagem` varchar(255) DEFAULT NULL,
  `areas` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `cadastro`
--

INSERT INTO `cadastro` (`id`, `tipo`, `usuario`, `nome`, `email`, `telefone`, `sexo`, `cep`, `uf`, `cidade`, `rua`, `numero`, `bairro`, `senha`, `urlImagem`, `areas`) VALUES
(1, 'C', 'lucas', 'Lucas Lima', 'lucasdaniels51@gmail.com', 973625747, 'M', 32626412, 'MG', 'Betim', 'São José dos Campos', 101, 'Taquaril', 'senha', '', ''),
(3, 'C', 'teste2', 'teste2', 'teste2', 9999, 'T', 9999, 'TT', 'teste', 'teste', 9999, 'teste', '$2a$10$f73Z7DvwU2uboPenFLfzXuy30b3y/DNdFGp7NPX7bWIarO/Uqp2fu', NULL, ''),
(4, 'C', 'teste3', 'teste3', 'teste3', 9999, 'T', 9999, 'TT', 'teste', 'teste', 9999, 'teste', '$2a$10$rmahzZaaA.3WT7bTpOLXA.czs/9PQFCHGQFVMyMhR9/RDF36DLvIm', NULL, '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) CHARACTER SET utf8 NOT NULL,
  `id_cliente` bigint(10) NOT NULL,
  `id_produtor` bigint(10) NOT NULL,
  `produtos` varchar(255) CHARACTER SET utf8 NOT NULL,
  `tipo` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `qtde` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `pedidos`
--

INSERT INTO `pedidos` (`id`, `status`, `id_cliente`, `id_produtor`, `produtos`, `tipo`, `qtde`) VALUES
(6, 'Aguardando', 1, 3, '1,2', 'kg,kg', '2,2'),
(7, 'undefined', 1, 3, '1,2,3,4,5', 'kg,kg,unidades,unidades,kg', '2,2,2,2,2');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `valor` decimal(65,0) NOT NULL,
  `unidades` int(255) DEFAULT NULL,
  `kg` int(255) DEFAULT NULL,
  `id_produtor` bigint(10) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `valor`, `unidades`, `kg`, `id_produtor`, `icon`) VALUES
(1, 'Tomate', '7', NULL, 25, 3, 'tomate'),
(2, 'Feijão', '5', NULL, 300, 3, 'Feijão');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
