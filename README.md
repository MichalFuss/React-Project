# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
   # README

   ## מה המערכת עושה
   מערכת זו היא מערכת ניהול פניות (Tickets) המיועדת לארגונים. היא מאפשרת ללקוחות לפתוח פניות, לסוכנים לטפל בהן, ולמנהלים לעקוב אחר סטטיסטיקות ותפקוד הצוות.

   ## תפקידים
   - **לקוח (Customer):** יכול לפתוח פניות ולעקוב אחר סטטוס הפנייה.
   - **סוכן (Agent):** מטפל בפניות, משנה סטטוס, ומעדכן את הלקוח.
   - **מנהל (Admin):** רואה את כל הפניות, מנהל משתמשים, ומקבל דוחות.

   ## הנחיות הרצה
   1. התקן את כל התלויות:
      ```bash
      npm install
      ```
   2. הפעל את המערכת:
      ```bash
      npm run dev
      ```
   3. פתח את הדפדפן בכתובת:
      [http://localhost:5173](http://localhost:5173)

   ---
   בהצלחה!
```
