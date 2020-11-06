<template>
    <div>
        <div>
            <b-form-datepicker
                id="example-datepicker"
                v-model="date"
                class="px-2 py-2"
                @input="select"
            ></b-form-datepicker>
        </div>
        <div v-for="order in orders" :key="order.id">
            <b-card
                border-variant="primary"
                :header="order.orderDate"
                header-bg-variant="primary"
                header-text-variant="white"
                align="center"
            >
                <b-card-text>
                    <div>
                        <p>Payment method</p>
                        <p>
                            {{ order.paymentMethod.textEn }} |
                            {{ order.paymentMethod.textAR }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>Shipping address</p>
                        <p>
                            {{ order.shippingAddress.addressText }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>User</p>
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
                        <p>Cart item list</p>
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
                                            >quantity:
                                            {{ product.qty }}</b-button
                                        >
                                    </b-card>
                                </div>
                            </div>
                        </b-card>
                    </div>
                    <hr />
                    <div>
                        <p>Cuopon</p>
                        <p>
                            {{ order.coupon || "No Cuopon" }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>Delivery fees</p>
                        <p>
                            {{ order.deliveryFees }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>Order total</p>
                        <p>
                            {{ order.orderTotal }}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p>Partial total</p>
                        <p>
                            {{ order.partialTotal }}
                        </p>
                    </div>
                    <hr />
                </b-card-text>
            </b-card>
        </div>
        <div class="text-center" v-if="orders.length == 0">
            No orders in this day
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: null,
            orders: []
        };
    },
    methods: {
        async select(e) {
            await this.$http
                .get(`/admin/order/${e}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    this.orders = res.data.content || [];
                });
        }
    }
};
</script>

<style></style>
