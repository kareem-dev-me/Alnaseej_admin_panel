<template>
    <div>
        <b-alert v-model="active_alert" variant="success" dismissible>
            تم التفعيل،اعد تحميل الصفحة
        </b-alert>
        <b-alert v-model="deactive_alert" variant="danger" dismissible>
            تم التعطيل،اعد تحميل الصفحة
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
                    تفعيل
                </button>
                <button
                    class="btn btn-danger"
                    @click="deactive(method.id)"
                    v-if="method.active"
                >
                    تعطيل
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
                });
        }
    }
};
</script>

<style></style>
