DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id_user` int NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `city` varchar(100),
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `zip_code` varchar(45),
  `profile_pic` varchar(250),
  `id_surf_skill` int,
  `favorite_spot` varchar(45),
  `created_date` datetime,
  `id_department` int NOT NULL,
  FOREIGN KEY (`id_department`) REFERENCES `departments`(`id_department`),
  `id_surf_style` int NOT NULL,
  FOREIGN KEY (`id_surf_style`) REFERENCES `surf_styles`(`id_surf_style`),
  `wahine` tinyint NOT NULL,
  `desc` varchar(255),
  `phone` varchar(255) NOT NULL,
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO
  `users` (firstname, lastname, city, email, password, zip_code, profile_pic, id_surf_skill, favorite_spot, created_date, id_department, id_surf_style, wahine, desc, phone)
VALUES
  ('Chléa', 'Bourtoule', 'Beaucens', 'chlea.bourtoule@gmail.com', 'litchy65', '65400', '', 1, 'Grande Plage de Biarritz', '20220124', 1, 2, 1, `Bonjour je m'appelle Chléa`, '0647069123'),
  (
    'Laurent', 'Slonim', 'Ciboure', 'laurent.slonim@gmail.com', 'citron64', '64500', '', 1, 'Sokoa', '20220124', 1, 2, 1, `Bonjour je m'appelle Laurent`, '0638274932'
  ),
  (
    'Koldo', 'Etxegarai', 'Bayonne', 'koldo.etxe@gmail.com', 'KOKOlolo1', '64500', '', 1, 'Sokoa', '20220124', 1, 2, 1, `Bonjour je m'appelle Koldo`, '0664892374'
  ),
  (
    'Marie', 'Lainé', 'Capbreton', 'marie.lainé@gmail.com', 'citron40', '40300', '', 1, 'Capbreton', '20220124', 1, 2, 1, `Bonjour je m'appelle Marie`, '0645378293'
  );

DROP TABLE `users_has_surf_skills`;
CREATE TABLE `users_has_surf_skills` (
  `id_user` int,
  FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`),
  `id_surf_skill` int,
  FOREIGN KEY (`id_surf_skill`) REFERENCES `surf_skills` (`id_surf_skill`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO
  `users_has_surf_skills` (id_user, id_surf_skill)
VALUES (1, 2), (1, 4), (1, 7), (2, 3), (2, 1), (2, 9), (3, 5), (3, 7), (3, 6), (4, 2), (4, 8), (4, 10);

DROP TABLE `users_has_user_types`;
CREATE TABLE `users_has_user_types` (
  `id_user` int,
  FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`),
  `id_user_type` int,
  FOREIGN KEY (`id_user_type`) REFERENCES `user_types` (`id_user_type`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO
  `users_has_user_types` (id_user, id_user_type)
VALUES (1, 2), (2, 2),(3, 2), (4, 2);


CREATE TABLE `sessions` (
    `id_session` int NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `date` datetime NOT NULL,
    `spot_name` varchar(100) NOT NULL,
    `address` varchar(255) NOT NULL,
    `nb_hiki_max` int NOT NULL,
    `id_department` int NOT NULL,
    FOREIGN KEY (`id_department`) REFERENCES `departments`(`id_department`),
    `id_surf_style` int NOT NULL,
    FOREIGN KEY (`id_surf_style`) REFERENCES `surf_styles`(`id_surf_style`),
    `carpool` tinyint NOT NULL,
    `id_user` int NOT NULL,
    FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8;
INSERT INTO
  `sessions`
VALUES
  (
    'Session 1',
    '20220124',
    'Grande Plage',
    'Quai de la Grande Plage',
    3,
    1, 2, 1, 1
  ),(
    'Session 2',
    '20220124',
    'Grande Plage',
    'Quai de la Grande Plage',
    2,
    1, 1, 2, 2
  ),(
    'Session 3',
    '20220124',
    'Grande Plage',
    'Quai de la Grande Plage',
    4,
    1, 2, 1, 3
  ),(
   'Session 4',
    '20220124',
    'Grande Plage',
    'Quai de la Grande Plage',
    4,
    1, 1, 2, 4
  );

  DROP TABLE `sessions_has_weather`;
CREATE TABLE `sessions_has_weather` (
  `id_session` int,
  FOREIGN KEY (`id_session`) REFERENCES `sessions`(`id_session`),
  `id_weather` int,
  FOREIGN KEY (`id_weather`) REFERENCES `weather` (`id_weather`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO
  `sessions_has_weather` (id_session, id_weather)
VALUES (1, 2), (1, 5), (1, 7), (1, 10), (2, 2), (2, 6), (2, 8), (2, 11), (3, 2), (3, 5), (3, 9), (3, 12), (4, 2), (4, 6), (4, 8), (4, 12);

DROP TABLE `users_has_sessions`;
CREATE TABLE `users_has_sessions` (
  `id_user` int,
  FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`),
  `id_session` int,
  FOREIGN KEY (`id_session`) REFERENCES `sessions` (`id_session`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO
  `users_has_sessions` (id_user, id_session)
VALUES (1, 1), (2, 2), (3, 3), (4, 4);
