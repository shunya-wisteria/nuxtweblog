<template>
  <section class="post">
    <h1>Photomap</h1>
    <p>最近、訪問した場所の記録。</p>

    <div>
      <iframe width="100%" height="680" scrolling="no" frameborder="no" :src="url"></iframe>
    </div>

    <v-breadcrumbs :items="items" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
  </section>
</template>

<script>
export default {
  head(){
    return {title : "PhotoMap"}
  },

  data() {
    return {
      url : process.env.PHOTOLOG_URL,
      items:[
        {
          text: "Home",
          disabled: false,
          href: "/"
        },
        {
          text: "PhotoMap",
          disabled: true
        }
      ]
    }
  },
}
</script>