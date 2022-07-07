<template>
    <ion-footer>
        <ion-toolbar class="ion-text-center">
            <div id="music_list" style="display: none">
                <audio controls autoplay></audio>
            </div>
            <p @click="goToSongPage">{{nameSong}}</p>
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
            <ion-button color="dark" fill="clear" size="small" @click="downFooter">
                <ion-icon slot="icon-only" name="chevron-down-outline"></ion-icon>
            </ion-button>
        </ion-toolbar>
    </ion-footer>
</template>

<script>
    import {IonFooter, IonToolbar, IonButton, IonIcon} from '@ionic/vue';
    export default {
        name: "FooterComponent",

        components: {
            IonFooter, IonToolbar, IonButton, IonIcon
        },

        mounted() {
            this.loadMusicPlayer();
        },

        methods:{
            loadMusicPlayer(){
                this.$store.commit('fetchMusicPlayer', this.$el.querySelector("#music_list audio"));
            },

            playPauseSw(){
                this.$store.commit('pauseSong');
            },

            nextSw(){
                this.$store.commit('nextSong');
            //    this.$store.commit('playSong', this.nextSong);
            },

            prevSw(){
                this.$store.commit('prevSong');
             //   this.$store.commit('playSong', this.nextSong);
            },

            changeShaffle(){
                this.$store.commit('changeShaffleSwc');
            },

            downFooter(){
                this.$store.commit('nascondiFooter');
            },

            goToSongPage(){
                this.$router.push({name: 'Song', params: { songId: this.songSelected.id }})
            }
        },

        computed:{
            nameSong(){
                return this.$store.getters.getNameSong
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

            songSelected(){
                return this.$store.getters.getSongSelect
            }
        }
    }
</script>

<style scoped>

</style>