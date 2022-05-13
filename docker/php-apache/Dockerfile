FROM php:8.1-apache

# Updates
RUN apt-get update && apt-get -y upgrade

# Packages
RUN apt-get install -y apt-utils git libonig-dev unzip zip zsh

# Intall ohmyzsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# PHP Extensions
RUN docker-php-ext-install mbstring pdo pdo_mysql

# Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# SSL Certificates
RUN openssl req -x509 -out /etc/ssl/certs/pbr.crt -keyout /etc/ssl/private/pbr.key -newkey rsa:2048 -nodes -sha256 -subj "/C=FR/ST=Paris/L=Paris/O=Security/OU=Development/CN=pbr.local"
RUN openssl req -x509 -out /etc/ssl/certs/shop.crt -keyout /etc/ssl/private/shop.key -newkey rsa:2048 -nodes -sha256 -subj "/C=FR/ST=Paris/L=Paris/O=Security/OU=Development/CN=shop.pbr.local"
RUN openssl req -x509 -out /etc/ssl/certs/vr.crt -keyout /etc/ssl/private/vr.key -newkey rsa:2048 -nodes -sha256 -subj "/C=FR/ST=Paris/L=Paris/O=Security/OU=Development/CN=vr.pbr.local"
RUN openssl req -x509 -out /etc/ssl/certs/midi.crt -keyout /etc/ssl/private/midi.key -newkey rsa:2048 -nodes -sha256 -subj "/C=FR/ST=Paris/L=Paris/O=Security/OU=Development/CN=midi.pbr.local"

# Apache vhosts
RUN a2enmod ssl
RUN a2enmod http2
COPY pbr.conf /etc/apache2/sites-available/pbr.conf
RUN a2ensite pbr.conf

# NodeJS
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
RUN npm i -g npm
RUN npm i -g gltf-pipeline