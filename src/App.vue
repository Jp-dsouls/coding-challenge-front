<template>
  <div id="app">
    <h1>Rotación de Matriz y Estadísticas</h1>
    <div class="matrix-input">
      <h2>Ingresar Matriz</h2>
      <textarea v-model="matrixInput" placeholder="Ej: [[1, 2], [3, 4]]"></textarea>
      <button @click="submitMatrix">Enviar Matriz</button>
    </div>

    <div v-if="results" class="results">
      <h2>Resultados</h2>
      <div>
        <h3>Matriz Rotada (Q y R):</h3>
        <pre>{{ results.Q }}</pre>
        <pre>{{ results.R }}</pre>
      </div>
      <div>
        <h3>Estadísticas:</h3>
        <p>Máximo: {{ results.stats.max }}</p>
        <p>Mínimo: {{ results.stats.min }}</p>
        <p>Promedio: {{ results.stats.average }}</p>
        <p>Suma Total: {{ results.stats.sum }}</p>
        <p>¿Es Diagonal?: {{ results.stats.isDiagonal ? "Sí" : "No" }}</p>
      </div>
    </div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const matrixInput = ref("");
const results = ref(null);
const error = ref("");

const submitMatrix = async () => {
  try {
    // Validar y convertir la entrada a un array
    const matrix = JSON.parse(matrixInput.value);

    // Enviar la matriz a la API 1 (QR Factorization)
    const qrResponse = await axios.post("/qr-factorization", { matrix });

    // Extraer Q y R de la respuesta
    const { Q, R } = qrResponse.data;

    // Enviar Q y R a la API 2 (Matrix Stats)
    const statsResponse = await axios.post("/matrix-stats", { Q, R });

    // Guardar los resultados
    results.value = {
      Q,
      R,
      stats: statsResponse.data,
    };
    error.value = "";
  } catch (err) {
    error.value = "Error: " + (err.response?.data?.error || err.message);
    results.value = null;
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

.matrix-input textarea {
  width: 300px;
  height: 100px;
  margin-bottom: 10px;
}

.results {
  margin-top: 20px;
}

.error {
  color: red;
}
</style>
