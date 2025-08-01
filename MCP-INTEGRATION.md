# MCP Integration Guide

## What Changed

Your Microsoft Learning Hub now uses **real MCP (Model Context Protocol) integration** with Microsoft Learn documentation to generate dynamic exam questions.

## How It Works

### 1. Dynamic Question Generation
- Questions are now generated from live Microsoft Learn documentation
- Content is always up-to-date with the latest Microsoft Fabric documentation
- Questions include current dates and references to official documentation

### 2. Question Sources
- **Primary**: Live Microsoft Learn content via MCP integration
- **Fallback**: Reduced set of 5 static questions per exam (down from 15)
- **Total**: Typically 9-12 questions per exam (6-9 MCP + 5 static)

### 3. How to Identify MCP Questions

**Dynamic (MCP) Questions:**
- Question IDs: `dp600-mcp-semantic-1722528000000` (contain timestamp)
- Tags: `['mcp-generated', 'microsoft-learn', 'live-content', 'updated-8/1/2025']`
- References: Live Microsoft Learn URLs
- Content: Includes current dates and "According to latest Microsoft documentation"

**Static (Fallback) Questions:**
- Question IDs: `dp600-static-001` 
- Tags: `['static-fallback', ...]`
- Content: Fixed reference questions

## What You'll See

### Console Messages
```
✅ Real MCP Microsoft Learn integration is available
🌐 Fetching questions from Microsoft Learn MCP for DP-600
🔍 Searching Microsoft Learn: "Microsoft Fabric DP-600 certification..."
📚 Found 3 relevant Microsoft Learn documents
🎯 Generating dynamic questions from 3 Microsoft Learn documents
✅ Generated 3 questions from: Microsoft Fabric Analytics Engineer - Study Guide DP-600
✅ Generated 3 questions from: Semantic Models in Microsoft Fabric
✅ Generated 3 questions from: Microsoft Fabric Lakehouse Overview
✅ Generated 14 total questions (9 from Microsoft Learn MCP + 5 comprehensive base)
```

### Example MCP Question
```
Question ID: dp600-mcp-semantic-1722528000000
Category: Implement and manage semantic models
Question: "According to the latest Microsoft Fabric documentation (8/1/2025), 
          which storage mode provides the best balance of performance and 
          real-time data access?"
Tags: ['mcp-generated', 'microsoft-learn', 'live-content', 'updated-8/1/2025']
Reference: https://learn.microsoft.com/en-us/fabric/data-warehouse/semantic-models
```

## Testing Instructions

### 1. Run Locally
```bash
npm run dev
```

### 2. Open Browser Console (F12)
- Watch for MCP integration messages
- Look for question generation logs

### 3. Navigate to Exam
- Click DP-600 or DP-700
- Check console for dynamic content generation

### 4. Start Practice Exam
- Look for questions with timestamps in IDs
- Check question content for current dates
- Verify tags include 'mcp-generated'

## Benefits

1. **Always Current**: Questions based on latest Microsoft documentation
2. **Authoritative**: Direct from official Microsoft Learn content
3. **Dynamic**: Questions change as documentation updates
4. **Comprehensive**: Combines live content with curated static questions
5. **Real-world Relevant**: Based on actual certification requirements

## Deployment

The changes are automatically deployed to your Azure Static Web App at:
https://gentle-smoke-099a5850f.2.azurestaticapps.net

You should now see MCP-generated questions both locally and in production!