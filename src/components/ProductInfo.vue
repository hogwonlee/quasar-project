<template>
  <!-- <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section> -->
  <div>
    <div @click="card = true">
      <q-img :src="this.productImg"> </q-img>
      <q-card-section>
        <div class="text-subtitle2 text-center">{{ title }} : {{ price }}</div>
      </q-card-section>
    </div>
    <div>
      <q-dialog v-model="card">
        <q-card class="my-card" style="width: 300px">
          <q-img :src="this.productImg" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{ this.title }}
              </div>
              <div
                class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
              >
                <q-icon name="place" />
                250 ft
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">$・Italian, Cafe</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn v-close-popup flat color="primary" label="ADD" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {ref} from 'vue';

  export default defineComponent({
    name: 'ProductInfo',
    props: {
      productImg: {
        type: Image,
        required: true,
      },
      title: {
        type: String,
        default: '',
      },

      price: {
        type: Int32Array,
        default: 0,
      },

      to: {
        type: String,
        default: '#',
      },
      itemCount: {
        type: Int8Array,
        default: 0,
      },
    },
    setup() {
      return {
        card: ref(false),
      };
    },
    methods: {},
  });
</script>
