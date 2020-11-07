<template>
    <div>
        <b-alert v-model="alert" variant="success" dismissible>
            تمت الاضافة
        </b-alert>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">اضافة قسيمة</h5>
                <form class="" @submit.prevent="add_coupon">
                    <div class="position-relative form-group">
                        <label for="value" class="">القيمة</label
                        ><input
                            id="value"
                            v-model="value"
                            placeholder="القيمة"
                            type="number"
                            class="form-control"
                        />
                    </div>

                    <div class="position-relative form-group">
                        <label for="code" class="">الكود</label
                        ><input
                            id="code"
                            v-model="code"
                            placeholder="الكود"
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <label for="expirationDate" class="">تاريخ الانتهاء</label>
                    <b-form-datepicker
                        class="py-4 px-4"
                        v-model="expirationDate"
                        id="expirationDate"
                        placeholder="تاريخ الانتهاء"
                    ></b-form-datepicker>

                    <button class="mt-2 btn btn-primary">
                        اضف القسيمة
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
            id: null,
            value: null,
            code: null,
            expirationDate: "",
            alert: false
        };
    },
    methods: {
        async add_coupon() {
            await this.$http
                .post(
                    "/admin/coupon/add",
                    {
                        code: this.code,
                        expirationDate: this.expirationDate,
                        value: this.value
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                )
                .then(res => {
                    this.alert = true;
                });
        }
    }
};
</script>

<style></style>
