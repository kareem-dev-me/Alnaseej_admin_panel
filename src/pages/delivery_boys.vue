<template>
    <div>
        <b-alert v-model="active_alert" variant="success" dismissible>
            تم التفعيل،اعد تحميل الصفحة
        </b-alert>
        <b-alert v-model="deactive_alert" variant="danger" dismissible>
            تم التعطيل،اعد تحميل الصفحة
        </b-alert>
        <div class="main-card mb-3 card" v-for="user in users" :key="user.id">
            <div class="text-right">
                <b-img
                    style="border:2px solid #8F87F5"
                    width="200%"
                    alt="User image"
                    fluid
                    v-if="user.imageUrl"
                    :src="user.imageUrl"
                ></b-img>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ user.fullName }}</h5>
                <h6 class="card-subtitle">
                    {{ user.email }} | {{ user.phone }}
                </h6>
                <br />
                <button
                    class="btn btn-success"
                    v-if="user.enabled == false"
                    @click="active(user.id)"
                >
                    تفعيل
                </button>
                <button
                    class="btn btn-danger"
                    v-if="user.enabled == true"
                    @click="deactive(user.id)"
                >
                    تعطيل
                </button>
            </div>
        </div>
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
            active_alert: false,
            deactive_alert: false,
            currentPage: 1,
            rows: 0,
            perPage: 20
        };
    },
    async mounted() {
        this.getNew(1);
    },
    methods: {
        async deactive(id) {
            await this.$http
                .post(`/admin/deactivate/deliveryBoy/${id}`, {
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
                .post(`/admin/activate/deliveryBoy/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    this.active_alert = true;
                });
        },
        async getNew(e) {
            await this.$http
                .get(`/admin/deliveryBoys?page=${e - 1}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    this.rows = res.data.totalElements;
                    this.users = res.data.content;
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                });
        }
    }
};
</script>

<style></style>
