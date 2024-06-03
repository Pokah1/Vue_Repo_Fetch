import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GitHubRepo from '../views/GitHubRepo.vue'
import RepoDetails from '../components/RepoDetails.vue'
import pageNotFound from '../components/pageNotFound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/repos',
      name: 'GitHubRepo',
      component: GitHubRepo
    },
    {
      path: '/repo/:repoName',
      name: 'RepoDetails',
      component: RepoDetails,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotFound',
      component: pageNotFound
    }
  ]
})

export default router
