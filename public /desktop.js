function openApp(app) {
  const apps = document.getElementById('apps');
  let appWindow = document.createElement('div');
  appWindow.classList.add('app-window');
  appWindow.innerHTML = `<div class="title-bar">${app} <button onclick="this.parentElement.parentElement.remove()">X</button></div>
                         <div class="content">Welcome to ${app}!</div>`;
  apps.appendChild(appWindow);
}
