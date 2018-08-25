CREATE DATABASE solidario;

GRANT ALL ON solidario.* TO 'maestro'@'%' IDENTIFIED BY 'themaster';

USE solidario;

CREATE TABLE category (
    cat_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    display_name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (cat_id)
) ENGINE=INNODB CHARACTER SET=UTF8;

INSERT INTO category (display_name) VALUES ('Restaurantes', 'Tienditas', 'Belleza', 'Servicios', 'Otros');

CREATE TABLE client (
    client_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    names VARCHAR(32) NOT NULL,
    last_names VARCHAR(64),
    mail VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    score INTEGER UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (client_id)
) ENGINE=INNODB CHARACTER SET=UTF8;

CREATE TABLE zone (
    zone_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    zone_name VARCHAR(128) NOT NULL,
    PRIMARY KEY (zone_id)
);

CREATE TABLE shop (
    shop_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    shop_name VARCHAR(64) NOT NULL UNIQUE,
    direction VARCHAR(255) NOT NULL,
    category TINYINT UNSIGNED NOT NULL,
    latitude DECIMAL NOT NULL DEFAULT 0,
    longitude DECIMAL NOT NULL DEFAULT 0,
    picture VARCHAR(255) NOT NULL DEFAULT "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/shop-icon.png",
    zone INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (shop_id),
    CONSTRAINT cat_fk FOREIGN KEY (category) REFERENCES category(cat_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT zn_fk FOREIGN KEY (zone) REFERENCES zone(zone_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB CHARACTER SET=UTF8;

CREATE TABLE transaction (
    trans_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    trans_date DATETIME NOT NULL,
    client_id INTEGER UNSIGNED,
    shop_id INTEGER UNSIGNED NOT NULL,
    trans_type ENUM('buy', 'exchange') NOT NULL,
    PRIMARY KEY (trans_id),
    CONSTRAINT cl_fk FOREIGN KEY (client_id) REFERENCES client(client_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT sh_fk FOREIGN KEY (shop_id) REFERENCES shop(shop_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB CHARACTER SET=UTF8;
