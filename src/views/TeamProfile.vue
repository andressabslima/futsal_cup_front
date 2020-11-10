<template>
  <div class="container-fluid pt-5">
    
    <page-title title="Edit/Register Team"></page-title>

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
            Team Name is required
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
import { required } from "vuelidate/lib/validators";
import { Team } from "@/models/Team";

@Component({
  validations: {
    player: {
      name: { required },
    },
  },
})
export default class TeamProfileComponent extends Vue {
  player: Player = {};
  teamsList: Team[] = [];

  getTeam() {
    Axios.get<Player>("team/" + this.$route.params.id).then((res) => {
      this.player = res.data;
    });
  }

  created() {
    if (this.$route.params.id) {
      this.getTeam();
    }
  }

  save() {
    if (!this.$route.params.id) {
      Axios.post<Team>("team", this.player).then((res) => {
        this.$router.push("/teams");
      });
    } else {
      Axios.put<Team>("team/" + this.$route.params.id, this.player).then(
        (res) => {
          this.$router.push("/teams");
        }
      );
    }
  }
}
</script>