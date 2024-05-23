<template>
  <div>
    <h3>구글 로그인 인증 리다이렉트</h3>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';

  const firebaseConfig = {
    apiKey: 'AIzaSyDkJGILjwCe1CIaGGJxpH3qxL9C08v-OGs',
    authDomain: 'cfomarket.store',
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
  } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

  const auth = getAuth(app);
  auth.languageCode = 'cn';
  import {GoogleAuthProvider} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
  const provider = new GoogleAuthProvider();

  export default defineComponent({
    name: 'GoogleLogin.vue',
    mounted() {
      this.googleLogin();
    },
    methods: {
      googleLogin() {
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
      },
    },
  });
</script>
