<template>
    <ion-page>
        <ion-content>
            <ion-list>
                <ion-list-header> My Preferite Songs </ion-list-header>
                <song-component v-for="element in myPref" :key="element.id" :element="element"/>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>

    import {IonPage, IonContent, IonList, IonListHeader} from '@ionic/vue';
    import {defineComponent} from "vue";
    import SongComponent from "../components/SongComponent";

    export default defineComponent({
        components: {SongComponent, IonPage, IonContent, IonListHeader, IonList},

        mounted() {
            this.loadPreferites();
        },

        beforeRouteLeave (to, from , next) {
            this.swPrefPage();
                next()
        },

        methods:{
            loadPreferites(){
                this.$store.dispatch('fetchPrefSongs', this.idUser)
            },

            swPrefPage(){
                this.$store.commit('changePreferitesPageSw');
            }
        },

        computed:{
            idUser() {
                return this.$store.getters.getIdUser
            },

            myPref() {
                return this.$store.getters.getPrefSongs
            },
        }
    });
</script>

<style scoped>

</style>