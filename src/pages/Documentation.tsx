import { useState, useEffect } from 'react';
// Removed useNavigate as navigation will be internal to the page for now
// import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  BookOpen,
  Code,
  Search,
  ArrowRight,
  Rocket,
  Lightbulb,
  Star,
  Sparkles,
  HelpCircle,
  Wrench,
  Home, // For an overview/home section
  Users, // For Community
  PlayCircle, // For Interactive Demo/Featured Content
  FileText, // For Release Notes / What's New
  Briefcase, // For Use Cases / Case Studies
  ListChecks, // For Best Practices
  Terminal, // For SDKs
  ShieldCheck, // For Authentication (API)
  Network, // For Endpoints (API)
  AlertTriangle, // For Rate Limits & Errors (API)
  BookCopy, // For Glossary
  Settings2, // For Account Management
  Database, // For Data Flow & Management
  GitCommit, // For Versioning
  LayoutDashboard, // For Canvas Overview (Workflow Studio)
  PlusCircle, // For Adding & Connecting Agents (Workflow Studio)
  Settings, // For Configuring Nodes (Workflow Studio)
  Bug, // For Debugging Workflows (Workflow Studio)
  UploadCloud, // For Import/Export Workflows (Workflow Studio)
  Library, // For Agent Library
  Puzzle, // For Creating Custom Agents
  Copy, // For Using Pre-built Templates
  Share2, // For Creating & Sharing Templates
  Activity, // For Monitoring & Logging
  Users2, // For User Management & Permissions
  Plug, // For Integrations
  Cpu, // Added
  SlidersHorizontal, // Added
  GitFork, // Added
} from 'lucide-react';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  MotionAside,
} from '@/lib/motion-wrapper';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// IDs should be unique and will be used to render content
const sidebarNavItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'quick-start', label: 'Quick Start', icon: Rocket },
  { id: 'core-concepts', label: 'Core Concepts', icon: Lightbulb },
  { id: 'features', label: 'Features', icon: Star },
  { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
  { id: 'api-reference', label: 'API Reference', icon: Code },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: Wrench },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'whats-new', label: "What's New", icon: Sparkles },
  { id: 'glossary', label: 'Glossary', icon: BookCopy },
];

interface KeySectionCardProps {
  id: string; // Corresponds to section ID for content rendering
  icon: React.ElementType;
  title: string;
  description: string;
  ariaLabel: string;
}

// These cards will also set the activeSection to show detailed content
const keySectionItems: KeySectionCardProps[] = [
  {
    id: 'quick-start',
    icon: Rocket,
    title: 'Quick Start Guide',
    description: 'Get up and running with AI Workflow Studio in minutes.',
    ariaLabel: 'Navigate to Quick Start Guide',
  },
  {
    id: 'core-concepts',
    icon: Lightbulb,
    title: 'Core Concepts',
    description: 'Understand the fundamental principles of AI Workflow Studio.',
    ariaLabel: 'Navigate to Core Concepts',
  },
  {
    id: 'features',
    icon: Star,
    title: 'Main Features',
    description: 'Explore the key functionalities and capabilities.',
    ariaLabel: 'Navigate to Main Features',
  },
  {
    id: 'api-reference',
    icon: Code,
    title: 'API Reference',
    description: 'Detailed documentation for integrating with our API.',
    ariaLabel: 'Navigate to API Reference',
  },
  {
    id: 'tutorials',
    icon: BookOpen,
    title: 'Tutorials',
    description: 'Practical, step-by-step guides for common use cases.',
    ariaLabel: 'Navigate to Tutorials',
  },
  {
    id: 'troubleshooting',
    icon: Wrench,
    title: 'Troubleshooting',
    description: 'Find solutions to common issues and problems.',
    ariaLabel: 'Navigate to Troubleshooting',
  },
  {
    id: 'faq',
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Answers to frequently asked questions.',
    ariaLabel: 'Navigate to FAQ',
  },
  {
    id: 'whats-new',
    icon: Sparkles,
    title: "What's New",
    description: 'Check out the latest updates, features, and release notes.',
    ariaLabel: "Navigate to What's New section",
  },
];

// --- Content Components ---
// These will hold the detailed documentation for each section.

const SectionWrapper: React.FC<{
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}> = ({ title, icon: Icon, children }) => (
  <MotionDiv
    key={title} // Ensure re-render on content change
    className="prose prose-slate dark:prose-invert max-w-none lg:prose-lg xl:prose-xl"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <header className="mb-8 border-b pb-4">
      <h2 className="text-3xl font-bold text-foreground flex items-center">
        {Icon && <Icon className="mr-3 h-7 w-7 text-primary" />}
        {title}
      </h2>
    </header>
    {children}
  </MotionDiv>
);

const SubSection: React.FC<{
  title: string;
  icon?: React.ElementType;
  id?: string;
  children: React.ReactNode;
}> = ({ title, icon: Icon, id, children }) => (
  <section className="mb-10" id={id}>
    <h3 className="text-2xl font-semibold mb-4 text-foreground flex items-center">
      {Icon && <Icon className="mr-2 h-6 w-6 text-primary/80" />}
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </section>
);

const CodeBlock: React.FC<{ language?: string; children: string }> = ({
  language = 'bash',
  children,
}) => (
  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
    <code className={`language-${language}`}>{children.trim()}</code>
  </pre>
);

const OverviewContent = () => (
  <>
    {/* Hero Section (already part of the main layout, shown when activeSection is 'overview') */}
    {/* Key Sections Overview (already part of the main layout, shown when activeSection is 'overview') */}
    {/* Optional Interactive Element / Featured Content */}
    <MotionSection
      className="my-12 md:my-16 p-6 bg-card border rounded-lg"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center">
        <PlayCircle className="mr-3 h-6 w-6 text-primary" />
        Featured Content / Interactive Demo
      </h2>
      <p className="text-muted-foreground mb-4">
        Explore an interactive demo of the AI Workflow Studio or check out our most popular
        articles. (Placeholder for interactive element or featured content links)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Interactive Workflow Builder Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Experience the power of our visual workflow builder firsthand.
            </p>
            <Button variant="outline">
              Launch Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">
              Most Popular Article: Automating Content Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Learn how to build a workflow for automated content creation.
            </p>
            <Button variant="outline">
              Read Article <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </MotionSection>

    {/* Optional Community & Support Links */}
    <MotionSection
      className="my-12 md:my-16 p-6 bg-card border rounded-lg"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center">
        <Users className="mr-3 h-6 w-6 text-primary" />
        Community & Support
      </h2>
      <p className="text-muted-foreground mb-4">
        Join our community, ask questions, and get support from our team and other users.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button variant="secondary">
          Community Forum <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="secondary">
          Support Channel <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="secondary">
          GitHub Repository <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </MotionSection>
  </>
);

const QuickStartGuideContent = () => (
  <SectionWrapper title="Quick Start Guide" icon={Rocket}>
    <p>
      This guide will walk you through the initial setup and help you create your first AI workflow
      with AI Workflow Studio.
    </p>

    <SubSection title="Introduction to AI Workflow Studio" icon={Lightbulb}>
      <p>
        AI Workflow Studio is a powerful platform designed to streamline the creation, management,
        and deployment of AI-driven automated workflows. Whether you're a developer, data scientist,
        or business analyst, AI Workflow Studio empowers you to build sophisticated automations with
        ease.
      </p>
      <p>Key benefits include:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Visual workflow builder for intuitive design.</li>
        <li>Rich library of pre-built AI agents and integrations.</li>
        <li>Scalable and reliable execution of workflows.</li>
        <li>Comprehensive monitoring and logging capabilities.</li>
      </ul>
    </SubSection>

    <SubSection title="Installation & Setup" icon={Settings}>
      <p>Follow these steps to get AI Workflow Studio set up in your environment.</p>
      <p>
        <strong>Prerequisites:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Node.js version X.Y.Z or higher.</li>
        <li>Access to a compatible database (e.g., PostgreSQL, MySQL).</li>
        <li>(Any other specific prerequisites)</li>
      </ul>
      <p>
        <strong>Installation Steps:</strong>
      </p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          Clone the repository:{' '}
          <CodeBlock>git clone https://github.com/your-repo/ai-workflow-studio.git</CodeBlock>
        </li>
        <li>
          Navigate to the project directory: <CodeBlock>cd ai-workflow-studio</CodeBlock>
        </li>
        <li>
          Install dependencies: <CodeBlock>npm install</CodeBlock>
        </li>
        <li>
          Configure your environment variables (create a `.env` file from `.env.example`). Key
          variables include:
          <CodeBlock language="plaintext">
            DATABASE_URL=your_database_connection_string API_KEY_SECRET=your_secret_for_api_keys
          </CodeBlock>
        </li>
        <li>
          Run database migrations: <CodeBlock>npm run migrate</CodeBlock>
        </li>
        <li>
          Start the application: <CodeBlock>npm start</CodeBlock>
        </li>
      </ol>
      <p>
        After starting, you should be able to access AI Workflow Studio at `http://localhost:3000`
        (or your configured port).
      </p>
    </SubSection>

    <SubSection title="Your First Workflow (Quick Start)" icon={PlayCircle}>
      <p>
        Let's create a simple workflow that takes text input, translates it, and then logs the
        translated text.
      </p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Navigate to the "Workflow Studio" from the main dashboard.</li>
        <li>Click "Create New Workflow". Give it a name like "My First Translation Workflow".</li>
        <li>
          From the Agent Palette, drag a "Text Input" agent onto the canvas. Configure it to accept
          a sample text (e.g., "Hello, world!").
        </li>
        <li>
          Drag a "Translation Agent" (e.g., Google Translate Agent) onto the canvas. Connect the
          output of the "Text Input" agent to the input of the "Translation Agent". Configure the
          target language (e.g., Spanish).
        </li>
        <li>
          Drag a "Log Output" agent onto the canvas. Connect the output of the "Translation Agent"
          to the input of the "Log Output" agent.
        </li>
        <li>Save your workflow.</li>
        <li>
          Click "Run Workflow". You should see the execution steps and the logged translated text in
          the output panel.
        </li>
      </ol>
      <p>Congratulations! You've built and run your first workflow.</p>
    </SubSection>

    <SubSection title="Account Management" icon={Settings2}>
      <p>
        Details on managing your user account, profile settings, API keys, and billing information
        (if applicable).
      </p>
      <p>
        <em>(Placeholder for detailed account management information)</em>
      </p>
    </SubSection>
  </SectionWrapper>
);

const CoreConceptsContent = () => (
  <SectionWrapper title="Core Concepts" icon={Lightbulb}>
    <p>Understanding these core concepts is essential for effectively using AI Workflow Studio.</p>
    <SubSection title="Workflows (Definition, Lifecycle)" icon={GitCommit}>
      <p>
        A workflow is a sequence of automated tasks orchestrated by AI Workflow Studio. It defines
        the flow of data and operations performed by various agents.
      </p>
      <p>
        <strong>Lifecycle:</strong> Design, Test, Deploy, Monitor, Version.
      </p>
      <p>
        <em>
          (Placeholder for more details on workflow definition, components, and lifecycle
          management)
        </em>
      </p>
    </SubSection>
    <SubSection title="Agents (Types, Configuration, Customization)" icon={Cpu}>
      <p>
        Agents are the building blocks of workflows. Each agent performs a specific task, such as
        data processing, calling an API, or interacting with an AI model.
      </p>
      <p>
        <strong>Types:</strong> Input Agents, Processing Agents, Output Agents, AI Model Agents,
        Integration Agents.
      </p>
      <p>
        <strong>Configuration:</strong> Each agent has specific parameters that can be configured in
        the Workflow Studio.
      </p>
      <p>
        <strong>Customization:</strong> (If applicable) Information on developing custom agents.
      </p>
      <p>
        <em>
          (Placeholder for detailed descriptions of agent types, configuration options, and
          customization guides)
        </em>
      </p>
    </SubSection>
    <SubSection title="Triggers & Actions" icon={PlayCircle}>
      <p>
        Triggers initiate workflows (e.g., API call, schedule, webhook). Actions are operations
        performed by agents within a workflow.
      </p>
      <p>
        <em>
          (Placeholder for details on different trigger types and how actions are defined and
          executed)
        </em>
      </p>
    </SubSection>
    <SubSection title="Data Flow & Management" icon={Database}>
      <p>
        How data is passed between agents, transformed, and managed within a workflow. Understanding
        data schemas and mapping.
      </p>
      <p>
        <em>
          (Placeholder for data flow diagrams, examples of data transformation, and best practices
          for data management)
        </em>
      </p>
    </SubSection>
    <SubSection title="Variables & Parameters" icon={SlidersHorizontal}>
      <p>
        Using variables for dynamic data within workflows and parameters for configuring workflow
        behavior at runtime.
      </p>
      <p>
        <em>
          (Placeholder for examples of using variables and parameters, scope, and best practices)
        </em>
      </p>
    </SubSection>
    <SubSection title="Versioning" icon={GitCommit}>
      <p>
        How AI Workflow Studio handles versioning of workflows, allowing you to track changes,
        revert to previous versions, and manage different deployed versions.
      </p>
      <p>
        <em>(Placeholder for details on workflow versioning strategies and UI)</em>
      </p>
    </SubSection>
  </SectionWrapper>
);

const FeaturesContent = () => (
  <SectionWrapper title="Features" icon={Star}>
    <p>Explore the rich set of features offered by AI Workflow Studio.</p>

    <SubSection
      title="Workflow Studio (Visual Builder)"
      icon={LayoutDashboard}
      id="feature-workflow-studio"
    >
      <p>
        The heart of AI Workflow Studio, our intuitive drag-and-drop visual builder for designing,
        testing, and managing your AI workflows.
      </p>
      <SubSection title="Canvas Overview" icon={LayoutDashboard}>
        <p>
          Understanding the main interface, panels (Agent Palette, Configuration Panel, Output
          Panel), and navigation within the Workflow Studio.
        </p>
        <p>
          <em>(Placeholder for screenshots and detailed descriptions of each UI element)</em>
        </p>
      </SubSection>
      <SubSection title="Adding & Connecting Agents" icon={PlusCircle}>
        <p>
          How to add agents from the palette to the canvas and connect them to define the data flow.
        </p>
        <p>
          <em>(Placeholder for step-by-step guide with GIFs or short videos)</em>
        </p>
      </SubSection>
      <SubSection title="Configuring Nodes (Agents)" icon={Settings}>
        <p>
          Detailed explanation of how to configure the parameters for different types of agents.
        </p>
        <p>
          <em>(Placeholder for examples of configuring common agents)</em>
        </p>
      </SubSection>
      <SubSection title="Debugging Workflows" icon={Bug}>
        <p>
          Tools and techniques for debugging workflows, including inspecting data at each step,
          viewing logs, and handling errors.
        </p>
        <p>
          <em>(Placeholder for debugging tips and walkthroughs)</em>
        </p>
      </SubSection>
      <SubSection title="Import/Export Workflows" icon={UploadCloud}>
        <p>
          How to import and export workflow definitions (e.g., in JSON or YAML format) for sharing,
          backup, or version control.
        </p>
        <p>
          <em>(Placeholder for format specifications and import/export procedures)</em>
        </p>
      </SubSection>
    </SubSection>

    <SubSection title="AI Agents" icon={Cpu} id="feature-ai-agents">
      <p>Leverage a wide array of pre-built and custom AI agents.</p>
      <SubSection title="Agent Library" icon={Library}>
        <p>
          A categorized list of all available built-in agents, their functions, inputs, and outputs.
          (e.g., Text Processing, Image Analysis, Language Translation, LLM Interaction, Data
          Connectors).
        </p>
        <p>
          <em>
            (Placeholder for a comprehensive, searchable list of agents with links to individual
            agent documentation)
          </em>
        </p>
      </SubSection>
      <SubSection title="Using Specific Agents" icon={Cpu}>
        <p>
          Detailed guides for popular or complex agents, including configuration examples and use
          cases.
        </p>
        <p>
          <em>(Placeholder for links to individual agent guides)</em>
        </p>
      </SubSection>
      <SubSection title="Creating Custom Agents" icon={Puzzle}>
        <p>
          (If applicable) SDKs and developer guides for creating and integrating your own custom
          agents into AI Workflow Studio.
        </p>
        <p>
          <em>(Placeholder for custom agent development documentation)</em>
        </p>
      </SubSection>
    </SubSection>

    <SubSection title="Templates" icon={Copy} id="feature-templates">
      <p>Accelerate your workflow development with pre-built and custom templates.</p>
      <SubSection title="Using Pre-built Templates" icon={Copy}>
        <p>
          Browse and use a library of templates for common use cases (e.g., sentiment analysis,
          automated reporting, chatbot backend).
        </p>
        <p>
          <em>(Placeholder for template library and usage instructions)</em>
        </p>
      </SubSection>
      <SubSection title="Creating & Sharing Templates" icon={Share2}>
        <p>
          How to save your own workflows as templates and share them with your team or the
          community.
        </p>
        <p>
          <em>(Placeholder for template creation and sharing guide)</em>
        </p>
      </SubSection>
    </SubSection>

    <SubSection title="Monitoring & Logging" icon={Activity} id="feature-monitoring">
      <p>Comprehensive tools for monitoring workflow execution, performance, and logs.</p>
      <p>
        <em>(Placeholder for details on dashboards, log viewers, alert systems)</em>
      </p>
    </SubSection>

    <SubSection title="User Management & Permissions" icon={Users2} id="feature-user-management">
      <p>
        (If applicable) Managing users, roles, and permissions within AI Workflow Studio for team
        collaboration and security.
      </p>
      <p>
        <em>(Placeholder for user management documentation)</em>
      </p>
    </SubSection>

    <SubSection title="Integrations" icon={Plug} id="feature-integrations">
      <p>
        Details on connecting AI Workflow Studio with other services, platforms, and data sources
        (e.g., CRMs, databases, cloud storage, messaging platforms).
      </p>
      <p>
        <em>(Placeholder for a list of supported integrations and configuration guides)</em>
      </p>
    </SubSection>
  </SectionWrapper>
);

const TutorialsContent = () => (
  <SectionWrapper title="Tutorials & Guides" icon={BookOpen}>
    <p>
      Practical, step-by-step tutorials to help you master AI Workflow Studio and build powerful
      automations.
    </p>
    <SubSection title="Building an Automated Content Generation Workflow" icon={FileText}>
      <p>
        Learn how to create a workflow that takes a topic, generates an article outline using an
        LLM, expands each section, and formats the output.
      </p>
      <p>
        <strong>Steps:</strong>
      </p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>Define input (topic).</li>
        <li>Use an LLM agent to generate an outline.</li>
        <li>Loop through outline sections, using an LLM agent to expand each.</li>
        <li>Format the combined content.</li>
        <li>Output the final article.</li>
      </ol>
      <p>
        <em>(Placeholder for detailed steps, agent configurations, and example outputs)</em>
      </p>
      <p>
        <strong>Code Example (Conceptual API usage for a step):</strong>
      </p>
      <CodeBlock language="javascript">
        {`
// Example: Calling an LLM agent via API (conceptual)
async function generateSectionContent(topic, sectionTitle) {
  const response = await aiWorkflowStudioClient.runAgent('llm-text-generation', {
    prompt: \`Write a detailed paragraph about "\${sectionTitle}" for an article on "\${topic}".\`,
    maxTokens: 200
  });
  return response.output.text;
}
`}
      </CodeBlock>
    </SubSection>
    <SubSection title="Advanced Workflow Patterns" icon={GitFork}>
      <p>
        Explore advanced patterns like parallel processing, conditional logic, error handling, and
        looping within workflows.
      </p>
      <p>
        <em>(Placeholder for examples and explanations of advanced patterns)</em>
      </p>
    </SubSection>
    <SubSection title="Optimizing Workflow Performance" icon={Rocket}>
      <p>
        Tips and techniques for designing efficient workflows, minimizing latency, and managing
        resource consumption.
      </p>
      <p>
        <em>(Placeholder for performance optimization guide)</em>
      </p>
    </SubSection>
    <SubSection title="Best Practices" icon={ListChecks}>
      <p>
        Recommended best practices for workflow design, agent configuration, security, and
        maintenance.
      </p>
      <p>
        <em>(Placeholder for a comprehensive list of best practices)</em>
      </p>
    </SubSection>
    <SubSection title="Case Study: Customer Support Ticket Automation" icon={Briefcase}>
      <p>
        How "AI Workflow Studio" was used to automate the categorization, prioritization, and
        initial response for customer support tickets, reducing response times by X%.
      </p>
      <p>
        <strong>Challenge:</strong> High volume of support tickets, slow manual processing.
      </p>
      <p>
        <strong>Solution Workflow:</strong>
      </p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>Trigger: New ticket from helpdesk API.</li>
        <li>Agent: Sentiment Analysis (to gauge urgency).</li>
        <li>Agent: Keyword Extraction & Categorization (to identify issue type).</li>
        <li>Agent: LLM for drafting initial response or suggesting knowledge base articles.</li>
        <li>Agent: Update helpdesk ticket with category, priority, and suggested response.</li>
      </ol>
      <p>
        <strong>Results:</strong> Improved efficiency, faster responses, better customer
        satisfaction.
      </p>
      <p>
        <em>(Placeholder for more detailed case study content)</em>
      </p>
    </SubSection>
  </SectionWrapper>
);

const ApiReferenceContent = () => (
  <SectionWrapper title="API Reference" icon={Code}>
    <p>
      Comprehensive documentation for the AI Workflow Studio API. Use our API to manage workflows,
      trigger executions, and integrate with your existing systems.
    </p>
    <SubSection title="Authentication" icon={ShieldCheck}>
      <p>
        All API requests must be authenticated using API keys. You can generate and manage your API
        keys from the Account Settings page.
      </p>
      <p>Include the API key in the `Authorization` header as a Bearer token:</p>
      <CodeBlock language="http">{`Authorization: Bearer YOUR_API_KEY`}</CodeBlock>
      <p>
        <em>(Placeholder for more details on API key generation, security best practices)</em>
      </p>
    </SubSection>
    <SubSection title="Endpoints" icon={Network}>
      <p>
        Our API is organized around REST principles. All endpoints are relative to
        `https://api.aiworkflow.studio/v1`.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Workflows</h4>
      <p>Manage workflow definitions and executions.</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>`GET /workflows`: List all workflows.</li>
        <li>
          `POST /workflows`: Create a new workflow.
          <CodeBlock language="json">
            {`// Request Body Example
{
  "name": "My New Workflow",
  "definition": { /* ... workflow JSON structure ... */ }
}`}
          </CodeBlock>
        </li>
        <li>{`GET /workflows/{workflowId}`}: Get a specific workflow.</li>
        <li>{`PUT /workflows/{workflowId}`}: Update a workflow.</li>
        <li>{`DELETE /workflows/{workflowId}`}: Delete a workflow.</li>
        <li>
          {`POST /workflows/{workflowId}/run`}: Trigger a workflow execution.
          <CodeBlock language="json">
            {`// Request Body Example (for workflows with input agents)
{
  "inputs": {
    "inputAgentId1": { "data": "some value" }
  }
}`}
          </CodeBlock>
          <CodeBlock language="json">
            {`// Response Example (for async execution)
{
  "executionId": "exec_12345",
  "status": "PENDING"
}`}
          </CodeBlock>
        </li>
        <li>
          {`GET /workflows/{workflowId}/executions/{executionId}`}: Get workflow execution status.
        </li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-2">Agents</h4>
      <p>Retrieve information about available agents.</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>`GET /agents`: List available agent types and their schemas.</li>
      </ul>
      <p>
        <em>
          (Placeholder for more endpoints, detailed request/response schemas, and examples for each
          endpoint)
        </em>
      </p>
    </SubSection>
    <SubSection title="SDKs" icon={Terminal}>
      <p>
        (If available) Links to language-specific SDKs (e.g., Python, Node.js) with installation and
        usage guides.
      </p>
      <p>
        <strong>Example (Conceptual Python SDK usage):</strong>
      </p>
      <CodeBlock language="python">
        {`
from ai_workflow_studio_sdk import AIWorkflowStudioClient

client = AIWorkflowStudioClient(api_key="YOUR_API_KEY")

# List workflows
workflows = client.list_workflows()
for wf in workflows:
    print(wf.name)

# Run a workflow
execution = client.run_workflow(
    workflow_id="wf_abc123",
    inputs={"input_data": "Hello from Python SDK"}
)
print(f"Execution ID: {execution.id}, Status: {execution.status}")
`}
      </CodeBlock>
      <p>
        <em>(Placeholder for links to SDK repositories and detailed SDK documentation)</em>
      </p>
    </SubSection>
    <SubSection title="Rate Limits & Errors" icon={AlertTriangle}>
      <p>
        Information on API rate limits (e.g., 100 requests per minute per API key) and common error
        codes with explanations.
      </p>
      <p>
        <strong>Common Error Codes:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>`400 Bad Request`: Invalid request payload or parameters.</li>
        <li>`401 Unauthorized`: Missing or invalid API key.</li>
        <li>`403 Forbidden`: API key does not have permission for the requested action.</li>
        <li>`404 Not Found`: Requested resource does not exist.</li>
        <li>`429 Too Many Requests`: Rate limit exceeded.</li>
        <li>`500 Internal Server Error`: An unexpected error occurred on our server.</li>
      </ul>
      <p>
        <em>(Placeholder for detailed rate limit policies and comprehensive error code list)</em>
      </p>
    </SubSection>
  </SectionWrapper>
);

const TroubleshootingContent = () => (
  <SectionWrapper title="Troubleshooting" icon={Wrench}>
    <p>Find solutions to common issues and learn debugging tips for AI Workflow Studio.</p>
    <SubSection title="Common Issues & Solutions" icon={Bug}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="issue-1">
          <AccordionTrigger>
            Workflow execution fails with "Agent Configuration Error".
          </AccordionTrigger>
          <AccordionContent>
            This usually means one or more agents in your workflow have incorrect or missing
            parameters. Double-check the configuration panel for each agent in the Workflow Studio.
            Ensure all required fields are filled and data types match. Look at the detailed error
            message in the execution logs for clues about which agent and parameter is problematic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="issue-2">
          <AccordionTrigger>API calls return 401 Unauthorized.</AccordionTrigger>
          <AccordionContent>
            Ensure your API key is correctly included in the `Authorization: Bearer YOUR_API_KEY`
            header. Verify that the API key is active and has not expired. You can manage API keys
            in your Account Settings. If you recently generated the key, ensure there are no
            leading/trailing spaces.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="issue-3">
          <AccordionTrigger>Custom agent not appearing in the Agent Palette.</AccordionTrigger>
          <AccordionContent>
            (If custom agents are supported) Ensure your custom agent's definition file is correctly
            placed in the designated directory and follows the required schema. Restart the AI
            Workflow Studio application if you recently added or modified agent definition files.
            Check the application startup logs for any errors related to loading custom agents.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="mt-4">
        <em>(Placeholder for more common issues and solutions)</em>
      </p>
    </SubSection>
    <SubSection title="Error Code Explanations" icon={AlertTriangle}>
      <p>
        A more detailed list of specific error codes encountered within the application or workflow
        executions, beyond standard API HTTP errors.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          `ERR_AGENT_TIMEOUT`: An agent took too long to execute. Consider optimizing the agent or
          increasing timeout settings.
        </li>
        <li>
          `ERR_DATA_TRANSFORMATION_FAILED`: Data mapping between agents failed. Check data schemas
          and transformation logic.
        </li>
      </ul>
      <p>
        <em>(Placeholder for a comprehensive list of internal error codes)</em>
      </p>
    </SubSection>
    <SubSection title="Debugging Tips" icon={Lightbulb}>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Utilize the "Log Output" agent at various points in your workflow to inspect intermediate
          data.
        </li>
        <li>Test complex workflows incrementally, agent by agent.</li>
        <li>Simplify inputs to isolate problems.</li>
        <li>Check the detailed execution logs in the Workflow Studio or via the API.</li>
      </ul>
      <p>
        <em>(Placeholder for more debugging tips and best practices)</em>
      </p>
    </SubSection>
  </SectionWrapper>
);

const FaqContent = () => (
  <SectionWrapper title="Frequently Asked Questions" icon={HelpCircle}>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="faq-1">
        <AccordionTrigger>What is AI Workflow Studio?</AccordionTrigger>
        <AccordionContent>
          AI Workflow Studio is a platform for designing, building, and managing automated workflows
          powered by AI. It allows you to connect various AI agents and services to automate complex
          tasks.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>Who is AI Workflow Studio for?</AccordionTrigger>
        <AccordionContent>
          It's designed for developers, data scientists, and business analysts who want to leverage
          AI for automation without extensive custom coding for each integration.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>Can I create custom AI agents?</AccordionTrigger>
        <AccordionContent>
          Yes (if applicable, refer to the "Creating Custom Agents" section under Features for
          details on the SDK and development process). If not, this answer would be "Currently,
          custom agent development is planned for a future release. You can use our extensive
          library of pre-built agents."
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-4">
        <AccordionTrigger>How is data security handled?</AccordionTrigger>
        <AccordionContent>
          We take data security seriously. All data in transit is encrypted using TLS. Data at rest
          is encrypted using AES-256. Access controls and API key management help secure your
          workflows and data. (Add more specific details as appropriate for the product).
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-5">
        <AccordionTrigger>What are the pricing plans?</AccordionTrigger>
        <AccordionContent>
          Please visit our{' '}
          <a href="/pricing" className="text-primary hover:underline">
            Pricing Page
          </a>{' '}
          for detailed information on available subscription plans and features.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <p className="mt-4">
      <em>(Placeholder for more FAQs, categorized if necessary)</em>
    </p>
  </SectionWrapper>
);

const WhatsNewContent = () => (
  <SectionWrapper title="What's New / Release Notes" icon={Sparkles}>
    <p>
      Stay up-to-date with the latest features, improvements, and bug fixes in AI Workflow Studio.
    </p>
    <SubSection title="Version 1.2.0 (Released: 2025-05-15)" icon={FileText}>
      <h4 className="text-lg font-semibold">New Features:</h4>
      <ul className="list-disc pl-6 space-y-1">
        <li>Added a new "Advanced Data Transformation" agent.</li>
        <li>Introduced workflow templates for e-commerce automation.</li>
      </ul>
      <h4 className="text-lg font-semibold mt-2">Improvements:</h4>
      <ul className="list-disc pl-6 space-y-1">
        <li>Improved performance of the Workflow Studio canvas.</li>
        <li>Enhanced error reporting in API responses.</li>
      </ul>
      <h4 className="text-lg font-semibold mt-2">Bug Fixes:</h4>
      <ul className="list-disc pl-6 space-y-1">
        <li>Fixed an issue with scheduled triggers not firing correctly in certain timezones.</li>
      </ul>
    </SubSection>
    <SubSection title="Version 1.1.0 (Released: 2025-04-20)" icon={FileText}>
      <p>
        <em>(Placeholder for previous release notes)</em>
      </p>
    </SubSection>
    <p>
      <em>(Placeholder for more release notes, in chronological order)</em>
    </p>
  </SectionWrapper>
);

const GlossaryContent = () => (
  <SectionWrapper title="Glossary" icon={BookCopy}>
    <p>Definitions of key terms used throughout the AI Workflow Studio documentation.</p>
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold">Agent</h4>
        <p className="text-muted-foreground">
          A modular component within a workflow that performs a specific task (e.g., data input, AI
          processing, API call).
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Workflow</h4>
        <p className="text-muted-foreground">
          A defined sequence of connected agents that automate a process or task.
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Canvas</h4>
        <p className="text-muted-foreground">
          The visual workspace in the Workflow Studio where users design workflows by arranging and
          connecting agents.
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Trigger</h4>
        <p className="text-muted-foreground">
          An event or condition that initiates the execution of a workflow (e.g., an API call, a
          schedule, a webhook).
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Parameter</h4>
        <p className="text-muted-foreground">
          A configurable setting for an agent or a workflow that defines its behavior.
        </p>
      </div>
    </div>
    <p className="mt-4">
      <em>(Placeholder for more glossary terms)</em>
    </p>
  </SectionWrapper>
);

// --- Main Documentation Component ---
const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState(sidebarNavItems[0]?.id || 'overview');

  const handleContentNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to top of main content area when section changes
    const mainContentElement = document.getElementById('main-doc-content');
    if (mainContentElement) {
      mainContentElement.scrollTop = 0;
    }
  };

  // Effect to set initial active section, could be from URL in a more complex setup
  useEffect(() => {
    // For now, defaults to 'overview' or first sidebar item
    // In a real app, you might parse window.location.hash or path here
  }, []);

  const renderActiveSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewContent />;
      case 'quick-start':
        return <QuickStartGuideContent />;
      case 'core-concepts':
        return <CoreConceptsContent />;
      case 'features':
        return <FeaturesContent />;
      case 'tutorials':
        return <TutorialsContent />;
      case 'api-reference':
        return <ApiReferenceContent />;
      case 'troubleshooting':
        return <TroubleshootingContent />;
      case 'faq':
        return <FaqContent />;
      case 'whats-new':
        return <WhatsNewContent />;
      case 'glossary':
        return <GlossaryContent />;
      default:
        // Fallback to overview if section ID is unknown
        // Or, could show a "Section not found" message
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <MotionDiv
        className="container mx-auto px-4 py-8 md:py-12 flex-1 max-w-screen-xl"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <MotionAside
            className="lg:w-64 xl:w-72 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 bg-card p-4 md:p-6 rounded-lg shadow-sm border">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3 text-primary px-2">
                  Documentation Sections
                </h2>
                <nav>
                  <ul className="space-y-1">
                    {sidebarNavItems.map(item => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleContentNavigation(item.id)}
                          aria-current={activeSection === item.id ? 'page' : undefined}
                          className={`w-full flex items-center gap-2.5 text-sm px-3 py-2 rounded-md transition-colors duration-150 ease-in-out group
                                      hover:bg-muted
                                      ${
                                        activeSection === item.id
                                          ? 'bg-primary text-primary-foreground font-medium'
                                          : 'text-muted-foreground hover:text-primary'
                                      }`}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </MotionAside>

          {/* Main Content */}
          <main
            id="main-doc-content"
            className="flex-1 min-w-0 overflow-y-auto max-h-[calc(100vh-10rem)]"
          >
            {activeSection === 'overview' && (
              <>
                {/* Hero Section */}
                <MotionSection
                  className="mb-12 md:mb-16 text-center"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-foreground">
                    Master <span className="text-primary">AI Workflow Studio</span>
                  </h1>
                  <p className="text-md sm:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
                    Your comprehensive guide to creating and managing AI-powered automation
                    workflows.
                  </p>
                  <div className="relative max-w-lg mx-auto mb-6 md:mb-8">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 pointer-events-none" />
                    <Input
                      type="search"
                      placeholder="Search documentation..."
                      className="pl-10 pr-4 py-2.5 text-base bg-background border-border rounded-md w-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      aria-label="Search documentation"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                    <Button
                      size="lg"
                      onClick={() => handleContentNavigation('quick-start')}
                      className="w-full sm:w-auto"
                    >
                      Quick Start Guide
                      <Rocket className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleContentNavigation('api-reference')}
                      className="w-full sm:w-auto"
                    >
                      View API Docs
                      <Code className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </MotionSection>

                {/* Key Sections Overview */}
                <MotionSection
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-12 md:mb-16" // Added margin bottom
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {keySectionItems.map(cardItem => (
                      <MotionDiv
                        key={cardItem.id}
                        variants={itemVariants}
                        onClick={() => handleContentNavigation(cardItem.id)}
                        className="group"
                        role="button"
                        tabIndex={0}
                        onKeyPress={e => {
                          if (e.key === 'Enter' || e.key === ' ')
                            handleContentNavigation(cardItem.id);
                        }}
                        aria-label={cardItem.ariaLabel}
                      >
                        <Card className="h-full bg-card border border-border-muted group-hover:border-primary group-focus-visible:border-primary transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3 mb-1">
                              <cardItem.icon className="h-6 w-6 text-primary flex-shrink-0" />
                              <CardTitle className="text-lg font-semibold">
                                {cardItem.title}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="text-sm text-muted-foreground pb-4">
                            <p>{cardItem.description}</p>
                          </CardContent>
                          <CardContent className="pt-0 pb-4">
                            <span className="text-primary text-sm font-medium group-hover:underline">
                              Learn more{' '}
                              <ArrowRight className="ml-1 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
                            </span>
                          </CardContent>
                        </Card>
                      </MotionDiv>
                    ))}
                  </div>
                </MotionSection>
              </>
            )}

            {/* Render detailed section content */}
            {renderActiveSectionContent()}
          </main>
        </div>
      </MotionDiv>
    </div>
  );
};

export default Documentation;
