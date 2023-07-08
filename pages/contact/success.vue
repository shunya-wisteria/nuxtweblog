<template>
    <section class="post">
        <h1>Thank you</h1>
        
        <v-breadcrumbs :items="items" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
    </section>
</template>

<script>
export default {
    data: () => ({
        items:[
            {
                text: "Home",
                disabled: false,
                href: "/"
            },
            {
                text: "Contact",
                disabled: true
            }
        ]})
}
</script>

<style scoped>

</style>