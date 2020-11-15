<template>
    <div>
        <router-link to="/add_service">
            <button class="btn btn-success mx-1 my-3">
                اضف خدمة
            </button>
        </router-link>
        <div
            class="main-card mb-3 card"
            v-for="service in services"
            :key="service.id"
        >
            <div class="text-right">
                <b-img
                    style="border:2px solid #8F87F5"
                    v-if="service.imageUrl"
                    width="200%"
                    :src="service.imageUrl"
                    alt="service image"
                    fluid
                ></b-img>
            </div>

            <div class="card-body">
                <h5 class="card-title">{{ service.title }}</h5>
                <h6 class="card-subtitle">
                    {{ service.titleAR }}
                </h6>
                <br />
                <button
                    class="btn btn-warning ml-1"
                    v-b-modal.modal
                    @click="selected_service = service"
                >
                    تعديل الخدمة
                </button>
                <button class="btn btn-danger mr-1" @click="del(service.id)">
                    حذف الخدمة
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
                    <label for="title" class="">اسم الخدمة</label
                    ><input
                        id="title"
                        v-model="selected_service.title"
                        placeholder="اسم الخدمة"
                        class="form-control"
                    />
                </div>

                <button class="mt-2 btn btn-primary">
                    تعديل الخدمة
                </button>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            services: [],
            selected_service: {},
            image: null
        };
    },
    async mounted() {
        await this.$http
            .get("/admin/laundryServices", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                this.services = res.data;
            });
    },
    methods: {
        async edit() {
            const fs = new FormData(this.$refs.form);

            fs.append(
                "data",
                JSON.stringify({
                    title: this.selected_service.title
                })
            );
            await this.$http
                .post(
                    `/admin/laundryService/edit/${this.selected_service.id}`,
                    fs,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                )
                .then(res => {
                    alert("Edited");
                });
        },
        async del(id) {
            await this.$http
                .post(`/admin/laundryService/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => {
                    alert("Deleted");
                });
        }
    }
};
</script>

<style></style>
