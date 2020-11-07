<template>
    <div>
        <div
            class="main-card mb-3 card"
            v-for="coupon in coupons"
            :key="coupon.id"
        >
            <div class="card-body">
                <h5 class="card-title">{{ coupon.code }}</h5>
                <h6 class="card-subtitle">
                    {{ coupon.value }}
                </h6>
                <p class="font-weight-bold">
                    تاريخ الانتهاء: {{ coupon.expirationDate[0] }}/{{
                        coupon.expirationDate[1]
                    }}/{{ coupon.expirationDate[2] }}
                </p>
                <br />
                <button
                    class="btn btn-warning ml-1"
                    v-b-modal.modal
                    @click="
                        selected_coupon = {
                            value: coupon.value,
                            code: coupon.code,
                            expirationDate: `${coupon.expirationDate[0]}-${coupon.expirationDate[1]}-${coupon.expirationDate[2]}`,
                            id: coupon.id
                        }
                    "
                >
                    تعديل
                </button>
                <button class="btn btn-danger mr-1" @click="del(coupon.id)">
                    حذف
                </button>
            </div>
        </div>
        <b-modal id="modal" title="تعديل" hide-footer>
            <form class="" @submit.prevent="edit">
                <div class="position-relative form-group">
                    <label for="value" class="">القيمة</label
                    ><input
                        id="value"
                        v-model="selected_coupon.value"
                        placeholder="القيمة"
                        type="number"
                        class="form-control"
                    />
                </div>

                <div class="position-relative form-group">
                    <label for="code" class="">الكود</label
                    ><input
                        id="code"
                        v-model="selected_coupon.code"
                        placeholder="الكود"
                        type="text"
                        class="form-control"
                    />
                </div>
                <label for="expirationDate" class="">تاريخ الانتهاء</label>
                <b-form-datepicker
                    class="py-4 px-4"
                    v-model="selected_coupon.expirationDate"
                    id="expirationDate"
                    placeholder="تاريخ الانتهاء"
                ></b-form-datepicker>

                <button class="mt-2 btn btn-primary">
                    تعديل القسيمة
                </button>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            coupons: [],
            selected_coupon: { value: "", code: "", expirationDate: "" }
        };
    },
    async mounted() {
        await this.$http
            .get("/admin/coupon?size=100", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                this.coupons = res.data.content;
                console.log("mounted -> res", res);
            });
    },
    methods: {
        async edit() {
            await this.$http
                .post(
                    "/admin/coupon/edit",
                    {
                        code: this.selected_coupon.code,
                        expirationDate: this.selected_coupon.expirationDate,
                        id: this.selected_coupon.id,
                        value: this.selected_coupon.value
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                )
                .then(() => {
                    alert("Edited");
                });
        },
        async del(id) {
            await this.$http
                .post(
                    `/admin/delete/coupon/${id}`,

                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                )
                .then(() => {
                    alert("Deleted");
                });
        }
    }
};
</script>

<style></style>
