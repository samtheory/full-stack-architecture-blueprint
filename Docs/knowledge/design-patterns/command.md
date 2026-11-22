# Command pattern

## What it is

Represents an action as an **object** with `execute` (and often `undo`). Useful for queues, undo/redo stacks, logging, and scheduling.

## توضیح فارسی

**Command** یک عمل را به‌صورت **شیء** مدل می‌کند (`execute` / `undo`). برای صف کارها، undo/redo ادیتور، و لاگ دستورات عالی است. در Notion، هر ویرایش عنوان یا بلاک یک command است که می‌توان به پشتهٔ undo هل داد و بعداً برگرداند؛ در Hono می‌توان همان command را در outbox برای پردازش بعدی ذخیره کرد.

## When to use

- Undo/redo editors
- Job queues / outbox of domain actions
- Macro recording of user operations

## When not to use

- A plain function call is enough
- Every button becomes a class with no undo story

## Good practice

- Commands are immutable intents; apply to a receiver
- Undo must restore the previous memento/state explicitly

## Bad / worst practice

- **Bad:** command that reaches into React components directly
- **Worst:** undo that only works once because state was mutated in place without a snapshot

## Trade-offs

Powerful history vs more types and memory for the stack.

## Real example — Notion editor undo

### Backend (Hono) — persistable commands / outbox

```ts
interface Command {
  type: string;
  execute(): Promise<void>;
  undo(): Promise<void>;
}

class RenamePageCommand implements Command {
  readonly type = "RenamePage";
  private previousTitle = "";

  constructor(
    private readonly pages: PageRepository,
    private readonly pageId: string,
    private readonly nextTitle: string,
  ) {}

  async execute() {
    const page = await this.pages.findById(this.pageId);
    if (!page) throw new Error("NOT_FOUND");
    this.previousTitle = page.title;
    await this.pages.saveTitle(this.pageId, this.nextTitle);
  }

  async undo() {
    await this.pages.saveTitle(this.pageId, this.previousTitle);
  }
}

app.post("/pages/:id/rename", async (c) => {
  const { title } = await c.req.json();
  const command = new RenamePageCommand(pages, c.req.param("id"), title);
  await command.execute();
  await outbox.enqueue({ type: command.type, pageId: c.req.param("id"), title });
  return c.json({ ok: true });
});
```

### Frontend (React)

```tsx
type EditorCommand = {
  label: string;
  execute: () => void;
  undo: () => void;
};

function useUndoStack() {
  const [undo, setUndo] = useState<EditorCommand[]>([]);
  const [redo, setRedo] = useState<EditorCommand[]>([]);

  function run(command: EditorCommand) {
    command.execute();
    setUndo((stack) => [...stack, command]);
    setRedo([]);
  }

  function undoLast() {
    setUndo((stack) => {
      const command = stack[stack.length - 1];
      if (!command) return stack;
      command.undo();
      setRedo((r) => [...r, command]);
      return stack.slice(0, -1);
    });
  }

  return { run, undoLast, canUndo: undo.length > 0 };
}
```

### Side-by-side

| Need | Direct mutation | Command |
|------|-----------------|---------|
| Undo title change | Ad hoc previous value | `command.undo()` |
| Replay / audit | Reconstruct from logs painfully | Serialized command list |

## Related concepts

Memento, Observer, Queue/outbox

## Where in this repo

Teaching pattern for editor history and durable jobs.
