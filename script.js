const repoList = document.querySelector("#repo-list");
const repoCount = document.querySelector("#repo-count");

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium"
  }).format(new Date(dateString));
}

function renderRepositories(events) {
  repoCount.textContent = `${events.length} repositories`;

  if (events.length === 0) {
    repoList.innerHTML = '<li class="status-message">No starred repositories yet.</li>';
    return;
  }

  repoList.innerHTML = events.map((event) => `
    <li class="repo-item">
      <a class="repo-link" href="${event.repo.url}" target="_blank" rel="noreferrer">
        ${event.repo.name}
      </a>
      <p class="repo-description">${event.repo.description}</p>
      <div class="repo-meta">
        <span>${event.repo.language}</span>
        <time datetime="${event.created_at}">Starred ${formatDate(event.created_at)}</time>
      </div>
    </li>
  `).join("");
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    repoList.innerHTML = '<li class="status-message">Could not load starred repositories.</li>';
    console.error(error);
  }
}

loadRepositories();