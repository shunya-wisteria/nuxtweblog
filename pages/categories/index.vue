<template>
  <section class="post">
    <h1>Categories</h1>
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
            v-for="(cat,index) in categories"
            :key="index"
            v-bind:to="'/categories/' + cat.id"
            label
          >
            <v-avatar left>
              <v-icon light>mdi-folder-outline</v-icon>
            </v-avatar>
            {{cat.cat_name}}
          </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
    <v-breadcrumbs :items="items" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
  </section>
</template>

<script>
export default {
  async asyncData(context) {
    const { data } = await context.store.dispatch('restcall/RestGet', {url:process.env.CMS_API_ENDPOINT + "/api/v1/categories", header:{"X-MICROCMS-API-KEY" : process.env.API_KEY}});

    return {
      categories: data.contents
    };
  },

  head(){
    return {title : "Categories"}
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
          text: "Categories",
          disabled: true
        }
      ]
    }
  },

}
</script>

<style scoped>

</style>