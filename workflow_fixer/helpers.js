const fetch = require('node-fetch');
const yaml = require('js-yaml');

// Fetch workflow files from repo
async function getWorkflows(config) {
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/.github/workflows?ref=${config.branch}`;
  const res = await fetch(url, {
    headers: { Authorization: `token ${config.githubToken}` }
  });
  return res.json();
}

// Load YAML content
function loadYAML(content) {
  return yaml.load(Buffer.from(content, 'base64').toString('utf8'));
}

// Dump YAML content
function dumpYAML(data) {
  return yaml.dump(data, { noRefs: true });
}

module.exports = { getWorkflows, loadYAML, dumpYAML };
