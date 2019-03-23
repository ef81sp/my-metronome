<template>
  <div>
    <button class="button" @click="startStop">{{ label }}</button>
  </div>
</template>

<script>
import pingUrl from "../assets/ping.wav";
import { mapState } from "vuex";

export default {
  name: "ButtonStartStop",
  data() {
    return {
      label: "START",
      audioContext: {},
      buffer: {},
      loopId: null
    };
  },
  created: async function() {
    this.audioContext = new AudioContext();

    const audioData = await fetch(pingUrl);
    const arrBuf = await audioData.arrayBuffer();
    this.buffer = await this.audioContext.decodeAudioData(arrBuf);
  },
  computed: {
    ...mapState("tempo", {
      tempo: state => state.value
    }),
    beatPerMilliSecond() {
      return (60 / this.tempo) * 1000;
    }
  },
  methods: {
    startStop() {
      if (this.label === "START") {
        this.startPing();
      } else {
        this.endPing();
      }
    },
    ping() {
      const src = this.audioContext.createBufferSource();
      src.buffer = this.buffer;
      src.connect(this.audioContext.destination);
      src.start();
    },
    startPing() {
      if (!isFinite(this.beatPerMilliSecond)) {
        this.$store.commit("tempo/updateTempo", 60);
      }
      this.ping();
      this.loopId = setInterval(this.ping, this.beatPerMilliSecond);
      this.label = "STOP";
    },
    endPing() {
      clearInterval(this.loopId);
      this.loopId = null;
      this.label = "START";
    }
  },
  watch: {
    /**
     * - 作動中にテンポを動かしたときにそのテンポに更新する
     * - 作動中にテンポを空にしたとき止める
     */
    beatPerMilliSecond() {
      // 作動中だけ実行
      if (this.label === "START") return;

      this.endPing();

      // (作動中に)テンポを空にしたら止める
      if (!this.tempo) {
        return;
      }

      // 再起動
      this.startPing();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
