const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/plan", (req, res) => {
  const { idea = "{{IDEA}}", audience = "{{AUDIENCE}}", problem = "{{PROBLEM}}" } = req.body || {};

  res.json({
    summary: `${idea} / ${audience} / ${problem}`,
    mustHave: ["입력 화면", "계획 생성 API", "결과 표시"],
    nonGoals: ["로그인", "데이터베이스", "결제"],
    phases: [
      "Static Public UI",
      "Local API",
      "Core Workflow",
      "Polish",
      "Runbook"
    ]
  });
});

app.listen(port, () => {
  console.log(`{{APP_NAME}} running at http://localhost:${port}`);
});
