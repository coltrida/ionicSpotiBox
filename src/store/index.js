import { createStore } from 'vuex'
import axios from "axios";

const state = {
    showFooter: false,
    preferitesPageSw: false,
    albumsOfArtist:[],
    allMyArtists:[],
    allMySongs:[],
    myAlbums:[],
    allAlbums:[],
    idUser: localStorage.getItem('idUser') || '',
    token: localStorage.getItem('user-token') || '',
    errorMessage:'',
    songsOfAlbum:[],
    playListInPlay:[],
    prefSongs:[],
    albumName:[],
    singleOrPlaylistSw:false,
    indexSong:0,
    shaffleSwc:false,
    playMusicSwc:false,
    sonoSullaSongPage:false,
    pausaSwc:false,
    nameSong:'',
    musicPlayer:{
        src:''
    },
    songSelect:{},
    nextSong:{}
}

const getters = {
    getAllMyArtists(state){
        return state.allMyArtists;
    },

    getShowFooter(state){
        return state.showFooter;
    },

    getAllMySongs(state){
        return state.allMySongs;
    },

    getAllAlbums(state){
        return state.allAlbums;
    },

    getAlbumsOfArtist(state){
        return state.albumsOfArtist;
    },

    getSongSelect(state){
        return state.songSelect;
    },

    getNextSong(state){
        return state.nextSong;
    },

    getMyAlbums(state){
        return state.myAlbums;
    },

    getIdUser(state){
        return state.idUser;
    },

    getErrorMessage(state){
        return state.errorMessage;
    },

    getSongsOfAlbum(state){
        return state.songsOfAlbum;
    },

    getPrefSongs(state){
        return state.prefSongs;
    },

    getAlbumName(state){
        return state.albumName;
    },

    getNameSong(state){
        return state.nameSong;
    },

    getSingleOrPlaylistSw(state){
        return state.singleOrPlaylistSw;
    },

    getIndexSong(state){
        return state.indexSong;
    },

    getShaffleSwc(state){
        return state.shaffleSwc;
    },

    getPlayMusicSwc(state){
        return state.playMusicSwc;
    },

    getSonoSullaSongPage(state){
        return state.sonoSullaSongPage;
    },

    getPausaSwc(state){
        return state.pausaSwc;
    },

    getMusicPlayer(state){
        return state.musicPlayer;
    },
}

const actions = {
    async fetchLogin({commit}, payload){
        const response = await axios.post('https://www.tcmontevarchi-prenotazioni.it/api/login', payload);
        commit('fetchLogin', response.data);
    },

    async fetchMyAlbums({commit}, userId){
        const response = await axios.get('https://www.tcmontevarchi-prenotazioni.it/api/albumsBought/'+userId);
        commit('fetchMyAlbums', response.data);
    },

    async fetchAllAlbums({commit}){
        const response = await axios.get('https://www.tcmontevarchi-prenotazioni.it/api/albums');
        commit('fetchAllAlbums', response.data);
    },

    async fetchAllMyArtists({commit}, userId){
        const response = await axios.get('https://www.tcmontevarchi-prenotazioni.it/api/artistBought/'+userId);
        commit('fetchAllMyArtists', response.data);
    },

    async fetchAllMySongs({commit}, userId){
        const response = await axios.get('https://www.tcmontevarchi-prenotazioni.it/api/allSongsBought/'+userId);
        commit('fetchAllMySongs', response.data);
    },

    async fetchPrefSongs({commit}, userId){
        const response = await axios.get('https://www.tcmontevarchi-prenotazioni.it/api/prefs/'+userId);
        commit('fetchPrefSongs', response.data);
    },

    async prefSw({commit}, payload){
        await axios.get('https://www.tcmontevarchi-prenotazioni.it/api/prefSw/'+payload.songId+'/'+payload.userId);
        commit('prefSw', payload);
    },

    async prefSwFromPref({commit}, songId){
        await axios.get('https://www.tcmontevarchi-prenotazioni.it/api/prefSw/'+songId);
        commit('prefSwFromPref', songId);
    },

    async fetchSongsOfAlbum({commit}, albumId){
        const response = await axios.get('https://www.tcmontevarchi-prenotazioni.it/api/songs/' + albumId);
        commit('fetchSongsOfAlbum', response.data);
    },
}

const mutations = {
    fetchLogin(state, payload){
        if (payload.stato === 'successo'){
            state.errorMessage = '';
            localStorage.setItem('user-token', payload.token);
            localStorage.setItem('idUser', payload.user.id);

            state.token = localStorage.getItem('user-token');
            state.idUser = localStorage.getItem('idUser');
        } else {
            state.errorMessage = payload.message[0];
        }
    },

    fetchAllMySongs(state, payload){
        state.allMySongs = payload;
        state.indexSong = Math.floor(Math.random() * state.allMySongs.length);
    },

    fetchMyAlbums(state, payload){
        state.myAlbums = payload;
    },

    fetchAllMyArtists(state, payload){
        state.allMyArtists = payload;
    },

    fetchAlbumOfArtist(state, idArtist){
        state.albumsOfArtist = state.allMyArtists.find(ele => ele.id == idArtist).albums
    },

    fetchAllAlbums(state, payload){
        state.allAlbums = payload;
    },

    fetchPrefSongs(state, payload){
        state.prefSongs = payload;
    },

    fetchSongsOfAlbum(state, payload){
        state.songsOfAlbum = payload.songs;
        state.albumName = payload.name;
    },

    loadSongsOfAlbum(state, idAlbum){
        const objIndex = state.allAlbums.findIndex((obj => obj.id == idAlbum));
        let album = state.allAlbums[objIndex];
        state.songsOfAlbum = album.songs;
        state.albumName = album.name;
    },

    resetSongsOfAlbum(state){
        state.songsOfAlbum = [];
        state.albumName = '';
    },

    fetchMusicPlayer(state, payload){
        state.musicPlayer = payload;
    },

    prefSw(state, payload){
        // la canzone è già nella lista dei preferiti
        if (state.prefSongs.find(ele => ele.id == payload.songId)){
            // se la canzone che ho cliccato è nella lista delle canzoni dell'album in selezione
            if (state.songsOfAlbum.find(ele => ele.id == payload.songId)){
                // tolgo dai preferiti della canzone situata nella lista delle canzoni dell'album in selezione
                state.songsOfAlbum.find(ele => ele.id == payload.songId).preferites =
                    state.songsOfAlbum.find(ele => ele.id == payload.songId).preferites.filter(ele => ele.id != payload.userId)
            }
            // tolgo la canzone dalla lista dei preferiti
            state.prefSongs = state.prefSongs.filter(ele => ele.id != payload.songId);
            // tolgo dai preferiti della canzone situata nella lista di tutte le mie canzoni
            state.allMySongs.find(ele => ele.id == payload.songId).preferites =
                state.allMySongs.find(ele => ele.id == payload.songId).preferites.filter(ele => ele.id != payload.userId)
        } else {
            // la canzone non è presente nella lista dei preferiti
            // aggiungo la canzone alla lista dei preferiti
            state.prefSongs.unshift(state.allMySongs.find(ele => ele.id == payload.songId));
            // aggiungo ai preferiti della canzone situata nella lista di tutte le canzoni
            state.allMySongs.find(ele => ele.id == payload.songId).preferites.unshift({'id': parseInt(payload.userId)});
            // se la canzone che ho cliccato è nella lista delle canzoni dell'album in selezione
            if (state.songsOfAlbum.find(ele => ele.id == payload.songId)){
                // aggiungo ai preferiti della canzone situata nella lista delle canzoni dell'album in selezione
                state.songsOfAlbum.find(ele => ele.id == payload.songId).preferites.unshift({'id': parseInt(payload.userId)});
            }
        }
    },

    prefSwFromPref(state, idSong){
        state.prefSongs = state.prefSongs.filter(ele => ele.id != idSong)
    },

    nextIndex(state, payload){
        state.indexSong = payload;
    },

    playMusic(state){
        let actualMusic = {
            name:'',
            id: "",
            album:{
                name:''
            }
        };
        state.singleOrPlaylistSw = false;
        actualMusic = state.allMySongs[state.indexSong];
        state.songSelect = state.allMySongs[state.indexSong];
        state.nameSong = state.indexSong+1 + ' - ' + actualMusic.name + ' - Album: ' + actualMusic.album.name
        state.musicPlayer.src = 'https://www.tcmontevarchi-prenotazioni.it/storage/songs/'+actualMusic.id + '.mp3'
        state.playMusicSwc = true;
        if (!state.sonoSullaSongPage){
            state.showFooter = true;
        }
    },

    setPlaylist(state){
        if (state.singleOrPlaylistSw){
            if (state.preferitesPageSw){
                state.playListInPlay = state.prefSongs;
            }else {
                state.playListInPlay = state.songsOfAlbum;
            }
        } else {
            state.playListInPlay = state.allMySongs;
        }
    },

    changePreferitesPageSw(state){
        state.preferitesPageSw = !state.preferitesPageSw;
    },

    playSong(state, songSelected){
        state.indexSong = state.playListInPlay.findIndex((obj => obj.id == songSelected.id));
        state.singleOrPlaylistSw = true;
        state.songSelect = songSelected;
        state.nameSong = songSelected.name + ' - Album: ' + songSelected.album.name;
        state.musicPlayer.src = 'https://www.tcmontevarchi-prenotazioni.it/storage/songs/'+songSelected.id + '.mp3';
        state.playMusicSwc = true;
        state.showFooter = true;
    },

    pauseSong(state) {
        if (state.playMusicSwc){
            state.musicPlayer.pause();
        } else {
            state.musicPlayer.play();
        }
        state.playMusicSwc = !state.playMusicSwc;
    },

    nextSong(state) {
        state.playMusicSwc = true;
        if (!state.singleOrPlaylistSw){
            state.playListInPlay = state.allMySongs;
        }

        if (state.indexSong === state.playListInPlay.length - 1) {
            state.indexSong = 0;
        } else {
            if (state.shaffleSwc) {
               // this.$store.commit('nextIndex', Math.floor(Math.random() * this.songsOfAlbum.length));
                state.indexSong = Math.floor(Math.random() * state.playListInPlay.length)
                /*if (presentIndex === this.indexSong) {
                    commit.nextSong();
                }*/
            } else {
                state.indexSong = state.indexSong + 1;
            }
        }
        state.nextSong = state.playListInPlay[state.indexSong];
        state.songSelect = state.playListInPlay[state.indexSong];
        state.nameSong = state.nextSong.id + ' - ' + state.nextSong.name + ' - Album: ' + state.nextSong.album.name;
        state.musicPlayer.src = 'https://www.tcmontevarchi-prenotazioni.it/storage/songs/'+state.nextSong.id + '.mp3';
    },

    prevSong(state) {
        if (state.singleOrPlaylistSw){
            state.playListInPlay = state.songsOfAlbum;
        } else {
            state.playListInPlay = state.allMySongs;
        }

        if (state.indexSong === 0) {
            state.indexSong = state.playListInPlay.length - 1;
        } else {
            if (state.shaffleSwc) {
                // this.$store.commit('nextIndex', Math.floor(Math.random() * this.songsOfAlbum.length));
                state.indexSong = Math.floor(Math.random() * state.playListInPlay.length)
                /*if (presentIndex === this.indexSong) {
                    commit.nextSong();
                }*/
            } else {
                state.indexSong = state.indexSong - 1;
            }
        }
        state.nextSong = state.playListInPlay[state.indexSong];
        state.songSelect = state.playListInPlay[state.indexSong];
        state.nameSong = state.nextSong.id + ' - ' + state.nextSong.name + ' - Album: ' + state.nextSong.album.name;
        state.musicPlayer.src = 'https://www.tcmontevarchi-prenotazioni.it/storage/songs/'+state.nextSong.id + '.mp3';
    },

    changePausaSwc(state){
        state.pausaSwc = !state.pausaSwc;
    },

    changeShaffleSwc(state){
        state.shaffleSwc = !state.shaffleSwc;
    },

    shaffleSwOff(state){
        state.shaffleSwc = false;
    },

    resetPlayList(state){
        state.allMySongs = [];
    },

    playSingleSw(state){
        state.singleOrPlaylistSw = true;
    },

    playListSw(state){
        state.singleOrPlaylistSw = false;
    },

    affermoSonoSullaSongPage(state){
        state.sonoSullaSongPage = true;
    },

    negoSonoSullaSongPage(state){
        state.sonoSullaSongPage = false;
    },

    visualizzaFooter(state){
        state.showFooter = true;
    },

    nascondiFooter(state){
        state.showFooter = false;
    }
}

export default createStore({
    state,
    getters,
    actions,
    mutations
})