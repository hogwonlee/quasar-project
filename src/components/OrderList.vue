<template>
  <div>
    <q-dialog v-model="register_popup">
      <AddressRegister class="q-px-sm q-pb-sm bg-secondary" />
    </q-dialog>
    <!-- 주소가 등록되었는지 여부와 상관없이 배송지 변경할 버튼이 노출되어야 함 -->

    <q-dialog v-model="address_popup">
      <AddressList class="q-px-sm q-pb-sm bg-secondary" />
    </q-dialog>

    <div class="q-pa-md bg-teal">
      <q-chip outline color="grey-1" class="bg-teal text-body3 text-grey-1">{{
        selected_local.orderlist
      }}</q-chip>
      <p v-show="!cartList.length">
        <i>{{ selected_local.noordernotice }}</i>
      </p>
      <div class="row q-pa-xs virtual-scroll-horizontal">
        <OrderItemInfo
          @sendOrderItem="
            this.$store.dispatch('cart/addProductToCart', product)
          "
          @sendRemoveItem="
            this.$store.dispatch('cart/removeProductFromCart', product)
          "
          @sendDeleteItem="
            this.$store.dispatch('cart/deleteProductFromCart', product)
          "
          class="col-xs-3 col-sm-3 col-md-2 q-pa-xs"
          v-for="product in cartProduct"
          :key="product.id"
          v-bind="product"
          v-bind:item-count="product.quantity"
        />
      </div>
    </div>

    <q-card class="q-py-sm bg-teal-2">
      <q-markup-table flat bordered class="q-ma-md justify-center">
        <tbody items-center>
          <tr class="row">
            <td class="text-left bg-teal col-4">
              {{ selected_local.foodprice }}
            </td>
            <td class="text-right col-8">
              {{ total }} {{ selected_local.won }}
            </td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">
              {{ selected_local.delivercost }}
            </td>
            <td class="text-right col-8">
              <q-chip
                dense
                color="teal"
                icon="new_releases"
                :label="selected_local.delivercostnotice"
                text-color="white"
              />
              {{ shipment }} {{ selected_local.won }}
            </td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">{{ selected_local.point }}</td>
            <td class="text-right col-8">5000 P</td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">{{ selected_local.total }}</td>
            <td class="text-right col-8">
              {{ total + shipment }} {{ selected_local.won }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <q-card class="bg-teal-2">
      <div v-if="user_status">
        <!-- <div>배송 주소 이름: {{ this.address_selected.address_tag }}</div>
      <div>수령인: {{ this.address_selected.recipient }}</div>
      <div>전화: {{ this.address_selected.recipient_phone }}</div> -->
        <div v-if="!is_addr_added">
          <q-input
            color="white-1"
            standout
            readonly
            :label="selected_local.noselectaddrnotice"
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-input>
          <q-btn
            class="text-bold absolute-top-right q-ma-sm"
            color="negative"
            :label="selected_local.addrresister"
            @click="register_popup = true"
          ></q-btn>
        </div>
        <div v-else-if="no_selected_addr">
          <q-input
            color="white-1"
            standout
            readonly
            :label="selected_local.noselectaddrnotice"
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-input>
          <q-btn
            class="text-bold absolute-top-right q-ma-sm"
            color="primary"
            :label="selected_local.change"
            @click="address_popup = true"
          ></q-btn>
        </div>
        <div v-else>
          <q-input
            color="white-1"
            standout
            readonly
            :label="selected_local.recipient"
            :model-value="this.address_selected.recipient"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-btn
            class="text-bold absolute-top-right q-ma-sm"
            color="primary"
            :label="selected_local.change"
            @click="address_popup = true"
          ></q-btn>
          <q-input
            color="white-1"
            standout
            readonly
            autogrow
            :label="selected_local.receiveaddr"
            :model-value="
              '(' +
              this.address_selected.address_tag +
              ') ' +
              this.address_selected.address1 +
              ' ' +
              this.address_selected.address2 +
              ' ' +
              this.address_selected.address3
            "
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-input>
        </div>
      </div>
      <div v-else>
        <q-input
          v-model="selected_local.nologinwarning"
          readonly
          standout
          color="red-10"
        ></q-input>
        <q-btn
          class="text-bold absolute-top-right q-ma-sm"
          color="negative"
          :label="selected_local.gotologinvue"
          tag="a"
          to="/UserInfo"
        ></q-btn>
      </div>
    </q-card>
    <div class="row justify-end">
      <div class="text-red text-bold q-pa-sm">
        <div v-if="no_selected_addr">{{ selected_local.needselectedaddr }}</div>
        <div v-if="no_login">{{ selected_local.needloginfirst }}</div>
      </div>
      <q-btn
        color="primary"
        size="22px"
        class="text-bold q-py-none q-px-xl q-ma-sm"
        :disabled="!cartList.length || no_selected_addr || no_login"
        :label="selected_local.checkout"
        @click="selectPaymentmethod(total, shipment)"
      >
        <!-- @click="set_order_with_address(this.address_selected.address_id)" -->
      </q-btn>
    </div>

    <!-- <p v-show="checkoutStatus">checkout {{ checkoutStatus }}.</p> -->
    <q-dialog v-model="basic" @show="selectPaymentmethod(total)">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ selected_local.checkout }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p id="payment-method"></p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            :label="selected_local.cancel"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            :label="selected_local.checkout"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><LoginPage
    /></q-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex';
  import OrderItemInfo from 'components/OrderItemInfo.vue';
  import LoginPage from 'components/LoginPage.vue';
  import {defineComponent, ref} from 'vue';
  import {loadTossPayments} from '@tosspayments/payment-sdk';
  import validation from 'src/util/data/validation';
  import AddressList from './AddressList.vue';
  import AddressRegister from './AddressRegister.vue';
  import {date} from 'quasar';
  const clientKey = 'test_ck_Lex6BJGQOVD5xn945RarW4w2zNbg';

  export default defineComponent({
    name: 'OrderList',
    components: {
      OrderItemInfo,
      LoginPage,
      AddressList,
      AddressRegister,
    },

    data: function () {
      return {
        basic: ref(false),
        persistent: ref(false),
        address_selected: '',
        address_popup: ref(false),
        register_popup: ref(false),
      };
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        cartList: state => state.cart.items,
        addressList: state => state.address.items,
        user: state => state.user.USER,
        order: state => state.order.items,
        user_status: state => state.user.status,
        selected_local: state => state.ui_local.status,
      }),
      ...mapGetters('cart', {
        cartProduct: 'cartProducts',
        total: 'cartTotalPrice',
        shipment: 'shipmentPrice',
      }),
      no_selected_addr() {
        return validation.isNull(this.address_selected);
      },
      no_login() {
        return validation.isNull(this.user.USER_ID);
      },
      is_addr_added() {
        return this.addressList.length;
      },
    },
    methods: {
      getSelectedAddress() {
        var return_addr;
        this.addressList.forEach(addr => {
          if (addr.is_default === 1) {
            return_addr = addr;
          }
        });
        this.address_selected = return_addr;
      },

      selectPaymentmethod(total, shipment) {
        var amountOfPayment = total + shipment;
        var random_id = 'test' + this.user.USER_ID + Date.now();
        loadTossPayments(clientKey).then(tossPayments =>
          tossPayments.requestPayment('카드', {
            amount: amountOfPayment,
            orderId: random_id,
            orderName:
              this.cartList[0].product_id +
              this.cartProduct[0].product_name +
              this.cartList[0].quantity +
              '...',
            customerName: this.user.USER_NAME,
            successUrl: 'http://localhost:9000/#/Success',
            failUrl: 'http://localhost:9000/#/Fail',
          }),
        );
      },
    },
    mounted() {
      this.getSelectedAddress();
    },
  });
</script>
