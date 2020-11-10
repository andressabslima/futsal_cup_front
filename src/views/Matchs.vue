<template>
  <div class="container pt-5">
    <page-title title="Last Matchs"></page-title>

    <div class="d-flex justify-content-around">
      <div
        v-for="match in matchList"
        :key="match.id"
        class="card col-3 p-3 shadow-sm"
      >
        <div class="d-flex align-items-center flex-column">
          <div class="text-uppercase">
            {{ match.homeTeam.name }}
            <span class="text-danger font-weight-bolder">
              {{ match.homeScore }}
            </span>
          </div>
          <div>X</div>
          <div class="text-uppercase">
            {{ match.guestTeam.name }}
            <span class="text-danger font-weight-bolder">
              {{ match.guestScore }}
            </span>
          </div>
        </div>
        <small
          >{{ formatDate(match.startAt.date) }} |
          {{ formatHours(match.startAt.date) }} -
          {{ formatHours(match.endAt.date) }}</small
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Match } from "../models/Match";
import Axios from "../helpers/AxiosInstance";
import moment from "moment";
@Component
export default class MatchsComponent extends Vue {
  matchList: Match[] = [];

  created() {
    this.getMatchs();
  }

  formatDate(date: string): string {
    return moment(date).format("DD/MM/YYYY");
  }

  formatHours(date: string): string {
    return moment(date).format("HH:mm:ss");
  }

  getMatchs() {
    Axios.get<Match[]>("matchs").then((res) => {
      this.matchList = res.data;
    });
  }
}
</script>