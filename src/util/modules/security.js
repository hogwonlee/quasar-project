/**
 * Security tools
 */
'use strict'

const crypto = window.crypto;

const SHA512 = 'sha512'

const rsaPubliceKey = process.env.RSA_PUBLICK_KEY ||
  `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6KCltiKg0aJ8MJc4WGG9
Lj+hiEWlpW+A8uTctBSvpOJK/MWEQ6UvQEx6KRIRbDcPwzkv4z2t+uw1aQ2zXXpP
ZvQiGy7hYb46UUNaAOyK47Iuz2jNmJpYKdXdMkCgrCj3XKF4xLYvwJdNkatNy7nd
ANEHbYeQ0UYLnw3aN6Nftv3U6gvDLFI8Fk8vlqua0k13DiA9hbM809L9XqML+oU3
3+CUrh0QUyan7tzI3Yg+ToiyAP/R6HXgjnDslMWLrBP6fyppNQRNx0yYuJ2kQaJf
piaus2H5QZDDV0TF/i8nRbhf+Rdl2fdCGx5EEb/241rgj6h4xCAJplQhiBzXK6eD
pQIDAQAB
-----END PUBLIC KEY-----`

const _encodeBase64 = (str) => {
  const buffer = Buffer.from(str, 'utf-8')
  return buffer.toString('base64')
}

const decodeBase64 = (str) => {
  const buffer = Buffer.from(str, 'base64')
  return buffer.toString('utf-8')
}


const encryptRsaContent = (plainText) => {
  if (!plainText) return ''
  return crypto.publicEncrypt(
    {
      key: rsaPubliceKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: SHA512,
    },
    Buffer.from(plainText)
  ).toString('base64')
}


export default {
  encryptRsaContent,
  encodeBase64: _encodeBase64,
};
