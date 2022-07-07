<template>
    <ion-page>
        <ion-content>
            <my-albums-component />
        </ion-content>
    </ion-page>
</template>

<script>
    import MyAlbumsComponent from "@/components/MyAlbumsComponent";
    import {IonPage, IonContent} from '@ionic/vue';
    import {defineComponent} from "vue";

    export default defineComponent({
        components: {IonPage, IonContent, MyAlbumsComponent},
    });
</script>

<style scoped>

</style>