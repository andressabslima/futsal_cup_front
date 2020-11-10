<template>
  <div class="container pt-5">
    <page-title title="New Match"></page-title>
    <form @submit.prevent="saveMatch()">
      <div class="row">
        <div class="form-group col-4">
          <label>Started At</label>
          <input
            v-model="match.startAt"
            type="datetime-local"
            class="form-control"
          />
        </div>
        <div class="form-group col-4">
          <label>Ended At</label>
          <input
            v-model="match.endAt"
            type="datetime-local"
            class="form-control"
          />
        </div>

        <div class="col-4"></div>

        <div class="form-group col-4">
          <label for="team">Home Team</label>
          <select
            v-bind:class="{
              'is-invalid': $v.match.homeTeam.$invalid,
              'is-valid': !$v.match.homeTeam.$invalid,
            }"
            v-model="match.homeTeam"
            class="form-control"
            name="team"
            id="team"
          >
            <option
              v-for="team in teamsList"
              :key="team.id"
              v-bind:value="team.id"
            >
              {{ team.name }}
            </option>
          </select>
          <small v-if="$v.match.homeTeam.$invalid" class="text-danger">
            Home Team is required
          </small>
        </div>

        <div class="form-group col-1">
          <label>Score</label>
          <input
            v-model="match.homeScore"
            type="number"
            min="0"
            class="form-control"
          />
        </div>

        <div class="form-group col-4">
          <label for="team">Guest Team</label>
          <select
            v-bind:class="{
              'is-invalid': $v.match.guestTeam.$invalid,
              'is-valid': !$v.match.guestTeam.$invalid,
            }"
            v-model="match.guestTeam"
            class="form-control"
            name="team"
            id="team"
          >
            <option
              v-for="team in teamsList"
              :key="team.id"
              v-bind:value="team.id"
            >
              {{ team.name }}
            </option>
          </select>
          <small v-if="$v.match.guestTeam.$invalid" class="text-danger">
            Guest Team is required
          </small>
        </div>

        <div class="form-group col-1">
          <label>Score</label>
          <input
            v-model="match.guestScore"
            type="number"
            min="0"
            class="form-control"
          />
        </div>
      </div>
      <hr />
      <div class="row align-items-center">
        Match Goals:
        <button
          type="button"
          v-on:click="addPlayerGoal()"
          class="btn btn-success ml-4"
        >
          Add Goals Registry
        </button>
      </div>
      <div
        v-for="(goal, index) in match.goals"
        :key="index + '_goal'"
        class="row d-flex align-items-center"
      >
        <div class="form-group col-2">
          <label>Goals</label>
          <input
            v-model="goal.goals"
            type="number"
            :max="match.homeScore + match.guestScore"
            class="form-control"
          />
        </div>
        <div class="form-group col-3">
          <label>Player</label>
          <select
            v-model="goal.player"
            class="form-control"
            name="team"
            id="team"
          >
            <option
              v-for="player in playersList"
              :key="player.id"
              v-bind:value="player.id"
            >
              {{ player.name }}
            </option>
          </select>
        </div>

        <button
          type="button"
          v-if="index + 1 === match.goals.length"
          v-on:click="addPlayerGoal()"
          class="btn btn-success"
        >
          Add
        </button>
        <button
          type="button"
          v-if="index > 0"
          v-on:click="delPlayerGoal()"
          class="btn btn-danger"
        >
          Del
        </button>
      </div>

      <hr />
      <div class="row align-items-center">
        Match Cards:
        <button
          type="button"
          v-on:click="addMatchCard()"
          class="btn btn-success ml-4"
        >
          Add Cards Registry
        </button>
      </div>

      <div
        v-for="(card, index) in match.cards"
        :key="index + '_card'"
        class="row d-flex align-items-center"
      >
        <div class="form-group col-2">
          <label>Card</label>
          <select
            v-model="card.card"
            class="form-control"
            name="team"
            id="team"
          >
            <option value="yellow">Yellow</option>
            <option value="red">Red</option>
          </select>
        </div>
        <div class="form-group col-3">
          <label>Player</label>
          <select
            v-model="card.player"
            class="form-control"
            name="team"
            id="team"
          >
            <option
              v-for="player in playersList"
              :key="player.id"
              v-bind:value="player.id"
            >
              {{ player.name }}
            </option>
          </select>
        </div>

        <button
          type="button"
          v-if="index + 1 === match.cards.length"
          v-on:click="addMatchCard()"
          class="btn btn-success"
        >
          Add
        </button>
        <button
          type="button"
          v-if="index > 0"
          v-on:click="delMatchCard()"
          class="btn btn-danger"
        >
          Del
        </button>
      </div>
      <div class="row mt-5">
        <button class="btn btn-success">Save</button>
      </div>
    </form>
  </div>
</template>
    
<script lang="ts">
enum CardType {
  yellow = "yellow",
  red = "red",
}

import { Component, Vue } from "vue-property-decorator";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Match } from "@/models/Match";
import { required } from "vuelidate/lib/validators";
import Axios from "../helpers/AxiosInstance";
import moment from "moment";
@Component({
  validations: {
    match: {
      homeScore: { required },
      guestScore: { required },
      homeTeam: { required },
      guestTeam: { required },
    },
  },
})
export default class NewMatchComponent extends Vue {
  CardType!: CardType;
  match: Match = { goals: [], cards: [], homeScore: 0, guestScore: 0 };

  playersList: Player[] = [];
  playersListoriginal: Player[] = [];
  teamsList: Team[] = [];

  created() {
    this.getTeamsList();
    this.getPlayerList();
  }

  getTeamsList() {
    Axios.get<Team[]>(`teams`).then((res) => {
      this.teamsList = res.data;
    });
  }

  getPlayerList() {
    Axios.get<Player[]>(`players`).then((res) => {
      this.playersList = res.data;
      this.playersListoriginal = res.data;
    });
  }

  addPlayerGoal() {
    this.match.goals?.push({});
  }
  delPlayerGoal(index: number) {
    this.match.goals?.splice(index, 1);
  }

  addMatchCard() {
    this.match.cards?.push({});
  }
  delMatchCard(index: number) {
    this.match.cards?.splice(index, 1);
  }

  saveMatch() {
    const data = JSON.parse(JSON.stringify(this.match));
    data.startAt = moment(data.startAt).format("DD/MM/YYYY HH:mm");
    data.endAt = moment(data.endAt).format("DD/MM/YYYY HH:mm");
    console.log(data);
    Axios.post("/match", data).then((res) => {
      this.$router.push("/matchs");
    });
  }
}
</script>