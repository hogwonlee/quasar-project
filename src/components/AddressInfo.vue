<template>
  <q-card dark bordered class="bg-grey-9 my-card">
    <q-card-section>
      <div class="text-h6">{{ id }}</div>
      <div class="text-h6">{{ recipient }}</div>
      <div class="text-subtitle2">{{ recipientPhone }}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      <div class="text-body2">{{ postCode }}</div>
      <div class="text-body2">{{ address }}</div>
      <div class="text-body2">{{ selected }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'AddressInfo',
    data: function () {
      return {};
    },
    watch: {},
    props: {
      id: {
        type: Number,
        default: 0,
      },
      recipient: {
        type: String,
        default: '',
      },
      recipientPhone: {
        type: String,
        default: '',
      },
      postCode: {
        type: String,
        default: '',
      },
      address: {
        type: String,
        default: '',
      },
      selected: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      return {};
    },
    methods: {},
  });
</script>
