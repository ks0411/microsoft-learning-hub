# 🚀 How to Add Your Learning Portal to GitHub

## Step 1: Create GitHub Repository

1. Go to **GitHub.com** and sign in
2. Click the **"+"** button in the top right corner
3. Select **"New repository"**
4. Repository settings:
   - **Repository name**: `microsoft-fabric-learning-portal` (or your preferred name)
   - **Description**: `Microsoft Fabric Certification Learning Portal with MCP Integration`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have files)
5. Click **"Create repository"**

## Step 2: Connect Your Local Repository

After creating the GitHub repository, GitHub will show you commands. Use these:

```bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Rename main branch (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Step 3: Alternative - Use GitHub CLI (if installed)

If you have GitHub CLI installed:

```bash
# Create and push repository in one command
gh repo create microsoft-fabric-learning-portal --public --source=. --remote=origin --push
```

## 📋 What Will Be Uploaded

Your repository will include:
- ✅ **Complete Learning Portal** - React app with DP-600/DP-700 exam simulation
- ✅ **MCP Integration** - Live Microsoft Docs integration
- ✅ **Comprehensive Question Banks** - 15+ questions per exam with explanations
- ✅ **Documentation** - Setup guides and integration documentation
- ✅ **All Source Code** - TypeScript, React components, services
- ✅ **Build Configuration** - Vite, Tailwind CSS, dependencies

## 🔧 Commands Ready to Execute

Once you have your GitHub repository URL, run:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git branch -M main
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL GitHub provides when you create the repository.

## 🎯 Repository Features

Your GitHub repository will showcase:
- **Live Demo**: Full certification learning portal
- **MCP Integration**: Real-time Microsoft Docs content
- **Professional Code**: TypeScript, React best practices
- **Documentation**: Comprehensive setup and usage guides
- **Production Ready**: Deployable learning platform

Ready to create your GitHub repository? Follow Step 1 above and then come back to execute the git commands! 🚀
