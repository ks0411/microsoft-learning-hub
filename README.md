# 🎓 Microsoft Learning Hub

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-blue.svg)](https://tailwindcss.com/)
[![MCP Integration](https://img.shields.io/badge/MCP-Microsoft%20Docs-green.svg)](https://microsoft.com/learn)

A comprehensive learning hub for Microsoft certification preparation with **live Microsoft Documentation integration** via MCP (Model Context Protocol).

![Learning Portal Screenshot](https://via.placeholder.com/800x400?text=Microsoft+Fabric+Learning+Portal)

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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

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

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

### Taking Practice Exams

1. **Select Certification**: Choose DP-600 or DP-700
2. **Review Instructions**: Understand exam format and timing
3. **Start Exam**: Begin 3-hour timed simulation
4. **Navigate Questions**: Use Previous/Next buttons
5. **Submit & Review**: Get scored results and detailed explanations

### MCP Integration Status

Watch for the status indicator in the exam header:
- 🟢 **"Live Microsoft Docs"** - Connected to MCP server
- 🔵 **"Comprehensive Bank"** - Using local question bank

## 🏗 Architecture

### Core Components

```
src/
├── components/           # Reusable UI components
│   ├── exam/            # Exam-specific components
│   └── layout/          # Layout components
├── pages/               # Main application pages
├── services/            # Business logic and API integration
│   ├── mcpQuestionService.ts    # Main question service
│   └── mcpIntegration.ts        # MCP Microsoft Docs integration
├── types/               # TypeScript type definitions
└── styles/              # Global styles and Tailwind config
```

### MCP Integration Flow

```
User Request → MCPQuestionService → MCPIntegrationService → Microsoft Docs MCP Server
                                 ↓
                         Real-time Questions ← Live Microsoft Learn Content
                                 ↓
                         Enhanced Question Bank (Local + MCP Generated)
```

## 📊 Question Bank Details

### DP-600 Coverage
- **Maintain a data analytics solution** (25-30%)
- **Prepare data** (45-50%)  
- **Implement and manage semantic models** (25-30%)

### DP-700 Coverage
- **Implement and manage an analytics solution** (30-35%)
- **Ingest and transform data** (30-35%)
- **Monitor and optimize an analytics solution** (30-35%)

## 🔧 Configuration

### MCP Integration Setup

The portal automatically detects MCP server availability. To enable full Microsoft Docs integration:

1. Ensure MCP server is running in your environment
2. Install Microsoft Docs MCP extension (if available)
3. Check browser console for connection logs

### Environment Variables

```env
# Optional: Configure MCP settings
VITE_MCP_ENABLED=true
VITE_MCP_ENDPOINT=https://learn.microsoft.com/api/mcp
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft Learn** for comprehensive certification documentation
- **Microsoft Fabric** team for excellent documentation and resources
- **MCP Protocol** for enabling live documentation integration
- **React** and **TypeScript** communities for excellent tools

## 📞 Support

- Create an [Issue](https://github.com/ks0411/microsoft-learning-hub/issues) for bug reports
- Check [Microsoft Learn](https://learn.microsoft.com/en-us/fabric/) for official documentation
- Review [Certification Requirements](https://learn.microsoft.com/en-us/credentials/certifications/) for exam details

---

Built with ❤️ for the Microsoft Fabric community. Good luck with your certification journey! 🎉
