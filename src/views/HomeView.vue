<script setup>
import confetti from 'canvas-confetti'
import { onMounted, onBeforeUnmount } from 'vue'
import GitHubIcon from '../components/icons/GitHubIcon.vue'
import TwitterIcon from '../components/icons/TwitterIcon.vue'
import LinkedInIcon from '../components/icons/LinkedInIcon.vue'
import ErrorTrigger from '../components/ErrorTrigger.vue'

onMounted(() => {
  confetti({
    particleCount: 700,
    spread: 120,
    origin: { x: 0.5, y: 0.5 },
    decay: 0.9
  })
})

onBeforeUnmount(() => {
  confetti.reset()
})
</script>

<template>
  <main class="main">
    <section class="side1">
      <header class="homeheader">
        <h1 class="username">Edikan Odokwo</h1>
        <h3 class="userInfo">A Software Developer</h3>
      </header>
      <section>
        <p>
          <span class="span-tag">I build exceptional and accessible digital</span>
          interfaces
        </p>
      </section>
      <footer class="footer">
        <router-link to="/repos">
          <button class="homebtns socialBtn">View Repositories</button>
        </router-link>
        <ErrorTrigger />
      </footer>

      <span class="copyright"> ©2024 Odokwo Edikan. All rights reserved. </span>
    </section>
    <section class="side2">
      <!-- Add content here if necessary -->
      <figure><img src="/src/assets/profile-pic.jpeg" alt="my profile picture" /></figure>
      <aside class="social-svgs">
        <GitHubIcon />
        <LinkedInIcon />
        <TwitterIcon />
      </aside>
    </section>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  width: 100vw;
  height: 100vh;
}
.side1 {
  flex: 1;
  margin: 70px 20px 10px 30px;
  padding: 0 0 0 10px;
  position: fixed;
  right: 40%;
  left: 0;
  top: 0;
  height: 100vh;
}
.username {
  font-size: 2.8rem;
  line-height: 55px;
  margin: 15px 0 40px 0;
  background: linear-gradient(to left, #f6fa0af5, green);
  -webkit-background-clip: text;
  color: transparent;
  animation-name: slidein;
  animation-duration: 7s;
  animation-iteration-count: infinite;
}
@keyframes slidein {
  from {
    margin-left: 30%;
    width: 100%;
  }
  to {
    margin-left: 0%;
    width: 100%;
  }
}
.userInfo {
  background: linear-gradient(to left, #f6fa0af5, green);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 1.4rem;
  margin-bottom: 30px;
}
.span-tag {
  background: linear-gradient(to left, #f6fa0af5, green);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 1.5rem;

  font-weight: bold;
}
.copyright {
  font-size: 1rem;
  color: rgb(172, 125, 125);
  margin: 50px 20px 0 70px;
}
.side2 {
  padding-left: 20px;
  border-left: 1px solid greenyellow;
  position: fixed;
  left: 60%;
  width: 40%;
  top: 40px;
  text-align: justify;
}
figure {
  margin-top: 70px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}
figure img {
  height: 300px;
  width: 300px;
  object-fit: cover;
  border-radius: 40px 10px 40px 10px;
}
.social-svgs {
  width: 20vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  color: #fff;
}
.homebtns {
  padding: 20px;
  width: 200px;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 15px 0 rgba(24, 36, 19, 0.75);
  margin: 30px 30px 50px 30px;
  font-size: 1rem;
  height: 100%;
  -webkit-background-clip: text;
  font-size: 1.2rem;
}
@media (max-width: 700px) {
  body {
    height: 150vh;
  }

  main {
    display: block;
    width: fit-content;

    margin-right: 30px;
  }

  .username {
    animation: slidein 7s infinite;
    margin-left: 40px;
  }
  .userInfo {
    background: linear-gradient(to left, #f6fa0af5, green);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 1.3rem;
    margin: 30px 0 25px 40px;
  }

  .span-tag {
    margin-left: 40px;
  }

  .homebtns {
    margin: 30px 10px 50px 40px;
  }

  .side2 {
    display: none;
  }

  .side1 {
    margin: 70px 20px 10px 30px;
    padding: 0 0 0 40px;
    position: relative;
    text-align: left;
  }

  .copyright {
    font-size: 1rem;
    color: rgb(172, 125, 125);
    margin: 50px 10px 0 5px;
    white-space: nowrap;
  }
  .small-srcn-svg {
    width: 20vw;
    display: flex;
    gap: 70px;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    margin-top: 20px;
    margin-left: 50px;
    color: #fff;
  }
}
</style>
