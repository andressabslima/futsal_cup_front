<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/teams-table">Team Classification</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/players-table">Players Classification</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/team-crud">Teams CRUD</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/player-crud">Players CRUD</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/matchs">Matchs</router-link>
        </li>      
                <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/new-match">NEW MATCH</router-link>
        </li>   
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NavBar extends Vue {}
</script>

    // <div id="nav">
    //   <router-link to="/">Home</router-link> |
    //   <router-link to="/table-teams">Teams Classification</router-link> | 
    //   <router-link to="/table-players">Players Classification</router-link> |
    // </div>