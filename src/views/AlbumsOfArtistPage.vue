<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
<!--        <my-album-component v-for="element in albums" :key="element.id" :element="element"/>-->

          <swiper
                  :pagination="true"
                  :modules="modules"
                  :slides-per-view="1"
                  :space-between="50"
                  @swiper="onSwiper"
                  @slideChange="onSlideChange"
          >
              <swiper-slide v-for="element in albums" :key="element.id" >
                  <my-album-component :element="element"/>
              </swiper-slide>

              <!--              <swiper-slide>Slide 2</swiper-slide>
                            <swiper-slide>Slide 3</swiper-slide>-->
              ...
          </swiper>

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import "swiper/css/pagination";
    import { Pagination } from "swiper";
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
 import MyAlbumComponent from "../components/MyAlbumComponent";


export default defineComponent({
  name: 'AlbumsOfArtistPage',

  components: {
     MyAlbumComponent,
    IonContent,
    IonPage,
      Swiper,
      SwiperSlide,
  },

    setup() {
        const onSwiper = (/*swiper*/) => {
       //     console.log(swiper);
        };
        const onSlideChange = () => {
       //     console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Pagination],
        };
    },

  mounted() {
    this.loadAlbumOfArtist();
  },

  methods:{
    loadAlbumOfArtist(){
      this.$store.commit('fetchAlbumOfArtist', this.$route.params.artistId);
    }
  },

  computed:{
    idUser() {
      return this.$store.getters.getIdUser
    },

    albums() {
      return this.$store.getters.getAlbumsOfArtist
    },
  }
});
</script>

<style scoped>
#container {

}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
