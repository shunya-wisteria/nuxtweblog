<template>
  <section class="post">
    <p class="comTitle">Comments</p>
    <v-text-field label="お名前(必須)" required color="blue-grey lighten-1" v-model="input.name"></v-text-field>
    <v-text-field label="コメント(必須)" required color="blue-grey lighten-1" v-model="input.comment"></v-text-field>
    <v-btn depressed large color="grey lighten-2" width="100%" v-on:click="OnSend()">送信</v-btn>

    <v-container class="commentList">
      <v-row>
        <v-col cols="12" class="comment" v-for="(comment, index) in comments" :key="index">
          <p class="commentBody">{{ comment.Comments }}</p>
          <p class="commentFooter">{{ comment.Name }} - {{ comment.Timestamp }}</p>
        </v-col>
      </v-row>
    </v-container>


  </section>
</template>

<script>
// import * as d3 from 'd3'
export default {
  name: "Comment",
  props: ["entryId"],

  data() {
    return {
      input: {
        name: "",
        comment: ""
      },

      comments: []
    }
  },

  mounted() {
    this.OnLoadComment()
  },

  methods: {
    OnSend() {
      if (this.input.name == "" || this.input.name == null) {
        window.alert("お名前 を入力してください。")
        return
      }
      else if (this.input.comment == "" || this.input.comment == null) {
        window.alert("コメント を入力してください。")
        return
      }
      this.input.name = this.input.name.replace(/,/g,"、")
      this.input.comment = this.input.comment.replace(/,/g,"、")

      const submitParams = new FormData()
      submitParams.append(process.env.FORM_NAME_FIELD, this.input.name)
      submitParams.append(process.env.FORM_EMAIL_FIELD, "xxx@example.com")
      submitParams.append(process.env.FORM_COMMENT_FIELD, this.input.comment)
      submitParams.append(process.env.FORM_ENTRYID_FIELD, this.entryId)

      this.$store.dispatch('restcall/RestPost', { url: "https://docs.google.com/forms/d/e/" + process.env.FORM_ID + "/formResponse", header: null, body: submitParams })
        .then(() => {
          window.alert("コメントを送信しました。")

          this.input.name = ""
          this.input.email = ""
          this.input.comment = ""
          this.OnLoadComment()
          return
        })
        .catch(error => window.alert(error))
      return
    },

    async OnLoadComment() {
      this.comments = []

      const csvFileObj = await this.$store.dispatch('restcall/GetFile', { url: "https://docs.google.com/spreadsheets/d/" + process.env.FORM_DATA_ID + "/export?format=csv&range=A3:E" })
      if (csvFileObj.status != 200) {
        return
      }
      const reader = new FileReader()
      reader.readAsText(csvFileObj.file)
      reader.onload = () => {
        const comments = reader.result.split("\n")
        comments.shift()
        console.log(JSON.stringify(comments))

        for (let i = 0; i < comments.length; i++) {
          const line = comments[i].replace("\r", "")
          const items = line.split(",")

          if(items.length != 5)
          {
            continue
          }
          if(items[4] != this.entryId)
          {
            continue
          }
          this.comments.push({Timestamp : items[0], Name : items[1], Comments : items[3]})
        }

        this.comments = this.comments.sort((a, b) => { return (a.Timestamp > b.Timestamp) ? -1 : 1 })
      }
    }
  }
}
</script>
<style scoped>
.comTitle {
  font-size: 120%;
  color: #444;
}

.commentList {
  margin-top: 20px;
}

.comment {
  background-color: #f5f5f5;
  border: solid 1px #ececec;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0px;
  /* padding: 10px;
  margin: 8px 10px; */
}

.commentBody {
  font-size: 90%;
  margin-left: 0px;
  margin-bottom: 0px;
}

.commentFooter {
  font-size: 80%;
  text-align: right;
  margin-bottom: 0px;
}
</style>