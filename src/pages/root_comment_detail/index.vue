<template>
  <div class="root_comment_detail">
    <NavBar :child-comment-number="childComments.length"/>
    <a-comment v-if="rootComment" :comment="rootComment"/>
    <a-comment :comment="childComment"
               :background="'grey'"
               v-for="childComment in childComments"
               :key="childComment.id"/>
  </div>
</template>

<script>
import NavBar from 'pages/root_comment_detail/NavBar'
import { getCommentDetail, getCommentList } from 'src/api/comment'
import AComment from 'components/AComment'
export default {
  name: 'index',
  components: { AComment, NavBar },
  data () {
    return {
      rootComment: null,
      childComments: []
    }
  },
  activated () {
    this.getCommentList()
    this.getCommentDetail()
  },
  methods: {
    getCommentList () {
      getCommentList({
        parent: this.$route.params.rootCommentID
      }).then(res => { this.childComments = res.data })
    },
    getCommentDetail () {
      getCommentDetail(this.$route.params.rootCommentID).then(res => { this.rootComment = res.data })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
