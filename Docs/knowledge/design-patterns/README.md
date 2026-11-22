# Design patterns

Patterns used **because an example needs them**, not to fill a catalog.

Each page keeps: what / when / when not / good / bad / trade-offs, a **Persian description**, and a **real example** (Hono API + React UI). Stories: Notion-style editor, marketplace checkout, chat. Snippets teach the pattern — they are not a runnable app.

GoF groups patterns by intent: **Creational** (how objects are created), **Structural** (how objects are composed), **Behavioral** (how objects communicate and share responsibility). This repo also keeps a short **Data & composition** group for Repository and Dependency Injection, which show up constantly in enterprise apps but are not classic GoF names.

---

## Creational — creating objects / ساختن اشیاء

| Pattern | Page | فارسی (کوتاه) | Enterprise example |
|---------|------|---------------|--------------------|
| Factory | [factory.md](factory.md) | ساخت شیء از روی نوع/پیکربندی بدون دانستن کلاس دقیق | Notion blocks |
| Factory Method | [factory-method.md](factory-method.md) | زیراده‌کلاس/پیاده‌سازی تصمیم می‌گیرد چه چیزی ساخته شود | Chat notification channel |
| Abstract Factory | [abstract-factory.md](abstract-factory.md) | خانوادهٔ اشیاء مرتبط بدون وابستگی به کلاس‌های مشخص | Marketplace receipt: Stripe vs Adyen kit |
| Builder | [builder.md](builder.md) | ساخت شیء پیچیده قدم‌به‌قدم | Notion page export (PDF / Markdown) |
| Prototype | [prototype.md](prototype.md) | ساخت نمونهٔ جدید با کلون کردن یک نمونهٔ موجود | Duplicate Notion page / template |
| Singleton | [singleton.md](singleton.md) | فقط یک نمونهٔ مشترک — با احتیاط | Process-wide DB pool / logger |

---

## Structural — connecting or organizing objects / اتصال و سازمان‌دهی

| Pattern | Page | فارسی (کوتاه) | Enterprise example |
|---------|------|---------------|--------------------|
| Adapter | [adapter.md](adapter.md) | تبدیل رابط یک سیستم به رابط مورد انتظار کلاینت | Stripe / Adyen checkout |
| Decorator | [decorator.md](decorator.md) | افزودن رفتار با پیچیدن شیء، بدون تغییر کلاس اصلی | Hono auth + rate-limit wrappers; React message bubble |
| Facade | [facade.md](facade.md) | رابط ساده روی زیرسیستم پیچیده | Checkout “place order” facade |
| Proxy | [proxy.md](proxy.md) | جانشین شیء واقعی برای کنترل دسترسی، کش، یا بارگذاری تنبل | Signed URL / lazy page load |
| Composite | [composite.md](composite.md) | رفتار یکسان با برگ و گروه | Notion block tree (page / section / paragraph) |
| Bridge | [bridge.md](bridge.md) | جدا کردن انتزاع از پیاده‌سازی تا هر دو مستقل تغییر کنند | Notification channel × provider |
| Flyweight | [flyweight.md](flyweight.md) | اشتراک دادهٔ تکراری بین اشیاء زیاد برای کاهش حافظه | Chat emoji / reaction sprites |

---

## Behavioral — communication and responsibilities / ارتباط و مسئولیت‌ها

| Pattern | Page | فارسی (کوتاه) | Enterprise example |
|---------|------|---------------|--------------------|
| Strategy | [strategy.md](strategy.md) | الگوریتم‌های قابل تعویض پشت یک رابط | Commission, tax, fulfillment |
| Observer | [observer.md](observer.md) | آگاه‌سازی وابسته‌ها از تغییر وضعیت | Chat fan-out to inbox / mentions |
| Command | [command.md](command.md) | عمل را به‌صورت شیء مدل کردن (صف، undo، لاگ) | Notion editor undo / redo |
| State | [state.md](state.md) | رفتار شیء بر اساس وضعیت فعلی | Marketplace order lifecycle |
| Template Method | [template-method.md](template-method.md) | اسکلت الگوریتم ثابت؛ چند گام قابل تغییر | Import pipeline (CSV / Notion export) |
| Chain of Responsibility | [chain-of-responsibility.md](chain-of-responsibility.md) | عبور درخواست از زنجیرهٔ handler تا یکی رسیدگی کند | Hono middleware; moderation pipeline |
| Mediator | [mediator.md](mediator.md) | هماهنگی ارتباط اشیاء بدون وابستگی مستقیم | Chat room coordinator |
| Iterator | [iterator.md](iterator.md) | پیمایش استاندارد روی مجموعه | Cursor pagination over messages |
| Memento | [memento.md](memento.md) | ذخیره و بازگردانی وضعیت قبلی | Autosave draft / version restore |
| Visitor | [visitor.md](visitor.md) | افزودن عملیات روی ساختار اشیاء بدون تغییر کلاس‌ها | Export / spellcheck over block tree |

---

## Data & composition — persistence and wiring / داده و ترکیب

| Pattern | Page | فارسی (کوتاه) | Enterprise example |
|---------|------|---------------|--------------------|
| Repository | [repository.md](repository.md) | رابط شبیه مجموعه برای aggregateها، جدا از SQL | Notion page revisions |
| Dependency Injection | [dependency-injection.md](dependency-injection.md) | تزریق وابستگی از بیرون به‌جای ساخت داخلی | Chat `createApp(deps)` |

---

## How to read

1. Pick the category that matches your problem (create / compose / communicate).
2. Open the pattern page: English guide + **توضیح فارسی** + Hono / React example.
3. Prefer patterns that already appear in [`../examples/`](../../examples/README.md) when the monorepo code lands.
