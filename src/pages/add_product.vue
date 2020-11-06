<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            Created
        </b-alert>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">Add Product</h5>
                <form class="" @submit.prevent="add_product" ref="form">
                    <label for="image" class="">Image</label>

                    <b-form-file
                        id="image"
                        placeholder="Choose a image"
                        drop-placeholder="Drop image here..."
                        name="image"
                    ></b-form-file>
                    <div class="position-relative form-group">
                        <label for="description" class="">Description</label
                        ><input
                            id="description"
                            v-model="description"
                            placeholder="Description"
                            class="form-control"
                        />
                    </div>

                    <div class="position-relative form-group">
                        <label for="title" class="">Title</label
                        ><input
                            id="title"
                            v-model="title"
                            placeholder="Title"
                            type="text"
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
                                    >remove option</b-button
                                >&nbsp;Option #{{ i + 1 }}
                            </p>
                            <div class="position-relative form-group">
                                <label for="title" class="">Title</label
                                ><input
                                    id="title"
                                    v-model="option.title"
                                    placeholder="Title"
                                    type="text"
                                    class="form-control"
                                />
                            </div>
                            <div class="position-relative form-group">
                                <label for="price" class="">Price</label
                                ><input
                                    id="price"
                                    v-model="option.price"
                                    placeholder="Price"
                                    type="number"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </template>
                    <b-button
                        block
                        variant="outline-primary"
                        @click="options.push({ title: null, price: null })"
                        >Add option</b-button
                    >

                    <button class="mt-2 btn btn-primary">
                        Add product
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
            options: [{ title: null, price: null }],
            alert: false
        };
    },
    methods: {
        async add_product() {
            const fs = new FormData(this.$refs.form);
            fs.append(
                "data",
                JSON.stringify({
                    title: this.title,
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
                    console.log("mounted -> res", res);
                });
        }
    }
};
</script>

<style></style>
