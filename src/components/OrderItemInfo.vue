<template>
  <!-- <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section> -->
  <div>
    <q-img :src="this.productImg"> </q-img>
    <q-card-section>
      <div class="text-subtitle2 text-center">{{ this.itemCount }}개</div>
    </q-card-section>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';

  import {ref} from 'vue';

  export default defineComponent({
    name: 'OrderItemInfo',
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
      itemCount: Number,
    },
    setup() {
      return {
        card: ref(false),
      };
    },
  });
</script>
