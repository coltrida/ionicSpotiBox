<template>
    <ion-list>
        <ion-list-header> All Albums </ion-list-header>
        <my-album-component v-for="element in allAlbums" :key="element.id" :element="element"/>
    </ion-list>
</template>

<script>
    import { defineComponent } from 'vue';
    import { IonList, IonListHeader } from '@ionic/vue';

    import MyAlbumComponent from "@/components/MyAlbumComponent";

    export default defineComponent({
        components: {MyAlbumComponent, IonList, IonListHeader  },

        mounted() {
     //       this.loadAllAlbums();
        },

        methods: {
/*            loadAllAlbums(){
                this.$store.dispatch('fetchAllAlbums')
            }*/
        },

        computed:{
            allAlbums() {
                return this.$store.getters.getAllAlbums
            },
        }
    });
</script>

<style scoped>

</style>