function isNull(data) {
  if (data == null || data == undefined || data == '') {
    return true;
  } else {
    return false;
  }
}

function isNum(data) {
  const isNumRegex = /^[0-9]*$/;
  if (!isNumRegex.test(data)) {
    return true;
  } else {
    return false;
  }
}

function isEmail(data) {
  const isEmailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!isEmailRegex.test(data)) {
    return true;
  } else {
    return false;
  }
}

function isPhone(data) {
  const isPhoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
  if (!isPhoneRegex.test(data)) {
    return true;
  } else {
    return false;
  }
}

function isPw(data) {
  const isPw = data.length;
  if (isPw < 6 || isPw > 20) {
    return true;
  } else {
    return false;
  }
}

function isPrice(data) {
  if (data < 1000 || data > 5000000) {
    return true;
  } else {
    return false;
  }
}

function isLength(data, length) {
  if (data.length > length) {
    return true;
  } else {
    return false;
  }
}

function isStock(data) {
  if (data < 10 || data > 5000) {
    return true;
  } else {
    return false;
  }
}

function isCompare(data, data2) {
  if (data == data2) return true;
  else return false;
}

export default {
  isNull,
  isNum,
  isEmail,
  isPhone,
  isPw,
  isPrice,
  isLength,
  isStock,
  isCompare,
};
