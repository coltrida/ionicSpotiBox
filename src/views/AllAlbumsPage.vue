<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
          <all-albums-component />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import AllAlbumsComponent from "@/components/AllAlbumsComponent";

export default defineComponent({
  name: 'AllAlbumsPage',

  components: {
    AllAlbumsComponent,
    IonContent,
    IonPage,
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
