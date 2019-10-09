<template>
    <div class="message-list-wrapper">
        <!-- Loading box -->
        <div class="loading-box">
            <img v-show="MESSAGES_LOADING || MESSAGE_SENDING" src="../../public/img/loading.svg" alt="Loading..." />
        </div>
        <transition name='fade'>
        <ul class="message-list" v-if="!MESSAGES_LOADING">
            <li class="message-list__item"
                v-for="(item, index) in messageList" 
                :key="index"
            >
                <p class="message-list__item__author">{{ item.author }}</p>
                <p class="message-list__item__date">{{ item.created }}</p>
                <p class="message-list__item__msg">{{ item.text }}</p>
            </li>
        </ul>
        </transition>
        <div class="message-input-form">
            <input class="message-input-form__author" type="text" placeholder="Введите имя"
                   v-model="author"
                   :disabled="isDisableForm"
            >
            <textarea class="message-input-form__text" placeholder="Введите сообщение"
                      v-model="text"
                      :disabled="isDisableForm"
            ></textarea>
            <button @click="onSendMessage()" :disabled="isDisableForm">
                Отправить сообщение
            </button>
        </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MessageList',
  data () {
    return {
        author: '',
        text: '',
    }
  },
  computed: {
    messageList () {
      return this.MESSAGES
    },
    isDisableForm () {
        return this.MESSAGES_LOADING || this.MESSAGE_SENDING
    },
    ...mapGetters(['MESSAGES', 'MESSAGES_LOADING', 'MESSAGE_SENDING'])
  },
  methods: {
    onSendMessage () {
        if (!this.author || !this.text) return
        
        this.$store.dispatch('SAVE_MESSAGE', {
            subjectId: this.$route.params.subjectId,
            author: this.author,
            text: this.text,
        })
        this.author = ''
        this.text = ''
      }
  }
}
</script>

<style lang="scss">
.message-list-wrapper {
    padding: 30px;
    box-sizing: border-box;
    height: 100%;
    background-color: #444;
    position: relative;
    .loading-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .message-list  {
        height: 70%;
        overflow-y: auto;
        list-style: none;
        padding: 0;
        margin: 0;
        &__item {
            display: block;
            padding: 10px 30px;
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
            &__author {
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
            }
        }
    }
    .message-input-form {
        height: 20%;
        background-color: #333;
        position: absolute;
        bottom: 30px;
        left: 30px;
        right: 30px;
        padding: 20px;
        &__author, &__text {
            width: 100%;
            margin-bottom: 10px;
        }
        &__text {
            height: 80px;
        }
    }
    /* Animation */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .7s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
}
</style>