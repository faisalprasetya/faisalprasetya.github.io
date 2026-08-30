/* ============================================================
   LEADERBOARDS
   ------------------------------------------------------------
   Climbed the ladder? This is the ONLY place you need to edit:

     1. Update `rank` (and `label` when you enter a new tier,
        e.g. "Top 20" -> "Top 10" -> "#1").
     2. Update `points` / `progress` / `updated`.
     3. Drop a new screenshot into /assets and point `image` at it.

   The section on the site rebuilds itself from this list.
   Rank 1-3 entries automatically get a highlighted card.

   Fields:
     platform  - platform name
     rank      - current global rank (number)
     label     - tier badge, e.g. "Top 3", "Top 10", "#1"
     points    - points string, e.g. "140 pts"
     progress  - extra stat, e.g. "60/60 completed" (or null)
     event     - event/season name (or null)
     updated   - when this was last checked, e.g. "Aug 2026"
     image     - screenshot path (clickable thumbnail)
     url       - link to the live leaderboard
     desc      - one-line description of the platform
   ============================================================ */
const LEADERBOARDS = [
  {
    platform: "LeetGPU",
    rank: 3,
    label: "Top 3",
    points: "2,791 pts",
    progress: null,
    event: null,
    updated: "Aug 2026",
    image: "assets/leaderboard-leetgpu.png",
    url: "https://leetgpu.com/challenges",
    desc: "CUDA & GPU kernel programming challenges",
  },
  {
    platform: "Tensortonic",
    rank: 49,
    label: "Top 50",
    points: "3,110 pts",
    progress: null,
    event: null,
    updated: "Aug 2026",
    image: "assets/leaderboard-tensortonic.png",
    url: "https://www.tensortonic.com/leaderboard",
    desc: "ML systems & tensor programming challenges",
  },
];

(function () {
  var grid = document.getElementById("leaderboards-grid");
  if (!grid) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  LEADERBOARDS.forEach(function (entry) {
    var card = el("article", entry.rank <= 3 ? "lb-card lb-card-top" : "lb-card");

    var head = el("div", "lb-head");
    var titleWrap = el("div");
    titleWrap.appendChild(el("h3", "lb-platform", entry.platform));
    titleWrap.appendChild(el("p", "lb-desc", entry.desc));
    head.appendChild(titleWrap);

    var rank = el("div", "lb-rank");
    rank.appendChild(el("span", "lb-rank-value", "#" + entry.rank));
    rank.appendChild(el("span", "lb-rank-label", entry.label + " · Global"));
    head.appendChild(rank);
    card.appendChild(head);

    if (entry.image) {
      var shot = el("a", "lb-shot");
      shot.href = entry.image;
      shot.target = "_blank";
      shot.rel = "noopener noreferrer";
      shot.setAttribute("aria-label", "View full " + entry.platform + " leaderboard screenshot");
      var img = document.createElement("img");
      img.src = entry.image;
      img.alt = entry.platform + " global leaderboard showing Faisal Prasetya at rank " + entry.rank;
      img.loading = "lazy";
      shot.appendChild(img);
      card.appendChild(shot);
    }

    var stats = el("ul", "tag-list lb-stats");
    [entry.points, entry.progress, entry.event, "Updated " + entry.updated]
      .filter(Boolean)
      .forEach(function (stat) {
        stats.appendChild(el("li", null, stat));
      });
    card.appendChild(stats);

    var link = el("a", "lb-link", "View live leaderboard →");
    link.href = entry.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    card.appendChild(link);

    grid.appendChild(card);
  });
})();
