<template>
  <section class="post">
    <h1>Tags</h1>
    <v-layout
      column
    >
      <v-container>
        <v-row>
          <v-col
             cols="12" 
             align="center"
          >
          <v-chip
            v-for="(t,index) in tags"
            :key="index"
            v-bind:to="'/tags/' + t.id"
            label
          >
            <v-avatar left>
              <v-icon light style="padding-top:3px;">mdi-tag-outline </v-icon>
            </v-avatar>
            {{t.name}}
          </v-chip>
          </v-col>
        </v-row>
        <v-breadcrumbs :items="items" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
      </v-container>
    </v-layout>
  </section>
</template>

<script>
export default {
  async asyncData(context) {
    const { data } = await context.store.dispatch('restcall/RestGet', {url:process.env.CMS_API_ENDPOINT + "/api/v1/tags", header:{"X-MICROCMS-API-KEY" : process.env.API_KEY}});

    return {
      tags: data.contents
    };
  },

  head(){
    return {title : "Tags"}
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
          text: "Tags",
          disabled: true
        }
      ]
    }
  },

}
</script>

<style scoped>
</style>