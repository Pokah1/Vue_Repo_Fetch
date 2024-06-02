import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GitHubRepo from '../views/GitHubRepo.vue'
import RepoDetails from '../components/RepoDetails.vue'

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
      component: GitHubRepo,
      children: [
        {
          path: ':repoName',
          name: 'RepoDatils',
          component: RepoDetails,
          props: true
        }
      ]
    }
  ]
})

export default router
