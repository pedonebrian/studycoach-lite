# Performance Budget

| Metric  | Budget  | Tool |
|---------|---------|------|
| LCP     | < 2.5s  | Lighthouse CI |
| CLS     | < 0.1   | Lighthouse CI |
| TTI     | < 3s    | Lighthouse CI |
| JS Size | < 200kb initial | webpack-bundle-analyzer |

CI will fail if budgets are exceeded.