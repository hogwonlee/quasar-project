<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h3">결제 실패 ...</div>
      <q-btn
        label="돌아가기"
        tag="a"
        to="/OrderList"
        color="positive"
        outline
      ></q-btn>
    </section>
  </q-page>
</template>

<script>
  import {mapState} from 'vuex';
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'PayFail',

    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
    },
  });
</script>
