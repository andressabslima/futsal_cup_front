<template>
  <div class="container pt-5">

    <page-title title="Team Table"></page-title>

    <table class="table table-sm">
      <thead>
        <tr>
          <th style="cursor: pointer" v-on:click="changeTableSort('name')">Team</th>
          <th style="cursor: pointer" v-on:click="changeTableSort('points')">Points</th>
          <th style="cursor: pointer" v-on:click="changeTableSort('matchs')">Matchs</th>
          <th style="cursor: pointer" v-on:click="changeTableSort('wins')">Wins</th>
          <th style="cursor: pointer" v-on:click="changeTableSort('looses')">Looses</th>
          <th style="cursor: pointer" v-on:click="changeTableSort('draws')">Draws</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teamsList" :key="team.id">
          <td>{{ team.name }}</td>
          <td>{{ team.points || 0 }}</td>
          <td>{{ team.matchs || 0 }}</td>
          <td>{{ team.wins || 0 }}</td>
          <td>{{ team.looses || 0 }}</td>
          <td>{{ team.draws || 0 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import Axios from "../helpers/AxiosInstance";
import { Team } from "../models/Team";

@Component
export default class Home extends Vue {
  teamsList: Team[] = [];

    sort = "name";
  order = "ASC";

  toggleOrder() {
    this.order = this.order === "ASC" ? "DESC" : "ASC";
  }

  changeTableSort(field: string) {
    if (field === this.sort) {
      this.toggleOrder();
    } else {
      this.sort = field;
    }
    this.getTeamsList();
  }

  getTeamsList() {
    Axios.get<Team[]>(`table/teams?sort=${this.sort}&order=${this.order}`).then((res) => {
      this.teamsList = res.data;
    });
  }

  mounted() {
    this.getTeamsList();
  }
}
</script>
