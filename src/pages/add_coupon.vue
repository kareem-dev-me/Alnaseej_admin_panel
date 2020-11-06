<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            Created
        </b-alert>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">Add Subscription</h5>
                <form class="" @submit.prevent="add_coupon">
                    <div class="position-relative form-group">
                        <label for="value" class="">Value</label
                        ><input
                            id="value"
                            v-model="value"
                            placeholder="value"
                            type="number"
                            class="form-control"
                        />
                    </div>

                    <div class="position-relative form-group">
                        <label for="code" class="">Code</label
                        ><input
                            id="code"
                            v-model="code"
                            placeholder="Code"
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <label for="expirationDate" class="">Expiration date</label>
                    <b-form-datepicker
                        class="py-4 px-4"
                        v-model="expirationDate"
                        id="expirationDate"
                        placeholder="Expiration date"
                    ></b-form-datepicker>

                    <button class="mt-2 btn btn-primary">
                        Add coupon
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
            value: null,
            code: null,
            expirationDate: "",
            alert: false
        };
    },
    methods: {
        async add_coupon() {
            await this.$http
                .post(
                    "/admin/coupon/add",
                    {
                        code: this.code,
                        expirationDate: this.expirationDate,
                        value: this.value
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
                    console.log("mounted -> res", res);
                });
        }
    }
};
</script>

<style></style>
