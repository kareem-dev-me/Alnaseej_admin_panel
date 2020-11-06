<template>
    <div>
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">Email</p>
            </div>
            <div class="col-md-10">
                <p>{{ info.email }}</p>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">Phone number</p>
            </div>
            <div class="col-md-10">
                <p>{{ info.phoneNumber }}</p>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">Delivery fees</p>
            </div>
            <div class="col-md-10">
                <p>{{ info.deliveryFees }}</p>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">Images</p>
            </div>
            <div class="col-md-10">
                <div class="row">
                    <div
                        class="col-md-3"
                        v-for="image in info.appImages.split(',')"
                        :key="image"
                    >
                        <b-img
                            :src="`${info.baseUrl}${image}`"
                            fluid
                            alt="image"
                        ></b-img>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">Facebook</p>
            </div>
            <div class="col-md-10">
                <a :href="`${info.facebook}`" target="_blank">{{
                    info.facebook
                }}</a>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">Snapchat</p>
            </div>
            <div class="col-md-10">
                <a :href="`${info.snapchat}`" target="_blank">{{
                    info.snapchat
                }}</a>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">Twitter</p>
            </div>
            <div class="col-md-10">
                <a :href="`${info.twitter}`" target="_blank">{{
                    info.twitter
                }}</a>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">Instagram</p>
            </div>
            <div class="col-md-10">
                <a :href="`${info.instagram}`" target="_blank">{{
                    info.instagram
                }}</a>
            </div>
        </div>
        <hr />
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: { appImages: "" }
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
    }
};
</script>

<style></style>
