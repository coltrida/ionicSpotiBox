<template>
    <ion-page>
        <ion-content>
            <div id="container">
                <ion-list style="padding: 10%">
                    <ion-item>
                        <ion-label position="floating">Email</ion-label>
                        <ion-input v-model="user.mail"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Password</ion-label>
                        <ion-input type="password" v-model="user.password"></ion-input>
                    </ion-item>

                    <section style="margin-top: 20px">
                        <ion-button expand="block" size="large" @click="setLogin">Login</ion-button>
                    </section>
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import {IonLabel, IonInput, IonContent, IonPage,  IonButton, IonList, IonItem,
        toastController } from '@ionic/vue';
    export default {
        name: "LoginPage",

        data(){
            return {
                user:{}
            }
        },

        components:{ IonInput, IonLabel,IonContent,
            IonPage,
            IonButton,
            IonList,
            IonItem},

        methods:{
            setLogin(){
                this.$store.dispatch('fetchLogin', this.user).then(() => {
                    if (this.errorMessage){
                        this.openToast()
                    } else {
                        this.$store.dispatch('fetchAllMySongs', this.idUser)
                        this.$router.push('/home')
                    }
                });
            },

            async openToast() {
                const toast = await toastController
                    .create({
                        message: this.errorMessage,
                        duration: 2000
                    })
                return toast.present();
            },
        },

        computed:{
            errorMessage() {
                return this.$store.getters.getErrorMessage
            },

            idUser() {
                return this.$store.getters.getIdUser
            },
        }
    }
</script>

<style scoped>
    #container {
        text-align: center;
        padding: 0 10%;
        position: absolute;
        left: 0;
        right: 0;
        top: 40%;
        transform: translateY(-50%);
    }
</style>