# pbr
PBR Website

## VHost conf
```
<VirtualHost *:80>
    DocumentRoot /var/www/html/pbr/public
    ServerName www.pbr.local
    DocumentRoot /var/www/html/pbr/public
    <Directory /var/www/html/pbr/public>
        AllowOverride None
        Order Allow,Deny
        Allow from All

        FallbackResource /index.php
    </Directory>

</VirtualHost>
```
