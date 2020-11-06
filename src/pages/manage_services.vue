<template>
    <div>
        <router-link to="/add_service">
            <button class="btn btn-success mx-1 my-3">
                Add service
            </button>
        </router-link>
        <div
            class="main-card mb-3 card"
            v-for="service in services"
            :key="service.id"
        >
            <div class="text-center">
                <b-img
                    v-if="service.imageUrl"
                    width="100%"
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
                    class="btn btn-warning mr-1"
                    v-b-modal.modal
                    @click="selected_service = service"
                >
                    Edit service
                </button>
                <button class="btn btn-danger ml-1" @click="del(service.id)">
                    Delete service
                </button>
            </div>
        </div>
        <b-modal id="modal" title="Edit" hide-footer>
            <form class="" @submit.prevent="edit" ref="form">
                <label for="image" class="">Image</label>

                <b-form-file
                    id="image"
                    placeholder="Choose a image"
                    drop-placeholder="Drop image here..."
                    name="image"
                    v-model="image"
                ></b-form-file>
                <div class="position-relative form-group">
                    <label for="title" class="">Title</label
                    ><input
                        id="title"
                        v-model="selected_service.title"
                        placeholder="Title"
                        class="form-control"
                    />
                </div>

                <button class="mt-2 btn btn-primary">
                    Edit service
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
                console.log(this.services);
            });
    },
    methods: {
        async edit() {
            const fs = new FormData(this.$refs.form);

            fs.append(
                "data",
                JSON.stringify({
                    title: this.selected_service.title,
                    id: this.selected_service.id
                })
            );
            await this.$http
                .post("/admin/laundryService/edit", fs, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
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
