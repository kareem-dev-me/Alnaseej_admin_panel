<template>
    <div></div>
</template>

<script>
export default {
    async mounted() {
        await this.$http
            .get("/admin/Users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                console.log("mounted -> res", res);
            });
    }
};
</script>

<style></style>
