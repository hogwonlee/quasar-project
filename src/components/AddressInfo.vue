<template>
  <div class="q-pa-none q-ma-xs">
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold q-mx-sm q-pa-none q-my-none">
          {{ '(' + address_tag + ') ' + recipient }}
          <q-chip
            class="q-py-none q-my-none"
            v-if="is_default"
            dense
            text-color="secondary"
          >
            {{ selected_local.defaultaddr }}
          </q-chip>
        </div>
        <q-space />
        <q-fab
          v-model="addr_option"
          icon="settings"
          text-color="positive"
          color="white"
          padding="sm"
          class="absolute-top-right"
          direction="left"
        >
          <q-fab-action
            v-if="!is_default"
            color="white"
            text-color="positive"
            padding="none"
            :label="selected_local.changedefaultaddr"
            @click="this.$emit('send_change_default')"
          />
          <q-fab-action
            color="white"
            text-color="positive"
            padding="none"
            :label="selected_local.changeaddrinfo"
            @click="this.$emit('send_change_addr')"
          />

          <q-fab-action
            v-if="!is_default"
            color="white"
            text-color="negative"
            padding="none"
            :label="selected_local.del"
            @click="this.$emit('send_delete')"
          />
        </q-fab>
      </q-card-section>
    </q-card>

    <q-input
      class="col-md-3 col-sm-6 col-xs-6 q-ma-none q-pa-none q-mx-sm"
      borderless
      readonly
      :model-value="recipient_phone"
      mask="(###)####-####"
      style="height: 30px"
    >
    </q-input>
    <div class="q-ma-sm">
      {{ address1 + ' ' + address2 + ' ' + address3 }}
    </div>
  </div>
</template>

<script>
  import {defineComponent, ref} from 'vue';
  import {mapState} from 'vuex';

  export default defineComponent({
    name: 'AddressInfo',
    data: function () {
      return {};
    },
    computed: {
      ...mapState({
        user: state => state.user.USER,
        addressList: state => state.address.items,
        address_status: state => state.address.status,
        selected_local: state => state.ui_local.status,
      }),
    },
    props: {
      address_tag: {
        type: String,
        default: '',
      },
      address_id: {
        type: String,
        default: '',
      },
      is_default: {
        type: String,
        default: '',
      },
      recipient: {
        type: String,
        default: '',
      },
      recipient_phone: {
        type: Boolean,
        default: false,
      },
      post_code: {
        type: String,
        default: '',
      },
      address1: {
        type: String,
        default: '',
      },
      address2: {
        type: String,
        default: '',
      },
      address3: {
        type: String,
        default: '',
      },
    },
    setup() {
      return {
        addr_option: ref(false),
      };
    },
    methods: {},
  });
</script>
