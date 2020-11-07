<template>
    <div>
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">الايميل</p>
            </div>
            <div class="col-md-10">
                <p>{{ info.email }}</p>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">الجوال</p>
            </div>
            <div class="col-md-10">
                <p>{{ info.phoneNumber }}</p>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">رسوم التوصيل</p>
            </div>
            <div class="col-md-10">
                <p>{{ info.deliveryFees }}</p>
            </div>
        </div>
        <hr />
        <div class="form-row">
            <div class="col-md-2">
                <p class="font-weight-bold">الصور</p>
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
                <p class="font-weight-bold">فيسبوك</p>
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
                <p class="font-weight-bold">سناب شات</p>
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
                <p class="font-weight-bold">تويتر</p>
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
                <p class="font-weight-bold">انستجرام</p>
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
