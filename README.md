# 🎓 Microsoft Learning Hub

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-blue.svg)](https://tailwindcss.com/)
[![MCP Integration](https://img.shields.io/badge/MCP-Microsoft%20Docs-green.svg)](https://microsoft.com/learn)
[![Deploy to Azure](https://img.shields.io/badge/Deploy%20to-Azure-blue.svg)](DEPLOY_TO_AZURE.md)

A comprehensive learning hub for Microsoft certification preparation with **live Microsoft Documentation integration** via MCP (Model Context Protocol).

## 🚀 One-Click Azure Deployment

Deploy this learning hub to Azure with just one click!

### Azure Static Web Apps (Recommended)
[![Deploy to Azure Static Web Apps](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fks0411%2Fmicrosoft-learning-hub%2Fmain%2Fazure%2Fstatic-web-app-template.json)

### Azure App Service
[![Deploy to Azure App Service](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fks0411%2Fmicrosoft-learning-hub%2Fmain%2Fazure%2Fapp-service-template.json)

📋 [**Full Deployment Guide**](DEPLOY_TO_AZURE.md) | 🔄 [**CI/CD Workflows**](.github/WORKFLOWS.md)

## ✨ Features

### 🎯 **Certification Coverage**
- **DP-600**: Implementing Analytics Solutions Using Microsoft Fabric
- **DP-700**: Implementing Data Engineering Solutions Using Microsoft Fabric
- Based on official Microsoft certification requirements

### 🔗 **Live Microsoft Docs Integration**
- Real-time content from Microsoft Learn via MCP server
- Dynamic question generation from official study guides
- Always up-to-date with latest Microsoft Fabric documentation
- Smart fallback to comprehensive local question bank

### 📚 **Comprehensive Question Banks**
- **15+ questions per exam** with detailed explanations
- Multiple question types: single-choice, multiple-choice, case studies
- Difficulty levels: Easy, Medium, Hard
- Complete coverage of all exam objectives

### 🎮 **Interactive Exam Simulation**
- **3-hour timed exams** matching real certification format
- Progress tracking and auto-save functionality
- Detailed scoring with pass/fail results (700+ to pass)
- Review mode with explanations and references

### 🛠 **Technical Excellence**
- **React 18** + **TypeScript** for type safety
- **Tailwind CSS** for modern, responsive design
- **MCP Integration** for live Microsoft Docs content
- **Vite** for fast development and building
- **Azure Ready** with one-click deployment options

## 🚀 Quick Start

### Option 1: Deploy to Azure (Recommended)
Use the one-click deployment buttons above or follow the [complete deployment guide](DEPLOY_TO_AZURE.md).

### Option 2: Local Development

#### Prerequisites
- Node.js 18+ and npm
- Modern web browser

#### Installation

```bash
# Clone the repository
git clone https://github.com/ks0411/microsoft-learning-hub.git
cd microsoft-learning-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

## 🌐 Azure Deployment Features

### 🎯 **Multiple Deployment Options**
- **Azure Static Web Apps**: Free tier, global CDN, automatic HTTPS
- **Azure App Service**: Traditional hosting with scaling options
- **ARM Templates**: Infrastructure-as-code with full customization

### 🔄 **Automated CI/CD**
- **GitHub Actions**: Automatic deployments on push to main
- **PR Previews**: Test changes in isolated environments
- **Build Optimizations**: Automated dependency caching and artifact management

### ⚙️ **Production Ready**
- **Environment Variables**: Configurable MCP integration settings
- **Performance Monitoring**: Application Insights integration ready
- **Custom Domains**: Easy setup for production URLs
- **SSL/TLS**: Automatic certificate management

## 💰 Cost Optimization

### Free Tier Options
- **Azure Static Web Apps Free**: 100GB bandwidth, 0.5GB storage
- **Azure App Service F1**: 1GB storage, 165 minutes/day compute
- **GitHub Actions**: 2,000 minutes/month for public repositories

---

Built with ❤️ for the Microsoft Fabric community. Deploy to Azure and start learning today! 🎉