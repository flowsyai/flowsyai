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
  Download,
  Mail,
  Users,
  TrendingUp,
  Calendar,
  RefreshCw,
  Search,
  Filter,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { waitlistService, WaitlistEmail, WaitlistStats } from '@/services/waitlistService';
import { toast } from '@/hooks/use-toast';

const WaitlistAdmin: React.FC = () => {
  const [emails, setEmails] = useState<WaitlistEmail[]>([]);
  const [stats, setStats] = useState<WaitlistStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'unsubscribed' | 'bounced'>(
    'all'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 50;

  useEffect(() => {
    loadData();
  }, [currentPage, loadData]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Load stats
      const statsResult = await waitlistService.getStats();
      if (statsResult.success && statsResult.data) {
        setStats(statsResult.data);
      }

      // Load emails
      const emailsResult = await waitlistService.getAllEmails(
        itemsPerPage,
        (currentPage - 1) * itemsPerPage
      );
      if (emailsResult.success && emailsResult.data) {
        setEmails(emailsResult.data);
        setTotalCount(emailsResult.count || 0);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load waitlist data.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const result = await waitlistService.exportEmails();
      if (result.success && result.csv) {
        // Create and download CSV file
        const blob = new Blob([result.csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `waitlist-emails-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast({
          title: 'Export successful',
          description: 'Waitlist emails have been exported to CSV.',
        });
      } else {
        throw new Error(result.message || 'Export failed');
      }
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'Failed to export waitlist emails.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || email.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    description?: string;
  }> = ({ title, value, icon, color, description }) => (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-6 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{value.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
      </div>
      {description && <div className="text-xs text-muted-foreground mt-2">{description}</div>}
    </MotionDiv>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-gold/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="border-b border-border/50 relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-2xl font-bold">Waitlist Administration</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={loadData} variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={handleExport}
                disabled={isExporting || !stats?.active_emails}
                className="bg-gradient-to-r from-primary to-gold text-white"
              >
                <Download className={`w-4 h-4 mr-2 ${isExporting ? 'animate-pulse' : ''}`} />
                {isExporting ? 'Exporting...' : 'Export CSV'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Signups"
              value={stats.total_emails}
              icon={<Users className="w-6 h-6 text-white" />}
              color="bg-blue-500"
              description="All time signups"
            />
            <StatCard
              title="Active Emails"
              value={stats.active_emails}
              icon={<Mail className="w-6 h-6 text-white" />}
              color="bg-green-500"
              description="Ready for notifications"
            />
            <StatCard
              title="Today's Signups"
              value={stats.signups_today}
              icon={<TrendingUp className="w-6 h-6 text-white" />}
              color="bg-gold"
              description="New signups today"
            />
            <StatCard
              title="This Month"
              value={stats.signups_this_month}
              icon={<Calendar className="w-6 h-6 text-white" />}
              color="bg-purple-500"
              description="Monthly growth"
            />
          </div>
        )}

        {/* Filters and Search */}
        <div className="premium-card p-6 rounded-2xl mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={e =>
                    setStatusFilter(e.target.value as 'all' | 'active' | 'unsubscribed' | 'bounced')
                  }
                  className="px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="unsubscribed">Unsubscribed</option>
                  <option value="bounced">Bounced</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {filteredEmails.length} of {totalCount} emails
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="premium-card rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Loading waitlist data...</p>
            </div>
          ) : filteredEmails.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No emails found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Email</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Signup Date</th>
                    <th className="text-left p-4 font-semibold">UTM Source</th>
                    <th className="text-left p-4 font-semibold">UTM Campaign</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmails.map((email, index) => (
                    <MotionTr
                      key={email.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-border/50 hover:bg-muted/30"
                    >
                      <td className="p-4 font-medium">{email.email}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            email.status === 'active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : email.status === 'unsubscribed'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {email.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(email.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-muted-foreground">{email.utm_source || '-'}</td>
                      <td className="p-4 text-muted-foreground">{email.utm_campaign || '-'}</td>
                    </MotionTr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistAdmin;
