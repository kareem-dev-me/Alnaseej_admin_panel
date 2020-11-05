<template>
    <div>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">Add Subscription</h5>
                <form class="" @submit.prevent="add_subscription">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="id" class="">ID</label
                                ><input
                                    id="id"
                                    v-model="id"
                                    placeholder="ID"
                                    type="number"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="credit" class="">credit</label
                                ><input
                                    id="credit"
                                    v-model="credit"
                                    placeholder="Credit"
                                    type="number"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="position-relative form-group">
                        <label for="subscriptionService" class=""
                            >Subscription service</label
                        ><input
                            id="subscriptionService"
                            v-model="subscriptionService"
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
                            v-model="subscriptionServiceAR"
                            placeholder="Subscription service arabic"
                            type="text"
                            class="form-control"
                        />
                    </div>

                    <button class="mt-2 btn btn-primary">
                        Add subscription
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: null,
            credit: null,
            subscriptionService: null,
            subscriptionServiceAR: null
        };
    },
    methods: {
        async add_subscription() {
            await this.$http
                .post(
                    "/admin/monthlySubscription/add",
                    {
                        credit: this.credit,
                        id: this.id,
                        subscriptionService: this.subscriptionService,
                        subscriptionServiceAR: this.subscriptionServiceAR
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
                    console.log("mounted -> res", res);
                });
        }
    }
};
</script>

<style></style>
