<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link>  -->
      <router-link :to="{name: 'Home' }">
      <button v-if="$store.state.login_user" @click="logout">ログアウトする</button></router-link>
      <router-link to="/kensaku" v-if="$store.state.login_user">検索画面</router-link>
       <router-link to="/favorite" v-if="$store.state.login_user"> お気に入りを見る</router-link>
      
    </div>
    <router-view/>
  </div>
</template>
<script>
import firebase from 'firebase'
import {mapActions} from 'vuex'

export default {
  created() {
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.setLoginUser(user);
        //fetchFavoritesを呼び出す
        this.fetchFavorites()
        if(this.$router.currentRoute.name === "Home"){
          this.$router.push({ name: "Kensaku" })
        } else {
          this.deleteLoginUser()
          this.$router.push({ name: "Home"})
        }
      }
    })
  },
  methods:{
     ...mapActions(['setLoginUser', 'deleteLoginUser', 'logout', 'fetchFavorites'])
  }
}


</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
