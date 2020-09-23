<template>
  <div class="message">
    <nav-bar/>
    <Section v-for="section in sections"
             :key="section.text"
             :iconfont="section.iconfont"
             :text="section.text"
             :icon-background-color="section.iconBackgroundColor"/>
    <Note/>
  </div>
</template>

<script>
import NavBar from 'pages/message/NavBar'
import Section from 'pages/message/Section'
import Note from 'pages/message/Note'
export default {
  name: 'index',
  components: { Note, Section, NavBar },
  data () {
    return {
      sections: [
        {
          iconfont: 'icon-at',
          iconBackgroundColor: '#72b2d6',
          text: '@我的'
        },
        {
          iconfont: 'icon-comment',
          iconBackgroundColor: '#5fb583',
          text: '评论'
        },
        {
          iconfont: 'icon-agree',
          iconBackgroundColor: '#f2a63b',
          text: '赞'
        },
        {
          iconfont: 'icon-voice',
          iconBackgroundColor: '#8ccbcb',
          text: '未关注人私信'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
