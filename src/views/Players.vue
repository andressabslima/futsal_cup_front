<template>
  <div class="container pt-5">

    <page-title title="Players Table"></page-title>

    <table class="table table-sm">
      <thead>
        <tr>
          <th>Team</th>
          <th>CPF</th>
          <th>Number</th>
          <th>Goals</th>
          <th>Yellow Cards</th>
          <th>Red Cards</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in playersList" :key="player.id">
          <td>{{ player.name }}</td>
          <td>{{ player.cpf }}</td>
          <td>{{ player.number }}</td>
          <td>{{ player.totalGoalsScored || 0 }}</td>
          <td>{{ player.totalYellowCards || 0 }}</td>
          <td>{{ player.totalRedCards || 0 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import Axios from "../helpers/AxiosInstance";
import { Player } from "../models/Player";

@Component
export default class PlayerComponent extends Vue {
  playersList: Player[] = [];

  getTeamsList() {
    Axios.get<Player[]>("table/players").then((res) => {
      this.playersList = res.data;
    });
  }

  mounted() {
    this.getTeamsList();
  }
}
</script>
