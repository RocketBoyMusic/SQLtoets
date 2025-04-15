<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as monaco from 'monaco-editor';

const props = defineProps<{
  value: string;
  questionId: number;
}>();

const emit = defineEmits(['update:value']);

const editorContainer = ref<HTMLElement | null>(null);
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

// Load saved answer from localStorage if available
const getSavedAnswer = () => {
  const savedAnswer = localStorage.getItem(`sql-answer-${props.questionId}`);
  return savedAnswer || props.value;
};

// Save answer to localStorage
const saveAnswer = (value: string) => {
  localStorage.setItem(`sql-answer-${props.questionId}`, value);
};

onMounted(() => {
  if (editorContainer.value) {
    // Set explicit height to ensure the editor has vertical space
    editorContainer.value.style.height = '200px';
    editorContainer.value.style.minHeight = '200px';

    // Initialize Monaco editor with fixed options
    editor = monaco.editor.create(editorContainer.value, {
      value: getSavedAnswer(),
      language: 'sql',
      theme: 'vs-dark',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      lineNumbers: 'on',
      fontSize: 14,
      tabSize: 2,
      fixedOverflowWidgets: true, // Fix for widgets jumping
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        verticalScrollbarSize: 14,
        horizontalScrollbarSize: 14,
        alwaysConsumeMouseWheel: false
      },
      overviewRulerLanes: 0,
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      renderLineHighlight: 'line',
      contextmenu: true,
      folding: true,
      wordWrap: 'off', // Turn off word wrap to prevent text positioning issues
      wrappingStrategy: 'simple',
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      cursorStyle: 'line',
      cursorWidth: 2,
      glyphMargin: false, // Disable glyph margin
      renderWhitespace: 'none', // Don't render whitespace
      renderControlCharacters: false,
      renderIndentGuides: false, // Disable indent guides
      renderFinalNewline: false,
      formatOnType: false,
      formatOnPaste: false,
      // Fix for text positioning
      revealHorizontalRightPadding: 0,
      roundedSelection: false,
      readOnly: false,
      // Ensure text starts at the beginning
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 3,
    });

    // Set model options to fix text positioning
    const model = editor.getModel();
    if (model) {
      model.updateOptions({
        tabSize: 2,
        insertSpaces: true,
        trimAutoWhitespace: false,
        detectIndentation: false
      });
    }

    // Position cursor at the beginning of the document
    editor.setPosition({ lineNumber: 1, column: 1 });
    editor.revealPositionInCenter({ lineNumber: 1, column: 1 });

    // Update value on content change
    editor.onDidChangeModelContent(() => {
      const value = editor?.getValue() || '';
      emit('update:value', value);
      saveAnswer(value);
    });

    // Fix for cursor jumping - focus the editor when clicked
    editorContainer.value.addEventListener('click', () => {
      if (editor) {
        editor.focus();
      }
    });

    // Force layout and resize after a short delay to ensure proper rendering
    setTimeout(() => {
      if (editor) {
        editor.layout();
      }
    }, 100);
  }
});

// Watch for external value changes
watch(() => props.value, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    // Save cursor position
    const position = editor.getPosition();

    // Update value
    editor.setValue(newValue);

    // Restore cursor position if it exists
    if (position) {
      editor.setPosition(position);
      editor.revealPositionInCenter(position);
    }
  }
});

// Handle window resize to ensure editor layout is updated
const handleResize = () => {
  if (editor) {
    editor.layout();
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

// Clean up editor on component unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (editor) {
    editor.dispose();
  }
});
</script>

<template>
  <div class="sql-editor" style="height: 200px; min-height: 200px; text-align: left;">
    <div ref="editorContainer" class="editor-container" style="height: 200px; min-height: 200px; text-align: left;"></div>
  </div>
</template>

<style scoped>
.sql-editor {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left !important;
}

.editor-container {
  height: 200px;
  min-height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
  flex: 1;
  text-align: left !important;
}

/* Ensure Monaco editor has proper stacking context */
:deep(.monaco-editor) {
  position: relative;
  z-index: 1;
  text-align: left !important;
}

/* Fix for cursor positioning */
:deep(.monaco-editor .cursor) {
  position: absolute;
  z-index: 2;
}

/* Fix for content view positioning */
:deep(.monaco-editor .monaco-editor-background) {
  left: 0 !important;
}

:deep(.monaco-editor .view-overlays) {
  left: 0 !important;
}

:deep(.monaco-editor .view-lines) {
  left: 0 !important;
  width: 100% !important;
}

:deep(.monaco-editor .lines-content) {
  left: 0 !important;
  width: 100% !important;
}
</style>
