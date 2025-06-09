import session from "express-session";
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";

// Simple mock authentication for development
interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(session({
    secret: process.env.SESSION_SECRET || 'development-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  }));

  // Mock login endpoint for development
  app.get("/api/login", async (req, res) => {
    const mockUser: MockUser = {
      id: "dev-user-123",
      email: "developer@example.com",
      firstName: "Developer",
      lastName: "User",
      profileImageUrl: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Dev"
    };

    // Store user in session
    (req.session as any).user = mockUser;
    
    // Store user in database
    await storage.upsertUser(mockUser);
    
    res.redirect("/");
  });

  // Logout endpoint
  app.get("/api/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const user = (req.session as any)?.user;
  
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  (req as any).user = { claims: { sub: user.id } };
  next();
};