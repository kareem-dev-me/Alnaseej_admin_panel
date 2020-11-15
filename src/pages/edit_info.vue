<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            تم التحديث
        </b-alert>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">تعديل معلومات التطبيق</h5>
                <form class="" @submit.prevent="edit_app_info" ref="form">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="email" class="">الايميل</label
                                ><input
                                    v-model="info.email"
                                    id="email"
                                    placeholder="الايميل"
                                    type="email"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="phoneNumber" class="">الجوال</label
                                ><input
                                    id="phoneNumber"
                                    v-model="info.phoneNumber"
                                    placeholder="الجوال"
                                    type="text"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <label for="image" class="">الصور</label>

                    <b-form-file
                        id="image"
                        placeholder="اختر صورة"
                        drop-placeholder="اسقط الصورة هنا"
                        name="image"
                        multiple
                        @input="Filevalidation"
                        v-model="images"
                        accept="image/*"
                    ></b-form-file>
                    <p class="text-primary mr-1">اقصى مساحة للصورة 10MB</p>

                    <div class="position-relative form-group">
                        <label for="deliveryFees" class="">رسوم التوصيل</label
                        ><input
                            id="deliveryFees"
                            v-model="info.deliveryFees"
                            placeholder="رسوم التوصيل"
                            type="number"
                            class="form-control"
                        />
                    </div>

                    <div class="position-relative form-group">
                        <label for="facebook" class="">فيسبوك</label
                        ><input
                            id="facebook"
                            v-model="info.facebook"
                            placeholder="Facebook url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="twitter" class="">تويتر</label
                        ><input
                            id="twitter"
                            v-model="info.twitter"
                            placeholder="Twitter url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="instagram" class="">انستجرام</label
                        ><input
                            id="instagram"
                            v-model="info.instagram"
                            placeholder="Instagram url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="snapchat" class="">سناب شات</label
                        ><input
                            id="snapchat"
                            v-model="info.snapchat"
                            placeholder="Snapchat url http://...."
                            type="text"
                            class="form-control"
                        />
                    </div>

                    <button class="mt-2 btn btn-primary">
                        تعديل معلومات التطبيق
                    </button>
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
            alert: false,
            images: null
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
                this.info = res.data;
            });
    },
    methods: {
        async edit_app_info() {
            const fs = new FormData(this.$refs.form);
            fs.append(
                "data",
                JSON.stringify({
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
        },
        Filevalidation(e) {
            for (let i of e) {
                if (i.size > 10000000) {
                    alert("Max image size 10MB");
                    this.images = [];
                }
            }
        }
    }
};
</script>

<style></style>
