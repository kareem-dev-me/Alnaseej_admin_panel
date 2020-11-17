<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            تمت الاضافة،اعد تحميل الصفحة
        </b-alert>
        <form class="" @submit.prevent="add" ref="form">
            <div class="position-relative form-group">
                <label for="image" class="">الصورة</label>

                <b-form-file
                    id="image"
                    placeholder="اختر صورة"
                    drop-placeholder="اسقط الصورة هنا"
                    name="image"
                ></b-form-file>
            </div>
            <div class="position-relative form-group">
                <label for="title" class="">اسم الخدمة باللغة الانجليزية</label
                ><input
                    id="title"
                    v-model="title"
                    placeholder="اسم الخدمة باللغة الانجليزية"
                    class="form-control"
                    required
                />
            </div>
            <div class="position-relative form-group">
                <label for="title" class="">اسم الخدمة باللغة العربية</label
                ><input
                    id="title"
                    v-model="titleAR"
                    placeholder="اسم الخدمة باللغة العربية"
                    class="form-control"
                    required
                />
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
            title: null,
            titleAR: null
        };
    },
    methods: {
        async add() {
            const fs = new FormData(this.$refs.form);
            fs.append(
                "data",
                JSON.stringify({
                    title: this.title,
                    titleAR: this.titleAR
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
