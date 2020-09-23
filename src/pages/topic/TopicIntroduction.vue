<template>
  <div class="topic-introduction">
    <img :src="topicDetail.image" alt="">
    <div class="introduction">
      <div class="topic-name">#{{ topicDetail.topic_name }}#</div>
      <div class="read-chat">阅读{{ topicDetail.read_number }} 讨论{{ topicDetail.chat_number }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicIntroduction',
  props: ['topicDetail']
}
</script>

<style lang="scss" scoped>
  .topic-introduction {
    display: flex;
    padding: 6.4vw  /* 24/3.75 */ 3.2vw  /* 12/3.75 */ 3.2vw  /* 12/3.75 */;

    img {
      width: 18.67vw  /* 70/3.75 */;
      height: 18.67vw  /* 70/3.75 */;
      margin-right: 3.2vw  /* 12/3.75 */;
    }

    .introduction {
      height: 18.67vw  /* 70/3.75 */;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .topic-name {
        margin-top: 1.87vw  /* 7/3.75 */;
        font-size: 5.87vw  /* 22/3.75 */;
        color: $color1;
        font-weight: 700;
        line-height: 1.37;
      }

      .read-chat {
        margin-bottom: 2.13vw  /* 8/3.75 */;
        font-size: 3.2vw  /* 12/3.75 */;
        color: $color5;
      }
    }
  }
</style>
