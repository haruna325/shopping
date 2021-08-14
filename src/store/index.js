import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keyword: '',
    //APIから取得した商品情報を配列に格納。中身はオブジェクト
    products: [],
    login_user: '',
    favorite: []
  },
  mutations: {
    getAxios(state, item) {
      state.products.push({
          name: item.Item.itemName, 
          url: item.Item.itemUrl, 
          price: item.Item.itemPrice,
          //imageは配列になっているから配列ごととってくる
          image: item.Item.mediumImageUrls
      })
    },
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    addFavorite(state, {id, item}) {
      item.id = id
      state.favorite.push(item);
    },
    deleteFavorite(state, { id }) {
      const index = state.favorite.findIndex(item => item.id === id)
      state.favorite.splice(index, 1)
    }
  },
  actions: {
    // 検索結果と一致した商品をaxiosによって取得
    getAxios({ commit }, keyword) {
      axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706', {
        params: {
          applicationId: '1031636184299349316',
          keyword: `${keyword}`,
        }
      }).then(res => {
        res.data.Items.forEach(item => {
          commit('getAxios', item)
        });
      })
        .catch(error => console.log(error))
    },
    //login処理。firebaseのauthenticationを呼び出している
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    //logout処理
    logout({ commit }, user) {
      firebase.auth().signOut()
      commit('deleteLoginUser', user)
    },
    //お気に入り登録
    addFavorite({ getters, commit }, item) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/products`).add(item)
          .then((doc) => {
          commit('addFavorite',{id: doc.id, item})
        })
      }
    },
    //お気に入り登録から削除
    deleteFavorite({ getters, commit }, {id}) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/products`)
          .doc(id).delete().then(() => {
          commit('deleteFavorite', {id})
        })
      }
    },
    //firestoreに保存したデータの取得
    fetchFavorites({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/products`)
        .get().then(snapshot => {
          snapshot.forEach(doc =>
          commit('addFavorite', {id: doc.id, item: doc.data() }))
      })
    }
  },
    getters: {
      products(state) {
        return state.products
      },
      favorite(state) {
        return state.favorite
      },
      uid(state) {
        if (state.login_user) {
          return state.login_user.uid
        } else {
          return null
        }
      }
  }
})
