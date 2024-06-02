<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const repoName = route.params.repoName
const repoDetails = ref(null)
const ownerDetails = ref(null)
const loading = ref(true)
const error = ref(null)
const notFound = ref(false)

const fetchRepoDetails = async () => {
  try {
    const response = await fetch(`https://api.github.com/repos/Pokah1/${repoName}`)
    if (!response.ok) {
      throw new Error('Failed to fetch repository details')
    }
    const data = await response.json()
    repoDetails.value = data
    await fetchOwnerDetails(data.owner.login)
  } catch (err) {
    error.value = err.message
    notFound.value = true
  } finally {
    loading.value = false
  }
}

const fetchOwnerDetails = async (ownerLogin) => {
  try {
    const response = await fetch(`https://api.github.com/users/${ownerLogin}`)
    if (!response.ok) {
      throw new Error('Failed to fetch owner details')
    }
    const data = await response.json()
    ownerDetails.value = data
    console.log('Owner Details:', ownerDetails.value) // Debugging log
  } catch (err) {
    console.error('Error fetching owner details:', err)
  }
}

onMounted(() => {
  fetchRepoDetails()
})
</script>

<template>
  <main v-if="!notFound">
    <article v-if="!loading && repoDetails" class="container">
      <h2 class="heada">{{ repoDetails.name }}</h2>
      <p class="description">{{ repoDetails.description }}</p>
      <p>Language: {{ repoDetails.language }}</p>
      <p>Stars: {{ repoDetails.stargazers_count }}</p>
      <p>Forks: {{ repoDetails.forks_count }}</p>
      <p>Last Updated: {{ repoDetails.updated_at }}</p>
      <p>License: {{ repoDetails.license ? repoDetails.license.name : 'N/A' }}</p>
      <p>
        Repository URL:
        <a :href="repoDetails.html_url" target="_blank" rel="noopener noreferrer">
          {{ repoDetails.html_url }}
        </a>
      </p>
      <router-link to="/repos">
        <button class="button">Return to Repositories</button>
      </router-link>
      <aside v-if="ownerDetails" class="ownerDetails">
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
    <div v-else-if="loading">Loading...</div>
    <div v-else>Error: {{ error }}</div>
  </main>
  <div v-else>
    <h2>Repository Not Found</h2>
    <router-link to="/">
      <button class="button">Return to Repositories</button>
    </router-link>
  </div>
</template>
<style scoped>
.mainn {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
}
.container {
  flex: 1;
  margin: 20px 20px 10px 30px;
  padding: 0 0 10px 10px;
  position: fixed;
  right: 40%;
  left: 0;
  top: 0;
  height: 1000vh;
}
.ownerDetails {
  padding-left: 20px;
  border-left: 1px solid greenyellow;
  position: fixed;
  left: 60%;
  width: 40%;
  top: 40px;
  text-align: justify;
}
.ownerDetails h3 {
  margin-top: 70px;
  margin-bottom: 40pc;
  display: flex;
}
.ownerDetails p {
  margin-bottom: 10px;
}
figure img {
  height: 300px;
  width: 300px;
  object-fit: cover;
  border-radius: 40px 10px;
}
.description {
  font-size: 1.2rem;
}
.button {
  padding: 20px;
  width: 200px;
  border-radius: 5px;
  box-shadow: 0 4px 15px 0 rgba(46, 68, 36, 0.75);
  margin: 30px 30px 50px 30px;
  font-size: 1rem;
  -webkit-background-clip: text;
  font-size: 1.2rem;
  color: #fff;
}
.button:hover {
  background-color: #0056b3;
}
.heada {
  font-size: 1.5rem;
  margin: 15px 0 40px 0;
  background: linear-gradient(to left, #f6fa0af5, green);
  -webkit-background-clip: text;
  color: transparent;
  animation-name: slidein;
  animation-duration: 7s;
  animation-iteration-count: infinite;
}
@media (max-width: 700px) {
  .container {
    margin: 70px 20px 10px 30px;
    position: static;
    height: 100vh;
  }
  .description {
    margin-bottom: 30px;
    line-height: 1.8rem;
  }
  .ownerDetails {
    display: none;
  }
}
</style>
