const fs = require('fs');
const yaml = require('js-yaml');
const chalk = require('chalk');

const filePath = './sample-workflow.yml';

// Load YAML file
try {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const workflow = yaml.load(fileContents);

  console.log(chalk.blue("✅ Workflow loaded successfully!"));

  // Check for common mistakes
  let fixesApplied = false;

  // 1. Check if 'name' field exists
  if (!workflow.name) {
    workflow.name = 'Auto-Fixed Workflow';
    console.log(chalk.yellow("⚠ 'name' field missing. Auto-added."));
    fixesApplied = true;
  }

  // 2. Check if jobs exist
  if (!workflow.jobs) {
    workflow.jobs = { build: { 'runs-on': 'ubuntu-latest', steps: [{ run: 'echo Hello' }] } };
    console.log(chalk.yellow("⚠ 'jobs' field missing. Auto-added a default build job."));
    fixesApplied = true;
  }

  // 3. Check indentation for steps
  for (let jobKey in workflow.jobs) {
    let job = workflow.jobs[jobKey];
    if (!job.steps || job.steps.length === 0) {
      job.steps = [{ run: 'echo "Step auto-added"' }];
      console.log(chalk.yellow(`⚠ No steps found in job '${jobKey}'. Auto-added a default step.`));
      fixesApplied = true;
    }
  }

  // Save fixed workflow if any changes
  if (fixesApplied) {
    const fixedYaml = yaml.dump(workflow, { noRefs: true });
    fs.writeFileSync('./sample-workflow-fixed.yml', fixedYaml, 'utf8');
    console.log(chalk.green("✅ Fixed workflow saved as 'sample-workflow-fixed.yml'"));
  } else {
    console.log(chalk.green("✅ No issues found. Workflow is fine."));
  }

} catch (e) {
  console.log(chalk.red("❌ Error loading workflow file:"), e);
}
