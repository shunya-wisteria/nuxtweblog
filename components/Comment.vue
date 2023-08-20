<template>
  <section class="post">
    <p class="comTitle">Comments</p>
    <v-text-field
      label="お名前(必須)"
      required
      color="blue-grey lighten-1"
      v-model="input.name"
    ></v-text-field>
    <v-textarea
      label="コメント(必須)"
      required
      color="blue-grey lighten-1"
      v-model="input.comment"
      rows="3"
    ></v-textarea>
    <v-btn depressed large color="grey lighten-2" width="100%" v-on:click="OnSend()">送信</v-btn>
  </section>
</template>

<script>
export default{
  name : "Comment",
  props: ["entryId"],
  
  data() {
    return {
      input:{
        name: "",
        comment : ""
      }
    }
  },

  methods:{
    OnSend()
    {
      if(this.input.name == "" || this.input.name == null)
      {
        window.alert("お名前 を入力してください。")
        return
      }
      else if(this.input.comment == "" || this.input.comment == null)
      {
        window.alert("コメント を入力してください。")
        return
      }

      const submitParams = new FormData()
      submitParams.append(process.env.FORM_NAME_FIELD, this.input.name)
      submitParams.append(process.env.FORM_EMAIL_FIELD, "xxx@example.com")
      submitParams.append(process.env.FORM_COMMENT_FIELD, this.input.comment)
      submitParams.append(process.env.FORM_ENTRYID_FIELD, this.entryId)

      this.$store.dispatch('restcall/RestPost', {url:process.env.FORM_URL, header:null, body:submitParams})
      .then(()=>{
        window.alert("コメントを送信しました。")
        
        this.input.name = ""
        this.input.email = ""
        this.input.comment = ""
        return
      })
      .catch(error => window.alert(error))
      return
    }
  }
}
</script>
<style scoped>
.comTitle
{
  font-size: 120%;
  color:#444;
}
</style>