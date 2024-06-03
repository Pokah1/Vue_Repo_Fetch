<template>
  <main class="main">
    <header class="head">
      <h1 class="repo-info">{{ loading ? 'Loading...' : 'My GitHub Repositories' }}</h1>
      <input type="text" placeholder="Search repositories..." v-model="searchQuery" class="input" />
    </header>

    <div v-if="loading || !repositories">
      <!-- Skeleton placeholder -->
      <div v-if="showSkeleton">
        <div v-for="index in 3" :key="index" class="skeleton-placeholder">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <ul class="list">
        <li v-for="repo in currentRepos" :key="repo.id" class="item">
          <router-link :to="{ name: 'RepoDetails', params: { repoName: repo.name } }">{{
            repo.name
          }}</router-link>
        </li>
      </ul>
      <nav class="nav">
        <button @click="paginate(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <button
          @click="paginate(currentPage + 1)"
          :disabled="
            filteredRepositories.value && indexOfLastRepo.value >= filteredRepositories.value.length
          "
        >
          Next
        </button>
      </nav>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'

const searchQuery = ref('')
const currentPage = ref(1)
const reposPerPage = 3

const {
  data: repositories,
  error,
  isFetching: loading
} = useFetch('https://api.github.com/users/Pokah1/repos').json()

const showSkeleton = ref(true) // Define showSkeleton ref here

const filteredRepositories = computed(() => {
  return (
    (Array.isArray(repositories.value) &&
      repositories.value?.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )) ||
    []
  )
})

const indexOfLastRepo = computed(() => currentPage.value * reposPerPage)
const indexOfFirstRepo = computed(() => indexOfLastRepo.value - reposPerPage)
const currentRepos = computed(() => {
  return filteredRepositories.value.slice(indexOfFirstRepo.value, indexOfLastRepo.value)
})

const paginate = (pageNumber) => {
  currentPage.value = pageNumber
}

onMounted(() => {
  setTimeout(() => {
    showSkeleton.value = false
  }, 3000)
})
</script>

<style scoped>
.main {
  margin: 30px 0 0 40px;
}
.head {
  font-size: 1.5rem;
  margin: 15px 0 40px 0;
  background: linear-gradient(to left, #f6fa0af5, green);
  -webkit-background-clip: text;
  color: transparent;
  animation-name: slidein;
  animation-duration: 7s;
  animation-iteration-count: infinite;
}
.input {
  width: 300px;
  height: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #000;
  border-radius: 5px;
  font-size: 16px;
  display: block;
  margin-left: 90px;
}

.input:focus {
  outline: none;
  border-color: dodgerblue;
  box-shadow: 0 0 5px dodgerblue;
}

.input::placeholder {
  color: #999;
}
.list {
  list-style-type: none;
  padding: 0;
}

.item {
  margin-bottom: 30px;
  border: 1px solid grey;
  height: 30px;
  width: 40%;
  padding: 20px 0 10px 10px;
  border-radius: 10px;
}

.item a {
  text-decoration: none;
  color: #e2dbdb;
  font-size: 18px;
}

.item a:hover {
  color: #007bff;
}
.nav {
  display: flex;
}
.nav button {
  padding: 10px;
  width: 200px;
  border-radius: 5px;
  box-shadow: 0 4px 15px 0 rgba(39, 70, 26, 0.75);
  margin: 30px 30px 50px 30px;
  font-size: 1rem;
  height: 50%;
  color: white;
  -webkit-background-clip: text;
  font-size: 1.2rem;
  background-color: green;
}

.nav button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #413c3c;
  box-shadow: none;
}

.skeleton-placeholder {
  margin-bottom: 30px;
}

.skeleton-line {
  height: 50px;
  width: 50%;
  background: linear-gradient(to left, #777771f5, rgb(62, 65, 62));
  border-radius: 5px;

  margin-bottom: 5px;
  border-radius: 5px;
}
</style>
