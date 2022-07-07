<template>
  <ion-app>
    <header-component />

    <ion-content scroll-y="false">
        <ion-router-outlet />
    </ion-content>

    <footer-component v-show="showFooter"/>

  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/vue';
import FooterComponent from "./components/FooterComponent";
import { defineComponent } from 'vue';
import HeaderComponent from "./components/HeaderComponent";

export default defineComponent({
  name: 'App',

  components: {
    HeaderComponent, IonApp, IonRouterOutlet, IonContent,
    FooterComponent
  },

  mounted() {
    this.loadAllAlbums();
  },

  methods:{
    loadAllAlbums(){
      this.$store.dispatch('fetchAllAlbums')
    }
  },

  computed:{
    startPlayMusic() {
      return !this.$store.getters.getSonoSullaSongPage && this.$store.getters.getPlayMusicSwc
    },

    showFooter(){
      return this.$store.getters.getShowFooter
    }
  }
});
</script>