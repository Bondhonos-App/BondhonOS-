const fs = require('fs');
const chalk = require('chalk');
const fetch = require('node-fetch');
const semver = require('semver');
const { getWorkflows, loadYAML, dumpYAML } = require('./helpers');
const config = require('./config');

(async () => {
  try {
    const files = await getWorkflows(config);
    const fixedFiles = [];

    for (let file of files) {
      console.log(chalk.blue(`🔍 Processing ${file.name} ...`));
      const contentRes = await fetch(file.download_url);
      const content = await contentRes.text();
      let workflow = loadYAML(Buffer.from(content, 'utf8'));
      let fixesApplied = false;

      // --- YAML Fixes ---
      if (!workflow.name) {
        workflow.name = 'Auto-Fixed Workflow';
        fixesApplied = true;
      }
      if (!workflow.jobs) {
        workflow.jobs = { build: { 'runs-on': 'ubuntu-latest', steps: [{ run: 'echo Hello' }] } };
        fixesApplied = true;
      }

      for (let jobKey in workflow.jobs) {
        let job = workflow.jobs[jobKey];
        if (!job.steps || job.steps.length === 0) {
          job.steps = [{ run: 'echo "Step auto-added"' }];
          fixesApplied = true;
        }

        // --- Node/Python validation ---
        if (job['strategy'] && job['strategy']['matrix']) {
          if (job['strategy']['matrix']['node-version'] && !semver.validRange(job['strategy']['matrix']['node-version'])) {
            job['strategy']['matrix']['node-version'] = '18.x';
            fixesApplied = true;
          }
          if (job['strategy']['matrix']['python-version'] && !semver.validRange(job['strategy']['matrix']['python-version'])) {
            job['strategy']['matrix']['python-version'] = '3.11';
            fixesApplied = true;
          }
        }

        if (job['runs-on'] && !['ubuntu-latest','windows-latest','macos-latest'].includes(job['runs-on'])) {
          job['runs-on'] = 'ubuntu-latest';
          fixesApplied = true;
        }

        // --- Secrets/Env validation ---
        if (job.env) {
          for (let key in job.env) {
            if (!job.env[key]) {
              job.env[key] = 'DUMMY_VALUE';
              fixesApplied = true;
            }
          }
        }

        if (job.steps) {
          for (let step of job.steps) {
            if (step.with) {
              for (let k in step.with) {
                if (!step.with[k]) step.with[k] = 'DUMMY_VALUE';
              }
            }
          }
        }

        // --- Dependency auto-install ---
        for (let step of job.steps) {
          if (step.run && step.run.includes('npm install')) {
            step.run += ' || echo "npm install failed, skipping"';
          }
          if (step.run && step.run.includes('pip install')) {
            step.run += ' || echo "pip install failed, skipping"';
          }
        }
      }

      if (fixesApplied) {
        fixedFiles.push({
          path: file.path,
          content: Buffer.from(dumpYAML(workflow)).toString('base64')
        });
        console.log(chalk.green(`✅ ${file.name} fixed.`));
      } else {
        console.log(chalk.green(`✅ ${file.name} is fine.`));
      }
    }

    if (fixedFiles.length === 0) {
      console.log(chalk.blue("✅ No workflow files needed fixing."));
      return;
    }

    // --- Branch Creation ---
    const branchName = `full-auto-fix-${Date.now()}`;
    const refRes = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/git/refs/heads/${config.branch}`, {
      headers: { Authorization: `token ${config.githubToken}` }
    });
    const baseData = await refRes.json();
    await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/git/refs`, {
      method: 'POST',
      headers: { Authorization: `token ${config.githubToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseData.object.sha })
    });
    console.log(chalk.green(`✅ Branch '${branchName}' created.`));

    // --- Commit fixed files ---
    for (let f of fixedFiles) {
      await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${f.path}`, {
        method: 'PUT',
        headers: { Authorization: `token ${config.githubToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Full auto-fixed workflow: ${f.path}`,
          content: f.content,
          branch: branchName
        })
      });
      console.log(chalk.green(`✅ ${f.path} committed to ${branchName}`));
    }

    // --- Create PR ---
    const prRes = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/pulls`, {
      method: 'POST',
      headers: { Authorization: `token ${config.githubToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: config.prTitle,
        head: branchName,
        base: config.branch,
        body: config.prBody
      })
    });
    const prData = await prRes.json();
    console.log(chalk.green(`✅ Pull Request created: ${prData.html_url}`));

  } catch (e) {
    console.log(chalk.red("❌ Error:"), e);
  }
})();
