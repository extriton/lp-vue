import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    subjects: [],
    messages: [],
    messagesLoading: false,
    messageSending: false,
  },
  getters: {
    SUBJECTS: state => {
      return state.subjects
    },
    MESSAGES: state => {
      return state.messages
    },
    MESSAGES_LOADING: state => {
      return state.messagesLoading
    },
    MESSAGE_SENDING: state => {
      return state.messageSending
    },
  },
  mutations: {
    SET_SUBJECTS: (state, payload) => {
      state.subjects = payload
    },
    SET_MESSAGES: (state, payload) => {
      state.messages = payload
    },
    ADD_MESSAGE: (state, payload) => {
      state.messages.push(payload)
    },
    SET_MESSAGES_LOADING: (state, payload) => {
      state.messagesLoading = payload
    },
    SET_MESSAGE_SENDING: (state, payload) => {
      state.messageSending = payload
    },
  },
  actions: {
    GET_SUBJECTS: async ({ commit }) => {
      let res = await getSubjectList()
      commit('SET_SUBJECTS', res)
    },
    GET_MESSAGES: async ({ commit }, payload) => {
      if (!payload) {
        commit('SET_MESSAGES', [])
        return
      }

      let subjectId
      try {
        subjectId = parseInt(payload)
      } catch (e) {
        commit('SET_MESSAGES', [])
        return
      }
      
      commit('SET_MESSAGES_LOADING', true)
      commit('SET_MESSAGES', [])
      let res = await getMessageList(subjectId)
      commit('SET_MESSAGES', res)
      commit('SET_MESSAGES_LOADING', false)
    },
    SAVE_MESSAGE: async ({ commit }, payload) => {
      if (!payload || !payload.subjectId || !payload.author || !payload.text) {
        return
      }

      let subjectId
      try {
        subjectId = parseInt(payload.subjectId)
      } catch (e) {
        return
      }
      payload.subjectId = subjectId
      
      commit('SET_MESSAGE_SENDING', true)
      let message = await saveMessage(payload)
      commit('ADD_MESSAGE', message)
      commit('SET_MESSAGE_SENDING', false)
    },
  }
})

// Emulate axios request / response
function getSubjectList () {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      let res = testData.map(elem => {
        let copy = Object.assign({}, elem)
        copy.firstMsg = elem.parts[0].text
        delete copy.parts
        return copy
      })
      resolve(res)
    }, 100)
  })

}

function getMessageList (subjectId) {
  
  return new Promise((resolve) => {
    setTimeout(() => {

      let copy
      let res = []
      for (let i = 0; i < testData.length; i++)
        if (testData[i].id == subjectId) {
          copy = Object.assign({}, testData[i])
          res = copy.parts
          break
        }
      
      resolve(res)
    }, 1000)
  })

}

function saveMessage (message) {
  
  return new Promise((resolve) => {
    setTimeout(() => {

      for (let i = 0; i < testData.length; i++)
        if (testData[i].id == message.subjectId) {
          message.id = testData[i].parts.length
          message.created = (new Date()).toLocaleString()
          break
        }
      
      resolve(message)
    }, 500)
  })

}

const testData = [
  {
    id: 1,
    subject: 'Простой запрос',
    created: '2019-08-01 23:59',
    parts: [
      {
        id: 1,
        author: 'vasya',
        text: 'Привет, как дела?',
        created: '2019-08-01 23:59',
      },
      {
        id: 2,
        author: 'petya',
        created: '2019-08-02 01:20',
        text: 'Привет, все хорошо, спасибо!',
      },
      {
        id: 3,
        author: 'petya',
        created: '2019-08-02 05:20',
        text: 'А у тебя?',
      },
    ],
  },
  {
    id: 2,
    subject: 'Вопрос по домену',
    created: '2016-03-02 14:19',
    parts: [
      {
        id: 1,
        author: 'petr',
        created: '2019-08-06 12:20',
        text: 'Здравствуйте, тут есть кто-нибудь?',
      },
      {
        id: 2,
        author: 'vasiliy',
        created: '2019-08-06 12:34',
        text: 'Да, я вас слушаю!',
      },
      {
        id: 3,
        author: 'petr',
        created: '2019-08-06 12:38',
        text: 'Помогите мне настроить домен!',
      },
    ],
  },
]