<template>
    <div>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">Set App Info</h5>
                <form class="" @submit.prevent="set_app_info">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="appImages" class=""
                                    >App images</label
                                ><input
                                    v-model="appImages"
                                    id="appImages"
                                    placeholder="Url http://...."
                                    type="text"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="baseUrl" class="">Base url</label
                                ><input
                                    v-model="baseUrl"
                                    id="baseUrl"
                                    placeholder="Base url"
                                    type="text"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>
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
                                <label for="phoneNumber" class="">Phone</label
                                ><input
                                    id="phoneNumber"
                                    v-model="phoneNumber"
                                    placeholder="Phone number"
                                    type="text"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="deliveryFees" class=""
                                    >Delivery fees</label
                                ><input
                                    id="deliveryFees"
                                    v-model="deliveryFees"
                                    placeholder="Delivery fees"
                                    type="number"
                                    class="form-control"
                                />
                            </div>
                        </div>
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
                    </div>
                    <div class="position-relative form-group">
                        <label for="facebook" class="">Facebook</label
                        ><input
                            id="facebook"
                            v-model="facebook"
                            placeholder="Facebook url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="twitter" class="">Twitter</label
                        ><input
                            id="twitter"
                            v-model="twitter"
                            placeholder="Twitter url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="instagram" class="">Instagram</label
                        ><input
                            id="instagram"
                            v-model="instagram"
                            placeholder="Instagram url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="snapchat" class="">Snapchat</label
                        ><input
                            id="snapchat"
                            v-model="snapchat"
                            placeholder="Snapchat url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>

                    <button class="mt-2 btn btn-primary">Set App Info</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            appImages: null,
            baseUrl: null,
            deliveryFees: null,
            email: null,
            facebook: null,
            id: null,
            instagram: null,
            phoneNumber: null,
            snapchat: null,
            twitter: null
        };
    },
    methods: {
        async set_app_info() {
            await this.$http
                .post(
                    "/admin/appInfo",
                    {
                        appImages: this.appImages,
                        baseUrl: this.baseUrl,
                        deliveryFees: this.deliveryFees,
                        email: this.email,
                        facebook: this.facebook,
                        id: this.id,
                        instagram: this.instagram,
                        phoneNumber: this.phoneNumber,
                        snapchat: this.snapchat,
                        twitter: this.twitter
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
