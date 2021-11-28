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
          <span style="font-size:90%;">{{ createdAt }}</span>
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
              <v-icon light>mdi-tag-outline</v-icon>
            </v-avatar>
            {{t.name}}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>

    <div style="width:90%;max-width: 800px; margin:0 auto; margin-top:5px;" v-if="post.eyecatch != null">
      <img v-bind:src="post.eyecatch == null ? '':post.eyecatch.url" v-if="post.eyecatch != null" style="width:100%;">
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
export default {
  name : "Post",
  props: ["post"],

  data() {
    return {
      breadcrumbs : [
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
          text: "",
          disabled: true,
          href: ""
        },    
      ]
    };
  },

  computed:{
    createdAt(){
      let dt = new Date(this.post.createdAt)
      let year  = dt.getFullYear()
      let month = dt.getMonth()+1
      let date  = dt.getDate()
      let hour  = dt.getHours()
      let min   = dt.getMinutes()
      
      return year + "." + month + "." + date + " " + hour + ":" + min
    }
  },
  mounted(){
    this.breadcrumbs[2].text = this.post.title
  }
}
</script>

<style>  
</style>