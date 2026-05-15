import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ override: true });

const resend = new Resend(process.env.RESEND_API_KEY);
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

      const htmlTemplate = `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #f0f0f0; border-radius: 24px; overflow: hidden; color: #18181b;">
          <div style="background: #76b900; padding: 40px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">FITTI.</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-style: italic; font-size: 14px;">Transformation Dossier Received</p>
          </div>
          
          <div style="padding: 40px;">
            <div style="margin-bottom: 30px; border-bottom: 2px solid #f8f8f8; padding-bottom: 20px;">
              <h2 style="font-size: 12px; font-weight: 900; color: #76b900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">Target Identity</h2>
              <p style="font-size: 24px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -0.5px;">${formData.fullName}</p>
              <p style="font-size: 16px; color: #71717a; margin: 5px 0 0 0;">${formData.phone}</p>
            </div>

            <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
              <div style="background: #fafafa; padding: 20px; border-radius: 16px;">
                <h3 style="font-size: 10px; font-weight: 900; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px 0;">Biological Objective</h3>
                <p style="font-size: 16px; font-weight: 700; margin: 0;">${formData.goal}</p>
              </div>
              <div style="background: #fafafa; padding: 20px; border-radius: 16px;">
                <h3 style="font-size: 10px; font-weight: 900; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px 0;">Proposed Protocol</h3>
                <p style="font-size: 16px; font-weight: 700; margin: 0;">${formData.planInterest}</p>
              </div>
            </div>

            <div style="margin-bottom: 30px; background: #fafafa; padding: 25px; border-radius: 16px;">
              <h2 style="font-size: 10px; font-weight: 900; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 15px 0;">Physiological Stats</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="font-size: 14px; color: #71717a; padding: 5px 0;">Age:</td>
                  <td style="font-size: 14px; font-weight: 700; text-align: right;">${formData.age}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #71717a; padding: 5px 0;">Height:</td>
                  <td style="font-size: 14px; font-weight: 700; text-align: right;">${formData.height} cm</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #71717a; padding: 5px 0;">Weight:</td>
                  <td style="font-size: 14px; font-weight: 700; text-align: right;">${formData.weight} kg</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #71717a; padding: 5px 0;">Dietary Pref:</td>
                  <td style="font-size: 14px; font-weight: 700; text-align: right;">${formData.foodPreference}</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 30px;">
              <h2 style="font-size: 10px; font-weight: 900; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px 0;">Medical Audit</h2>
              <div style="background: ${formData.hasMedicalCondition === "Yes" ? "#fff1f2" : "#f0fdf4"}; padding: 20px; border-radius: 16px; border: 1px solid ${formData.hasMedicalCondition === "Yes" ? "#fecdd3" : "#dcfce7"};">
                <p style="font-size: 14px; margin: 0; font-weight: 700; color: ${formData.hasMedicalCondition === "Yes" ? "#991b1b" : "#166534"}; text-transform: uppercase;">Condition: ${formData.hasMedicalCondition}</p>
                ${formData.medicalDescription ? `<p style="font-size: 13px; color: #7f1d1d; margin: 10px 0 0 0; line-height: 1.6;">${formData.medicalDescription}</p>` : ""}
              </div>
            </div>

            <div style="background: #18181b; padding: 30px; border-radius: 16px; color: #ffffff;">
              <h2 style="font-size: 10px; font-weight: 900; color: #76b900; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 15px 0;">Logistics Node</h2>
              <p style="font-size: 14px; color: #a1a1aa; margin: 0;">Deployment Area:</p>
              <p style="font-size: 18px; font-weight: 700; margin: 5px 0 0 0; color: #ffffff;">${formData.location}</p>
            </div>
          </div>
          
          <div style="background: #fafafa; padding: 20px; text-align: center; border-top: 1px solid #f0f0f0;">
            <p style="font-size: 11px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px; margin: 0;">System Generated Log // ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `;

      const { data, error } = await resend.emails.send({
        from: 'Fitti Platform <onboarding@resend.dev>',
        to: 'nyx4122006@gmail.com',
        subject: `[FITTI] New Application: ${formData.fullName}`,
        html: htmlTemplate
      });

      if (error) {
        console.error("Resend Error:", error);
        return res.status(500).json({ success: false, message: error.message });
      }

      console.log("Transmission sent successfully via Resend:", data?.id);
      res.status(200).json({ success: true, message: "Application sent successfully!" });
    } catch (error) {
      console.error("Error processing application:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
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

