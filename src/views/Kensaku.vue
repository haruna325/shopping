

<template>
  <div class="home">
    <h1>商品検索ページ</h1>
    検索：<input type="text" v-model="keyword">
    <!-- クリックしたらAPIから一致したものをとってくる -->
    <button @click="kensaku(keyword)">検索</button>
    <table>
      <tr>
        <td>
          <table border="1">
            <tr v-for="item in products" :key="item.id">
              <td>
                <a :href="item.url">{{ item.name }}</a>
                <div><img v-for="image in item.image" :src="image.imageUrl" :key="image.id"></div>
                <div>価格：{{item.price }}円</div>
                <button @click="addFav(item)">お気に入り</button>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  data(){
    return{
      keyword:''
    }
  },
  methods:{
    kensaku(keyword){
      this.getAxios(keyword)
      this.keyword = ''
    },
    addFav(item){
      this.addFavorite(item)
    },
    ...mapActions(['getAxios', 'addFavorite'])
  },
  computed:{
    ...mapGetters(['products'])
  }
}
</script>
