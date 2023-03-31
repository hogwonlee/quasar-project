import validation from '../data/validation';
import Cookie from 'js-cookie';

function check_login() {
  if (validation.isNull(Cookie.get('user'))) {
    return false;
  } else {
    return true;
  }
}

export default {
  check_login,
};
