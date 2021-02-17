CREATE TABLE IF NOT EXISTS `todo` (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        description varchar(255) NOT NULL,
        status enum('none','low','medium','important') NOT NULL DEFAULT 'None',
        enddate datetime,
        file blob
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      
      