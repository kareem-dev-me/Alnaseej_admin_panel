<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            تمت الاضافة
        </b-alert>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">اضف منتج</h5>
                <form class="" @submit.prevent="add_product" ref="form">
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
                        <label for="title" class=""
                            >اسم المنتج باللغة الانجليزية</label
                        ><input
                            id="title"
                            v-model="title"
                            placeholder="اسم المنتج باللغة الانجليزية"
                            type="text"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="titleAR" class=""
                            >اسم المنتج باللغة العربية</label
                        ><input
                            id="titleAR"
                            v-model="titleAR"
                            placeholder="اسم المنتج باللغة العربية"
                            type="text"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="position-relative form-group">
                        <label for="description" class="">الوصف</label
                        ><input
                            id="description"
                            v-model="description"
                            placeholder="الوصف"
                            class="form-control"
                        />
                    </div>
                    <template v-for="(option, i) in options">
                        <div :key="i">
                            <p class="font-weight-bold">
                                <b-button
                                    v-if="i != 0"
                                    variant="outline-danger"
                                    @click="options.splice(i, 1)"
                                    >حذف خيار</b-button
                                >&nbsp;خيار رقم #{{ i + 1 }}
                            </p>
                            <div class="position-relative form-group">
                                <label for="titleEnOption" class=""
                                    >اسم الخيار باللغة الانجليزية</label
                                ><input
                                    id="titleEnOption"
                                    v-model="option.title"
                                    placeholder="اسم الخيار باللغة الانجليزية"
                                    type="text"
                                    class="form-control"
                                    required
                                />
                            </div>
                            <div class="position-relative form-group">
                                <label for="titleAROption" class=""
                                    >اسم الخيار باللغة العربية</label
                                ><input
                                    id="titleAROption"
                                    v-model="option.titleAR"
                                    placeholder="اسم الخيار باللغة العربية"
                                    type="text"
                                    class="form-control"
                                    required
                                />
                            </div>
                            <div class="position-relative form-group">
                                <label for="price" class="">السعر</label
                                ><input
                                    id="price"
                                    v-model="option.price"
                                    placeholder="السعر"
                                    type="number"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </template>
                    <b-button
                        block
                        variant="outline-primary"
                        @click="
                            options.push({
                                title: null,
                                titleAR: null,
                                price: null
                            })
                        "
                        >اضف خيار</b-button
                    >

                    <button class="mt-2 btn btn-primary">
                        اضف المنتج
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
            description: null,
            title: null,
            options: [{ title: null, titleAR: null, price: null }],
            alert: false,
            titleAR: null
        };
    },
    methods: {
        async add_product() {
            const fs = new FormData(this.$refs.form);
            fs.append(
                "data",
                JSON.stringify({
                    title: this.title,
                    titleAR: this.titleAR,
                    active: true,
                    description: this.description,
                    productOptionsList: this.options
                })
            );
            await this.$http
                .post(`/admin/add/product/${this.$route.params.id}`, fs, {
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
