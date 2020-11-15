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
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            active_alert: false,
            deactive_alert: false
        };
    },
    async mounted() {
        await this.$http
            .get("/admin/Users?size=100", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                this.users = res.data.content;
            });
    },
    methods: {
        async deactive(id) {
            await this.$http
                .post(`/admin/deactivate/user/${id}`, {
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
                .post(`/admin/activate/user/${id}`, {
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
