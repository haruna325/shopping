<template>
    <div id="favorite">
        <h1>気になるリスト</h1>
        <ul>
            <li v-for="(item, index) in favorite" :key="index">
               <a :href="item.url">{{item.name}} </a>
                 <div>価格：{{ item.price }}円</div>
                 <div><img v-for="image in item.image" :src="image.imageUrl" :key="image.id"></div>
                 <div><button @click="removeFav(item.id)">お気に入りから削除</button></div>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
    created(){
        
    },
    methods:{
        removeFav(id){
            if(confirm('お気に入りから削除してもよろしいですか？')){
                this.deleteFavorite({id})
            }     
        },
        ...mapActions(['deleteFavorite', ])
    },
    computed:{
        ...mapGetters(['favorite', 'uid'])
    },

}


</script>