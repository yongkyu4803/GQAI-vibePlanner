const button = document.getElementById("submit");
const result = document.getElementById("result");

function list(title, items) {
  return `<h3>${title}</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

button.addEventListener("click", async () => {
  result.innerHTML = "<p>생성 중...</p>";

  const response = await fetch("/api/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idea: document.getElementById("idea").value,
      audience: document.getElementById("audience").value,
      problem: document.getElementById("problem").value,
    }),
  });

  if (!response.ok) {
    result.innerHTML = "<p>계획을 만들지 못했습니다. 입력을 확인하고 다시 시도하세요.</p>";
    return;
  }

  const plan = await response.json();
  result.innerHTML = `
    <h2>생성 결과</h2>
    <p>${plan.summary}</p>
    ${list("MVP 포함", plan.mustHave)}
    ${list("이번에는 제외", plan.nonGoals)}
    ${list("진행 순서", plan.phases)}
  `;
});
