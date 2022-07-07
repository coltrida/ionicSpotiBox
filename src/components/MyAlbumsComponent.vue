<template>
    <ion-list>
        <ion-list-header> My Albums </ion-list-header>
       <my-album-component v-for="element in myAlbums" :key="element.id" :element="element"/>
    </ion-list>
</template>

<script>
    import { defineComponent } from 'vue';
    import { IonList, IonListHeader } from '@ionic/vue';

    import MyAlbumComponent from "@/components/MyAlbumComponent";

    export default defineComponent({
        components: {MyAlbumComponent, IonList, IonListHeader  },

        mounted() {
            this.loadMyAlbums();
        },

        methods: {
            loadMyAlbums(){
                this.$store.dispatch('fetchMyAlbums', this.idUser)
            },
        },

        computed:{
            idUser() {
                return this.$store.getters.getIdUser
            },

            myAlbums() {
                return this.$store.getters.getMyAlbums
            },
        }
    });
</script>

<style scoped>

</style>