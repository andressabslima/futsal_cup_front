<template>
  <div class="container pt-5">

    <page-title title="Player List"></page-title>

    <div class="row py-2">
      <router-link class="btn btn-success" to="/player">New Player</router-link>
    </div>

    <table class="table table-sm">
      <thead>
        <tr>
          <th style="cursor: pointer" v-on:click="changeTableSort('name')">
            Name
          </th>
          <th style="cursor: pointer" v-on:click="changeTableSort('cpf')">
            CPF
          </th>
          <th style="cursor: pointer" v-on:click="changeTableSort('number')">
            Number
          </th>
          <th style="cursor: pointer" v-on:click="changeTableSort('goals')">
            Goals
          </th>
          <th>Team</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in playersList" :key="player.id">
          <td>{{ player.name }}</td>
          <td>{{ formatCPF(player.cpf) }}</td>
          <td>{{ player.number }}</td>
          <td>{{ player.goals || 0 }}</td>
          <td>{{ player.team ? player.team.name : "No Team Yet" }}</td>
          <td>
            <button v-on:click="goTo(player.id)" class="btn btn-outline-info">
              Edit
            </button>
          </td>
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
export default class PlayerCrudComponent extends Vue {
  playersList: Player[] = [];
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
    this.getPlayerList();
  }

  getPlayerList() {
    Axios.get<Player[]>(`players?sort=${this.sort}&order=${this.order}`).then(
      (res) => {
        this.playersList = res.data;
      }
    );
  }

  goTo(id: number) {
    this.$router.push("/player/" + id);
  }

  formatCPF(cpf: string): string {
    var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    var dst = "$1.$2.$3-$4";
    return cpf.replace(src, dst);
  }

  mounted() {
    this.getPlayerList();
  }
}
</script>
