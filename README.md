## 🚚

**BCC Keynote** it is _powered by_ the following technologies:

📱 **Mobile application**. `TypeScript` with `React Native (Expo)`.

⚙️ **Backend**. `C#` for API's creation and database connection.

🗄️ **Database**. `SQL Server` as database engine.

## Contribute to the project

```bash
git clone -o azure -b dev "https://..."
```

## Commits

To make a proper commit; The structure of the message must be like following the **type** of commit:

- 00 - temp (to save a quick copy)
- 01 - feature
- 02 - fix
- 03 - refactor
- 10 - fix-refactor (two or more actions | big features)

### Commit Examples

✅

```bash
git commit -m "01 - Screen x has been... "
```

❌

```bash
git commit -m "feature: Screen x has been..."
```

## Error Handling

```ts
enum TYPE_ALERT_ERROR {
  APP, // 00
  SERVER, // 01
  SERVICE, // 02
}
```
