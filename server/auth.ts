import session from "express-session";
import createMemoryStore from "memorystore";
import { type Express } from "express";

// Extend the session type definition
declare module 'express-session' {
  interface SessionData {
    pingPin?: string;
    isAuthenticated?: boolean;
  }
}

export function setupSessionAuth(app: Express) {
  const MemoryStore = createMemoryStore(session);
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "flingping-anonymous-session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: app.get("env") === "production",
      sameSite: "lax"
    },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    })
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
  }

  app.use(session(sessionSettings));

  // Middleware to check if user is authenticated
  app.use((req, res, next) => {
    // Skip auth check for public routes
    if (req.path.startsWith('/api/health') || 
        req.path === '/api/profiles' || 
        req.path.startsWith('/api/resources')) {
      return next();
    }

    if (!req.session.isAuthenticated && !req.path.startsWith('/api/auth')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    next();
  });
}