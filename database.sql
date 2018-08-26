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
    latitude DOUBLE(10, 6) NOT NULL DEFAULT 0,
    longitude DOUBLE(10, 6) NOT NULL DEFAULT 0,
    picture VARCHAR(255) NOT NULL DEFAULT "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/shop-icon.png",
    zone INTEGER UNSIGNED NOT NULL,
    password VARCHAR(255) NOT NULL,
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
    ALTER TABLE transaction ADD score INTEGER NOT NULL,
    PRIMARY KEY (trans_id),
    CONSTRAINT cl_fk FOREIGN KEY (client_id) REFERENCES client(client_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT sh_fk FOREIGN KEY (shop_id) REFERENCES shop(shop_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB CHARACTER SET=UTF8;

INSERT INTO shop (shop_name, direction, category, latitude, longitude, picture, zone, password) VALUES 
('Tacos Don Miguelón', 'Avenida Santa Margarita 3849, La Toscana, 45136 Guadalajara, Jal', 1, 20.729723, -103.433157, 'http://ofaa.mx/wp-content/uploads/2015/12/01-Don-Miguelon-Plaza-Toscana.jpg', 1, 'taquitos'),
('Floreria Valle Real', 'Av. Santa Margarita 4646 Valle Real 45140 Zapopan, JAL', 5, 20.729688, -103.436050, 'https://www.citymarket.com.mx/images/departamentos/FLORERIA/corte-floreria.jpg', 1, 'floresitas'),
('Adonis Barberia Club', 'Av. Santa Margarita 4099 Local A13, Jardín Real, 45136 Zapopan, Jal', 3, 20.729189,  -103.435190, 'http://retaildesignblog.net/wp-content/uploads/2017/07/Jack-the-Clipper-flagship-barbershop-by-FormRoom-London-UK.png', 1, 'barbitas'),
('Hola Mundo', 'Av. Santa Margarita 4099 Local A13, Jardín Real, 45136 Zapopan, Jal', 2, 20.729189,  -103.435190, 'http://retaildesignblog.net/wp-content/uploads/2017/07/Jack-the-Clipper-flagship-barbershop-by-FormRoom-London-UK.png', 1, 'barbitas');

INSERT INTO client (names, last_names, mail, password) VALUES ('Luis', 'Palomino Trevilla', 'luispalominot@hotmail.com', 'themaster'), 
('Emanuel', 'Estrada Larios', 'em@nuel.xyz', 'hahaha'),
('Oscar Alejandro', 'Sierra Valdés', 'oscar@gmail.com', 'tepic');

INSERT INTO zone (zone_name) VALUES ('Zona Real');