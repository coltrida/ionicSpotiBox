<template>
    <ion-header :translucent="true">
        <ion-toolbar>
               <ion-title @click="goHome">SpotyBox</ion-title>
            <ion-buttons slot="end">
                <ion-button   color='dark' @click="playShuffle">
                    <ion-icon size="large" name="shuffle"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
                <ion-button   color='dark' @click="goAllAlbums">
                    <ion-icon size="large" name="albums-outline"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-buttons v-if="!idUser" slot="end">
                <ion-button @click="goLogin"> Login </ion-button>
            </ion-buttons>
            <ion-buttons v-else slot="end">
                <ion-button   color='dark' @click="goPreferites">
                    <ion-icon size="large" name="heart" color='danger' />
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>

<script>
    import { IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/vue';
    export default {
        name: "HeaderComponent",

        components:{
            IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon
        },

        methods:{
            goLogin(){
                this.$router.push('/login')
            },

            goAllAlbums(){
                if (this.playMusic){
                    this.$store.commit('visualizzaFooter');
                }
                this.$store.commit('negoSonoSullaSongPage');
                this.$router.push('/allAlbums')
            },

            goHome(){
                if (this.playMusic){
                    this.$store.commit('visualizzaFooter');
                }
                this.$store.commit('negoSonoSullaSongPage');
                this.$router.push('/')
            },

            goPreferites(){
                this.$store.commit('changePreferitesPageSw');
                this.$router.push('/myPreferites')
            },

            next() {
                let presentIndex = this.indexSong;
                // Check for last audio file in the playlist
                if (this.indexSong === this.allMySongs.length - 1) {
                    this.$store.commit('nextIndex', 0);
                } else {
                    if (this.shaffleSwc) {
                        this.$store.commit('nextIndex', Math.floor(Math.random() * this.allMySongs.length));
                        if (presentIndex === this.indexSong) {
                            this.next();
                        }
                    } else {
                        this.$store.commit('nextIndex', this.indexSong + 1);
                    }
                }

                // Change the audio element source
                this.$store.commit('playMusic');
            },

            playShuffle(){
                if (this.sonoSullaSongPage){
                    this.$store.commit('nascondiFooter');
                }

                this.$store.commit('changeShaffleSwc');

                // Start the player
                this.$store.commit('playMusic');

                // Listen for the music ended event, to play the next audio file
                this.musicPlayer.addEventListener('ended', this.next, false);

                this.$store.commit('playListSw');

            },


        },

        computed:{
            idUser() {
                return this.$store.getters.getIdUser
            },

            musicPlayer() {
                return this.$store.getters.getMusicPlayer
            },

            indexSong() {
                return this.$store.getters.getIndexSong
            },

            allMySongs() {
                return this.$store.getters.getAllMySongs
            },

            shaffleSwc() {
                return this.$store.getters.getShaffleSwc
            },

            playMusic() {
                return this.$store.getters.getPlayMusicSwc
            },

            sonoSullaSongPage(){
                return this.$store.getters.getSonoSullaSongPage
            }
        }
    }
</script>

<style scoped>

</style>