<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            تمت الاضافة
        </b-alert>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">اضف الاشتراك</h5>
                <form class="" @submit.prevent="add_subscription">
                    <div class="position-relative form-group">
                        <label for="credit" class="">الائتمان</label
                        ><input
                            id="credit"
                            v-model="credit"
                            placeholder="الائتمان"
                            type="number"
                            class="form-control"
                        />
                    </div>

                    <div class="position-relative form-group">
                        <label for="subscriptionService" class=""
                            >خدمة الاشتراك</label
                        ><input
                            id="subscriptionService"
                            v-model="subscriptionService"
                            placeholder="خدمة الاشتراك"
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="subscriptionServiceAR" class=""
                            >خدمة الاشتراك بالعربية</label
                        ><input
                            id="subscriptionServiceAR"
                            v-model="subscriptionServiceAR"
                            placeholder="خدمة الاشتراك بالعربية"
                            type="text"
                            class="form-control"
                        />
                    </div>

                    <button class="mt-2 btn btn-primary">
                        اضف الاشتراك
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
