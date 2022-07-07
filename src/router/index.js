import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import ('../views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('../views/LoginPage.vue')
  },
  {
    path: '/allAlbums',
    name: 'AllAlbums',
    component: () => import ('../views/AllAlbumsPage.vue')
  },
  {
    path: '/songsOfAlbum/:albumId',
    name: 'SongsOfAlbum',
    component: () => import ('../views/SongsOfAlbumPage.vue')
  },
  {
    path: '/song/:songId',
    name: 'Song',
    component: () => import ('../views/SongPage.vue')
  },
  {
    path: '/albumsOfArtist/:artistId',
    name: 'AlbumsOfArtist',
    component: () => import ('../views/AlbumsOfArtistPage.vue')
  },
  {
    path: '/myPreferites',
    name: 'MyPreferites',
    component: () => import ('../views/MyPreferitesPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
