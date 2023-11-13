-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 13-11-2023 a las 23:25:09
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_users`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` int NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `last_name1` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `last_name2` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `user` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `password` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Volcado de datos para la tabla `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `name`, `last_name1`, `last_name2`, `user`, `password`) VALUES
(115100895, 'DYLAN', 'MORA', 'ACUÑA', 'ADMIN', '$2a$08$zz3yXvhddocwcg4Sc13rMORsl1bQb6aYh3wiQMQB8b875R4waBGJ.'),
(123235656, 'RICARDO', 'MORA', 'ACUNA', 'ADMIN2', '$2a$08$HefmPhWs2XUOHly5O.Yfj.hooZBd5CKccGlLeA30HKcdKPFkPhsK2'),
(22222222, 'PEDRO', 'PICAPIEDRA', 'MOLIDA', 'AD', '$2a$08$jzPxcURzvwPbzaGurqYMVuVUiv.cIzu36BzsFSnb4taXRtx8Q9jqS'),
(333333, 'DD', 'DD', 'DD', 'DD', '$2a$08$DIszr6Ft1Mqyn5m.2346eOGLW.Hli/QnqqBRz.mLmo90z7LPMzLc6');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
