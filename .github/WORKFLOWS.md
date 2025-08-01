# Azure Deployment Workflows

This project includes automated CI/CD workflows for Azure deployment.

## Workflow Files

Since GitHub API doesn't allow creating nested directories directly, here are the workflow files to create manually:

### 1. Create `.github/workflows/azure-static-web-apps.yml`

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

env:
  NODE_VERSION: '18.x'
  VITE_MCP_ENABLED: true

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      with:
        submodules: true

    - name: Setup Node.js ${{ env.NODE_VERSION }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm run test -- --coverage --watchAll=false
      env:
        CI: true

    - name: Build application
      run: npm run build
      env:
        CI: false
        VITE_MCP_ENABLED: ${{ env.VITE_MCP_ENABLED }}

    - name: Deploy to Azure Static Web Apps
      id: builddeploy
      uses: Azure/static-web-apps-deploy@v1
      with:
        azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
        repo_token: ${{ secrets.GITHUB_TOKEN }}
        action: "upload"
        app_location: "/"
        api_location: ""
        output_location: "dist"
        skip_app_build: true
      env:
        VITE_MCP_ENABLED: ${{ env.VITE_MCP_ENABLED }}

    - name: Create deployment summary
      if: steps.builddeploy.outcome == 'success'
      run: |
        echo "### 🚀 Deployment Summary" >> $GITHUB_STEP_SUMMARY
        echo "- **Application**: Microsoft Learning Hub" >> $GITHUB_STEP_SUMMARY
        echo "- **Environment**: ${{ github.event_name == 'pull_request' && 'Preview' || 'Production' }}" >> $GITHUB_STEP_SUMMARY
        echo "- **Azure Static Web Apps**: Deployed successfully" >> $GITHUB_STEP_SUMMARY
        echo "- **Commit**: ${{ github.sha }}" >> $GITHUB_STEP_SUMMARY
        echo "- **Branch**: ${{ github.ref_name }}" >> $GITHUB_STEP_SUMMARY

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    
    steps:
    - name: Close Pull Request
      id: closepullrequest
      uses: Azure/static-web-apps-deploy@v1
      with:
        azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
        action: "close"
```

### 2. Create `.github/workflows/azure-app-service.yml`

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened, closed]

env:
  AZURE_WEBAPP_NAME: microsoft-learning-hub-app
  NODE_VERSION: '18.x'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Setup Node.js ${{ env.NODE_VERSION }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build application
      run: npm run build
      env:
        CI: false
        VITE_MCP_ENABLED: true

    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        slot-name: 'Production'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: dist/
```

## Setup Instructions

1. **For Static Web Apps**: Add `AZURE_STATIC_WEB_APPS_API_TOKEN` secret
2. **For App Service**: Add `AZURE_WEBAPP_PUBLISH_PROFILE` secret
3. Deploy using the ARM templates in the `azure/` folder
4. Workflows will run automatically on push to main branch