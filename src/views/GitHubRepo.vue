<script setup>
import { ref, onMounted, computed } from 'vue'
import RepoDetails from '../components/RepoDetails.vue'

const repositories = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)
const reposPerPage = 3

onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/users/Pokah1/repos')
    if (!response.ok) {
      console.error('HTTP error:', response.status, response.statusText)
      throw new Error('Failed to fetch repositories')
    }
    const data = await response.json()
    repositories.value = data
  } catch (err) {
    console.error('Error fetching repositories:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const filteredRepositories = computed(() => {
  return repositories.value.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.value.toLowerCase())
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
</script>

<template>
  <main class="main">
    <header class="head">
      <h1 class="repo-info">My GitHub Repositories</h1>
      <input type="text" placeholder="Search repositories..." v-model="searchQuery" class="input" />
    </header>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <ul class="list">
        <!-- I WILL COME BACK TO THIS LATER -->
        <li v-for="repo in currentRepos" :key="repo.id" class="item">
          <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
        </li>
        <!-- I WILL COME BACK TO THIS LATER -->
      </ul>
      <nav class="nav">
        <button @click="paginate(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <button
          @click="paginate(currentPage + 1)"
          :disabled="
            indexOfLastRepo.value >=
            (filteredRepositories.value ? filteredRepositories.value.length : 0)
          "
        >
          Next
        </button>
      </nav>
    </div>
    <footer class="nav">
      <router-link to="/">
        <button>Go to Home Page</button>
      </router-link>
    </footer>
  </main>
</template>

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
}

.nav button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #413c3c;
  box-shadow: none;
}

@media (max-width: 700px) {
  .main {
    margin: 10px;
    padding: 10px;
  }
  .head {
    font-size: 1rem;
    margin: 10px 0 40px 0;
  }
  .input {
    width: 70%;
    margin: 40px auto;
    display: block;
  }
  .list {
    width: 100%;
  }
  .item {
    width: 100%;
    margin-bottom: 30px;
  }
  .nav {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  .nav button {
    width: auto;
    margin: 20px 0 20px 0;
  }
}
</style>
