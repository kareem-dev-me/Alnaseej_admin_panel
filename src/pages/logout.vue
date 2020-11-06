<template>
    <div></div>
</template>

<script>
export default {
    created() {
        localStorage.removeItem("token");
        this.$router.replace("/");
    }
};
</script>

<style></style>
