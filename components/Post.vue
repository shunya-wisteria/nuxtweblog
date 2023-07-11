<template>
  <section class="post">
    <h1 style="margin-bottom:5px;">{{post.title}}</h1>
    <v-container class="postInfo">
      <v-row
          align="center"
          justigy="center"
      >
        <v-col
          cols=4
          align="left"
          justigy="center"
          style="padding-left:0px;"
        >
          <span style="font-size:90%;">{{ publishedAt }}</span>
        </v-col>
        <v-col
          cols=8
          align="right"
          justigy="center"
        >
          <v-chip
            v-for="(t,index) in post.tags"
            :key="index"
            v-bind:to="'/tags/' + t.id"
            label
          >
            <v-avatar left>
              <v-icon light style="padding-top:3px;">mdi-tag-outline</v-icon>
            </v-avatar>
            {{t.name}}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>

    <div style="width:90%;max-width: 800px; margin:0 auto; margin-top:5px;" v-if="post.eyecatch != null">
      <img v-bind:src="post.eyecatch == null ? '':post.eyecatch.url" v-if="post.eyecatch != null" style="width:100%;">
    </div>

    <div class="post" v-if="post.toc">
      <ul class="tocs blue-grey lighten-5">
        <span style="font-weight:600; font-size:120%;">目次</span>
        <li v-for="item in toc" :key="item.id" :class="'toc toc_'+item.name">
            <nuxt-link v-scroll-to="'#' + item.id" to>{{item.text}}</nuxt-link>
        </li>
      </ul>
    </div>

    <div v-html="post.body" style="margin-top:30px" class="post"></div>

    <v-breadcrumbs :items="breadcrumbs" style="padding:30px 5px 30px 5px;">
    </v-breadcrumbs>
    <v-chip 
      label
      v-bind:to="'/categories/' + (post.category == null ? '' : post.category.id)"
    >
      <v-avatar left><v-icon light>mdi-folder-outline</v-icon></v-avatar>
      {{post.category == null ? "" : post.category.cat_name}}
    </v-chip>
  </section>
</template>

<script>
import cheerio      from 'cheerio';

export default {
  name : "Post",
  props: ["post"],

  data() {
    return {
    };
  },

  computed:{
    publishedAt(){
      let dt = new Date(this.post.publishedAt)
      let year  = dt.getFullYear()
      let month = dt.getMonth()+1
      let date  = dt.getDate()
      let hour  = dt.getHours()
      let min   = dt.getMinutes()
      
      return year + "." + month + "." + date + " " + hour + ":" + min
    },
    toc(){
      const $ = cheerio.load(this.post.body);
      const headings = $('h2, h3').toArray();
      return headings.map(data => ({
        text: data.children[0].data,
        id: data.attribs.id,
        name: data.name
      }));
    },
    breadcrumbs()
    {
      return [
        {
          text: "Home",
          disabled: false,
          href: "/"
        },
        {
          text: "Posts",
          disabled: false,
          href: "/posts"
        },
        {
          text: this.post.title,
          disabled: true,
          href: ""
        },    
      ]
      
    }
  },
  mounted(){
    window.iframely && iframely.load();
  }
}
</script>

<style scoped>
h1{
  text-transform: none;
}
.tocs{
    border: 2px solid #dcdcdc;
    border-radius: 2px;
    filter: drop-shadow(3px 3px 3px #bbbbbb);
    padding: 15px 20px;
    margin: 20px 8px;
    width:95%;
    max-width:450px;
}
.toc{
  list-style-type:none;
  line-height:200%;
}
.toc_h2{
  margin-left:5px;
}
.toc_h3{
  margin-left:15px;
}
</style>