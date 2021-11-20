<template>
  <section class="post">
    <h1>About</h1>
    <v-img
      v-bind:src="about.prof.url"
      class="my-3"
      contain
      height="150"
    >
    </v-img>

    <h2>{{ about.author }}</h2>

    <div  v-html="about.desc"></div>

    <div class="sns">
      <p v-if="about.githubUrl != null"><a v-bind:href="about.githubUrl" target="_blank"><v-icon light>mdi-github</v-icon>{{about.githubText}}</a></p>
      <p v-if="about.twitterUrl != null"><a v-bind:href="about.twitterUrl" target="_blank"><v-icon light>mdi-twitter</v-icon>{{about.twitterText}}</a></p>
      <p v-if="about.facebookUrl != null"><a v-bind:href="about.facebookUrl" target="_blank"><v-icon light>mdi-facebook</v-icon>{{about.facebookText}}</a></p>
      <p v-if="about.tumblrUrl != null"><a v-bind:href="about.tumblrUrl" target="_blank"><v-icon light>mdi-alpha-t-box-outline</v-icon>{{about.tumblrText}}</a></p>
      <p v-if="about.instagramUrl != null"><a v-bind:href="about.instagramUrl" target="_blank"><v-icon light>mdi-instagram</v-icon>{{about.instagramText}}</a></p>
    </div>

    <v-breadcrumbs :items="items" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
  </section>
</template>

<script>
export default {
  head(){
    return {title : "About"}
  },

  data() {
    return {
      items:[
        {
          text: "Home",
          disabled: false,
          href: "/"
        },
        {
          text: "About",
          disabled: true
        }
      ]
    }
  },

  async asyncData(context) {
    const { data } = await context.store.dispatch('restcall/RestGet', {url:process.env.CMS_API_ENDPOINT + "/api/v1/about/", header:{"X-MICROCMS-API-KEY" : process.env.API_KEY}});
    
    return {
      about: data
    };
  },

}

</script>

<style scoped>
  * >>> .sns{
    width:180px;
    margin:0 auto;
    margin-top:50px;
  }

  * >>> .v-icon{
    margin-right:5px
  }
</style>