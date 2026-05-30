import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/generate-fitness-plan", async (req, res) => {
  const {
    planType,
    minutesPerSession,
    daysPerWeek,
    weeksToRun,
    fitnessLevel,
    primaryGoal,
    dietaryPreference,
    equipmentPreference
  } = req.body;

  try {
    const fitnessPlan = await generateFitnessPlan({
      planType,
      minutesPerSession,
      daysPerWeek,
      weeksToRun,
      fitnessLevel,
      primaryGoal,
      dietaryPreference,
      equipmentPreference
    });

    console.log("Generated Fitness Plan:", fitnessPlan);
    res.json(fitnessPlan);
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to generate fitness plan." });
  }
});

app.post("/generate-fitness-plan-pdf", async (req, res) => {
  const {
    planType,
    minutesPerSession,
    daysPerWeek,
    weeksToRun,
    fitnessLevel,
    primaryGoal,
    dietaryPreference,
    equipmentPreference
  } = req.body;

  try {
    const fitnessPlan = await generateFitnessPlan({
      planType,
      minutesPerSession,
      daysPerWeek,
      weeksToRun,
      fitnessLevel,
      primaryGoal,
      dietaryPreference,
      equipmentPreference
    });

    const html = buildFitnessPlanHtml(fitnessPlan);
    const pdfBuffer = await generatePdfFromHtml(html);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=fitness-plan.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to generate PDF fitness plan." });
  }
});

async function generateFitnessPlan({
  planType,
  minutesPerSession,
  daysPerWeek,
  weeksToRun,
  fitnessLevel,
  primaryGoal,
  dietaryPreference,
  equipmentPreference
}) {
  const fitnessPlanSchema = z.object({
    overview: z.object({
      planType: z.string(),
      durationWeeks: z.number(),
      fitnessLevel: z.string(),
      primaryGoal: z.string(),
      dietaryPreference: z.string(),
      equipmentPreference: z.string()
    }),
    weeklyPlan: z.array(
      z.object({
        week: z.number(),
        days: z.array(
          z.object({
            day: z.string(),
            workout: z.object({
              title: z.string(),
              durationMinutes: z.number(),
              exercises: z.array(
                z.object({
                  name: z.string(),
                  sets: z.number().optional(),
                  reps: z.string().optional(),
                  duration: z.string().optional(),
                  rest: z.string().optional(),
                  instructions: z.string()
                })
              ),
              caloriesBurnEstimate: z.number()
            }),
            diet: z.object({
              totalCalories: z.number(),
              meals: z.array(
                z.object({
                  mealType: z.string(),
                  items: z.array(z.string())
                })
              ),
              waterIntakeLiters: z.number()
            })
          })
        )
      })
    )
  });

  const prompt = `
You are an expert fitness trainer and nutritionist.

Generate a complete personalized fitness and diet plan in JSON format.

User Details:
- Plan Type: ${planType}
- Minutes Per Session: ${minutesPerSession}
- Days Per Week: ${daysPerWeek}
- Weeks To Run: ${weeksToRun}
- Fitness Level: ${fitnessLevel}
- Primary Goal: ${primaryGoal}
- Dietary Preference: ${dietaryPreference}
- Equipment Preference: ${equipmentPreference}

Requirements:
1. Create a workout schedule for each week.
2. Each workout session must fit inside the given session duration.
3. Include proper warmup, workout, and cooldown suggestions.
4. Exercises should match the user's fitness level.
5. Exercises should match the available equipment preference.
6. Create a diet plan for every day.
7. Diet should align with the primary fitness goal.
8. Include calorie estimation.
9. Response must be realistic and human-like.
10. Response should ONLY be valid JSON.

Workout Rules:
- Beginner users should get easier workouts.
- Intermediate users should get moderate intensity.
- Advanced users should get challenging workouts.
- Fat loss plans should include cardio and calorie deficit meals.
- Muscle gain plans should include strength training and protein-rich meals.
- Flexibility plans should include mobility and stretching exercises.

Diet Rules:
- Vegetarian plans must avoid meat.
- Vegan plans must avoid all animal products.
- High protein plans should include protein-rich foods.
- Keep meals practical and affordable.

The response should strictly follow the provided JSON schema.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(fitnessPlanSchema)
    }
  });

  const jsonContent = JSON.parse(response.text);
  return jsonContent;
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });
  await browser.close();
  return pdfBuffer;
}

function buildFitnessPlanHtml(plan) {
  const overview = plan.overview || {};
  const weekSections = (plan.weeklyPlan || []).map((week) => {
    const daysHtml = (week.days || []).map((day) => {
      const exercisesHtml = (day.workout.exercises || []).map((exercise) => `
        <li class="exercise-item">
          <strong>${exercise.name}</strong>
          <div>${[
            exercise.sets ? `${exercise.sets} sets` : null,
            exercise.reps,
            exercise.duration,
            exercise.rest,
          ].filter(Boolean).join(" • ")}</div>
          <div class="exercise-instructions">${exercise.instructions}</div>
        </li>`).join("");

      const mealsHtml = (day.diet.meals || []).map((meal) => `
        <li class="meal-item"><strong>${meal.mealType}:</strong> ${meal.items.join(', ')}</li>`).join("");

      return `
        <div class="day-block">
          <div class="day-block-header">
            <h3>${day.day}</h3>
            <span>${day.workout.durationMinutes} min</span>
          </div>
          <div class="section-row">
            <div class="section-block">
              <h4>Workout</h4>
              <p class="small-note">${day.workout.title}</p>
              <ul>${exercisesHtml}</ul>
              <p class="summary-note">Estimated burn: ${day.workout.caloriesBurnEstimate} kcal</p>
            </div>
            <div class="section-block">
              <h4>Diet</h4>
              <p class="small-note">Total calories: ${day.diet.totalCalories}</p>
              <ul>${mealsHtml}</ul>
              <p class="summary-note">Water: ${day.diet.waterIntakeLiters} L</p>
            </div>
          </div>
        </div>`;
    }).join("");

    return `
      <section class="week-section">
        <div class="week-header">
          <h2>Week ${week.week}</h2>
          <span>${(week.days || []).length} day${(week.days || []).length > 1 ? 's' : ''}</span>
        </div>
        ${daysHtml}
      </section>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Fitness Plan</title>
  <style>
    body { font-family: Arial, sans-serif; color: #111827; margin: 0; padding: 24px; background: #f9fafb; }
    .page { max-width: 900px; margin: auto; background: #ffffff; padding: 24px; border-radius: 16px; box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12); }
    h1, h2, h3, h4 { margin: 0; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    h2 { font-size: 1.25rem; margin-bottom: 0.5rem; }
    h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
    p { margin: 0.35rem 0; line-height: 1.5; }
    .intro { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb; margin-bottom: 20px; }
    .badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 6px 12px; background: #eff6ff; color: #0369a1; border-radius: 999px; font-size: 0.9rem; }
    .plan-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 16px; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px 16px; border-radius: 14px; }
    .summary-card strong { display: block; margin-bottom: 4px; color: #0f172a; }
    .week-section { margin-bottom: 22px; }
    .week-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; background: #eff6ff; padding: 16px 18px; border-radius: 14px; border: 1px solid #dbeafe; margin-bottom: 14px; }
    .week-header span { color: #2563eb; font-weight: 700; }
    .day-block { margin-bottom: 16px; padding: 18px; background: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; }
    .day-block-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 14px; }
    .day-block-header span { color: #2563eb; font-weight: 700; }
    .section-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .section-block { background: #ffffff; padding: 14px 16px; border-radius: 14px; border: 1px solid #e5e7eb; }
    .section-block h4 { margin-bottom: 8px; font-size: 1rem; }
    .small-note { color: #475569; font-size: 0.95rem; margin-bottom: 14px; }
    .exercise-item, .meal-item { margin-bottom: 10px; padding: 10px 12px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0; }
    .exercise-item strong, .meal-item strong { display: block; margin-bottom: 4px; }
    .exercise-instructions { margin-top: 6px; color: #475569; font-size: 0.95rem; }
    .summary-note { margin-top: 12px; color: #475569; font-size: 0.95rem; }
    ul { padding-left: 18px; margin: 0; }
    @media (max-width: 720px) { .section-row { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="page">
    <div class="intro">
      <div>
        <h1>${overview.planType || 'Fitness Plan'}</h1>
        <p>A ${overview.durationWeeks || ''}-week ${overview.fitnessLevel || ''} program for ${overview.primaryGoal || ''}.</p>
      </div>
      <div>
        <span class="badge">${overview.dietaryPreference || 'No diet preference'}</span>
        <span class="badge">${overview.equipmentPreference || 'No equipment preference'}</span>
      </div>
    </div>
    <div class="plan-summary">
      <div class="summary-card"><strong>Goal</strong>${overview.primaryGoal || 'N/A'}</div>
      <div class="summary-card"><strong>Level</strong>${overview.fitnessLevel || 'N/A'}</div>
      <div class="summary-card"><strong>Weeks</strong>${overview.durationWeeks || 'N/A'}</div>
    </div>
    ${weekSections}
  </div>
</body>
</html>`;
}

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});