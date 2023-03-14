<template>
  <div class="q-pa-md">
    <AddressInfo v-for="addr in addresses" :key="addr.id" v-bind="addr" />
    <q-btn label="신규 주소 등록" tag="a" to="/AddressRegister"></q-btn>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import AddressInfo from 'components/AddressInfo.vue';
  import {mapState} from 'vuex';

  export default defineComponent({
    name: 'AddressList',
    data() {
      return {};
    },
    components: {
      AddressInfo,
    },
    computed: {
      ...mapState({
        addresses: state => state.addresses.items,
      }),
    },
    created() {
      this.$store.dispatch('addresses/getAllAddress');
    },
    mounted() {},
    methods: {},
  });
</script>
