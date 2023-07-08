<template>
  <v-container>
    <v-row align="center" class="grey lighten-5">
      <v-col md="4" lg="3" xl="2" v-for="(item, index) in posts" :key="index">
        <nuxt-link :to="{ name: 'posts-id', params: { id: item.id } }">
          <v-hover
            v-slot:default="{ hover }"
            open-delay="2"
            close-delay="2"
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
                v-bind:src="item.eyecatch == null ? '/noimage.jpg' : item.eyecatch.url"
                style="border: 1px solid #eeeeee"
              >
              </v-img>
              <v-card-title class="postTitle">{{ item.title }}</v-card-title>
              <v-card-text class="postAbstract">{{ item.abstract }}</v-card-text>
              <v-card-text class="postFotter">{{ new Date(item.publishedAt).getFullYear() }}.{{ new Date(item.publishedAt).getMonth()+1 }}.{{ new Date(item.publishedAt).getDate() }}</v-card-text>
            </v-card>
          </v-hover>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PostIndex",
  props: ["posts"],

  data(){
    return {
      media: true,
      elevation: undefined,
      flat: false,
      loading: false,
      outlined: false,
      raised: false,
      width: 320,
      height: 400,
      disabled:false,
      value:false,
    }
  },
};
</script>
<style scoped>
  .postTitle{
    font-size:120%;
    font-weight: 400;
    line-height: 150%;
    color: #444;
    height: 80px;
    padding: 10px 16px;
  }
  .postAbstract
  {
    height:100px;
    padding: 0px 16px 5px 16px;
  }
  .postFotter
  {
    height: 40px;
    padding:0px 16px 5px 16px;
  }
</style>