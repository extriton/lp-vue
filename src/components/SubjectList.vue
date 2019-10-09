<template>
  <div class="subject-list-wrapper">
    <ul class="subject-list">
      <li v-for="(item, index) in subjectList" :key="index">
        <router-link class="subject-list__item"
                     :to="{ name: 'faq', params: { subjectId: item.id }}"
        >
          <p class="subject-list__item__subject">{{ item.subject }}</p>
          <p class="subject-list__item__date">{{ item.created }}</p>
          <p class="subject-list__item__msg">{{ item.firstMsg }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SubjectList',
  computed: {
    subjectList () {
      return this.SUBJECTS
    },
    ...mapGetters(['SUBJECTS'])
  },
}
</script>

<style lang="scss">
.subject-list-wrapper {
  padding: 30px;
  box-sizing: border-box;
  height: 100%;
  background-color: #ccc;
  overflow-y: hidden;
  .subject-list  {
    list-style: none;
    padding: 0;
    margin: 0;
    &__item {
      display: block;
      padding: 10px 30px;
      background: linear-gradient(to left, #df693a 0%, rgb(228, 120, 120), #b4471b);
      border-bottom: 1px solid grey;
      color: #ccc;
      font-size: 20px;
      box-shadow: 0 5px 5px 0 rgba(0,0,0, .2);
      margin-bottom: 5px;
      text-decoration: none;
      opacity: 0.8;
      &:last-child {
        border-bottom: none;
      }
      &:hover,
      &.router-link-active  {
        opacity: 1;
      }
      &__subject {
        margin: 0 0 5px 0;
      }
      &__date {
        font-size: 12px;
        margin: 0 0 5px 0;
        color: #000;        
      }
      &__msg {
        font-size: 14px;
        margin: 0;
        font-style: italic;
        height: 30px;
        max-height: 30px;
        overflow-y: hidden;
      }
    }
  }
}
</style>