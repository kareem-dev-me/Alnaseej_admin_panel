<template>
    <div>
        <b-alert v-model="active_alert" variant="success" dismissible>
            Activated, reload the page
        </b-alert>
        <b-alert v-model="deactive_alert" variant="danger" dismissible>
            Deactivated, reload the page
        </b-alert>

        <div class="main-card mb-3 card" v-for="user in users" :key="user.id">
            <div class="text-center">
                <b-img
                    v-if="user.imageUrl"
                    width="100%"
                    :src="user.imageUrl"
                    alt="User image"
                    fluid
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
                    Active user
                </button>
                <button
                    class="btn btn-danger"
                    v-if="user.enabled == true"
                    @click="deactive(user.id)"
                >
                    Deactive user
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

                console.log("mounted -> res", res);
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
                    console.log("mounted -> res", res);
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
                    console.log("mounted -> res", res);
                });
        }
    }
};
</script>

<style></style>
