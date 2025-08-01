import { Question } from '../types';
import { mcpIntegration } from './mcpIntegration';

// MCP Microsoft Docs service for dynamic question fetching
export class MCPQuestionService {
  private useMockData = false; // Now using real MCP Microsoft Docs integration!

  async fetchQuestionsByExam(examId: string): Promise<Question[]> {
    // Try real MCP Microsoft Docs integration first
    if (!this.useMockData && mcpIntegration.isConnectionAvailable()) {
      try {
        console.log(`🌐 Fetching questions from MCP Microsoft Docs for ${examId}`);
        return await this.fetchQuestionsFromMCPDocs(examId);
      } catch (error) {
        console.warn('⚠️ MCP Docs integration failed, falling back to comprehensive mock data:', error);
        return this.getMockQuestions(examId);
      }
    }

    // Fallback to comprehensive mock data
    console.log(`📚 Loading comprehensive question bank for ${examId}`);
    return this.getMockQuestions(examId);
  }

  private async fetchQuestionsFromMCPDocs(examId: string): Promise<Question[]> {
    try {
      // Generate specific search query for the exam
      const searchQuery = examId === 'DP-600' 
        ? 'Microsoft Fabric DP-600 certification exam analytics engineer semantic models lakehouse data preparation storage modes DAX'
        : 'Microsoft Fabric DP-700 certification exam data engineer Apache Spark Delta Lake real-time analytics KQL streaming data pipelines';

      console.log(`🔍 Searching Microsoft Docs: ${searchQuery}`);
      
      // Use real MCP Microsoft Docs search
      const docs = await mcpIntegration.searchMicrosoftDocs(searchQuery);
      
      if (docs && docs.length > 0) {
        console.log(`� Found ${docs.length} relevant Microsoft Docs`);
        
        // Generate questions from live Microsoft Docs content
        const mcpQuestions = await mcpIntegration.generateQuestionsFromDocs(examId, docs);
        
        // Combine with existing comprehensive questions for a robust question bank
        const mockQuestions = this.getMockQuestions(examId);
        const combinedQuestions = [...mcpQuestions, ...mockQuestions];
        
        console.log(`✅ Generated ${combinedQuestions.length} total questions (${mcpQuestions.length} from MCP + ${mockQuestions.length} comprehensive base)`);
        return combinedQuestions;
      } else {
        console.warn('⚠️ No Microsoft Docs found, using comprehensive mock data');
        return this.getMockQuestions(examId);
      }
    } catch (error) {
      console.error('Error in MCP Docs integration:', error);
      throw error;
    }
  }

  async fetchQuestionsBySegment(examId: string, segment: string): Promise<Question[]> {
    try {
      // Get questions and filter by segment
      const allQuestions = await this.fetchQuestionsByExam(examId);
      return allQuestions.filter((q: Question) => 
        q.category.includes(segment) || q.subcategory.includes(segment)
      );
    } catch (error) {
      console.error('Error fetching segment questions:', error);
      return this.getMockQuestionsBySegment(examId, segment);
    }
  }

  private getMockQuestions(examId: string): Question[] {
    // Mock questions for development/fallback
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
        id: 'dp600-001',
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
        tags: ['workspace', 'licensing', 'collaboration']
      },
      {
        id: 'dp600-002',
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
        tags: ['data-sources', 'ingestion', 'data-factory']
      },
      {
        id: 'dp600-003',
        examId: 'DP-600',
        category: 'Plan, implement, and manage a solution for data analytics',
        subcategory: 'Design a data analytics solution',
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
        tags: ['lakehouse', 'architecture', 'data-lake', 'data-warehouse']
      },
      {
        id: 'dp600-004',
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
        tags: ['dataflow', 'transformation', 'power-query', 'code-free']
      },
      {
        id: 'dp600-005',
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
        tags: ['semantic-model', 'import', 'directquery', 'storage-mode']
      },
      {
        id: 'dp600-006',
        examId: 'DP-600',
        category: 'Explore and analyze data',
        subcategory: 'Query data by using SQL',
        difficulty: 'easy',
        type: 'single-choice',
        question: 'Which SQL endpoint allows you to query data in a Microsoft Fabric lakehouse?',
        options: [
          { id: 'a', text: 'T-SQL endpoint only', isCorrect: false },
          { id: 'b', text: 'SQL analytics endpoint', isCorrect: true },
          { id: 'c', text: 'Power Query endpoint', isCorrect: false },
          { id: 'd', text: 'REST API endpoint', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'The SQL analytics endpoint in Microsoft Fabric lakehouse provides a SQL interface for querying data using T-SQL syntax.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-sql-analytics-endpoint',
        tags: ['sql-endpoint', 'lakehouse', 't-sql', 'analytics']
      },
      {
        id: 'dp600-007',
        examId: 'DP-600',
        category: 'Implement and manage semantic models',
        subcategory: 'Create calculations in semantic models',
        difficulty: 'hard',
        type: 'single-choice',
        question: 'What is the primary difference between a calculated column and a measure in Power BI semantic models?',
        options: [
          { id: 'a', text: 'Calculated columns use DAX, measures use SQL', isCorrect: false },
          { id: 'b', text: 'Calculated columns are computed row-by-row, measures are computed during query time', isCorrect: true },
          { id: 'c', text: 'Calculated columns are faster than measures', isCorrect: false },
          { id: 'd', text: 'There is no difference between them', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Calculated columns are computed and stored for each row during data refresh, while measures are computed dynamically during query execution based on filter context.',
        reference: 'https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-calculated-columns',
        tags: ['calculated-column', 'measure', 'dax', 'semantic-model']
      },
      {
        id: 'dp600-008',
        examId: 'DP-600',
        category: 'Prepare and serve data',
        subcategory: 'Implement a data cleansing solution',
        difficulty: 'medium',
        type: 'multiple-choice',
        question: 'Which data quality features are available in Microsoft Fabric? (Select all that apply)',
        options: [
          { id: 'a', text: 'Data profiling in Dataflow Gen2', isCorrect: true },
          { id: 'b', text: 'Data validation rules', isCorrect: true },
          { id: 'c', text: 'Duplicate detection', isCorrect: true },
          { id: 'd', text: 'Automatic data encryption', isCorrect: false }
        ],
        correctAnswers: ['a', 'b', 'c'],
        explanation: 'Microsoft Fabric provides data profiling, validation rules, and duplicate detection for data quality. Encryption is a security feature, not a data quality feature.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-factory/data-quality-overview',
        tags: ['data-quality', 'profiling', 'validation', 'duplicate-detection']
      },
      {
        id: 'dp600-009',
        examId: 'DP-600',
        category: 'Explore and analyze data',
        subcategory: 'Create reports and dashboards',
        difficulty: 'easy',
        type: 'single-choice',
        question: 'In Microsoft Fabric, where can you create Power BI reports?',
        options: [
          { id: 'a', text: 'Only in Power BI Desktop', isCorrect: false },
          { id: 'b', text: 'Only in Power BI Service', isCorrect: false },
          { id: 'c', text: 'In both Power BI Desktop and Fabric workspace', isCorrect: true },
          { id: 'd', text: 'Only in Fabric notebooks', isCorrect: false }
        ],
        correctAnswers: ['c'],
        explanation: 'You can create Power BI reports in both Power BI Desktop and directly in a Microsoft Fabric workspace using the integrated report authoring experience.',
        reference: 'https://learn.microsoft.com/en-us/fabric/get-started/create-reports',
        tags: ['power-bi', 'reports', 'fabric-workspace', 'authoring']
      },
      {
        id: 'dp600-010',
        examId: 'DP-600',
        category: 'Plan, implement, and manage a solution for data analytics',
        subcategory: 'Optimize performance',
        difficulty: 'hard',
        type: 'single-choice',
        question: 'Which feature helps optimize query performance in Microsoft Fabric semantic models?',
        options: [
          { id: 'a', text: 'Aggregations', isCorrect: true },
          { id: 'b', text: 'Data encryption', isCorrect: false },
          { id: 'c', text: 'Row-level security', isCorrect: false },
          { id: 'd', text: 'Data lineage', isCorrect: false }
        ],
        correctAnswers: ['a'],
        explanation: 'Aggregations pre-calculate and store summary data, significantly improving query performance for large datasets by avoiding expensive calculations at query time.',
        reference: 'https://learn.microsoft.com/en-us/power-bi/transform-model/aggregations-tutorial',
        tags: ['aggregations', 'performance', 'optimization', 'semantic-model']
      },
      {
        id: 'dp600-011',
        examId: 'DP-600',
        category: 'Explore and analyze data',
        subcategory: 'Implement advanced analytics',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'Which Microsoft Fabric item is best suited for implementing machine learning models?',
        options: [
          { id: 'a', text: 'Dataflow Gen2', isCorrect: false },
          { id: 'b', text: 'Notebooks', isCorrect: true },
          { id: 'c', text: 'Data Factory', isCorrect: false },
          { id: 'd', text: 'Semantic models', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Notebooks in Microsoft Fabric provide the ideal environment for machine learning with support for Python, R, Scala, and integrated ML libraries.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-science/machine-learning-model',
        tags: ['machine-learning', 'notebooks', 'data-science', 'advanced-analytics']
      },
      {
        id: 'dp600-012',
        examId: 'DP-600',
        category: 'Prepare and serve data',
        subcategory: 'Ingest data into a Fabric analytics solution',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'What is the recommended approach for ingesting large files (>1GB) into Microsoft Fabric?',
        options: [
          { id: 'a', text: 'Upload directly through the web interface', isCorrect: false },
          { id: 'b', text: 'Use Data Factory with staging', isCorrect: true },
          { id: 'c', text: 'Use Power BI dataflow', isCorrect: false },
          { id: 'd', text: 'Email the files to Microsoft', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Data Factory with staging is the recommended approach for large file ingestion, providing better performance, monitoring, and error handling.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-factory/best-practices-copy-activity',
        tags: ['data-ingestion', 'large-files', 'data-factory', 'staging']
      },
      {
        id: 'dp600-013',
        examId: 'DP-600',
        category: 'Implement and manage semantic models',
        subcategory: 'Optimize performance of semantic models',
        difficulty: 'hard',
        type: 'multiple-choice',
        question: 'Which techniques can improve semantic model performance? (Select all that apply)',
        options: [
          { id: 'a', text: 'Remove unused columns and tables', isCorrect: true },
          { id: 'b', text: 'Use appropriate data types', isCorrect: true },
          { id: 'c', text: 'Add more calculated columns', isCorrect: false },
          { id: 'd', text: 'Create proper relationships', isCorrect: true }
        ],
        correctAnswers: ['a', 'b', 'd'],
        explanation: 'Performance is improved by removing unused elements, using efficient data types, and creating proper relationships. Excessive calculated columns can decrease performance.',
        reference: 'https://learn.microsoft.com/en-us/power-bi/guidance/model-optimization',
        tags: ['performance-optimization', 'semantic-model', 'data-types', 'relationships']
      },
      {
        id: 'dp600-014',
        examId: 'DP-600',
        category: 'Plan, implement, and manage a solution for data analytics',
        subcategory: 'Implement and manage a data analytics solution',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'Which Microsoft Fabric feature provides automated data lineage tracking?',
        options: [
          { id: 'a', text: 'Data lineage view', isCorrect: true },
          { id: 'b', text: 'Monitoring hub', isCorrect: false },
          { id: 'c', text: 'Admin portal', isCorrect: false },
          { id: 'd', text: 'Usage metrics', isCorrect: false }
        ],
        correctAnswers: ['a'],
        explanation: 'The data lineage view in Microsoft Fabric automatically tracks and visualizes data flow across different items and workspaces.',
        reference: 'https://learn.microsoft.com/en-us/fabric/governance/lineage',
        tags: ['data-lineage', 'governance', 'tracking', 'visualization']
      },
      {
        id: 'dp600-015',
        examId: 'DP-600',
        category: 'Explore and analyze data',
        subcategory: 'Query data by using SQL',
        difficulty: 'easy',
        type: 'single-choice',
        question: 'Which file formats can be queried directly using SQL in a Microsoft Fabric lakehouse?',
        options: [
          { id: 'a', text: 'Only CSV files', isCorrect: false },
          { id: 'b', text: 'Parquet and Delta tables', isCorrect: true },
          { id: 'c', text: 'Only JSON files', isCorrect: false },
          { id: 'd', text: 'Only Excel files', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Microsoft Fabric lakehouse SQL analytics endpoint can directly query Parquet files and Delta tables using T-SQL syntax.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-sql-analytics-endpoint',
        tags: ['sql-analytics', 'parquet', 'delta-tables', 'file-formats']
      }
    ];
  }

  private getDP700MockQuestions(): Question[] {
    return [
      {
        id: 'dp700-001',
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
        tags: ['file-formats', 'lakehouse', 'storage']
      },
      {
        id: 'dp700-002',
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
        tags: ['real-time', 'streaming', 'kql', 'event-streams']
      },
      {
        id: 'dp700-003',
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
        tags: ['spark', 'dataframe', 'transformations', 'optimization']
      },
      {
        id: 'dp700-004',
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
        tags: ['delta-tables', 'acid', 'versioning', 'reliability']
      },
      {
        id: 'dp700-005',
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
        tags: ['copy-activity', 'data-factory', 'ingestion', 'data-movement']
      },
      {
        id: 'dp700-006',
        examId: 'DP-700',
        category: 'Transform data',
        subcategory: 'Manage the data transformation process',
        difficulty: 'hard',
        type: 'multiple-choice',
        question: 'Which strategies can help optimize Spark job performance in Microsoft Fabric? (Select all that apply)',
        options: [
          { id: 'a', text: 'Partition data appropriately', isCorrect: true },
          { id: 'b', text: 'Cache frequently used DataFrames', isCorrect: true },
          { id: 'c', text: 'Use collect() on large datasets', isCorrect: false },
          { id: 'd', text: 'Tune cluster configuration', isCorrect: true }
        ],
        correctAnswers: ['a', 'b', 'd'],
        explanation: 'Proper partitioning, caching, and cluster tuning improve performance. Using collect() on large datasets should be avoided as it brings all data to the driver.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/spark-performance-optimization',
        tags: ['spark-optimization', 'partitioning', 'caching', 'performance']
      },
      {
        id: 'dp700-007',
        examId: 'DP-700',
        category: 'Plan and implement data engineering solutions',
        subcategory: 'Implement security features',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'Which feature provides column-level security in Microsoft Fabric?',
        options: [
          { id: 'a', text: 'Row-level security (RLS)', isCorrect: false },
          { id: 'b', text: 'Dynamic data masking', isCorrect: true },
          { id: 'c', text: 'Azure Active Directory', isCorrect: false },
          { id: 'd', text: 'Workspace permissions', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Dynamic data masking provides column-level security by masking sensitive data based on user permissions and access policies.',
        reference: 'https://learn.microsoft.com/en-us/fabric/governance/dynamic-data-masking',
        tags: ['security', 'data-masking', 'column-security', 'governance']
      },
      {
        id: 'dp700-008',
        examId: 'DP-700',
        category: 'Implement and manage data ingestion and processing',
        subcategory: 'Process data with Apache Spark',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'What is the recommended approach for handling schema evolution in Delta tables?',
        options: [
          { id: 'a', text: 'Drop and recreate the table', isCorrect: false },
          { id: 'b', text: 'Use schema merging options', isCorrect: true },
          { id: 'c', text: 'Convert to Parquet format', isCorrect: false },
          { id: 'd', text: 'Disable schema validation', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Delta tables support schema evolution through merge options that allow automatic schema updates when new columns are added.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/delta-lake-schema-evolution',
        tags: ['delta-tables', 'schema-evolution', 'data-management', 'versioning']
      },
      {
        id: 'dp700-009',
        examId: 'DP-700',
        category: 'Monitor and optimize data engineering solutions',
        subcategory: 'Monitor data engineering pipelines',
        difficulty: 'easy',
        type: 'single-choice',
        question: 'Where can you monitor the execution status of Data Factory pipelines in Microsoft Fabric?',
        options: [
          { id: 'a', text: 'Azure portal only', isCorrect: false },
          { id: 'b', text: 'Monitoring hub in Fabric workspace', isCorrect: true },
          { id: 'c', text: 'Power BI reports only', isCorrect: false },
          { id: 'd', text: 'Email notifications only', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'The Monitoring hub in Microsoft Fabric workspace provides comprehensive monitoring and tracking for all pipeline executions and activities.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-factory/monitor-data-factory',
        tags: ['monitoring', 'data-factory', 'pipelines', 'tracking']
      },
      {
        id: 'dp700-010',
        examId: 'DP-700',
        category: 'Transform data',
        subcategory: 'Optimize data processing',
        difficulty: 'hard',
        type: 'single-choice',
        question: 'Which technique is most effective for reducing data skew in Spark transformations?',
        options: [
          { id: 'a', text: 'Increase cluster size', isCorrect: false },
          { id: 'b', text: 'Use salting technique', isCorrect: true },
          { id: 'c', text: 'Disable caching', isCorrect: false },
          { id: 'd', text: 'Use more partitions only', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Salting technique adds random prefixes to keys to distribute data more evenly across partitions, reducing data skew and improving performance.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/spark-performance-best-practices',
        tags: ['data-skew', 'salting', 'spark-optimization', 'performance']
      },
      {
        id: 'dp700-011',
        examId: 'DP-700',
        category: 'Plan and implement data engineering solutions',
        subcategory: 'Configure monitoring and auditing',
        difficulty: 'medium',
        type: 'multiple-choice',
        question: 'Which monitoring capabilities are available in Microsoft Fabric? (Select all that apply)',
        options: [
          { id: 'a', text: 'Pipeline execution tracking', isCorrect: true },
          { id: 'b', text: 'Data lineage visualization', isCorrect: true },
          { id: 'c', text: 'Performance metrics', isCorrect: true },
          { id: 'd', text: 'Automatic data correction', isCorrect: false }
        ],
        correctAnswers: ['a', 'b', 'c'],
        explanation: 'Microsoft Fabric provides pipeline tracking, data lineage, and performance metrics. It does not automatically correct data issues.',
        reference: 'https://learn.microsoft.com/en-us/fabric/admin/monitoring-workspace',
        tags: ['monitoring', 'auditing', 'lineage', 'performance-metrics']
      },
      {
        id: 'dp700-012',
        examId: 'DP-700',
        category: 'Implement and manage data ingestion and processing',
        subcategory: 'Implement data ingestion with Fabric Real-Time Intelligence',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'Which query language is used to analyze data in KQL Database?',
        options: [
          { id: 'a', text: 'T-SQL', isCorrect: false },
          { id: 'b', text: 'Kusto Query Language (KQL)', isCorrect: true },
          { id: 'c', text: 'Python', isCorrect: false },
          { id: 'd', text: 'Power Query M', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'KQL Database uses Kusto Query Language (KQL) for querying and analyzing time-series and streaming data.',
        reference: 'https://learn.microsoft.com/en-us/fabric/real-time-analytics/kusto-query-set',
        tags: ['kql', 'kusto-query-language', 'real-time-analytics', 'time-series']
      },
      {
        id: 'dp700-013',
        examId: 'DP-700',
        category: 'Transform data',
        subcategory: 'Implement data transformation logic',
        difficulty: 'easy',
        type: 'single-choice',
        question: 'Which Microsoft Fabric item provides a notebook-based experience for data transformation?',
        options: [
          { id: 'a', text: 'Data Factory', isCorrect: false },
          { id: 'b', text: 'Notebook', isCorrect: true },
          { id: 'c', text: 'Dataflow Gen2', isCorrect: false },
          { id: 'd', text: 'Warehouse', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'Notebooks in Microsoft Fabric provide an interactive development environment for data transformation using Python, Scala, R, and SQL.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook',
        tags: ['notebooks', 'data-transformation', 'interactive', 'multi-language']
      },
      {
        id: 'dp700-014',
        examId: 'DP-700',
        category: 'Monitor and optimize data engineering solutions',
        subcategory: 'Troubleshoot failed pipeline runs',
        difficulty: 'medium',
        type: 'single-choice',
        question: 'What is the first step when troubleshooting a failed Data Factory pipeline?',
        options: [
          { id: 'a', text: 'Restart the entire pipeline', isCorrect: false },
          { id: 'b', text: 'Check the activity error details in monitoring', isCorrect: true },
          { id: 'c', text: 'Delete and recreate the pipeline', isCorrect: false },
          { id: 'd', text: 'Contact Microsoft support', isCorrect: false }
        ],
        correctAnswers: ['b'],
        explanation: 'The monitoring hub provides detailed error information for each activity, which is essential for diagnosing and resolving pipeline failures.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-factory/troubleshoot-pipeline-failures',
        tags: ['troubleshooting', 'pipeline-failures', 'monitoring', 'error-handling']
      },
      {
        id: 'dp700-015',
        examId: 'DP-700',
        category: 'Monitor and optimize data engineering solutions',
        subcategory: 'Optimize pipeline performance',
        difficulty: 'hard',
        type: 'multiple-choice',
        question: 'Which factors should be considered when optimizing Data Factory pipeline performance? (Select all that apply)',
        options: [
          { id: 'a', text: 'Parallel execution of activities', isCorrect: true },
          { id: 'b', text: 'Data compression', isCorrect: true },
          { id: 'c', text: 'Increasing pipeline complexity', isCorrect: false },
          { id: 'd', text: 'Network bandwidth', isCorrect: true }
        ],
        correctAnswers: ['a', 'b', 'd'],
        explanation: 'Pipeline performance can be optimized through parallel execution, data compression, and considering network bandwidth. Increasing complexity generally reduces performance.',
        reference: 'https://learn.microsoft.com/en-us/fabric/data-factory/performance-optimization-guide',
        tags: ['performance-optimization', 'parallel-execution', 'compression', 'network']
      }
    ];
  }
}
