if [ -f "sslkey/ssl.crt" ]; then
  exit 0
fi
if [ ! -d "sslkey" ]; then
    mkdir -p sslkey
fi

# CA key
openssl genrsa -out ./sslkey/ca.key 2048
openssl req \
    -subj "/C=CN/ST=Seoul/L=Seoul/O=Mocha/OU=Mocha Software/CN=cfomarket0.cafe24.com/emailAddress=admin@cfomarket0.cafe24.com" \
    -new \
    -key ./sslkey/ca.key \
    -out ./sslkey/ca.csr

openssl x509 -req  -days 365 -in ./sslkey/ca.csr -signkey ./sslkey/ca.key -out ./sslkey/ca.crt

# SSL key
openssl genrsa -out ./sslkey/ssl.key 2048

openssl req \
    -subj "/C=CN/ST=Seoul/L=Seoul/O=Mocha/OU=Mocha Software/CN=cfomarket0.cafe24.com/emailAddress=admin@cfomarket0.cafe24.com" \
    -new \
    -key ./sslkey/ssl.key \
    -out ./sslkey/ssl.csr

openssl x509 \
    -req \
    -days 36500 \
    -in ./sslkey/ssl.csr \
    -CAkey ./sslkey/ca.key \
    -CA ./sslkey/ca.crt \
    -set_serial 01 \
    -out ./sslkey/ssl.crt

cat ./sslkey/ca.crt >> ./sslkey/ssl.crt

# 验证
# openssl x509 -in ./sslkey/ssl.crt -text -noout
# openssl verify -CAfile ./sslkey/ca.crt ./sslkey/ssl.crt
