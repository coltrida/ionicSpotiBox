<template>
    <ion-Item>
        <ion-list-header @click="selectArtist"> {{ele.name}} </ion-list-header>
    </ion-Item>
</template>

<script>
    import { IonItem, IonListHeader } from '@ionic/vue';
    export default {
        name: "MyArtistComponent",

        props:['ele'],

        components: { IonItem, IonListHeader },

        methods:{
            selectArtist(){
                this.$router.push({name: 'AlbumsOfArtist', params:{'artistId' : this.ele.id}})
            }
        }

    }
</script>

<style scoped>

</style>