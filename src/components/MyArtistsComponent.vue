<template>
    <ion-list>
        <ion-list-header> My Artists </ion-list-header>
       <my-artist-component v-for="ele in myArtists" :key="ele.id" :ele="ele"/>
    </ion-list>
</template>

<script>
    import { defineComponent } from 'vue';
    import { IonList, IonListHeader } from '@ionic/vue';

    import MyArtistComponent from "@/components/MyArtistComponent";

    export default defineComponent({
        components: {MyArtistComponent, IonList, IonListHeader  },

        mounted() {
            this.loadMyArtists();
        },

        methods: {
            loadMyArtists(){
                this.$store.dispatch('fetchAllMyArtists', this.idUser)
            },
        },

        computed:{
            idUser() {
                return this.$store.getters.getIdUser
            },

            myArtists() {
                return this.$store.getters.getAllMyArtists
            },
        }
    });
</script>

<style scoped>

</style>