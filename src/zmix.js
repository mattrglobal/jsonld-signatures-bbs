const path = require('path');
var ref = require("ref");
const ffi = require('ffi');
var Struct = require('ref-struct');

const ByteArray = Struct({
  len: ref.types.long,
  data: 'pointer'
});
var ByteArrayPtr = ref.refType(ByteArray);

const api = ffi.Library(path.join(__dirname, './../bin/libzmix'), {
  zmix_bbs_generate: [ ref.types.int, [ByteArrayPtr, ByteArrayPtr]],
  zmix_bbs_sign: [ ref.types.int, [ref.types.CString, ByteArrayPtr, ByteArrayPtr]],
  zmix_bbs_verify: [ ref.types.int, [ref.types.CString, ByteArrayPtr, ByteArrayPtr]]
});

const generateKey = () => {
  var privateKey = ref.alloc(ByteArray);
  var publicKey = ref.alloc(ByteArray);

  const result = api.zmix_bbs_generate(privateKey, publicKey);

  if (result == 0) {
    throw Error("Failed to generate key");
  }

  return {
      publicKey: ref.reinterpret(publicKey.deref().data, publicKey.deref().len, 0),
      privateKey: ref.reinterpret(privateKey.deref().data, privateKey.deref().len, 0)
  }
}

function sign(message, privateKeyBuffer) {
  return signMulti([ message ], privateKeyBuffer);
}

function signMulti(messages, privateKeyBuffer) {
  var signature = ref.alloc(ByteArray);

  var privateKey = new ByteArray();
  privateKey.len = privateKeyBuffer.length;
  privateKey.data = privateKeyBuffer;
  
  const result = api.zmix_bbs_sign(JSON.stringify(messages), privateKey.ref(), signature);
  
  if (result == 0) {
    throw Error("Failed to sign");
  }

  return ref.reinterpret(signature.deref().data, signature.deref().len, 0)
}

function verify(message, publicKeyBuffer, signatureBuffer) {
  return verifyMulti([ message ], publicKeyBuffer, signatureBuffer);
}

function verifyMulti(messages, publicKeyBuffer, signatureBuffer) {
  var signature = new ByteArray();
  signature.len = signatureBuffer.length;
  signature.data = signatureBuffer;

  var publicKey = new ByteArray();
  publicKey.len = publicKeyBuffer.length;
  publicKey.data = publicKeyBuffer;

  return api.zmix_bbs_verify(JSON.stringify(messages), publicKey.ref(), signature.ref()) == 1;
}

module.exports = {
  generateKey: generateKey,
  sign: sign,
  signMulti: signMulti,
  verify: verify,
  verifyMulti: verifyMulti
};