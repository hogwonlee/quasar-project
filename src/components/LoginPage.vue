<template>
  <div class="q-pa-xs q-gutter-sm">
    <!-- <q-dialog persistent transition-show="scale" transition-hide="scale"> -->
    <q-card class="bg-white text-black">
      <q-card-section>
        <div class="text-h6">{{ selected_local.login }}</div>
      </q-card-section>

      <q-form @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="userId" :label="selected_local.identity" />
        <!-- lazy-rules
          :rules="[val => (val && val.length > 0) || '필수 입력']" -->

        <q-input
          filled
          v-model="userPw"
          :label="selected_local.password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-checkbox
          v-model="auto_login"
          :label="selected_local.auto_login"
          color="positive"
        ></q-checkbox>

        <div class="q-gutter-xs q-py-xs">
          <q-btn
            :label="selected_local.login"
            color="positive"
            outline
            @click="serverLogin"
          />
          <q-btn
            :label="selected_local.forgetpw"
            color="positive"
            outline
            @click="show_forget_pw"
          />
          <q-btn
            :label="selected_local.signup"
            @click="this.signUpWindow = true"
            color="positive"
            outline
          />
        </div>
        <q-btn
          label="구글 로그인"
          @click="googleLogin"
          color="positive"
          outline
        ></q-btn>
        <div
          id="g_id_onload"
          data-client_id="309960454694-47es81c2o8919hstmgaog7dngsmogfrh.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="redirect"
          data-login_uri="https://cfomarket.store"
          data-itp_support="true"
        ></div>

        <div
          class="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
      </q-form>
    </q-card>
    <q-dialog
      v-model="signUpWindow"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><SignUpPage
    /></q-dialog>
    <!-- </q-dialog> -->
  </div>
</template>

<script src="https://accounts.google.com/gsi/client" async></script>
<script type="module">
  import {defineComponent, ref} from 'vue';
  import SignUpPage from 'components/SignUpPage.vue';
  import axios from 'axios';
  import {mapActions, mapMutations, mapState} from 'vuex';
  // import check from 'src/util/modules/check';
  import alert from 'src/util/modules/alert';
  import configs from 'src/configs/';
  // import https from 'https';
  // import security from 'src/util/modules/security';

  // Import the functions you need from the SDKs you need
  import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
  // Your web app's Firebase configuration
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyDkJGILjwCe1CIaGGJxpH3qxL9C08v-OGs',
  //   authDomain: 'hellohogwon.firebaseapp.com',
  //   projectId: 'hellohogwon',
  //   storageBucket: 'hellohogwon.appspot.com',
  //   messagingSenderId: '309960454694',
  //   appId: '1:309960454694:web:8d7e5ef8f0cd31163e6ce7',
  // };

  const firebaseConfig = {
    // apiKey: 'AIzaSyDkJGILjwCe1CIaGGJxpH3qxL9C08v-OGs',
    authDomain: 'cfomarket.store',
    // databaseURL: 'https://cfomarket.store',
    // projectId: 'hellohogwon',
    // appId: '1:309960454694:web:8d7e5ef8f0cd31163e6ce7',
    // Obtain the following from the "Add Firebase to your web app" dialogue
    // Initialize Firebase

    apiKey: 'AIzaSyDkJGILjwCe1CIaGGJxpH3qxL9C08v-OGs',
    // authDomain: 'hellohogwon.firebaseapp.com',
    //   databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: 'hellohogwon',
    storageBucket: 'hellohogwon.appspot.com',
    messagingSenderId: '309960454694',
    appId: '1:309960454694:web:8d7e5ef8f0cd31163e6ce7',
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import {
    getAuth,
    getRedirectResult,
    signInWithRedirect,
  } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

  const auth = getAuth(app);
  auth.languageCode = 'cn';
  import {GoogleAuthProvider} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
  const provider = new GoogleAuthProvider();

  // createUserWithEmailAndPassword(auth, email, password)
  //   .then(userCredential => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //     console.log(user);
  //   })
  //   .catch(error => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //     console.log(error);
  //   });

  // signInWithEmailAndPassword(auth, email, password)
  //   .then(userCredential => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch(error => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

  export default defineComponent({
    components: {
      SignUpPage,
    },
    data() {
      return {
        userPw: '',
        userId: '',
      };
    },
    computed: {
      ...mapState({
        user: state => state.user.USER,
        address: state => state.address.items.all,
        selected_local: state => state.ui_local.status,
      }),
    },
    methods: {
      show_forget_pw() {
        alert.confirm(
          this.selected_local.forget_pw_title,
          this.selected_local.forget_pw_body,
        );
      },

      async serverLogin() {
        // debugger;
        // if (!check.check_login()) {
        const userData = {
          user_id: this.userId,
          user_pw: this.userPw,
        };
        // console.log(JSON.stringify(userData));
        let response = await axios({
          url: `${configs.server}/login`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
          },
          data: userData,
        }).catch(response => {
          console.log(JSON.stringify(response));
          alert.confirm(
            this.selected_local.notice,
            this.selected_local.wrongpw +
              ': [' +
              this.selected_local.identity +
              ': ' +
              userData.user_id +
              '] [' +
              this.selected_local.password +
              ': ' +
              userData.user_pw +
              ']',
          );
        });

        // .then(response => {
        //   console.log(JSON.stringify(response));
        //   if (response.status == 200) {
        var json = response.data;

        if (this.auto_login) {
          json.user_pw = userData.user_pw;
        } else {
          json.user_pw = '';
        }
        this.$store.dispatch('user/loginAction', {
          data: json,
          that: this,
        });
        // this.$store.dispatch('address/emptyAddressAction');
        // json.results.forEach(addr => {
        //   if (addr.address_active == 1)
        //     this.$store.dispatch('address/addAddressAction', addr);
        // });
        // } else {
        //   console.log('what error');
        // }
        // })
        // .catch(ex => {
        //   //expected error
        //   if (ex.response && ex.response.status == 400) {
        //     alert.confirm(
        //       this.selected_local.notice,
        //       this.user.USER_ID + this.selected_local.wrongpw,
        //     );
        //   } else {
        //     //unexpected
        //     console.log('로그인 중 예상치 못한 오류가 발생했습니다.');
        //   }
        // });
        // } else {
        //   var alert_msg = this.user.USER_NAME + selected_local.loginnotice;
        //   alert.confirm(selected_local.notice, alert_msg);
        // }
      },
      onReset() {
        userId.value = null;
        userPw.value = null;
        accept.value = false;
      },
      googleLogin() {
        signInWithRedirect(auth, provider);
        getRedirectResult(auth)
          .then(result => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = provider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log('google user: ' + user);
          })
          .catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = provider.credentialFromError(error);
            // ...
            console.log('google login error: ' + errorMessage);
          });
        // signInWithPopup(auth, provider)
        //   .then(result => {
        //     // This gives you a Google Access Token. You can use it to access the Google API.
        //     const credential = GoogleAuthProvider.credentialFromResult(result);
        //     const token = credential.accessToken;
        //     // The signed-in user info.
        //     const user = result.user;
        //     // IdP data available using getAdditionalUserInfo(result)
        //     console.log('구글로그인');
        //     // ...
        //   })
        //   .catch(error => {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     const email = error.customData.email;
        //     // The AuthCredential type that was used.
        //     const credential = GoogleAuthProvider.credentialFromError(error);
        //     // ...
        //   });
      },
    },

    setup() {
      const accept = ref(false);
      return {
        accept,
        isPwd: ref(true),
        signUpWindow: ref(false),
        auto_login: ref(true),
      };
    },
  });
</script>
