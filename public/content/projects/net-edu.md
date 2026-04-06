# N.E.T. (Neurodiverse Educational Testing)

> A multi-agent AI platform that orchestrates specialized LLM workflows to
> identify learning differences and generate real-world accommodation documents,
> bridging the gap between families and the support systems they need.

---

## Why This Project Matters

Getting a child evaluated for learning differences in the U.S. can take
6 to 18 months and cost thousands of dollars. N.E.T. provides a free,
15-minute pre-screening that produces role-ready summaries, 504-plan
starters, and evaluation request letters, putting legal-grade advocacy
tools directly in parents' hands.

---

## Multi-Agent Architecture

N.E.T. is not a single-prompt chatbot. It is a **multi-agent orchestration
system** where each stage of the user journey is handled by a specialized
AI agent, coordinated through n8n workflow automation:

```
User > Welcome Bot Agent > Assessment Agent > Analysis Agent > PDF Report Agent
              |                      |                   |                  |
         Conversational         Adaptive Q&A        Pattern           Document
          intake &              (7 structured       detection &       generation
          consent               question types)     flag synthesis    (HTML to PDF)
```

| Agent               | Responsibility                                        | Endpoint              |
|---------------------|-------------------------------------------------------|-----------------------|
| **Welcome Bot**     | Conversational intake, consent, demographic collection | `n8n/welcome-bot`     |
| **Assessment**      | Adaptive multi-format questioning with format tracking | `n8n/Assessment_Multi`|
| **Needs Assessment**| Final analysis into full HTML report generation        | `n8n/needs-assessment`|
| **PDF Focus Card**  | Reading-profile-aware text annotation                  | `n8n/pdf-focus-card`  |
| **LLM Formatter**   | Token-level text formatting based on reading profile   | `n8n/format`          |
| **Advocacy AI**     | Legal document generation (Claude Sonnet)              | Anthropic API direct  |

Each agent receives structured payloads, maintains conversation context,
and returns typed responses. The frontend acts as the orchestration layer
that routes data between agents based on session state.

---

## Technical Highlights

### Adaptive Structured Assessment Engine
The assessment agent dynamically selects from **6 question formats** based on
the conversation so far: single-select grids, multi-select, Likert-5
scales, chip pickers, 2x2 axis grids, and free text. Format history
tracking prevents repetitive UX and ensures balanced data collection.

### Custom NLP Tokenization Pipeline
A v1 tokenizer splits text into indexed tokens with preserved whitespace
("glue"), enabling **token-level LLM annotations** without positional drift.
Index-anchored tokens (`[0]Word [1]next`) turn the LLM's counting task
into a lookup task, dramatically improving annotation accuracy.

### Token-Based Annotation Renderer
LLM annotations (key terms, definitions, examples, numbers/dates) are
mapped back to token ranges and rendered as semantic HTML with an 18%
coverage cap, keeping the reading view clean while highlighting what
matters most.

### AI-Powered Reading Profile System
The reading assessment tests 8 conditions (font size x contrast x
font type) and builds a personalized `ReadingProfile` with 25+ configurable
parameters: typography, theming, cursor tools, and text formatting rules
that flow through the entire application.

### Legal Document Generation (Claude Sonnet)
The advocacy module generates legally-cited documents referencing IDEA
(20 U.S.C. § 1414) and Section 504, with state-specific evaluation
timelines, challenge-mapped accommodations, and school response context.
Bilingual (EN/ES) support throughout.

### Session Persistence & Resume
Supabase-backed session management allows users to pause and resume
assessments across devices. Assessment Q&A, analysis results, and chatbot
conversations are persisted with deduplication guards against concurrent
API calls and React strict-mode double-mounts.

---

## Accessibility: Not an Afterthought

- **WCAG 2.1 AA** compliance with semantic HTML and ARIA attributes
- **Dyslexia-friendly fonts** and configurable letter/line spacing
- **High-contrast mode** and multiple color themes
- **Reading ruler** and focus-card overlays
- **Text-to-speech** via Web Speech API on every guide message
- **Reading mode toggle** with enlarged text and increased spacing
- **Skip-to-content links** and full keyboard navigation
- **Crisis routing** risk flag detection pauses the session and redirects to localized crisis resources

---

## Privacy & Compliance

| Standard         | Implementation                                         |
|------------------|--------------------------------------------------------|
| **HIPAA-aligned**| No PII stored by default; opt-in 30-day retention     |
| **COPPA**        | Guardian consent gate before minor assessment          |
| **FERPA**        | Educational records handled with parent authorization  |
| **Crisis safety**| Real-time risk flag detection with immediate routing   |

---

## Tech Stack

| Layer            | Technology                                              |
|------------------|---------------------------------------------------------|
| **Frontend**     | React 18, TypeScript, Vite 5, Tailwind CSS 3            |
| **UI Components**| shadcn/ui (40+ Radix primitives), Lucide icons          |
| **AI Orchestration** | n8n workflow automation (5 webhook agents)          |
| **LLM**         | Claude Sonnet (Anthropic) for document generation       |
| **Backend**      | Supabase (Auth, PostgreSQL, Row-Level Security)         |
| **State**        | React Context, TanStack React Query, session refs       |
| **PDF**          | html2pdf.js, jspdf, custom HTML to PDF pipeline         |
| **Accessibility**| Web Speech API, WCAG 2.1 AA, ARIA, custom reading tools |
| **i18n**         | Custom bilingual system (EN/ES) with template literals  |
