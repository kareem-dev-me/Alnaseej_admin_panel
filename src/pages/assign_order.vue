<template>
    <div>
        <div v-for="order in orders" :key="order.id" class="mb-5">
            <b-card
                border-variant="primary"
                :header="`تاريخ الطلب: ${order.orderDate}`"
                header-bg-variant="primary"
                header-text-variant="white"
                align="center"
            >
                <b-card-text>
                    <div>
                        <p>وسيلة الدفع</p>
                        <p>
                            {{ order.paymentMethod.textEn }} |
                            {{ order.paymentMethod.textAR }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>مكان التسوق</p>
                        <p>
                            {{ order.shippingAddress.addressText }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>المستخدم</p>
                        <b-card>
                            <div class="text-center">
                                <b-img
                                    width="100%"
                                    v-if="order.user.imageUrl"
                                    :src="order.user.imageUrl"
                                    alt="User image"
                                    fluid
                                ></b-img>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">
                                    {{ order.user.fullName }}
                                </h5>
                                <h6 class="card-subtitle">
                                    {{ order.user.email }} |
                                    {{ order.user.phone }}
                                </h6>
                                <br />
                            </div>
                        </b-card>
                    </div>
                    <hr />
                    <div>
                        <p>المنتجات في العربة</p>
                        <b-card
                            v-for="product in order.cartItemList"
                            :key="product.id"
                        >
                            <div class="row">
                                <div class="col-md-4">
                                    <b-card
                                        :title="
                                            product.product.titleAr
                                                ? `${product.product.title} | ${product.product.titleAr}`
                                                : `${product.product.title}`
                                        "
                                        :img-src="
                                            product.product.imageUrl
                                                ? product.product.imageUrl
                                                : ''
                                        "
                                        img-alt="Image"
                                        img-top
                                        style="max-width: 20rem;"
                                        class="mb-2"
                                    >
                                        <b-card-text>
                                            {{ product.product.description }}
                                        </b-card-text>

                                        <b-button variant="primary"
                                            >الكمية: {{ product.qty }}</b-button
                                        >
                                    </b-card>
                                </div>
                            </div>
                        </b-card>
                    </div>
                    <hr />
                    <div>
                        <p>القسيمة</p>
                        <p>
                            {{
                                order.coupon
                                    ? `${order.coupon.code} | value: ${order.coupon.value}`
                                    : "No Cuopon"
                            }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>رسوم التوصيل</p>
                        <p>
                            {{ order.deliveryFees }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>المجموع الكلي للطلب</p>
                        <p>
                            {{ order.orderTotal }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>المجموع الجزئي للطلب</p>
                        <p>
                            {{ order.partialTotal }}
                        </p>
                    </div>
                    <hr />
                    <b-button
                        variant="primary"
                        block
                        v-b-modal.modal
                        @click="selected_order = order.id"
                        >تعين فتي توصيل</b-button
                    >
                </b-card-text>
            </b-card>
        </div>
        <b-modal id="modal" title="تعين فتى توصيل" hide-footer>
            <template v-for="item in users">
                <b-form-radio
                    class="text-left ltr pr-0 pl-4"
                    :key="item.value"
                    v-model="delivery_boy"
                    :name="item.text"
                    :value="item.value"
                    >{{ item.text }}</b-form-radio
                >
            </template>
            <b-pagination
                v-model="currentPageDelivery"
                :total-rows="rowsDelivery"
                :per-page="perPageDelivery"
                @change="getNewDeliveryBoys"
                class="mt-5 ltr pl-0"
            ></b-pagination>

            <b-button
                variant="primary"
                block
                class="my-3"
                @click="assign"
                :disabled="!delivery_boy"
                >تعين</b-button
            >
        </b-modal>
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            @change="getNew"
            class="mt-5"
        ></b-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            orders: [],
            delivery_boy: null,
            selected_order: null,
            currentPage: 1,
            rows: 0,
            perPage: 20,
            currentPageDelivery: 1,
            rowsDelivery: 0,
            perPageDelivery: 20
        };
    },
    async mounted() {
        this.getNew(1);
        this.getNewDeliveryBoys(1);
    },
    methods: {
        async assign() {
            await this.$http
                .post(
                    `/admin/assign/order/${this.selected_order}/deliveryBoy/${this.delivery_boy}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                )
                .then(res => {
                    alert("Assigned successfully");
                    this.selected_order = null;
                    this.delivery_boy = null;
                });
        },
        async getNew(e) {
            await this.$http
                .get(`/admin/newOrders?page=${e - 1}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    this.rows = res.data.totalElements;
                    this.orders = res.data.content;
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                });
        },
        async getNewDeliveryBoys(e) {
            await this.$http
                .get(`/admin/deliveryBoys?page=${e - 1}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    this.rowsDelivery = res.data.totalElements;
                    this.users = res.data.content.map(item => {
                        return { text: item.fullName, value: item.id };
                    });
                });
        }
    }
};
</script>

<style></style>
