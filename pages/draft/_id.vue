<template>
  <Post v-bind:post="post" />
</template>

<script>
import Post from '@/components/Post'

export default {
  components : {
    Post
  },

  data() {
    return {
      post : {}
    };
  },

  computed:{
  },

  async mounted() {
    const { data } = await this.$store.dispatch('restcall/RestGet', {url:process.env.CMS_API_ENDPOINT + "/api/v1/posts/" + this.$route.params.id + "?draftKey=" + this.$route.query.draftKey, header:{"X-MICROCMS-API-KEY" : process.env.API_KEY}});
    this.post = data
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