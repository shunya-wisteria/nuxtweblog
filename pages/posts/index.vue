<template>
  <section>
    <h1>Posts</h1>
    <v-layout
      column
      justify="center"
      align="center"
    >
      <PostIndex v-bind:posts="posts" />
      <v-container>
        <v-row
            align="center"
            justigy="center"
        >
          <v-col
            cols=12
          >
          <v-pagination
            v-model="pageInput"
            :length="maxPage"
            v-on:input="onNav"
            color="secondary"
          >
          </v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </section>

</template>
<script>
export default {
  data() {
    return {
      posts : [],
      pageInput : 0,
      maxPage : 0,
    };
  },
  computed:{
    pageInfo:{
      get()
      {
        return this.$store.getters['PageInfo']
      }
    }
  },
  
  async asyncData({ store }) {
    const { data } = await store.dispatch('restcall/RestGet', {url:process.env.CMS_API_ENDPOINT + "/api/v1/posts?limit=500", header:{"X-MICROCMS-API-KEY" : process.env.API_KEY}});

    return {
      items: data.contents
    };
  },

  //  Paging Control
  mounted(){
    this.refreshPage()
  },

  watch: {
    '$route' (to, from){
      this.refreshPage()
    }
  },

  methods:{
    refreshPage()
    {
      scrollTo(0, 0)
      this.pageInput = Number(this.$route.query.page)
      if(this.$route.query.page == null || this.$route.query.page < 1)
      {
        this.pageInput = 1
      }
      this.maxPage = Math.ceil(this.items.length / process.env.CMS_PAGE_LIMIT)
      if(this.maxPage < this.pageInput)
      {
        this.pageInput = this.maxPage
      }
      
      let startPos = process.env.CMS_PAGE_LIMIT * (this.pageInput - 1)
      let endPos = process.env.CMS_PAGE_LIMIT * this.pageInput

      this.posts = []
      for(let i = startPos; i < endPos; i++)
      {
        if(this.items[i] != null)
        {
          this.posts.push(this.items[i])
        }
      }
    },
    onNav()
    {
      this.$router.push('/posts/?page=' + this.pageInput)
    }
  },

}
</script>

<style scoped>
</style>
