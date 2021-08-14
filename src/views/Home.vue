<template>
  <div class="about">
   <h1>ログイン画面</h1>
   <button @click="login">ログインする</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default{
  methods:{
    ...mapActions(['login'])
  }
}

</script>


