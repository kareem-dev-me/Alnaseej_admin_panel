<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            تمت الاضافة،اعد تحميل الصفحة
        </b-alert>
        <form class="" @submit.prevent="add" ref="form">
            <label for="image" class="">الصورة</label>

            <b-form-file
                id="image"
                placeholder="اختر صورة"
                drop-placeholder="اسقط الصورة هنا"
                name="image"
            ></b-form-file>
            <div class="position-relative form-group">
                <label for="title" class="">اسم الخدمة</label
                ><input
                    id="title"
                    v-model="title"
                    placeholder="اسم الخدمة"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">
                    Please provide a valid city.
                </div>
            </div>

            <button class="mt-2 btn btn-primary">
                اضف الخدمة
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            alert: false,
            title: null
        };
    },
    methods: {
        async add() {
            const fs = new FormData(this.$refs.form);
            fs.append(
                "data",
                JSON.stringify({
                    title: this.title
                })
            );
            await this.$http
                .post("/admin/laundryService/add", fs, {
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
