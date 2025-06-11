import React, { useState, useEffect, useCallback } from 'react';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
} from '@/lib/motion-wrapper';

import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  RefreshCw,
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
  Search,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { SecurityAssessment, SecurityAudit } from '@/services/enterpriseSecurity';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const SecurityDashboard: React.FC = () => {
  const { user } = useAuth();
  const [securityData, setSecurityData] = useState<{
    overallSecurityScore: number;
    riskLevel: string;
    vulnerabilities: Record<string, number>;
    compliance: Record<string, { status: string; score: number }>;
    recentAssessments: SecurityAssessment[];
    securityTrends: {
      scoreHistory: number[];
      vulnerabilityTrends: { resolved: number; new: number; inProgress: number };
    };
  } | null>(null);
  const [auditLog, setAuditLog] = useState<SecurityAudit[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<SecurityAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  // Helper function to get workflow name from ID
  const getWorkflowName = (workflowId: string): string => {
    const workflowNames: Record<string, string> = {
      '1': 'Customer Support Bot',
      '2': 'Data Processing Pipeline',
      '3': 'Email Automation',
      '4': 'Content Generator',
    };
    return workflowNames[workflowId] || `Workflow ${workflowId}`;
  };

  const loadSecurityData = async () => {
    setIsLoading(true);
    try {
      // Simulate loading security data
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockData = {
        overallSecurityScore: 78,
        riskLevel: 'medium',
        vulnerabilities: {
          critical: 2,
          high: 5,
          medium: 12,
          low: 8,
        },
        compliance: {
          GDPR: { status: 'partial', score: 75 },
          SOC2: { status: 'compliant', score: 95 },
          HIPAA: { status: 'non_compliant', score: 45 },
          ISO27001: { status: 'partial', score: 68 },
        },
        recentAssessments: [
          {
            workflowId: '1',
            assessmentDate: '2024-01-15T10:30:00Z',
            overallRisk: 'medium' as const,
            score: 72,
            vulnerabilities: [
              {
                id: 'vuln-1',
                type: 'data_exposure' as const,
                severity: 'high' as const,
                title: 'Unencrypted API Keys',
                description: 'API keys stored in plain text',
                impact: 'High risk of data exposure',
                remediation: 'Encrypt all API keys using AES-256',
              },
            ],
            complianceStatus: {
              GDPR: {
                name: 'GDPR' as const,
                requirements: ['Data protection'],
                status: 'partial' as const,
              },
              SOC2: {
                name: 'SOC2' as const,
                requirements: ['Security controls'],
                status: 'compliant' as const,
              },
            },
            recommendations: [
              {
                id: 'rec-1',
                title: 'Implement API Key Encryption',
                description: 'Encrypt all API keys using industry-standard encryption',
                priority: 'high' as const,
                effort: 'medium' as const,
                implementation: {
                  steps: ['Install encryption library', 'Update key storage', 'Test encryption'],
                  estimatedTime: '2-3 days',
                  requiredPermissions: ['admin'],
                },
              },
            ],
          },
          {
            workflowId: '2',
            assessmentDate: '2024-01-14T15:45:00Z',
            overallRisk: 'high' as const,
            score: 58,
            vulnerabilities: [
              {
                id: 'vuln-2',
                type: 'access_control' as const,
                severity: 'critical' as const,
                title: 'Missing Access Controls',
                description: 'No role-based access restrictions',
                impact: 'Unauthorized access to sensitive data',
                remediation: 'Implement role-based access control',
              },
            ],
            complianceStatus: {
              GDPR: {
                name: 'GDPR' as const,
                requirements: ['Access control'],
                status: 'non_compliant' as const,
              },
              SOC2: {
                name: 'SOC2' as const,
                requirements: ['Access management'],
                status: 'partial' as const,
              },
            },
            recommendations: [
              {
                id: 'rec-2',
                title: 'Implement RBAC',
                description: 'Set up role-based access control system',
                priority: 'critical' as const,
                effort: 'high' as const,
                implementation: {
                  steps: ['Define roles', 'Implement permissions', 'Test access controls'],
                  estimatedTime: '1-2 weeks',
                  requiredPermissions: ['admin', 'security'],
                },
              },
            ],
          },
        ],
        securityTrends: {
          scoreHistory: [65, 68, 72, 75, 78],
          vulnerabilityTrends: {
            resolved: 15,
            new: 8,
            inProgress: 12,
          },
        },
      };

      setSecurityData(mockData);
    } catch (error) {
      toast.error('Failed to load security data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAuditLog = useCallback(async () => {
    try {
      const mockAuditLog: SecurityAudit[] = [
        {
          id: 'audit-1',
          timestamp: '2024-01-15T14:30:00Z',
          userId: user?.id || 'user-1',
          workflowId: 'workflow-1',
          action: 'workflow_execution',
          resource: 'Customer Support Bot',
          result: 'success',
          riskLevel: 'low',
          details: { executionTime: 2.3 },
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0...',
        },
        {
          id: 'audit-2',
          timestamp: '2024-01-15T13:15:00Z',
          userId: user?.id || 'user-1',
          action: 'api_key_access',
          resource: 'OpenAI Connector',
          result: 'blocked',
          riskLevel: 'high',
          details: { reason: 'Unencrypted storage detected' },
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0...',
        },
      ];

      setAuditLog(mockAuditLog);
    } catch (error) {
      toast.error('Failed to load audit log');
    }
  }, [user]);

  useEffect(() => {
    loadSecurityData();
    loadAuditLog();
  }, [loadAuditLog]);

  const handleRunSecurityScan = async () => {
    toast.info('🔍 Running comprehensive security scan...');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await loadSecurityData();
      toast.success('✅ Security scan completed successfully');
    } catch (error) {
      toast.error('❌ Security scan failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600';
      case 'partial':
        return 'text-yellow-600';
      case 'non_compliant':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4" />;
      case 'partial':
        return <AlertTriangle className="w-4 h-4" />;
      case 'non_compliant':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading && !securityData) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                Security Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor security posture, compliance status, and audit activities
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => toast.info('Compliance report generation coming soon')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>

              <Button onClick={handleRunSecurityScan} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Run Security Scan
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                    <p className="text-2xl font-bold">{securityData?.overallSecurityScore}/100</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <Progress value={securityData?.overallSecurityScore} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Critical Vulnerabilities
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {securityData?.vulnerabilities.critical}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">-2 from last week</span>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Compliance Status</p>
                    <p className="text-2xl font-bold">72%</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <FileText className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">+5% improvement</span>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Security Events</p>
                    <p className="text-2xl font-bold">{auditLog.length}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Last 24 hours</p>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vulnerability Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(securityData?.vulnerabilities || {}).map(
                      ([severity, count]) => (
                        <div key={severity} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={getRiskColor(severity)}>{severity}</Badge>
                            <span className="capitalize">{severity}</span>
                          </div>
                          <span className="font-medium">{count as number}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Assessments */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Security Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityData?.recentAssessments.map(assessment => (
                      <div
                        key={assessment.workflowId}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{getWorkflowName(assessment.workflowId)}</p>
                          <p className="text-sm text-muted-foreground">
                            Score: {assessment.score}/100
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getRiskColor(assessment.overallRisk)}>
                            {assessment.overallRisk}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedAssessment(assessment)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(securityData?.compliance || {}).map(
                ([framework, data]: [string, { status: string; score: number }]) => (
                  <Card key={framework}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{framework}</span>
                        <div
                          className={`flex items-center gap-1 ${getComplianceColor(data.status)}`}
                        >
                          {getComplianceIcon(data.status)}
                          <span className="capitalize">{data.status.replace('_', ' ')}</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Compliance Score</span>
                            <span className="font-medium">{data.score}%</span>
                          </div>
                          <Progress value={data.score} className="h-2" />
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            {/* Audit Log Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search audit events..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Audit Log Table */}
            <Card>
              <CardHeader>
                <CardTitle>Security Audit Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLog.map(event => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Badge className={getRiskColor(event.riskLevel)}>{event.riskLevel}</Badge>
                        <div>
                          <p className="font-medium">{event.action.replace('_', ' ')}</p>
                          <p className="text-sm text-muted-foreground">{event.resource}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.result}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Assessment Details Modal */}
        <Dialog open={!!selectedAssessment} onOpenChange={() => setSelectedAssessment(null)}>
          <DialogContent className="max-w-2xl">
            {selectedAssessment && (
              <div className="space-y-6">
                <DialogHeader>
                  <DialogTitle>
                    {getWorkflowName(selectedAssessment.workflowId)} - Security Assessment
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Risk</p>
                      <Badge className={getRiskColor(selectedAssessment.overallRisk)}>
                        {selectedAssessment.overallRisk}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Security Score</p>
                      <p className="font-medium">{selectedAssessment.score}/100</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Vulnerabilities Found</h3>
                    <div className="space-y-2">
                      {selectedAssessment.vulnerabilities.map(vuln => (
                        <div key={vuln.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{vuln.title}</h4>
                            <Badge className={getRiskColor(vuln.severity)}>{vuln.severity}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{vuln.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SecurityDashboard;
