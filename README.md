# pbr
PBR Website

### Install SSL
```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/pbr.key -out /etc/ssl/certs/pbr.crt -subj "/C=FR/ST=Paris/L=Paris/O=Security/OU=Development/CN=pbr.local"
```

### VHost
```
<VirtualHost *:80>
   ServerName pbr.local 
   Redirect "/" "https://pbr.local/"
</VirtualHost>

<VirtualHost *:443>
    DocumentRoot "/var/www/html/workspace/pbr/public"
    ServerName pbr.local       

    SSLEngine on
    SSLCertificateFile "/etc/ssl/certs/pbr.crt"
    SSLCertificateKeyFile "/etc/ssl/private/pbr.key"

    Protocols h2 http/1.1
    
    <Directory /var/www/html/workspace/pbr/public>
        AllowOverride None
        Order Allow,Deny
        Allow from All

        FallbackResource /index.php
    </Directory>
</VirtualHost>
```