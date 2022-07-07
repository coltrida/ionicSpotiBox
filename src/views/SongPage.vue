<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div id="container">
                <ion-card class="music-card">
                    <ion-card-header>
                        <img :src=pathCover />
                    </ion-card-header>
                    <ion-card-content class="ion-text-center">
                        <h2>{{songSelect.name}}</h2>
                        <p>{{songSelect.album.name}}</p>

                        <ion-progress-bar value={1}></ion-progress-bar>

                        <ion-button color="dark" fill="clear" size="small" @click="changeShaffle">
                            <ion-icon slot="icon-only" name="shuffle" :color="shaffleSwc ? 'primary' : ''"></ion-icon>
                        </ion-button>
                        <ion-button color="dark" fill="clear" size="large" @click="prevSw">
                            <ion-icon slot="icon-only" name="play-back"></ion-icon>
                        </ion-button>
                        <ion-button color="dark" fill="clear" class="button-largest" @click="playPauseSw">
                            <ion-icon slot="icon-only"  :name="playMusicSwc ? 'pause' : 'play' "></ion-icon>
                        </ion-button>
                        <ion-button color="dark" fill="clear" size="large" @click="nextSw">
                            <ion-icon slot="icon-only" name="play-forward"></ion-icon>
                        </ion-button>
                        <ion-button color="dark" fill="clear" size="small">
                            <ion-icon slot="icon-only" name="repeat"></ion-icon>
                        </ion-button>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import {IonContent, IonPage, IonCard, IonCardHeader, IonCardContent, IonButton, IonIcon, IonProgressBar} from '@ionic/vue';
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: "SongPage",

        components: {
            IonContent, IonPage, IonCard, IonCardHeader, IonCardContent, IonButton, IonIcon, IonProgressBar
        },

        mounted() {
            this.swSonoSullaSongPage();
            this.nascondiFooter();
        },

        methods:{
            swSonoSullaSongPage(){
                this.$store.commit('affermoSonoSullaSongPage');
            },

            nascondiFooter(){
                this.$store.commit('nascondiFooter');
            },

            playPauseSw(){
                this.$store.commit('pauseSong');
            },

            nextSw(){
                this.$store.commit('nextSong');
            },

            prevSw(){
                this.$store.commit('prevSong');
            },

            changeShaffle(){
                this.$store.commit('changeShaffleSwc');
            },
        },

        computed:{
            songSelect(){
                return this.$store.getters.getSongSelect
            },

            pathCover(){
                return 'https://www.tcmontevarchi-prenotazioni.it/storage/covers/'+this.songSelect.album.id+'.jpg'
            },

            playMusicSwc(){
                return this.$store.getters.getPlayMusicSwc
            },

            nextSong(){
                return this.$store.getters.getNextSong
            },

            shaffleSwc(){
                return this.$store.getters.getShaffleSwc
            },
        }
    })
</script>

<style scoped>

</style>