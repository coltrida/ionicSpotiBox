<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div id="container">
                <ion-list>
                    <!--<div v-if="!albumName" class="ion-text-center ion-margin-top">
                        <ion-spinner name="lines"></ion-spinner>
                    </div>-->

                        <ion-toolbar>
                            <ion-title>Songs of {{albumName}}</ion-title>
                                <ion-icon
                                        slot="end"
                                        @click="goAlbums()"
                                        size="large"
                                        name="arrow-undo-outline"
                                        style="margin-right: 20px">
                                </ion-icon>
                        </ion-toolbar>
                        <song-component v-for="item in songsList"
                                        :key="item.id"
                                        :element = item
                        />

                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import { IonContent, IonPage, IonList, IonToolbar, IonIcon, IonTitle } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import SongComponent from "../components/SongComponent";

    export default defineComponent({
        name: 'SongsOfAlbumPage',

        components: {
            SongComponent,
            IonContent,
            IonPage,
            IonList,
            IonIcon,
            IonToolbar,
            IonTitle,

        },

        mounted() {
           // this.loadSongs();
        },

        methods: {
            /*loadSongs() {
                this.$store.commit('loadSongsOfAlbum', this.$route.params.albumId);
            },*/

            goAlbums(){
               //     this.$store.commit('resetSongsOfAlbum');
               // console.log(this.songsList)
                this.$router.push({name: 'AlbumsOfArtist', params:{artistId: this.songsList[0].album.artist_id}})
            }
        },

        computed:{
            albumName(){
                return this.$store.getters.getAlbumName
            },

            songsList(){
                return this.$store.getters.getSongsOfAlbum
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