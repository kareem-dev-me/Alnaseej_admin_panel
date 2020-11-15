<template>
    <div>
        <b-alert
            v-model="alert"
            :variant="err ? 'danger' : 'success'"
            dismissible
        >
            {{ err || "تمت الاضافة" }}
        </b-alert>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">تسجيل مستخدم</h5>

                <form class="" @submit.prevent="register" ref="form">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="email" class="">الايميل</label
                                ><input
                                    v-model="email"
                                    id="email"
                                    placeholder="الايميل"
                                    type="email"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="position-relative form-group">
                                <label for="password" class=""
                                    >كلمة المرور</label
                                ><input
                                    v-model="password"
                                    id="password"
                                    placeholder="كلمة المرور"
                                    type="password"
                                    class="form-control"
                                    minlength="8"
                                    aria-describedby="passwordHelp"
                                />
                                <small
                                    id="passwordHelp"
                                    class="form-text text-muted"
                                    >يجب الا يقل عن ٨ حروف</small
                                >
                            </div>
                        </div>
                    </div>
                    <label for="image" class="">الصورة</label>

                    <b-form-file
                        id="image"
                        placeholder="اختر صورة"
                        drop-placeholder="اسقط الصورة هنا"
                        name="image"
                    ></b-form-file>
                    <div class="position-relative form-group">
                        <label for="phone" class="">الجوال</label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div
                                    class="input-group-text"
                                    style="border-top-right-radius:0.25rem;border-bottom-right-radius:0.25rem;border-top-left-radius:0;border-bottom-left-radius:0"
                                >
                                    +966
                                </div>
                            </div>
                            <input
                                id="phone"
                                placeholder="الجوال"
                                v-model="phone"
                                type="text"
                                class="form-control"
                                required
                                minlength="9"
                                maxlength="9"
                                style="border-top-right-radius:0;border-bottom-right-radius:0;border-top-left-radius:0.25rem;border-bottom-left-radius:0.25rem"
                            />
                        </div>
                    </div>

                    <div class="position-relative form-group">
                        <label for="full_name" class="">الاسم بالكامل</label
                        ><input
                            id="full_name"
                            v-model="full_name"
                            placeholder="الاسم بالكامل"
                            type="text"
                            class="form-control"
                        />
                    </div>

                    <button class="mt-2 btn btn-primary">تسجيل</button>
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
            phone: null,
            alert: false,
            err: null
        };
    },
    methods: {
        async register() {
            const fs = new FormData(this.$refs.form);
            fs.append(
                "data",
                JSON.stringify({
                    email: this.email,
                    password: this.password,
                    phone: `+966${this.phone}`,
                    fullName: this.full_name,
                    role: "ROLE_USER"
                })
            );

            await this.$http
                .post("/admin/register", fs, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    this.alert = true;
                    this.err = null;
                })
                .catch(error => {
                    this.err = error.response.data.errors[0].message;
                    this.alert = true;
                });
        }
    }
};
</script>

<style></style>
