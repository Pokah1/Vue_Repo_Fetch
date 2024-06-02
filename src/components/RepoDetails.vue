<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const repoName = route.params.repoName

const repoDetails = ref(null)
const ownerDetails = ref(null)
const notFound = ref(false)
const loading = ref(true)

const fetchOwnerDetails = async (ownerLogin) => {
  try {
    const response = await fetch(`https://api.github.com/users/${ownerLogin}`)
    if (!response.ok) {
      throw new Error('Failed to fetch owner details')
    }
    const data = await response.json()
    console.log('Fetched owner details:', data)
    ownerDetails.value = data
  } catch (error) {
    console.error('Error fetching owner details:', error)
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`https://api.github.com/repos/Pokah1/${repoName}`)
    if (!response.ok) {
      throw new Error('Failed to fetch repository details')
    }
    const data = await response.json()
    console.log('Fetched repo details:', data)
    repoDetails.value = data
    await fetchOwnerDetails(data.owner.login)
  } catch (error) {
    console.error('Error fetching repository details:', error)
    notFound.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="mainn">
    <article v-if="loading" class="container">Loading...</article>
    <article v-else-if="notFound" class="container">Repository not found.</article>
    <article v-else class="container">
      <h2 class="heada">{{ repoDetails.name }}</h2>
      <p class="description">{{ repoDetails.description }}</p>
      <p>Language: {{ repoDetails.language }}</p>
      <p>Stars: {{ repoDetails.stargazers_count }}</p>
      <p>Forks: {{ repoDetails.forks_count }}</p>
      <p>Last Updated: {{ new Date(repoDetails.updated_at).toLocaleDateString() }}</p>
      <p>License: {{ repoDetails.license ? repoDetails.license.name : 'N/A' }}</p>
      <p>
        Repository URL:
        <a :href="repoDetails.html_url" target="_blank" rel="noopener noreferrer">
          {{ repoDetails.html_url }}
        </a>
      </p>
      <router-link to="/repos">
        <button class="button">Return to fetch Repos...</button>
      </router-link>
      <aside class="ownerDetails" v-if="ownerDetails">
        <h3 class="heada">Owner Details</h3>
        <p>Username: {{ ownerDetails.login }}</p>
        <figure>
          <img :src="ownerDetails.avatar_url" alt="Owner Avatar" />
        </figure>
        <p>
          Profile:
          <a :href="ownerDetails.html_url" target="_blank" rel="noopener noreferrer">
            {{ ownerDetails.html_url }}
          </a>
        </p>
      </aside>
    </article>
  </main>
</template>

<style scoped>
.mainn {
  margin: 30px 0 0 40px;
}
.container {
  font-size: 1.5rem;
  margin: 15px 0 40px 0;
  background: linear-gradient(to left, #f6fa0af5, green);
  -webkit-background-clip: text;
  color: transparent;
  animation-name: slidein;
  animation-duration: 7s;
  animation-iteration-count: infinite;
}
.heada {
  font-size: 2rem;
  margin: 10px 0;
}
.description {
  font-size: 1.2rem;
}
.button {
  padding: 10px;
  width: 200px;
  border-radius: 5px;
  box-shadow: 0 4px 15px 0 rgba(39, 70, 26, 0.75);
  margin: 30px 30px 50px 0;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: #0056b3;
}
.ownerDetails {
  margin-top: 20px;
}
.ownerDetails img {
  max-width: 100px;
  border-radius: 50%;
}
</style>
