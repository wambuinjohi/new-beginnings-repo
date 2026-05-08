import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/admin/Sidebar';
import { TopBar } from '@/components/admin/TopBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Mail, TrendingUp } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { API_BASE_URL } from '@/lib/utils';

interface DashboardStats {
  total_leads: number;
  qualified_leads: number;
  total_customers: number;
  conversion_rate: number;
  avg_lead_score: number;
  total_campaigns: number;
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    total_leads: 0,
    qualified_leads: 0,
    total_customers: 0,
    conversion_rate: 0,
    avg_lead_score: 0,
    total_campaigns: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        // Get leads count
        const leadsRes = await fetch(`${API_BASE_URL}/leads?limit=1`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const leadsData = await leadsRes.json();
        
        // Get customers count
        const customersRes = await fetch(`${API_BASE_URL}/customers?limit=1`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const customersData = await customersRes.json();
        
        // Get campaigns count
        const campaignsRes = await fetch(`${API_BASE_URL}/campaigns?limit=1`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const campaignsData = await campaignsRes.json();

        setStats({
          total_leads: leadsData.count || 0,
          qualified_leads: Math.floor((leadsData.count || 0) * 0.3), // Rough estimate
          total_customers: customersData.count || 0,
          conversion_rate: leadsData.count ? ((customersData.count || 0) / leadsData.count * 100) : 0,
          avg_lead_score: data.avg_lead_score || 0,
          total_campaigns: campaignsData.count || 0,
        });
      }
    } catch (error) {
      toast.error('Failed to load dashboard stats');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, change }: { title: string; value: string | number; icon: any; change?: string }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-gray-500 mt-1">{change}</p>}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:ml-64">
        <TopBar title="Dashboard" />
        
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Total Leads"
              value={loading ? '...' : stats.total_leads}
              icon={Users}
              change="All time"
            />
            <StatCard
              title="Qualified Leads"
              value={loading ? '...' : stats.qualified_leads}
              icon={TrendingUp}
              change={`${(stats.qualified_leads / (stats.total_leads || 1) * 100).toFixed(1)}% of total`}
            />
            <StatCard
              title="Customers"
              value={loading ? '...' : stats.total_customers}
              icon={UserCheck}
              change={`${stats.conversion_rate.toFixed(1)}% conversion rate`}
            />
            <StatCard
              title="Avg Lead Score"
              value={loading ? '...' : Math.round(stats.avg_lead_score)}
              icon={TrendingUp}
              change="Out of 100"
            />
            <StatCard
              title="Active Campaigns"
              value={loading ? '...' : stats.total_campaigns}
              icon={Mail}
              change="Total sent"
            />
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href="/admin/leads" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                View All Leads
              </a>
              <a href="/admin/campaigns" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                Create Campaign
              </a>
              <a href="/admin/products" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                Manage Products
              </a>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
