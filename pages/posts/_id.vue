<template>
  <Post v-bind:post="post" />
</template>

<script>
export default {
  data() {
    return {
    };
  },

  computed:{
  },

  async asyncData(context) {
    const { data } = await context.store.dispatch('restcall/RestGet', {url:process.env.CMS_API_ENDPOINT + "/api/v1/posts/" + context.params.id, header:{"X-MICROCMS-API-KEY" : process.env.API_KEY}});
    
    return {
      post: data
    };
  },

  head(){
    return {
      title : this.post.title,

      meta:[
        { hid: 'description', name: 'description', content: this.post.abstract },
        { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_TITLE },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:url', property: 'og:url', content: process.env.META_OG_URL + '/posts/' + this.post.id },
        { hid: 'og:title', property: 'og:title', content: this.post.title + " - " + process.env.SITE_TITLE },
        { hid: 'og:description', property: 'og:description', content: this.post.abstract },
        { hid: 'og:image', property: 'og:image', content: this.post.eyecatch == null ? '':this.post.eyecatch.url },
      ]
    }
  },  
};
</script>
<style>
</style>