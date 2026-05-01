import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Route for Form Submission
  app.post("/api/apply", async (req, res) => {
    try {
      const formData = req.body;
      console.log("Received application:", formData);

      // SMTP Configuration
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "nyx4122006@gmail.com",
        subject: `[FITTI] New Application: ${formData.fullName}`,
        text: `
          New Transformation Application Received:
          -----------------------------------------
          Full Name: ${formData.fullName}
          Phone: ${formData.phone}
          Goal: ${formData.goal}
          
          BODY DETAILS:
          Age: ${formData.age}
          Height: ${formData.height} cm
          Weight: ${formData.weight} kg
          Food Preference: ${formData.foodPreference}
          
          HEALTH INFO:
          Medical Condition: ${formData.hasMedicalCondition}
          Medical Details: ${formData.medicalDescription || "None provided"}
          
          LOGISTICS:
          Area/Pincode: ${formData.location}
          Plan Interest: ${formData.planInterest}
          Consultation Call: ${formData.requestConsultation}
          
          Timestamp: ${new Date().toISOString()}
        `
      };

      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
        console.log("Transmission sent to nyx4122006@gmail.com");
        res.status(200).json({ success: true, message: "Application sent successfully!" });
      } else {
        console.warn("SMTP Credentials missing in environment variables.");
        res.status(500).json({ success: false, message: "Server configuration error." });
      }
    } catch (error) {
      console.error("Error processing application:", error);
      res.status(500).json({ success: false, message: "Failed to send email." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
