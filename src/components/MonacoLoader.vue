<script setup lang="ts">
import { onMounted } from 'vue';
import * as monaco from 'monaco-editor';

// Configure Monaco editor
onMounted(() => {
  // Set global editor options to improve stability
  monaco.editor.EditorOptions.fixedOverflowWidgets.defaultValue = true;
  monaco.editor.EditorOptions.scrollBeyondLastLine.defaultValue = false;
  monaco.editor.EditorOptions.cursorSmoothCaretAnimation.defaultValue = 'on';
  monaco.editor.EditorOptions.smoothScrolling.defaultValue = true;

  // Register SQL language if not already registered
  if (!monaco.languages.getLanguages().some(lang => lang.id === 'sql')) {
    monaco.languages.register({ id: 'sql' });

    // Define SQL syntax highlighting
    monaco.languages.setMonarchTokensProvider('sql', {
      defaultToken: '',
      tokenPostfix: '.sql',
      ignoreCase: true,

      brackets: [
        { open: '[', close: ']', token: 'delimiter.square' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' }
      ],

      keywords: [
        'SELECT', 'FROM', 'WHERE', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING',
        'AND', 'OR', 'NOT', 'NULL', 'IN', 'LIKE', 'BETWEEN', 'IS', 'JOIN',
        'INNER', 'LEFT', 'RIGHT', 'OUTER', 'FULL', 'ON', 'INSERT', 'INTO',
        'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP',
        'ALTER', 'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER',
        'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'UNION', 'ALL', 'DISTINCT',
        'ASC', 'DESC', 'LIMIT', 'OFFSET', 'TOP', 'PERCENT', 'WITH'
      ],

      operators: [
        '=', '>', '<', '>=', '<=', '<>', '!=', '+', '-', '*', '/', '%', '&', '|', '^', '~'
      ],

      builtinFunctions: [
        'AVG', 'COUNT', 'MIN', 'MAX', 'SUM', 'CURRENT_DATE', 'CURRENT_TIME',
        'CURRENT_TIMESTAMP', 'CURRENT_USER', 'LOWER', 'UPPER', 'SUBSTRING',
        'CONCAT', 'TRIM', 'LENGTH', 'CAST', 'CONVERT', 'COALESCE', 'NULLIF',
        'ROUND', 'FLOOR', 'CEILING', 'ABS', 'RAND', 'NOW', 'DATEADD', 'DATEDIFF',
        'DATEPART', 'YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE', 'SECOND'
      ],

      builtinVariables: [
        '@ROWCOUNT', '@ERROR', '@IDENTITY', '@CURSOR', '@FETCH_STATUS'
      ],

      tokenizer: {
        root: [
          { include: '@comments' },
          { include: '@whitespace' },
          { include: '@numbers' },
          { include: '@strings' },
          { include: '@complexIdentifiers' },
          { include: '@scopes' },
          [/[;,.]/, 'delimiter'],
          [/[()]/, '@brackets'],
          [/[\w@#$]+/, {
            cases: {
              '@keywords': 'keyword',
              '@operators': 'operator',
              '@builtinFunctions': 'predefined',
              '@builtinVariables': 'predefined',
              '@default': 'identifier'
            }
          }],
          [/[<>=!%&+\-*/|~^]/, 'operator']
        ],
        whitespace: [
          [/\s+/, 'white']
        ],
        comments: [
          [/--+.*/, 'comment'],
          [/\/\*/, { token: 'comment.quote', next: '@comment' }]
        ],
        comment: [
          [/[^*/]+/, 'comment'],
          [/\*\//, { token: 'comment.quote', next: '@pop' }],
          [/./, 'comment']
        ],
        numbers: [
          [/0[xX][0-9a-fA-F]*/, 'number'],
          [/[$][+-]*\d*(\.\d*)?/, 'number'],
          [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number']
        ],
        strings: [
          [/'/, { token: 'string', next: '@string' }],
          [/"/, { token: 'string.double', next: '@stringDouble' }]
        ],
        string: [
          [/[^']+/, 'string'],
          [/''/, 'string'],
          [/'/, { token: 'string', next: '@pop' }]
        ],
        stringDouble: [
          [/[^"]+/, 'string.double'],
          [/""/, 'string.double'],
          [/"/, { token: 'string.double', next: '@pop' }]
        ],
        complexIdentifiers: [
          [/\[/, { token: 'identifier.quote', next: '@bracketedIdentifier' }],
          [/"/, { token: 'identifier.quote', next: '@quotedIdentifier' }]
        ],
        bracketedIdentifier: [
          [/[^\]]+/, 'identifier'],
          [/]]/, 'identifier'],
          [/]/, { token: 'identifier.quote', next: '@pop' }]
        ],
        quotedIdentifier: [
          [/[^"]+/, 'identifier'],
          [/""/, 'identifier'],
          [/"/, { token: 'identifier.quote', next: '@pop' }]
        ],
        scopes: []
      }
    });
  }
});
</script>

<template>
  <!-- This component doesn't render anything, it just initializes Monaco -->
</template>
