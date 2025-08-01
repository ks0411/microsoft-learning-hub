import { Question } from '../types';
import { mcpIntegration } from './mcpIntegration';

// MCP Microsoft Docs service for dynamic question fetching
export class MCPQuestionService {
  private useMockData = false; // Now using real MCP Microsoft Learn integration!

  async fetchQuestionsByExam(examId: string): Promise<Question[]> {
    // Always try real MCP Microsoft Learn integration first
    if (mcpIntegration.isConnectionAvailable()) {
      try {
        console.log(`🌐 Fetching questions from Microsoft Learn MCP for ${examId}`);
        return await this.fetchQuestionsFromMCPDocs(examId);
      } catch (error) {
        console.warn('⚠️ MCP integration failed, falling back to comprehensive mock data:', error);
        return this.getMockQuestions(examId);
      }
    }

    // Fallback to comprehensive mock data
    console.log(`📚 Loading comprehensive question bank for ${examId}`);
    return this.getMockQuestions(examId);
  }

  private async fetchQuestionsFromMCPDocs(examId: string): Promise<Question[]> {
    try {
      // Generate specific search query for the exam with current date context
      const currentDate = new Date().toLocaleDateString();
      const searchQuery = examId === 'DP-600' 
        ? `Microsoft Fabric DP-600 certification exam analytics engineer semantic models lakehouse data preparation storage modes DAX calculations Power BI ${currentDate}`
        : `Microsoft Fabric DP-700 certification exam data engineer Apache Spark Delta Lake real-time analytics KQL streaming data pipelines Event Streams ${currentDate}`;

      console.log(`🔍 Searching Microsoft Learn: "${searchQuery}"`);
      
      // Use real MCP Microsoft Learn search
      const docs = await mcpIntegration.searchMicrosoftDocs(searchQuery);
      
      if (docs && docs.length > 0) {
        console.log(`📚 Found ${docs.length} relevant Microsoft Learn documents`);
        
        // Generate questions from live Microsoft Learn content
        const mcpQuestions = await mcpIntegration.generateQuestionsFromDocs(examId, docs);
        
        // Combine with a subset of existing questions for comprehensive coverage
        const mockQuestions = this.getMockQuestions(examId).slice(0, 5); // Reduced to 5 static questions
        const combinedQuestions = [...mcpQuestions, ...mockQuestions];
        
        console.log(`✅ Generated ${combinedQuestions.length} total questions (${mcpQuestions.length} from Microsoft Learn MCP + ${mockQuestions.length} comprehensive base)`);
        return combinedQuestions;
      } else {
        console.warn('⚠️ No Microsoft Learn docs found, using comprehensive mock data');
        return this.getMockQuestions(examId);
      }
    } catch (error) {
      console.error('Error in Microsoft Learn MCP integration:', error);
      throw error;
    }
  }

  async fetchQuestionsBySegment(examId: string, segment: string): Promise<Question[]> {
    try {
      // Get questions and filter by segment
      const allQuestions = await this.fetchQuestionsByExam(examId);
      const filteredQuestions = allQuestions.filter((q: Question) => 
        q.category.includes(segment) || q.subcategory.includes(segment)
      );
      
      console.log(`🎯 Found ${filteredQuestions.length} questions for segment: ${segment}`);
      return filteredQuestions;
    } catch (error) {
      console.error('Error fetching segment questions:', error);
      return this.getMockQuestionsBySegment(examId, segment);
    }
  }

  private getMockQuestions(examId: string): Question[] {
    // Fallback questions for development/fallback
    if (examId === 'DP-600') {
      return this.getDP600MockQuestions();
    } else if (examId === 'DP-700') {
      return this.getDP700MockQuestions();
    }
    return [];
  }

  private getMockQuestionsBySegment(examId: string, segment: string): Question[] {
    const allQuestions = this.getMockQuestions(examId);
    return allQuestions.filter(q => q.category === segment);
  }

  private getDP600MockQuestions(): Question[] {
    return [
      {
        id: 'dp600-static-001',
        examId: 'DP-600',
        category: 'Plan, implement, and manage a solution for data analytics',
        subcategory: 'Design a data analytics solution',
        difficulty: 'easy',
        type: 'single-choice',
        question: 'Which Microsoft Fabric workspace license is required for collaboration features?',
        options: [
          { id: 'a', text: 'Free workspace', isCorrect: false },
          { id: 'b', text: 'Pro workspace', isCorrect: true },
          { id: 'c', text: 'Personal workspace', isCorrect: false },
          { id: 'd', text: 'Basic workspace', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Pro workspaces in Microsoft Fabric provide collaboration features, allowing multiple users to work together on analytics projects.',
        reference: 'https://learn.microsoft.com/en-us/fabric/get-started/workspaces',
        tags: ['static-fallback', 'workspace', 'licensing', 'collaboration']
      },
      {
        id: 'dp600-static-002',
        examId: 'DP-600',
        category: 'Prepare and serve data',
        subcategory: 'Data ingestion',
        difficulty: 'medium',
        type: 'multiple-choice',
        question: 'Which of the following are valid data sources for Microsoft Fabric Data Factory? (Select all that apply)',
        options: [
          { id: 'a', text: 'Azure SQL Database', isCorrect: true },
          { id: 'b', text: 'SharePoint Online', isCorrect: true },
          { id: 'c', text: 'SAP HANA', isCorrect: true },
          { id: 'd', text: 'Local file system only', isCorrect: false }
        ],
        correctAnswers: ['a', 'b', 'c'],
        explanation: 'Microsoft Fabric Data Factory supports numerous data sources including Azure SQL Database, SharePoint Online, and SAP HANA. Local file system is not the only option.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-factory/connector-overview',
        tags: ['static-fallback', 'data-sources', 'ingestion', 'data-factory']
      },
      {
        id: 'dp600-static-003',
        examId: 'DP-600',
        category: 'Implement and manage semantic models',
        subcategory: 'Design and build semantic models',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'What is the primary purpose of a Microsoft Fabric lakehouse?',
        options: [
          { id: 'a', text: 'Store only structured data in tables', isCorrect: false },
          { id: 'b', text: 'Combine data lake and data warehouse capabilities', isCorrect: true },
          { id: 'c', text: 'Process real-time streaming data only', isCorrect: false },
          { id: 'd', text: 'Create Power BI reports exclusively', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'A Microsoft Fabric lakehouse combines the flexibility of a data lake with the analytical power of a data warehouse, allowing both structured and unstructured data storage.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-overview',
        tags: ['static-fallback', 'lakehouse', 'architecture', 'data-lake', 'data-warehouse']
      },
      {
        id: 'dp600-static-004',
        examId: 'DP-600',
        category: 'Prepare and serve data',
        subcategory: 'Transform data',
        difficulty: 'hard',
        type: 'single-choice',
        question: 'Which tool in Microsoft Fabric provides a code-free experience for data transformation using Power Query?',
        options: [
          { id: 'a', text: 'Notebooks', isCorrect: false },
          { id: 'b', text: 'Data Factory', isCorrect: false },
          { id: 'c', text: 'Dataflow Gen2', isCorrect: true },
          { id: 'd', text: 'Spark Job Definition', isCorrect: false }
        ],
        correctAnswers: ['c'],
        explanation: 'Dataflow Gen2 provides a code-free data transformation experience using Power Query, making it accessible to business analysts and data engineers.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-factory/dataflows-gen2-overview',
        tags: ['static-fallback', 'dataflow', 'transformation', 'power-query', 'code-free']
      },
      {
        id: 'dp600-static-005',
        examId: 'DP-600',
        category: 'Implement and manage semantic models',
        subcategory: 'Design and build semantic models',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'In a Microsoft Fabric semantic model, what is the difference between Import and DirectQuery storage modes?',
        options: [
          { id: 'a', text: 'Import loads data into memory, DirectQuery queries the source in real-time', isCorrect: true },
          { id: 'b', text: 'Import is for small datasets, DirectQuery is for large datasets only', isCorrect: false },
          { id: 'c', text: 'Import requires Pro license, DirectQuery works with free license', isCorrect: false },
          { id: 'd', text: 'Import and DirectQuery are the same storage mode', isCorrect: false }
        ],
        correctAnswers: ['a'],
        explanation: 'Import mode loads data into memory for fast queries, while DirectQuery sends queries directly to the source system for real-time data.',
        reference: 'https://learn.microsoft.com/en-us/fabric/get-started/semantic-models',
        tags: ['static-fallback', 'semantic-model', 'import', 'directquery', 'storage-mode']
      }
    ];
  }

  private getDP700MockQuestions(): Question[] {
    return [
      {
        id: 'dp700-static-001',
        examId: 'DP-700',
        category: 'Plan and implement data engineering solutions',
        subcategory: 'Design data storage solutions',
        difficulty: 'easy',
        type: 'single-choice',
        question: 'What file format is optimized for analytics workloads in a Microsoft Fabric lakehouse?',
        options: [
          { id: 'a', text: 'CSV', isCorrect: false },
          { id: 'b', text: 'JSON', isCorrect: false },
          { id: 'c', text: 'Parquet', isCorrect: true },
          { id: 'd', text: 'XML', isCorrect: false }
        ],
        correctAnswers: ['c'],
        explanation: 'Parquet is a columnar storage format optimized for analytics workloads, providing better compression and query performance in lakehouse scenarios.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-file-format',
        tags: ['static-fallback', 'file-formats', 'lakehouse', 'storage']
      },
      {
        id: 'dp700-static-002',
        examId: 'DP-700',
        category: 'Implement and manage data ingestion and processing',
        subcategory: 'Data pipelines',
        difficulty: 'hard',
        type: 'case-study',
        question: 'Your organization needs to process 10TB of daily sales data from multiple sources. The data must be available for real-time analytics within 15 minutes of generation. Which combination of Microsoft Fabric services would you recommend?',
        options: [
          { id: 'a', text: 'Data Factory + Lakehouse + Power BI', isCorrect: false },
          { id: 'b', text: 'Event Streams + KQL Database + Real-Time Dashboard', isCorrect: true },
          { id: 'c', text: 'Notebooks + Warehouse + Semantic Models', isCorrect: false },
          { id: 'd', text: 'Data Activator + ML Models + Reports', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'For real-time analytics on large volumes of streaming data, Event Streams can ingest data in real-time, KQL Database provides fast analytics, and Real-Time Dashboard enables immediate visualization.',
        reference: 'https://learn.microsoft.com/en-us/fabric/real-time-analytics/',
        tags: ['static-fallback', 'real-time', 'streaming', 'kql', 'event-streams']
      },
      {
        id: 'dp700-static-003',
        examId: 'DP-700',
        category: 'Transform data',
        subcategory: 'Implement data transformation logic',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'Which Apache Spark API is recommended for large-scale data transformations in Microsoft Fabric?',
        options: [
          { id: 'a', text: 'RDD (Resilient Distributed Dataset)', isCorrect: false },
          { id: 'b', text: 'DataFrame API', isCorrect: true },
          { id: 'c', text: 'Spark SQL only', isCorrect: false },
          { id: 'd', text: 'Spark Streaming', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'The DataFrame API provides the best balance of performance and ease of use for data transformations, with automatic optimization through the Catalyst optimizer.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/spark-dataframe-best-practices',
        tags: ['static-fallback', 'spark', 'dataframe', 'transformations', 'optimization']
      },
      {
        id: 'dp700-static-004',
        examId: 'DP-700',
        category: 'Plan and implement data engineering solutions',
        subcategory: 'Plan and implement data architecture',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'What is the primary benefit of using Delta tables in Microsoft Fabric?',
        options: [
          { id: 'a', text: 'Faster data loading only', isCorrect: false },
          { id: 'b', text: 'ACID transactions and versioning', isCorrect: true },
          { id: 'c', text: 'Reduced storage costs only', isCorrect: false },
          { id: 'd', text: 'Better data visualization', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Delta tables provide ACID transactions, versioning, and time travel capabilities, ensuring data reliability and consistency in lakehouse architectures.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/delta-lake-overview',
        tags: ['static-fallback', 'delta-tables', 'acid', 'versioning', 'reliability']
      },
      {
        id: 'dp700-static-005',
        examId: 'DP-700',
        category: 'Implement and manage data ingestion and processing',
        subcategory: 'Implement data ingestion with Data Factory',
        difficulty: 'easy',
        type: 'single-choice',
        question: 'Which Data Factory activity is used to copy data from one location to another?',
        options: [
          { id: 'a', text: 'Lookup activity', isCorrect: false },
          { id: 'b', text: 'Copy activity', isCorrect: true },
          { id: 'c', text: 'Web activity', isCorrect: false },
          { id: 'd', text: 'Stored procedure activity', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'The Copy activity is specifically designed to copy data from source to destination with support for various data stores and formats.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-factory/copy-activity-overview',
        tags: ['static-fallback', 'copy-activity', 'data-factory', 'ingestion', 'data-movement']
      }
    ];
  }
}