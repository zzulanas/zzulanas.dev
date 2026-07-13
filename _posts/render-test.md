---
title: "Render test: hazards & GFM"
date: "2026-07-13"
tags: ["test"]
---

Literal {curly braces} and 1 < 2 and <3 hearts and A<B>C — no escaping needed.

| feature | works |
| ------- | ----- |
| tables  | yes   |

- [x] task lists
- [ ] ~~strikethrough~~

```python
code = {"still": "highlighted"}
```

Inline `{code}` and <script>alert(1)</script> raw HTML is skipped.
