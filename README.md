# StudyCoach Lite 🎓

[![CI](https://github.com/<your-username>/studycoach-lite/actions/workflows/ci.yml/badge.svg)](https://github.com/<your-username>/studycoach-lite/actions)  
[![Vercel Deploy](https://vercelbadge.vercel.app/api/<your-username>/studycoach-lite)](https://studycoach-lite.vercel.app)

A minimal but production-minded demo app that showcases **staff-level front-end engineering practices** in the context of learning technology.  

This project demonstrates:
- 📚 **Learner flow** → take exercises, request AI-generated hints, track progress  
- 🧑‍🏫 **Coach flow** → observe learner progress, toggle feature flags, export reports  
- ✍️ **Authoring flow** → paste text, get AI-suggested practice questions, promote to a lesson  
- ♿ **Accessibility first** with Radix primitives and Storybook a11y checks  
- ⚡ **Performance budgets** enforced via Lighthouse CI  
- ✅ **Quality gates** with strict TypeScript, linting, Vitest, Playwright, and ADRs  
- 🤝 **Mentorship artifacts** like ADRs, contributing guide, and code review checklist  

---

## 🚀 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/) with **TypeScript**  
- [Redux Toolkit](https://redux-toolkit.js.org/) (UI state) + [TanStack Query](https://tanstack.com/query) (server state)  
- [shadcn/ui](https://ui.shadcn.com/) + [Radix Primitives](https://www.radix-ui.com/) for accessible components  
- [TailwindCSS](https://tailwindcss.com/) for styling  
- [Zod](https://zod.dev/) for runtime validation  
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + [Playwright](https://playwright.dev/) for testing  
- [Storybook](https://storybook.js.org/) with a11y + interaction testing  
- [MSW](https://mswjs.io/) for API mocking  
- Pluggable **AI provider interface** (default `mock`, swap in OpenAI/Claude easily)  
- CI/CD via GitHub Actions + Deploy on Vercel  

---

## 🧑‍💻 Getting Started

Clone and install dependencies:

```bash
git clone https://github.com/<your-username>/studycoach-lite.git
cd studycoach-lite
npm install
npm run dev