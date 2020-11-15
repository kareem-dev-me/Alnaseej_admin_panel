<template>
    <div>
        <router-link :to="`/add_product/${$route.params.id}`">
            <button class="btn btn-success mx-1 my-3">
                اضف منتج
            </button>
        </router-link>
        <div
            class="main-card mb-3 card"
            v-for="product in products"
            :key="product.id"
        >
            <div class="text-right">
                <b-img
                    style="border:2px solid #8F87F5"
                    v-if="product.imageUrl"
                    width="200%"
                    :src="product.imageUrl"
                    alt="product image"
                    fluid
                ></b-img>
            </div>

            <div class="card-body">
                <h5 class="card-title">
                    {{ product.title }}
                    <span v-if="product.titleAR">| {{ product.titleAR }}</span>
                </h5>
                <h6 class="card-subtitle font-weight-light text-muted my-3">
                    {{ product.description }}
                </h6>
                <p class="font-weight-bold h4">الخيارات</p>

                <div>
                    <b-table
                        striped
                        hover
                        :items="
                            product.productOptionsList.map(item => {
                                return {
                                    Title: item.title,
                                    'Arabic title': item.titleAR,
                                    Price: item.price
                                };
                            })
                        "
                    ></b-table>
                </div>

                <br />
                <button
                    class="btn btn-warning ml-1"
                    v-b-modal.modal
                    @click="selected_product = product"
                >
                    تعديل المنتج
                </button>
                <button class="btn btn-danger mr-1" @click="del(product.id)">
                    حذف المنتج
                </button>
            </div>
        </div>
        <b-modal id="modal" title="تعديل" hide-footer>
            <form class="" @submit.prevent="edit" ref="form">
                <label for="image" class="">الصورة</label>

                <b-form-file
                    id="image"
                    placeholder="اختر صورة"
                    drop-placeholder="اسقط الصورة هنا"
                    name="image"
                    v-model="image"
                ></b-form-file>
                <div class="position-relative form-group">
                    <label for="description" class="">الوصف</label
                    ><input
                        id="description"
                        v-model="selected_product.description"
                        placeholder="الوصف"
                        class="form-control"
                    />
                </div>

                <div class="position-relative form-group">
                    <label for="title" class="">اسم المنتج</label
                    ><input
                        id="title"
                        v-model="selected_product.title"
                        placeholder="اسم المنتج"
                        type="text"
                        class="form-control"
                    />
                </div>
                <template
                    v-for="(option, i) in selected_product.productOptionsList"
                >
                    <div :key="i">
                        <p class="font-weight-bold">
                            <b-button
                                v-if="i != 0"
                                variant="outline-danger"
                                @click="
                                    selected_product.productOptionsList.splice(
                                        i,
                                        1
                                    )
                                "
                                >حذف الخيار</b-button
                            >&nbsp; خيار رقم #{{ i + 1 }}
                        </p>
                        <div class="position-relative form-group">
                            <label for="title" class="">اسم المنتج</label
                            ><input
                                id="title"
                                v-model="option.title"
                                placeholder="اسم المنتج"
                                type="text"
                                class="form-control"
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
                        selected_product.productOptionsList.push({
                            title: null,
                            price: null
                        })
                    "
                    >اضف خيار</b-button
                >

                <button class="mt-2 btn btn-primary">
                    تعديل المنتج
                </button>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            selected_product: {},
            image: null
        };
    },
    watch: {
        async $route() {
            await this.getData();
        }
    },
    async mounted() {
        await this.getData();
    },
    methods: {
        async del(id) {
            await this.$http
                .post(`/admin/delete/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(() => {
                    alert("Deleted");
                });
        },
        async edit() {
            const fs = new FormData(this.$refs.form);

            fs.append(
                "data",
                JSON.stringify({
                    id: this.selected_product.id,
                    title: this.selected_product.title,
                    active: true,
                    description: this.selected_product.description,
                    productOptionsList: this.selected_product.productOptionsList.map(
                        item => {
                            return {
                                title: item.title,
                                price: item.price,
                                id: item.id
                            };
                        }
                    )
                })
            );
            await this.$http
                .post(`/admin/edit/product/${this.$route.params.id}`, fs, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    alert("Edited");
                    this.image = null;
                });
        },
        async getData() {
            await this.$http
                .get(
                    `/admin/laundry-service/${this.$route.params.id}/products`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                )
                .then(res => {
                    this.products = res.data;
                });
        }
    }
};
</script>

<style></style>
