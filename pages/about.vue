<template>
  <section class="post">
    <h1>About</h1>
    <div  v-html="about.about"></div>


    <h2>Author</h2>
    <v-img
      v-bind:src="about.prof.url"
      class="my-3 profile"
      contain
    >
    </v-img>

    <h3>{{ about.author }}</h3>
    <div  v-html="about.desc"></div>

    <div class ="sns">
      <p v-for="sns in about.sns">
        <a v-bind:href="sns.url" target="_blank">
          <v-icon light>
            {{ sns.mdicon }}
          </v-icon>
          {{ sns.text }}
        </a>
        
      </p>
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
    width:300px;
    margin:0 auto;
    margin-top:50px;
  }

  .profile{
    width:150px;
    height:150px;
    border-radius:50%;
    margin: 0 auto;
  }
</style>