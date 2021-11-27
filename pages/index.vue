<template>
  <section>
    <v-img
      height="350px"
      position="center center"
      v-bind:src="pageInfo.portalEyecatch"
    >
      <v-row
        class="fill-height"
        justify="center"
        align="center"
      >
        <div class="introMsg">{{pageInfo.portalEyecatchCom}}</div>
      </v-row>
    </v-img>

    <v-layout
      column
      justify="center"
      align="center"
    >
      <v-container>

        <!-- PickUp -->
        <v-row
          align="center"
          justigy="center"
          v-if="pageInfo.pickupEntry != null"
        >
          <v-col
            cols=12
          >
          <p class="text-uppercase secCaption">PICKUP</p>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justigy="center"
          v-if="pageInfo.pickupEntry != null"
        >
          <v-col
            cols=12
          >
            <router-link v-bind:to="'/posts/' + pageInfo.pickupEntry.id">
            <v-hover
              v-slot:default="{ hover }"
              open-delay=1
              close-delay=1
              :disabled="disabled"
              :value="value"
            >
              <v-card
                class="mx-auto"
                :elevation="hover ? 12 : 2"
                height="300px"
              >
                <v-list-item three-line>
                  <v-list-item-content style="margin-right:10px">
                    <v-list-item-title class="headline mb-1">{{pageInfo.pickupEntry.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{pageInfo.pickupEntry.abstract}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-img
                      v-if="media"
                      class="white--text"
                      height="270px"
                      position="center top"
                      v-bind:src="pageInfo.pickupEntry.eyecatch.url"
                      style="border:1px solid #EEEEEE;"
                    >
                    </v-img>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-hover>
            </router-link>
          </v-col>
        </v-row>
        <!-- PickUp -->

        <!-- Recent Posts -->
        <v-row
          justify-center
          align-center
        >
          <v-col
            cols=12
          >
          <p class="text-uppercase secCaption">recent posts</p>
          </v-col>
        </v-row>

        <v-row
          align="center"
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
        <!-- Recent Posts -->

        <v-row
            align="center"
            justigy="center"
        >
          <v-col
            cols=12
            align="center"
            style="margin-top:20px;"
          >
            <p>
              <nuxt-link to="/posts?page=2" class="more" style="font-size:120%;">MORE</nuxt-link>
            </p>
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
  computed:{
    pageInfo:{
      get()
      {
        return this.$store.getters['PageInfo']
      }
    }
  },
  
  async asyncData({ store }) {
    const { data } = await store.dispatch('restcall/RestGet', {url:process.env.CMS_API_ENDPOINT + "/api/v1/posts", header:{"X-MICROCMS-API-KEY" : process.env.API_KEY}});

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
      if(this.$route.query.page == null)
      {
        this.pageInput = 1
      }
      this.maxPage = this.items.length / process.env.CMS_PAGE_LIMIT
      if(this.maxPage < this.pageInput)
      {
        this.pageInput = this.maxPage
      }
      
      let startPos = process.env.CMS_PAGE_LIMIT * (this.pageInput - 1)
      let endPos = process.env.CMS_PAGE_LIMIT * this.pageInput

      this.posts = []
      for(let i = startPos; i < endPos; i++)
      {
        this.posts.push(this.items[i])
      }
    },
    onNav()
    {
      this.$router.push('/?page=' + this.pageInput)
    },
  },

}
</script>

<style scoped>
  .postTitle{
    font-size:120%;
    font-weight: 400;
    line-height: 130%;
    color: #444;
  }

  .introMsg{
    font-size:150%;
    font-weight: 400;
    color:#ECEFF1;
    -webkit-text-stroke: 0.5px #333;
  }
</style>
