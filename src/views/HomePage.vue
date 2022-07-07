<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div v-if="!idUser">
          <all-albums-component />
        </div>
        <div v-else>
         <my-artists-component />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import AllAlbumsComponent from "@/components/AllAlbumsComponent";
import MyArtistsComponent from "@/components/MyArtistsComponent";

export default defineComponent({
  name: 'HomePage',

  components: {
    MyArtistsComponent,
    AllAlbumsComponent,
    IonContent,
    IonPage,
  },

  mounted() {
    if (this.idUser){
      this.loadAllMySong();
    }
  },

  methods:{
    loadAllMySong(){
      this.$store.dispatch('fetchAllMySongs', this.idUser)
    }
  },

  computed:{
    idUser() {
      return this.$store.getters.getIdUser
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
