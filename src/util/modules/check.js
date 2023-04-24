import validation from '../data/validation';
// import Cookie from 'js-cookie';
import user from 'src/store/user/userInfo';
import {mapActions, mapState} from 'vuex';

function check_login() {
  // if (validation.isNull(Cookie.get('user'))) {
  if (validation.isNull(user.USER_ID)) {
    return false;
  } else {
    return true;
  }
}

export default {
  check_login,
  computed: {
    ...mapState({
      user: state => state.user.USER,
    }),
  },
};
