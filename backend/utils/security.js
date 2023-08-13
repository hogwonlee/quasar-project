'use strict'

const crypto = require('crypto')
const SHA512 = 'sha512'

const rsaPrivateKey = process.env.RSA_PRIVATE_KEY ||
  `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA6KCltiKg0aJ8MJc4WGG9Lj+hiEWlpW+A8uTctBSvpOJK/MWE
Q6UvQEx6KRIRbDcPwzkv4z2t+uw1aQ2zXXpPZvQiGy7hYb46UUNaAOyK47Iuz2jN
mJpYKdXdMkCgrCj3XKF4xLYvwJdNkatNy7ndANEHbYeQ0UYLnw3aN6Nftv3U6gvD
LFI8Fk8vlqua0k13DiA9hbM809L9XqML+oU33+CUrh0QUyan7tzI3Yg+ToiyAP/R
6HXgjnDslMWLrBP6fyppNQRNx0yYuJ2kQaJfpiaus2H5QZDDV0TF/i8nRbhf+Rdl
2fdCGx5EEb/241rgj6h4xCAJplQhiBzXK6eDpQIDAQABAoIBAQC1y1W1ULp9GY4U
KxlNeJRvYCrMZCFfeBQ9vbz8vm3FXVNc1r7WXnDevuV40zXqa91Vo4tY+wrL3Wyf
/KT/mGYU/xToSWq5CABrIUdlEXY5GzaZwD1r1LKxfwCuFPN7l0g4i7flgrsutw9X
l5fkbgvYZ4J2hksWQLc0RY8TjAlw5s+Og+xxvMTFAR7bXFblEDpLa2sdam4SagwF
hheoQRwtiV32RvMmlehWLKCZU8SQKIQOX4VD+w1UF7qpPAY4cdOnTuNS1PGWHYRp
xGQfev/Csk+sZyE51t6mkqyobiK7kMOHH2yirac3HyISzXmaWzEBbmL91PsJPkZc
NxAkzsjBAoGBAOoyMLKk7GK1GeAkQbwFh6+RPFs2feFuyHXHN1CjtlEY/fcerOcb
lXMk6Ficowdsk7EtYDFJ5OAdCnkWd7VsCxjY0ituVa1iBbkCAKmHqhcTjCF4Kj2v
OvQL5irB0Y+0+1q+dh7nVA9Xp+9ngB6OgQ5YQe490A98+Rqm+xMTCnwPAoGBAP5J
EqwhyJXzsWmJT3egB+v6bCD3NUyx777vs+IinuTxuV7xECTUrD4+2n4jrsMPKFN8
g0xO6ONBoT0vfsjKwEicp67uoNlIVJOzXsT2wVgt56LAQxnbeMveRurqVlaoO8kM
Y8HwWMWnW/kVf4XrBRxewFS4arl4e/qCxjZ7JeELAoGBAIrDKEWBIKqvoWBEO0qb
gDTPehKVa+qZiF74pda62biddUTpwQrCNj/eO2jdjl9EvxG40AkEPn9n1Z+/Zzhw
hva26XhgTJWJwdhHznqkbmxz4ZCnMWgRHn4hWsQ0yOU8F75BoZ1X9V+N0WwxSCFS
0Dbeplnx+AhlRPe8voEjxA+TAoGBAOXXXNZTjv/jDlgrMbYZ4y8r4jKF4Bpbty0p
crmSu3aK+xfS4tm3lZyJqWpcjGlpOPUFVZRSuvQ27Svl0z5g7R504qgeryrW0wPS
HHYB587xZy7Xg49KrkvvtMA/Yhzf4XIfDchNm5/EX0CsauC8BpmXF1c8fdL5EW7k
Z471Ds7zAoGAaJnFdOLmFlMSpBnZamzBNSIcPMm7TxaT3i10S+0j3fbtTJufbEG7
63rFpyCX57mdp1LCSRpzGkKLHGGAkM2RbUB96RITKsl56bPukV+hyXsMr1F6c1QT
gzRtZG4cexvi7lPxoq8QVzKM6z6VXEVtBFWcnq1IX/74DqDB+Pt/k/Q=
-----END RSA PRIVATE KEY-----`

exports.decryptRsaContent = (secureContext) => {
  if (!secureContext) return ''
  return crypto.privateDecrypt(
    {
      key: rsaPrivateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: SHA512,
    },
    Buffer.from(secureContext, 'base64')).toString('utf8')
}
