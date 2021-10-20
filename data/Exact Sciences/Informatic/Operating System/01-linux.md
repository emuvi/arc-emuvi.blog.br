+++
title = "Linux"
weight = 1
+++

## Let's Encript

### Certbot verificação por DNS

```
sudo apt install certbot python3-certbot-dns-rfc2136
sudo certbot certonly --manual --preferred-challenges dns
```

### Onde fica no Ubuntu os metadados das aplicações

´´´
/usr/share/applications
´´´