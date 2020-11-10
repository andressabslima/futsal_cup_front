<template>
  <div class="container-fluid pt-5">

    <page-title title="Register/Edit Player"></page-title>

    <form novalidate @submit.prevent="save">
      <div class="row">
        <div class="form-group col-4">
          <label for="name">Name</label>
          <input
            v-model="player.name"
            type="text"
            id="name"
            class="form-control"
            v-bind:class="{
              'is-invalid': $v.player.name.$invalid,
              'is-valid': !$v.player.name.$invalid,
            }"
            required
          />
          <small v-if="$v.player.name.$invalid" class="text-danger">
            Player Name is required
          </small>
        </div>
        <div class="form-group col-3">
          <label for="name">CPF</label>
          <input
            v-model="player.cpf"
            type="text"
            :readonly="$route.params.id"
            v-bind:class="{
              'is-invalid': $v.player.cpf.$invalid,
              'is-valid': !$v.player.cpf.$invalid,
            }"
            id="name"
            class="form-control"
          />
          <small v-if="$v.player.cpf.$invalid" class="text-danger">
            Player CPF is required
          </small>
        </div>
        <div class="form-group col-2">
          <label for="number">Number</label>
          <input
            v-model="player.number"
            type="text"
            id="number"
            class="form-control"
            v-bind:class="{
              'is-invalid': $v.player.number.$invalid,
              'is-valid': !$v.player.number.$invalid,
            }"
          />
          <small v-if="$v.player.number.$invalid" class="text-danger">
            Player Number is required
          </small>
        </div>
        <div class="form-group col-2">
          <label for="team">Team</label>
          <select
            v-bind:class="{
              'is-invalid': $v.player.team.$invalid,
              'is-valid': !$v.player.team.$invalid,
            }"
            v-model="player.team"
            :disabled="$route.params.id && player.team"
            class="form-control"
            name="team"
            id="team"
          >
            <option
              v-for="team in teamsList"
              :key="team.id"
              v-bind:value="team"
            >
              {{ team.name }}
            </option>
          </select>
          <small v-if="$v.player.team.$invalid" class="text-danger">
            Player Team is required
          </small>
        </div>
      </div>
      <div class="row px-3">
        <button :disabled="$v.$invalid" type="submit" class="btn btn-success">
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Player } from "@/models/Player";
import { Component, Vue } from "vue-property-decorator";
import Axios from "../helpers/AxiosInstance";
import {
  required
} from "vuelidate/lib/validators";
import { Team } from "@/models/Team";

@Component({
  validations: {
    player: {
      name: { required },
      number: { required },
      cpf: { required },
      team: { required },
    },
  },
})
export default class PlayerProfileComponent extends Vue {
  player: Player = {};
  teamsList: Team[] = [];

  getPlayer() {
    Axios.get<Player>("player/" + this.$route.params.id).then((res) => {
      this.player = res.data;
    });
  }

  getTeams() {
    Axios.get<Team[]>("teams/").then((res) => {
      this.teamsList = res.data;
    });
  }

  created() {
    this.getTeams();
    if (this.$route.params.id) {
      this.getPlayer();
    }
  }

  save() {
    if (!this.$route.params.id) {
      Axios.post<Player>("player", this.player).then((res) => {
        this.$router.push('/players');
      });
    } else {
      Axios.put<Player>("player/" + this.$route.params.id, this.player).then(
        (res) => {
          this.$router.push('/players');
        }
      );
    }
  }
}
</script>