---
title: "Cheapest LLM APIs Compared (November 2026): OpenAI, Anthropic, Google, xAI, and DeepSeek"
slug: "cheapest-llm-apis-compared-2026"
date: "2026-11-25"
category: "API Pricing"
summary: "Exact per-1M-token API list prices as of November 25, 2026 across budget and flagship models, plus real workload cost examples."
---

> **Affiliate Disclosure (Placeholder):** *[AFFILIATE_DISCLOSURE: Insert final wording here once partner links are added — e.g., "Some links on this page may earn us a commission at no extra cost to you. See our Affiliate Disclosure page for details."]*
>
> **AI Content & Testing Disclosure:** All token prices below were verified directly from official provider pricing pages on November 25, 2026. Cost scenarios are arithmetic calculations based on those published rates; this page was drafted and structured with AI-assisted editorial workflows.

If you are building a small web tool, automating summaries, or running daily monitoring routines, paying $20–$200/month for consumer chat subscriptions isn't your only option. API billing lets you pay strictly per million tokens processed—often costing pennies per week for lightweight workflows.

---

## Verified Budget & Mid-Tier API Prices (USD per 1M Tokens, Nov 25, 2026)

| Provider & Model | Input ($/1M) | Cached Input ($/1M) | Output ($/1M) | Key Pricing Notes |
| --- | --- | --- | --- | --- |
| **OpenAI `gpt-5-nano`** | $0.05 | $0.005 | $0.40 | Lowest published list rate among major US providers |
| **Anthropic `Claude Haiku 5.5` (<=100K)** | $0.10 | $0.01 | $0.50 | Prompts >100K tokens rise to $0.50 in / $2.50 out |
| **OpenAI `gpt-4o-mini`** | $0.15 | $0.075 | $0.60 | Widely supported legacy budget tier |
| **OpenAI `gpt-5.4-nano`** | $0.20 | $0.02 | $1.25 | Newer nano tier |
| **OpenAI `gpt-5-mini`** | $0.25 | $0.025 | $2.00 | Strong price-to-capability mid-small option |
| **DeepSeek `deepseek-flash` (Off-Peak)** | $0.15 | $0.003 | $0.60 | Peak hours (01:00–04:00, 06:00–10:00 UTC Mon–Fri) double to $0.30 / $1.20 |
| **Google `gemini-3.5-flash-lite`** | $0.30 | $0.03 | $2.50 | Free API tier available with rate limits |
| **Google `gemini-3.8-flash`** | $0.75 | — | $3.75 | Promo rate through Dec 31, 2026; rises to $1.50 / $7.50 on Jan 1, 2027 |
| **xAI `grok-build-0.1` (<200K)** | $1.00 | $0.20 | $2.00 | Prompts >=200K billed at $2.00 in / $4.00 out across whole request |

---

## Verified Flagship & Reasoning API Prices (USD per 1M Tokens, Nov 25, 2026)

| Provider & Model | Input ($/1M) | Cached Input ($/1M) | Output ($/1M) | Key Pricing Notes |
| --- | --- | --- | --- | --- |
| **xAI `grok-4.3` (<200K)** | $1.25 | $0.20 | $2.50 | 1M context window; >=200K doubles to $2.50 / $5.00 |
| **OpenAI `gpt-5` / `gpt-5.1`** | $1.25 | $0.125 | $10.00 | Standard flagship tier |
| **DeepSeek `deepseek-v4-pro` (Peak)** | $1.32 | $0.044 | $3.96 | Off-peak drops 50% to $0.66 / $1.98 |
| **Google `gemini-4-hydrogen`** | $1.50 | $0.075 | $7.50 | 1M context; Free tier available |
| **xAI `grok-4.7` (<200K)** | $2.00 | $0.50 | $6.00 | 500K context; >=200K is $4.00 / $12.00; US endpoint +10% |
| **Anthropic `Claude Sonnet 5.5`** | $2.00 | $0.10 | $10.00 | Standard Sonnet workhorse rate |
| **Google `gemini-4-carbon` / `argon`** | $2.00 | $0.10 | $10.00 | Promo through Nov 30, 2026; rises to $4.00 / $20.00 on Dec 1, 2026 |
| **Anthropic `Claude Opus 5.5`** | $4.00 | $0.20 | $20.00 | Top standard Opus tier |

---

## Real Arithmetic: What 1,000 Typical Tasks Actually Cost

Assume a realistic solo workflow: **1,000 requests per month**, averaging **1,500 input tokens** (roughly 1,100 words of prompt + context) and **500 output tokens** (roughly 375 words of reply), with no prompt caching:
- Total input volume = **1.5M tokens**
- Total output volume = **0.5M tokens**

| Model | Monthly Input Cost | Monthly Output Cost | Total Monthly Cost (USD) |
| --- | --- | --- | --- |
| `gpt-5-nano` | $0.075 | $0.200 | **$0.28** |
| `Claude Haiku 5.5` (<=100K) | $0.150 | $0.250 | **$0.40** |
| `gpt-4o-mini` | $0.225 | $0.300 | **$0.53** |
| `gpt-5-mini` | $0.375 | $1.000 | **$1.38** |
| `grok-4.3` (<200K) | $1.875 | $1.250 | **$3.13** |
| `grok-4.7` (<200K) | $3.000 | $3.000 | **$6.00** |
| `Claude Sonnet 5.5` | $3.000 | $5.000 | **$8.00** |
| `Claude Opus 5.5` | $6.000 | $10.000 | **$16.00** |

*Note: Reasoning/thinking models count hidden reasoning tokens as billed output tokens, and Google Gemini grounding with Search carries a per-query fee after 5,000 free monthly searches ($14 per 1,000 queries).*

---

## Practical Cost-Saving Rules

1. **Match the tier to the task:** Use `gpt-5-nano`, `Claude Haiku 5.5`, or `gemini-3.5-flash-lite` for classification, cleanup, and extraction; reserve `Sonnet 5.5`, `grok-4.7`, or `gpt-5` for complex writing or coding.
2. **Watch long-context thresholds:** Crossing 100K tokens on Haiku 5.5 (5x jump) or 200K tokens on Grok models (2x jump across the entire prompt) quickly multiplies bills.
3. **Verify scheduled pricing hikes:** Check Google AI Studio dates—`gemini-4-carbon` and `argon` double on December 1, 2026, and `gemini-3.8-flash` doubles on January 1, 2027.

---

## Official Sources Checked (November 25, 2026)
- OpenAI API Pricing: https://developers.openai.com/api/docs/pricing
- Anthropic Claude Pricing: https://platform.claude.com/docs/en/about-claude/pricing
- Google Gemini API Pricing: https://aistudio.google.com/docs/pricing
- xAI Grok API Pricing: https://docs.x.ai/developers/pricing
- DeepSeek API Pricing: https://api-docs.deepseek.com/quick_start/pricing/
