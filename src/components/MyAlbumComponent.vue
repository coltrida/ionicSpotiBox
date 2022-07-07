<template>
    <ion-item>
        <router-link
                :to="{ name: 'SongsOfAlbum', params: { albumId: element.id }}">
        <ion-card @click="albumSelected">
                    <img :src=pathCover />
            <ion-card-header>
                <ion-card-title>{{element.name}}</ion-card-title>
                <ion-card-subtitle>{{element.artist.name}}</ion-card-subtitle>
            </ion-card-header>
        </ion-card>
        </router-link>
    </ion-item>
</template>

<script>
    import {IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle} from '@ionic/vue';
    export default {
        name: "MyAlbumComponent",
        props:['element'],

        components: { IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle },

        methods:{
            albumSelected(){
                this.$store.commit('loadSongsOfAlbum', this.element.id);
                this.$router.push({ name: 'SongsOfAlbum', params: { albumId: this.element.id }})
            }
        },

        computed:{
            pathCover(){
                return 'https://www.tcmontevarchi-prenotazioni.it/storage/covers/'+this.element.id+'.jpg'
            }
        }
    }
</script>

<style scoped>

</style>