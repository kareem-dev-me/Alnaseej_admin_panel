<template>
    <div>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">Register Delivery Boy</h5>
                <form class="" @submit.prevent="register">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="email" class="">Email</label
                                ><input
                                    v-model="email"
                                    id="email"
                                    placeholder="Delivery boy email"
                                    type="email"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="password" class="">Password</label
                                ><input
                                    v-model="password"
                                    id="password"
                                    placeholder="Delivery boy password"
                                    type="password"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="position-relative form-group">
                        <label for="phone" class="">Phone</label
                        ><input
                            id="phone"
                            v-model="phone"
                            placeholder="Delivery boy phone number"
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="full_name" class="">Full name</label
                        ><input
                            id="full_name"
                            v-model="full_name"
                            placeholder="Delivery boy full name"
                            type="text"
                            class="form-control"
                        />
                    </div>

                    <button class="mt-2 btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null,
            full_name: null,
            phone: null
        };
    },
    methods: {
        async register() {
            await this.$http
                .post(
                    "/admin/register/deliveryBoy",
                    {
                        email: this.email,
                        password: this.password,
                        phone: this.phone,
                        fullName: this.full_name,
                        role: "ROLE_DELIVERY_BOY"
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
