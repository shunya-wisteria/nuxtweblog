<template>
  <v-app>
    <v-app-bar app style="background-color:#ffffff;">
      <v-app-bar-nav-icon @click="drawer=true" v-if="!mini"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="headline"><nuxt-link to="/" style="color:rgba(0, 0, 0, 0.87);border-bottom:none;">{{ pageInfo.title }}</nuxt-link></span>
        <span class="font-weight-light subTitle">{{ pageInfo.subTitle }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main style="margin-bottom:150px;">
      <nuxt />
    </v-main>

    <v-footer
      absolute
      class="font-weight-medium"
      height="120px"
    >
      <v-col
        class="text-center"
        cols="12"
        style="color: #555555;"
      >
        &copy; {{ new Date().getFullYear() }} {{ pageInfo.author }}
      </v-col>
    </v-footer>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      :clipped="clipped"

      :expand-on-hover="mini"
      :permanent="mini"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </v-app>
</template>

<script>
export default {
  async fetch () {
    const { data } = await this.$store.dispatch('restcall/RestGet', {url:process.env.CMS_API_ENDPOINT + "/api/v1/pageinfo", header:{"X-MICROCMS-API-KEY" : process.env.API_KEY}});
    this.$store.dispatch("SetPageTitle", data.title)
    this.$store.dispatch("SetSubTitle", data.subTitle)
    this.$store.dispatch("SetAuthor", data.author)
    this.$store.dispatch("SetPortalEyecatch", data.portalEyecatch.url)
    this.$store.dispatch("SetPortalEyecatchCom", data.portalEyecatchCom)
    this.$store.dispatch("SetPickupEntry", data.pickupEntry)
    this.$store.dispatch("SetTopLink1", data.topLink1)
    this.$store.dispatch("SetTopLink2", data.topLink2)
    this.$store.dispatch("SetTopLink3", data.topLink3)
  },

  data () {
    return {      
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-account-details-outline',
          title: 'About',
          to: '/about'
        },
        {
          icon: 'mdi-folder-outline',
          title: 'Categories',
          to: '/categories'
        },
        {
          icon: 'mdi-tag-outline',
          title: 'Tags',
          to: '/tags'
        },
        {
          icon: 'mdi-map-marker-check-outline',
          title: 'PhotoMAP',
          to: '/photomap'
        },
        {
          icon: 'mdi-at',
          title: 'Contact',
          to: '/contact'
        }
      ],
      right: true,
      rightDrawer: false,
    }
  },

  computed:{
    pageInfo:{
      get()
      {
        return this.$store.getters['PageInfo']
      }
    },
    mini()
    {
      return !this.$vuetify.breakpoint.smAndDown;
    }
  }

}
</script>

<style>
  body{
    font-family: 'Open Sans', Segoe UI, "メイリオ", Meiryo, sans-serif;
    font-weight: 300;
    color: #737373;
  }

  .v-application
  {
    font-family: 'Open Sans', Segoe UI, "メイリオ", Meiryo, sans-serif;
    color: #737373;
  }
  .theme--light.v-application
  {
    background-color:#fafafa;
  }
  .v-application a{
    color: #737373;
    text-decoration: none;
    border-bottom: 1px solid #dcdcdc;
    transition-property: all;
    transition: 0.2s linear;
  }

  .v-application a:hover {
    text-decoration: none;
    color: #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
  }
  
  .v-chip{
    margin:5px 5px;
    font-size: 80%;
  }

  h1{
    color: #444;
    font-size: 24px;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    margin : 20px 0px;
  }

  h2{
    color: #444;
    font-size: 24px;
    font-weight: normal;
    text-align: center;
    margin : 30px 0px 20px 0px;
  }
  
  h3{
    color: #444;
    font-size: 20px;
    font-weight: normal;
    margin : 30px 0px 10px 0px;
  }
  
  .subTitle{
    font-size:80%; 
    margin-left:15px;
    font-family: "Roboto", sans-serif;
  }
  @media (max-width:530px)
  {
    .v-main{
      padding-left:0px;
    }
    .subTitle{
      display:none
    }
  }

  .secCaption{
    color: #444;
    font-size: 24px;
    font-weight: 400;
    display: flex;
    align-items: center;
    margin-bottom: 0px;
    margin-top:15px;
  }
  .secCaption:before, .secCaption:after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background: #444;
    display: block;
  }
  .secCaption:before{
    margin-right: .8em;
    background: linear-gradient(-90deg, #888, transparent);
  }
  .secCaption:after{
    margin-left: .8em;
    background: linear-gradient(90deg, #888, transparent);
  }

  .postInfo {
    margin : 10px 0px 10px 0px;
  }

  .post{
    font-family: 'Open Sans', Segoe UI, "メイリオ", Meiryo, sans-serif;
    color: #737373;
    width:90%;
    max-width: 800px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    display: block;
    font-size:100%;
    line-height: 180%;
  }
  .post img {
    width:100%;
    height: auto;
    max-width: 800px; 
    border:1px solid #DDDDDD;
    margin-top:10px;
    filter: drop-shadow(5px 5px 5px #BBB);
  }

  .post blockquote{
    border: 2px solid #dcdcdc;
    border-radius: 2px;
    padding: 20px 20px;
    margin: 20px 10px;
  }

  .post li{
    list-style-type : circle;
  }

  .post pre{
    background-color:#f1f1f1;
    border-radius: 2px;
    border: solid 1px #d5d5d5;
    filter: drop-shadow(2px 2px 4px #bbbbbb);
    line-height: 130%;

    width: 95%;
    max-width: 800px;
    overflow: auto;

    padding: 0.3rem 0.8rem;
    margin: 20px 0px 10px 0px;
  }
  .theme--light.v-application code{
    background-color: #f1f1f1;
    font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
  }
  
  .v-footer
  {
    font-family: "Roboto", 'Open Sans', Segoe UI, "メイリオ", Meiryo, sans-serif;
  }


</style>
