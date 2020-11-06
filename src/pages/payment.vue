<template>
    <div>
        <b-alert v-model="active_alert" variant="success" dismissible>
            Activated, reload the page
        </b-alert>
        <b-alert v-model="deactive_alert" variant="danger" dismissible>
            Deactivated, reload the page
        </b-alert>
        <div
            class="main-card mb-3 card"
            v-for="method in methods"
            :key="method.id"
        >
            <div class="card-body">
                <h5 class="card-title">{{ method.textEn }}</h5>
                <h6 class="card-subtitle">
                    {{ method.textAR }}
                </h6>

                <br />
                <button
                    class="btn btn-success"
                    @click="active(method.id)"
                    v-if="!method.active"
                >
                    Active
                </button>
                <button
                    class="btn btn-danger"
                    @click="deactive(method.id)"
                    v-if="method.active"
                >
                    Deactive
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            methods: [],
            active_alert: false,
            deactive_alert: false
        };
    },
    async mounted() {
        await this.$http
            .get("/admin/paymentMethod", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                this.methods = res.data;
                console.log("mounted -> res", res);
            });
    },
    methods: {
        async deactive(id) {
            await this.$http
                .post(`/admin/deactivate/paymentMethod/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    this.deactive_alert = true;
                    console.log("mounted -> res", res);
                });
        },
        async active(id) {
            await this.$http
                .post(`/admin/activate/paymentMethod/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    this.active_alert = true;
                    console.log("mounted -> res", res);
                });
        }
    }
};
</script>

<style></style>
