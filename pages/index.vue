<template>
  <section>
    <v-img
      height="350px"
      position="center center"
      v-bind:src="pageInfo.portalEyecatch"
      rel="preload"
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
      
      <!-- TOP LINK-->
        <v-row
          align="center"
          justigy="center"
          class="topLink"
        >
          <v-col
            cols=12
            class="topLinkTitle"
          >
            <p class="text-uppercase secCaption topLinkTitleText">Quick Menu</p>
          </v-col>
          <v-col
            cols="4"
            class="topLinkColLeft"
          >
            <a :href="pageInfo.topLink1.url" :target="pageInfo.topLink1.external ? '_blank' : '_self'">
              <v-hover
                v-slot:default="{ hover }"
                open-delay=1
                close-delay=1
                :disabled="disabled"
                :value="value"
              >
                <v-card            
                  class="mx-auto topLinkCard"
                  :elevation="hover ? 12 : 2"
                >
                  <v-img
                    :src="pageInfo.topLink1.photo.url"
                    class="align-end"
                    height="150px"
                    cover
                  >
                  <v-card-title class="white--text topLinkText" v-text="pageInfo.topLink1.title" />
                  </v-img>
                </v-card>
              </v-hover>
            </a>
          </v-col>
          <v-col
            cols="4"
            class="topLinkColCenter"
          >
          <a :href="pageInfo.topLink2.url" :target="pageInfo.topLink2.external ? '_blank' : '_self'">
            <v-hover
              v-slot:default="{ hover }"
              open-delay=1
              close-delay=1
              :disabled="disabled"
              :value="value"
            >
              <v-card            
                  class="mx-auto topLinkCard"
                  :elevation="hover ? 12 : 2"
                >
                  <v-img
                    :src="pageInfo.topLink2.photo.url"
                    class="align-end"
                    height="150px"
                    cover
                  >
                  <v-card-title class="white--text topLinkText" v-text="pageInfo.topLink2.title" />
                  </v-img>
                </v-card>
              </v-hover>
            </a>
          </v-col>
          <v-col
            cols="4"
            class="topLinkColRight"
          >
            <a :href="pageInfo.topLink3.url" :target="pageInfo.topLink3.external ? '_blank' : '_self'">
              <v-hover
                v-slot:default="{ hover }"
                open-delay=1
                close-delay=1
                :disabled="disabled"
                :value="value"
              >
              <v-card            
                  class="mx-auto topLinkCard"
                  :elevation="hover ? 12 : 2"
                >
                  <v-img
                    :src="pageInfo.topLink3.photo.url"
                    class="align-end"
                    height="150px"
                    cover
                  >
                    <v-card-title class="white--text topLinkText" v-text="pageInfo.topLink3.title" />
                  </v-img>
                </v-card>
              </v-hover>
            </a>
          </v-col>
        </v-row>

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
                style="padding:10px;"
              >

                <v-container>
                  <v-row
                    align="center"
                    justify="start"
                  >
                    <v-col
                      xs=12
                      sm=6
                      md=6
                      lg=6
                      xl=6
                    >
                      <div style="height:80px">
                        <v-card-title class="headline mb-1 pickupweight">{{pageInfo.pickupEntry.title}}</v-card-title>
                      </div>
                      <v-card-text class="pickupweight">{{ pageInfo.pickupEntry.abstract }}</v-card-text>
                    </v-col>
                    <v-col
                      xs=12
                      sm=6
                      md=6
                      lg=6
                      xl=6
                    >
                      <v-img
                        v-if="media"
                        v-bind:src="pageInfo.pickupEntry.eyecatch.url"
                        style="border:1px solid #EEEEEE; max-height:350px;"
                      />
                    </v-col>
                  </v-row>
                </v-container>
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
      </v-container>
      <PostIndex v-bind:posts="posts" />
      <!-- Recent Posts -->
      
      <v-container>
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
              <nuxt-link to="/posts?page=2" class="more" style="font-size:120%;">Read More Posts</nuxt-link>
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

      media: true,
      elevation: undefined,
      disabled:false,
      value:false,
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
      this.$router.push('/?page=' + this.pageInput)
    },
  },

}
</script>

<style scoped>
  .introMsg{
    font-size:150%;
    font-weight: 300;
    color:#ECEFF1;
    background-color: #8888;
    padding: 2px 15px;
    border-radius: 3px;
  }

  .topLink{
    margin-top: 20px;
    margin-bottom:20px;
  }

  .topLinkText{
    font-size:100%;
    -webkit-text-stroke: 0.1px #888888;
    text-stroke: 0.1px #888888;
  }
  .topLinkTitleText{
    margin-top:0px;
  }

  .topLinkTitle{
    padding-top:0px;
    padding-bottom: 0px;
  }

  .topLinkColRight{
    padding-left: 2.5px;
  }
  .topLinkColCenter{
    padding-left: 2.5px;
    padding-right: 2.5px;
  }

  .topLinkColLeft{
    padding-right: 2.5px;
  }
  
  .pickupweight{
    font-weight: 300;
  }
</style>
