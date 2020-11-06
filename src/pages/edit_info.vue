<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            Updated
        </b-alert>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">Set App Info</h5>
                <form class="" @submit.prevent="edit_app_info" ref="form">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="email" class="">Email</label
                                ><input
                                    v-model="info.email"
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
                                    v-model="info.phoneNumber"
                                    placeholder="Phone number"
                                    type="text"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <label for="image" class="">Images</label>

                    <b-form-file
                        id="image"
                        placeholder="Choose a image"
                        drop-placeholder="Drop image here..."
                        name="image"
                        multiple
                    ></b-form-file>

                    <div class="position-relative form-group">
                        <label for="deliveryFees" class="">Delivery fees</label
                        ><input
                            id="deliveryFees"
                            v-model="info.deliveryFees"
                            placeholder="Delivery fees"
                            type="number"
                            class="form-control"
                        />
                    </div>

                    <div class="position-relative form-group">
                        <label for="facebook" class="">Facebook</label
                        ><input
                            id="facebook"
                            v-model="info.facebook"
                            placeholder="Facebook url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="twitter" class="">Twitter</label
                        ><input
                            id="twitter"
                            v-model="info.twitter"
                            placeholder="Twitter url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="instagram" class="">Instagram</label
                        ><input
                            id="instagram"
                            v-model="info.instagram"
                            placeholder="Instagram url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="snapchat" class="">Snapchat</label
                        ><input
                            id="snapchat"
                            v-model="info.snapchat"
                            placeholder="Snapchat url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>

                    <button class="mt-2 btn btn-primary">Edit app info</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {},
            alert: false
        };
    },

    async mounted() {
        await this.$http
            .get("/admin/appInfo", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                console.log("mounted -> res", res.data);
                this.info = res.data;
            });
    },
    methods: {
        async edit_app_info() {
            const fs = new FormData(this.$refs.form);
            fs.append(
                "data",
                JSON.stringify({
                    baseUrl: this.info.baseUrl,
                    deliveryFees: this.info.deliveryFees,
                    email: this.info.email,
                    facebook: this.info.facebook,
                    id: this.info.id,
                    instagram: this.info.instagram,
                    phoneNumber: this.info.phoneNumber,
                    snapchat: this.info.snapchat,
                    twitter: this.info.twitter
                })
            );
            await this.$http
                .post("/admin/appInfo/edit", fs, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    this.alert = true;
                });
        }
    }
};
</script>

<style></style>
