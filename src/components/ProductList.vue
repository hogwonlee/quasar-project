<template>
  <q-input
    filled
    bottom-slots
    v-model="keyword"
    label="검색"
    counter
    maxlength="12"
    :dense="dense"
  >
    <template v-slot:append>
      <q-icon
        v-if="keyword !== ''"
        name="close"
        @click="keyword = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>

    <template v-slot:hint> 최대 12글자 </template>
  </q-input>
  <div class="row">
    <ProductInfo
      class="col-2"
      style="padding: 10px"
      v-for="productItem in productItems.filter(c =>
        c.title.includes(this.keyword),
      )"
      :key="productItem.title"
      v-bind="productItem"
    />
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import ProductInfo from 'components/ProductInfo.vue';
  import {ref} from 'vue';

  export default defineComponent({
    name: 'ProductList',
    created() {},
    methods: {},
    components: {
      ProductInfo,
    },
    created() {},
    setup() {
      return {
        productItems: productItem,
        keyword: ref(''),
        dense: ref(false),
      };
    },
  });

  const productItem = [
    {
      productImg: 'https://picsum.photos/256',
      title: '음료수',
      price: 1500,
      itemCount: 0,
      to: '',
    },
    {
      productImg: 'https://picsum.photos/256',
      title: '과자',
      price: 2500,
      itemCount: 0,
      to: '',
    },
    {
      productImg: 'https://picsum.photos/256',
      title: '아이스크림',
      price: 1900,
      itemCount: 0,
      to: '',
    },
    {
      productImg: 'https://picsum.photos/256',
      // productImg: 'https://picsum.photos/1024',
      title: '생크림빵',
      price: 5500,
      itemCount: 0,
      to: '',
    },
  ];
</script>
