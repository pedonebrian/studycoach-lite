# Architecture Overview

## High-Level Diagram

Learner Flow → Course → Lesson → Exercise  
↳ Uses API routes for exercises and AI hints  
↳ Stores UI state in Redux Toolkit + server state in TanStack Query

Coach Flow → Progress Dashboard  
↳ Queries learner progress  
↳ Toggles feature flags (via Redux)  
↳ Exports CSV

Authoring Flow → Paste passage → AI Suggests Questions → Save as Lesson  
↳ AI requests go through a pluggable `/api/ai` endpoint

