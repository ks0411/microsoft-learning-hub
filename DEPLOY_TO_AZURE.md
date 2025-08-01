# 🚀 Deploy to Azure - Microsoft Learning Hub

Deploy your Microsoft Learning Hub to Azure with just one click! Choose from multiple deployment options below.

## 🎯 Quick Deploy Options

### Option 1: Azure Static Web Apps (Recommended)
**Perfect for React applications with built-in CI/CD**

[![Deploy to Azure Static Web Apps](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fks0411%2Fmicrosoft-learning-hub%2Fmain%2Fazure%2Fstatic-web-app-template.json)

**Features:**
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ GitHub Actions integration
- ✅ Custom domains
- ✅ Staging environments for PRs

### Option 2: Azure App Service
**Traditional web app hosting with more control**

[![Deploy to Azure App Service](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fks0411%2Fmicrosoft-learning-hub%2Fmain%2Fazure%2Fapp-service-template.json)

**Features:**
- ✅ F1 Free tier available
- ✅ Easy scaling options
- ✅ Application insights integration
- ✅ Deployment slots
- ✅ Custom runtime configurations

## 📋 Prerequisites

1. **Azure Subscription** - [Get a free account](https://azure.microsoft.com/free/)
2. **GitHub Account** - For source code and CI/CD
3. **Resource Group** - Will be created during deployment

## 🛠️ Manual Deployment Steps

### Using Azure CLI

```bash
# Clone the repository
git clone https://github.com/ks0411/microsoft-learning-hub.git
cd microsoft-learning-hub

# Login to Azure
az login

# Create resource group
az group create --name rg-microsoft-learning-hub --location eastus

# Deploy Static Web App
az deployment group create \
  --resource-group rg-microsoft-learning-hub \
  --template-file azure/static-web-app-template.json \
  --parameters azure/static-web-app-parameters.json

# OR Deploy App Service
az deployment group create \
  --resource-group rg-microsoft-learning-hub \
  --template-file azure/app-service-template.json \
  --parameters azure/app-service-parameters.json
```

### Using PowerShell

```powershell
# Connect to Azure
Connect-AzAccount

# Create resource group
New-AzResourceGroup -Name "rg-microsoft-learning-hub" -Location "East US"

# Deploy Static Web App
New-AzResourceGroupDeployment `
  -ResourceGroupName "rg-microsoft-learning-hub" `
  -TemplateFile "azure/static-web-app-template.json" `
  -TemplateParameterFile "azure/static-web-app-parameters.json"

# OR Deploy App Service
New-AzResourceGroupDeployment `
  -ResourceGroupName "rg-microsoft-learning-hub" `
  -TemplateFile "azure/app-service-template.json" `
  -TemplateParameterFile "azure/app-service-parameters.json"
```

## ⚙️ Configuration

### Environment Variables

The application supports the following environment variables:

| Variable | Description | Default |
|----------|-------------|----------|
| `VITE_MCP_ENABLED` | Enable MCP integration | `true` |
| `VITE_API_BASE_URL` | API base URL | Auto-detected |
| `VITE_APP_TITLE` | Application title | `Microsoft Learning Hub` |

### GitHub Secrets (for CI/CD)

For automated deployments, add these secrets to your GitHub repository:

#### For Static Web Apps:
- `AZURE_STATIC_WEB_APPS_API_TOKEN` - Deployment token from Azure portal

#### For App Service:
- `AZURE_WEBAPP_PUBLISH_PROFILE` - Download from Azure portal

### Setting up GitHub Secrets:

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add the required secrets

## 🔄 CI/CD Pipeline

The repository includes GitHub Actions workflows for automated deployment:

- **Static Web Apps**: `.github/workflows/azure-static-web-apps.yml`
- **App Service**: `.github/workflows/azure-app-service.yml`

### Pipeline Features:

✅ **Automatic builds** on push to main branch  
✅ **Pull request previews** (Static Web Apps only)  
✅ **Environment-specific deployments**  
✅ **Build artifact caching**  
✅ **Deployment status notifications**  
✅ **Rollback capabilities**  

## 🌐 Post-Deployment

### Verify Deployment

1. **Static Web Apps**: `https://<app-name>.azurestaticapps.net`
2. **App Service**: `https://<app-name>.azurewebsites.net`

### Custom Domain Setup

#### Static Web Apps:
1. Go to Azure portal > Static Web Apps > Custom domains
2. Add your domain and configure DNS
3. SSL certificate is automatically managed

#### App Service:
1. Go to Azure portal > App Service > Custom domains
2. Add domain and upload SSL certificate
3. Configure domain validation

## 📊 Monitoring & Analytics

### Application Insights (Optional)

Add Application Insights for detailed monitoring:

```json
{
  "APPINSIGHTS_INSTRUMENTATIONKEY": "your-key-here",
  "APPLICATIONINSIGHTS_CONNECTION_STRING": "your-connection-string"
}
```

### Performance Monitoring

- **Response times**: Monitor API and page load times
- **Error tracking**: Automatic exception logging
- **User analytics**: Page views and user flows
- **Custom metrics**: Track learning progress and quiz completion

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (requires 18.x)
   - Verify all dependencies are installed
   - Check environment variables

2. **Deployment Timeouts**
   - Increase timeout settings in ARM templates
   - Use incremental deployment mode
   - Check resource quotas

3. **Runtime Errors**
   - Check Application Insights logs
   - Verify environment configuration
   - Test MCP endpoints

### Getting Help

- **Azure Support**: [Azure Portal Support](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade)
- **GitHub Issues**: [Project Issues](https://github.com/ks0411/microsoft-learning-hub/issues)
- **Documentation**: [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)

## 💰 Cost Optimization

### Free Tier Limits

**Static Web Apps (Free)**:
- 100 GB bandwidth/month
- 0.5 GB storage
- Custom domains

**App Service (F1 Free)**:
- 1 GB storage
- 165 minutes/day compute
- No custom domains

### Scaling Recommendations

- **Development**: Use free tiers
- **Production**: Static Web Apps Standard or App Service B1
- **Enterprise**: App Service P1v3 with autoscaling

## 🚀 What's Next?

- [ ] Set up custom domain
- [ ] Configure Application Insights
- [ ] Add performance monitoring
- [ ] Set up staging environments
- [ ] Configure backup strategies
- [ ] Implement blue-green deployments

---

**Happy Learning! 🎓**

Need help? [Open an issue](https://github.com/ks0411/microsoft-learning-hub/issues) or check our [documentation](README.md).