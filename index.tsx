#!/usr/bin/env bun

import 'dotenv/config';
import { render } from 'ink';
import React from 'react';
import { config } from './src/config';
import { ragService } from './src/core/rag-service';
import { ollamaClient } from './src/ollama/client';
import { App } from './src/tui/app';

async function main() {
  try {
    // Validate config
    config.validate();

    console.log('Initializing Ollama RAG TUI...');
    console.log(`Ollama endpoint: ${config.ollama.endpoint}`);
    console.log(`Model: ${config.ollama.model}`);
    console.log(`Thinking enabled: ${config.ollama.enableThinking}`);

    // Check Ollama health
    const ollamaHealthy = await ollamaClient.checkHealth();
    if (!ollamaHealthy) {
      console.error(`\n❌ Ollama is not available at ${config.ollama.endpoint}`);
      console.error('Please make sure Ollama is running.');
      process.exit(1);
    }

    // Initialize RAG service
    await ragService.initialize();

    // Start TUI
    render(<App />);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

main();
