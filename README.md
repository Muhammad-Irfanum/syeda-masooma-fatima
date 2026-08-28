# Syeda Masooma Fatima — Portfolio

A premium, responsive career portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, and Lucide icons. It includes a browser-based content studio for managing the profile, education, experience, credentials, and images.

## Development

Requires Node.js 20.9 or newer.

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` for the portfolio and `http://localhost:3000/admin` for the content studio.

## Production

```powershell
npm run build
npm start
```

## Admin data

Admin changes are stored in the current browser with `localStorage`. Use **Data & backup → Download backup** to preserve or move the content. For a public, multi-device admin, connect the interface to an authenticated database and object-storage service before deployment.
