<template>
  <section>
    <v-layout
      column
      justify-center
      align-center
    >
      <h1>{{ tag }}</h1>
      <v-container>
        <v-row
          justify-center
          align-center
          class="grey lighten-5"
        >
          <v-col
            md=4
            lg=3
            xl=2
            v-for="(item,index) in posts"
            :key="index"
          >
            <nuxt-link :to="{name:'posts-id', params:{id:item.id}}">
            <v-hover
              v-slot:default="{ hover }"
              open-delay=2
              close-delay=2
              :disabled="disabled"
              :value="value"
            >
              <v-card            
                class="mx-auto"
                :elevation="hover ? 12 : 2"
                :flat="flat"
                :loading="loading"
                :outlined="outlined"
                :raised="raised"
                :width="width"
                :height="height"
              >

                <v-img
                  v-if="media"
                  height="180px"
                  v-bind:src="item.eyecatch == null ? '/noimage.jpg':item.eyecatch.url"
                  style="border:1px solid #EEEEEE;"
                >
                </v-img>
                <div style="height:60px">
                  <v-card-title class="postTitle">{{item.title}}</v-card-title>
                </div>
                <v-card-text>{{ item.abstract }}</v-card-text>
              </v-card>
            </v-hover>
            </nuxt-link>
          </v-col>
        </v-row>

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

      flat: false,
      media: true,
      loading: false,
      actions: true,
      outlined: false,
      elevation: undefined,
      raised: false,
      width: 320,
      height: 400,
      dialog : false,


      disabled:false,
      value:false,

      model: 0,
      showArrows: true,
      hideDelimiters: false,
      cycle: true,
    };
  },
  async asyncData(context) {
    const { data } = await context.store.dispatch('restcall/RestGet', {url:process.env.CMS_API_ENDPOINT + "/api/v1/posts?filters=tags[contains]" + context.params.id, header:{"X-MICROCMS-API-KEY" : process.env.API_KEY}});

    return {
      items: data.contents,
      tag : context.params.id
    };
  },

  head(){
    return {title : "Tag : " + this.tag}
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
      this.$router.push('/tags/' + this.tag + '?page=' + this.pageInput)
    }
  },
}
</script>

<style scoped>
  .introMsg{
    font-size:150%;
    font-weight: 500;
    color:#ECEFF1;
  }
</style>