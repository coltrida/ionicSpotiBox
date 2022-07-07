<template>
    <ion-item>
        <ion-label @click="songSelected()">{{element.name}}</ion-label>
        <ion-icon
                @click="changePref"
                slot="end"
                name='heart'
                style="margin-right: 10px"
                :color="isPreferite ? 'danger' : ''"
        />
    </ion-item>
</template>

<script>
    import { IonItem, IonLabel, IonIcon } from '@ionic/vue';
    export default {
        name: "SongComponent",

        props: ['element'],

        components:{
            IonIcon, IonItem, IonLabel
        },

        methods:{
            songSelected(){
                let songBought = this.mySongs.find(ele => ele.id == this.element.id);
                let songYetPlayed = false;
                if (this.songSel){
                    if (this.songSel.id === this.element.id){
                        songYetPlayed = true;
                    }
                }
                if (songBought){
                    if (!songYetPlayed){
                        this.$store.commit('playSingleSw');
                        this.$store.commit('setPlaylist');
                        this.$store.commit('playSong', this.element);
                    }
               //     this.$store.commit('affermoSonoSullaSongPage');
               //     this.$router.push({name: 'Song', params: { songId: this.element.id }})
                }
            },

            changePref(){
                this.$store.dispatch('prefSw', {'songId':this.element.id, 'userId' : this.idUser})
            }
        },

        computed:{
            mySongs(){
                return this.$store.getters.getAllMySongs
            },

            songSel(){
                return this.$store.getters.getSongSelect
            },

            idUser() {
                return this.$store.getters.getIdUser
            },

            isPreferite(){
                return this.element.preferites.find(ele => ele.id == this.idUser)
            }
        }
    }
</script>

<style scoped>

</style>