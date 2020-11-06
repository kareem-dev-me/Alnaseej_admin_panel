<template>
    <div>
        <div v-for="item in subscriptions" :key="item.id">
            <div class="row text-center">
                <div class="col-md-4">
                    <p class="font-weight-bold ">Subscription service</p>
                    <p>
                        {{ item.subscriptionService }}
                    </p>
                </div>
                <div class="col-md-4">
                    <p class="font-weight-bold ">Subscription service arabic</p>
                    <p>{{ item.subscriptionServiceAR }}</p>
                </div>
                <div class="col-md-4">
                    <p class="font-weight-bold ">Credit</p>
                    <p>{{ item.credit }}</p>
                </div>
            </div>
            <div class="text-center">
                <b-button
                    class="mr-2 mb-2"
                    variant="warning"
                    v-b-modal.modal
                    @click="subscription = item"
                >
                    Edit
                </b-button>
                <b-button
                    class="mr-2 mb-2"
                    variant="danger"
                    @click="del(item.id)"
                >
                    delete
                </b-button>
            </div>

            <hr />
        </div>
        <b-modal id="modal" title="Edit" hide-footer>
            <form class="" @submit.prevent="edit(subscription.id)">
                <div class="position-relative form-group">
                    <label for="credit" class="">credit</label
                    ><input
                        id="credit"
                        v-model="subscription.credit"
                        placeholder="Credit"
                        type="number"
                        class="form-control"
                    />
                </div>

                <div class="position-relative form-group">
                    <label for="subscriptionService" class=""
                        >Subscription service</label
                    ><input
                        id="subscriptionService"
                        v-model="subscription.subscriptionService"
                        placeholder="Subscription service"
                        type="text"
                        class="form-control"
                    />
                </div>
                <div class="position-relative form-group">
                    <label for="subscriptionServiceAR" class=""
                        >Subscription service arabic</label
                    ><input
                        id="subscriptionServiceAR"
                        v-model="subscription.subscriptionServiceAR"
                        placeholder="Subscription service arabic"
                        type="text"
                        class="form-control"
                    />
                </div>

                <button class="mt-2 btn btn-primary">
                    Edit subscription
                </button>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            subscriptions: [],
            subscription: {
                credit: 0,
                subscriptionService: "",
                subscriptionServiceAR: ""
            }
        };
    },
    async mounted() {
        await this.$http
            .get("/admin/monthlySubscription", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                this.subscriptions = res.data;
                console.log("mounted -> res", res);
            });
    },
    methods: {
        async del(id) {
            if (confirm("Are you want to delete subscription?")) {
                await this.$http
                    .post(`/admin/monthlySubscription/delete/${id}`, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    })
                    .then(res => {
                        alert("Deleted");
                    });
            }
        },
        async edit(id) {
            await this.$http
                .post(
                    "/admin/monthlySubscription/edit",
                    {
                        credit: this.subscription.credit,
                        subscriptionService: this.subscription
                            .subscriptionService,
                        subscriptionServiceAR: this.subscription
                            .subscriptionServiceAR,
                        id: this.subscription.id
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                )
                .then(res => {
                    alert("Edited");
                });
        }
    }
};
</script>

<style></style>
