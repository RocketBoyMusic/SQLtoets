<script setup lang="ts">
import { ref, computed } from 'vue';
import SqlEditor from '../components/SqlEditor.vue';
import { questions } from '../data/questions';

const currentQuestionIndex = ref(0);
const userAnswers = ref<Record<number, string>>({});

// Load user answers from localStorage
questions.forEach(q => {
  const savedAnswer = localStorage.getItem(`sql-answer-${q.id}`);
  userAnswers.value[q.id] = savedAnswer || '';
});

const currentQuestion = computed(() => {
  return questions[currentQuestionIndex.value];
});

const goToQuestion = (index: number) => {
  if (index >= 0 && index < questions.length) {
    currentQuestionIndex.value = index;
  }
};

const goToPrevious = () => {
  goToQuestion(currentQuestionIndex.value - 1);
};

const goToNext = () => {
  goToQuestion(currentQuestionIndex.value + 1);
};
</script>

<template>
  <div class="solutions-page">
    <div class="question-navigation">
      <div class="question-tabs">
        <button 
          v-for="(q, index) in questions" 
          :key="q.id"
          :class="{ active: index === currentQuestionIndex }"
          @click="goToQuestion(index)"
        >
          {{ q.id }}
        </button>
      </div>
    </div>

    <div class="question-container">
      <h2>{{ currentQuestion.title }}</h2>
      <div class="question-text">
        <p>{{ currentQuestion.question }}</p>
      </div>

      <div class="answers-container">
        <div class="answer-section">
          <h3>Jouw antwoord:</h3>
          <div class="editor-wrapper">
            <SqlEditor 
              v-model:value="userAnswers[currentQuestion.id]" 
              :questionId="currentQuestion.id" 
            />
          </div>
        </div>

        <div class="answer-section">
          <h3>Voorbeeldoplossing:</h3>
          <div class="solution-code">
            <pre><code>{{ currentQuestion.solution }}</code></pre>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button 
          @click="goToPrevious" 
          :disabled="currentQuestionIndex === 0"
        >
          Vorige
        </button>
        <span>{{ currentQuestionIndex + 1 }} / {{ questions.length }}</span>
        <button 
          @click="goToNext" 
          :disabled="currentQuestionIndex === questions.length - 1"
        >
          Volgende
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.solutions-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.question-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.question-tabs button {
  background-color: #e0e0e0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.question-tabs button.active {
  background-color: var(--primary-color);
  color: white;
}

.question-container {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.question-text {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  white-space: pre-line;
}

.answers-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .answers-container {
    grid-template-columns: 1fr;
  }
}

.answer-section {
  display: flex;
  flex-direction: column;
}

.editor-wrapper {
  flex: 1;
}

.solution-code {
  background-color: #282c34;
  color: #abb2bf;
  padding: 1rem;
  border-radius: 4px;
  overflow: auto;
  height: 200px;
  font-family: 'Consolas', 'Monaco', monospace;
}

.solution-code pre {
  margin: 0;
  white-space: pre-wrap;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.navigation-buttons button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.navigation-buttons button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
