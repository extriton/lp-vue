<template>
    <div class="faq-wrapper">
        <div class="left-block">
            <SubjectList />
        </div>
        <div class="right-block" v-if="isShowMessageList">
            <MessageList />
        </div>
    </div>
</template>

<script>
import SubjectList from '@/components/SubjectList.vue'
import MessageList from '@/components/MessageList.vue'

export default {
  name: 'Faq',
  components: {
    SubjectList,
    MessageList,
  },
  computed: {
      isShowMessageList () {
          return this.$route.params.subjectId === undefined ? false : true
      }
  },
  created () {
    this.$store.dispatch('GET_SUBJECTS')
    
    if (this.$route.params.subjectId !== undefined)
        this.$store.dispatch('GET_MESSAGES', this.$route.params.subjectId)
  },
  watch: {
    '$route' (to) {
      this.$store.dispatch('GET_MESSAGES', to.params.subjectId)
    }
  }
}
</script>

<style lang="scss">
.faq-wrapper {
    padding: 20px;
    position: relative;
    .left-block {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100vh;
    }
    .right-block {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100vh;
    }
}
</style>