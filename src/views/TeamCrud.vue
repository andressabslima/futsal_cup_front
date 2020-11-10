<template>
  <div class="container pt-5">

    <page-title title="Players List"></page-title>

    <div class="row py-2">
      <router-link class="btn btn-success" to="/player">New Player</router-link>
    </div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th style="cursor: pointer" v-on:click="changeTableSort('id')">Id</th>
          <th style="cursor: pointer" v-on:click="changeTableSort('name')">
            Name
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teamsList" :key="team.id">
          <td>{{ team.id }}</td>
          <td>{{ team.name }}</td>
          <td>
            <button v-on:click="goTo(team.id)" class="btn btn-outline-info">
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
import { Team } from "../models/Team";

@Component
export default class TeamCrudComponent extends Vue {
  teamsList: Team[] = [];

  sort = "name";
  order = "ASC";

  toggleOrder() {
    this.order = this.order === "ASC" ? "DESC" : "ASC";
  }

  goTo(id: number) {
    this.$router.push("/team/" + id);
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
    Axios.get<Team[]>(`teams?sort=${this.sort}&order=${this.order}`).then(
      (res) => {
        this.teamsList = res.data;
      }
    );
  }

  mounted() {
    this.getTeamsList();
  }
}
</script>
