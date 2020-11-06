<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            Created
        </b-alert>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">Add Subscription</h5>
                <form class="" @submit.prevent="add_subscription">
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
            subscriptionServiceAR: null,
            alert: false
        };
    },
    methods: {
        async add_subscription() {
            await this.$http
                .post(
                    "/admin/monthlySubscription/add",
                    {
                        credit: this.credit,
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
                    this.alert = true;
                });
        }
    }
};
</script>

<style></style>
