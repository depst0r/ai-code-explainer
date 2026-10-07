# 🤖 AI Code Explainer

AI-инструмент, который объясняет код. Вставляешь код или ссылку на файл в GitHub — выбираешь режим — получаешь разбор.

🔗 **Демо:** https://ai-code-explainer-ochre.vercel.app

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Возможности

**4 режима разбора:**

| Режим | Что делает |
|-------|------------|
| 🎓 **Объяснить** | Что делает код, как работает, когда применять |
| 🐛 **Найти баги** | Ищет ошибки, объясняет причины, предлагает фиксы |
| ✨ **Улучшить** | Рефакторинг: производительность, читабельность |
| 📖 **Построчно** | Разбор каждой строки |

**2 способа ввода:**

- 📝 **Вставить код** — прямо в textarea
- 🔗 **Ссылка на GitHub** — вставляешь URL файла, код подтягивается сам

**Дополнительно:**

- Ответы рендерятся как **Markdown** — таблицы, заголовки, блоки кода
- **Обработка ошибок** — понятные сообщения вместо стектрейсов
- **Тёмная тема** — приятно читать

---

## 🛠 Стек

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** — типизация
- **Tailwind CSS** — стили
- **react-markdown** + **remark-gfm** — рендер ответов
- **@tailwindcss/typography** — типографика (`prose`)
- **Pollinations API** — бесплатный LLM, без ключей

---

## 🚀 Быстрый старт

```bash
git clone https://github.com/depst0r/ai-code-explainer.git
cd ai-code-explainer
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000)

---

## 📁 Структура проекта

```
ai-code-explainer/
│
├── app/
│   ├── page.tsx                  # 💬 UI: форма, режимы, вывод
│   ├── layout.tsx                # Корневой лэйаут
│   ├── globals.css               # Tailwind + плагин typography
│   └── api/
│       └── explain/
│           └── route.ts          # 🧠 API: получение кода + LLM
│
├── lib/
│   └── modes.ts                  # 🎛 4 режима: id, name, prompt
│
├── public/                       # Статика
└── README.md
```

---

## ⚙️ Как это работает

```
Пользователь вводит код ИЛИ GitHub-ссылку
        ↓
Выбирает режим (объяснить / баги / улучшить / построчно)
        ↓
fetch POST /api/explain  { code, mode, inputMode, url }
        ↓
Сервер (route.ts):
  ├─ если inputMode === 'url'
  │    ├─ преобразует github.com → raw.githubusercontent.com
  │    ├─ проверяет, что ссылка с github.com
  │    ├─ fetch → получает исходный код
  │    └─ проверяет res.ok (404 / 403 → понятная ошибка)
  │
  ├─ находит промпт по mode в MODES
  └─ fetch → Pollinations API
        ↓
Ответ рендерится как Markdown
```

**Ключевые решения:**

- **Промпты — на сервере.** Клиент отправляет только `mode` (id). Сервер **сам** выбирает промпт. Так логика не дублируется и промпты не видны пользователю.
- **GitHub API через raw-URL.** `github.com/.../blob/...` → `raw.githubusercontent.com/.../...`. Возвращает чистый текст файла, не HTML.
- **Проверка ошибок.** `res.ok` до `res.text()` — иначе в LLM улетит HTML-страница 404.

---

## 🎯 Что можно улучшить

- [ ] Стриминг ответов (как в AI Agent Team)
- [ ] Подсветка синтаксиса в блоках кода
- [ ] Кнопка «Копировать» для кода
- [ ] История запросов
- [ ] Docker (в планах)

---

## 📄 Лицензия

MIT
