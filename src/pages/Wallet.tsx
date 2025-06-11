import React, { useState } from 'react';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  MotionMain,
} from '@/lib/motion-wrapper';

import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Wallet as WalletIcon,
  CreditCard,
  RefreshCw,
  Download,
  ArrowUpRight,
  Clock,
  Check,
  AlertCircle,
  Coins,
  Send,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_TOKEN } from '@/types/subscription';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

interface TransactionProps {
  id: string;
  date: Date;
  type: 'purchase' | 'usage' | 'refund';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tokenBalance, setTokenBalance] = useState(457);
  const [purchaseAmount, setPurchaseAmount] = useState(100);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'credit-card' | 'crypto' | null
  >(null);
  const navigate = useNavigate();

  const mockTransactions: TransactionProps[] = [
    {
      id: 'txn-1',
      date: new Date(2023, 5, 15),
      type: 'purchase',
      amount: 500,
      description: 'Monthly subscription tokens',
      status: 'completed',
    },
    {
      id: 'txn-2',
      date: new Date(2023, 5, 20),
      type: 'usage',
      amount: -50,
      description: 'Marketing AI usage',
      status: 'completed',
    },
    {
      id: 'txn-3',
      date: new Date(2023, 5, 22),
      type: 'usage',
      amount: -75,
      description: 'Code Assistant usage',
      status: 'completed',
    },
    {
      id: 'txn-4',
      date: new Date(2023, 5, 28),
      type: 'purchase',
      amount: 100,
      description: 'Additional tokens',
      status: 'pending',
    },
    {
      id: 'txn-5',
      date: new Date(2023, 6, 1),
      type: 'refund',
      amount: 25,
      description: 'Partial refund - unused tokens',
      status: 'completed',
    },
  ];

  const handlePurchaseTokens = () => {
    setIsPurchaseModalOpen(true);
  };

  const handleQuickPurchaseTokens = () => {
    // For quick purchase, we can default to a common amount or use the current purchaseAmount
    // For simplicity, let's ensure the purchase tab is active if they click this,
    // or directly open the modal with the current state of purchaseAmount.
    setActiveTab('purchase'); // Switch to purchase tab to see details
    setIsPurchaseModalOpen(true);
  };

  const handleRefreshBalance = () => {
    const newBalance = tokenBalance + Math.floor(Math.random() * 50) - 25; // Simulate some change
    setTokenBalance(Math.max(0, newBalance)); // Ensure balance doesn't go negative
    toast({
      title: 'Balance Refreshed!',
      description: `Your new balance is ${Math.max(0, newBalance)} ${DEFAULT_TOKEN.symbol}. (Simulated)`,
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: 'Report Download Started',
      description: 'Your transaction report is being generated... (Simulated)',
    });
  };

  const handleRenewSubscription = () => {
    navigate('/pricing');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }, // Consistent with Index.tsx
    },
  };

  const pageVariants = {
    // For the main content wrapper
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {' '}
      {/* Removed hero-bg */}
      <MotionMain
        className="flex-1 container mx-auto px-4 py-12 md:py-16 max-w-screen-xl" // Added max-width
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
      >
        <MotionDiv
          variants={itemVariants} // Use itemVariants for initial animation of the header section
          initial="hidden"
          animate="visible"
          className="space-y-6" // Keep space-y-6 for overall layout
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-h1 mb-2">Token Wallet</h1>
              <p className="text-body-lg text-muted-foreground">
                Manage your FlowTokens and view transaction history.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 group"
                onClick={handleRefreshBalance}
              >
                <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
                Refresh Balance
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-card-alt p-1.5 rounded-xl border border-border-alt shadow-md w-full sm:w-auto max-w-lg mx-auto sm:mx-0">
              {['overview', 'transactions', 'purchase'].map(tab => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-body-std data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-lg px-4 py-2.5 transition-all hover:bg-muted/50 data-[state=inactive]:text-muted-foreground"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="space-y-8 mt-8">
              <MotionDiv
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <MotionDiv variants={itemVariants}>
                  <Card className="h-full bg-card-alt border border-border-alt shadow-xl hover-lift hover:border-primary/70 transition-all duration-300">
                    <CardHeader className="pb-3 pt-5 px-5">
                      <CardTitle className="text-h3 flex items-center gap-2">
                        <WalletIcon className="w-6 h-6 text-primary" />
                        Current Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-5">
                      <MotionDiv
                        key={tokenBalance} // Animate on balance change
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="text-center py-4"
                      >
                        <span className="text-6xl font-bold text-primary">{tokenBalance}</span>
                        <p className="text-body-std text-muted-foreground mt-1">
                          {DEFAULT_TOKEN.symbol}
                        </p>
                      </MotionDiv>
                    </CardContent>
                  </Card>
                </MotionDiv>

                <MotionDiv variants={itemVariants}>
                  <Card className="h-full bg-card-alt border border-border-alt shadow-xl hover-lift hover:border-primary/70 transition-all duration-300">
                    <CardHeader className="pb-3 pt-5 px-5">
                      <CardTitle className="text-h3 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-primary" />
                        Monthly Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-5">
                      <div className="space-y-3 pt-2">
                        <div>
                          <div className="flex justify-between text-body-std mb-1">
                            <span className="text-foreground/90">65% of allocation used</span>
                            <span className="font-semibold text-primary">325 / 500</span>
                          </div>
                          <Progress value={65} className="h-2.5 bg-card" />{' '}
                          {/* Removed indicatorClassName */}
                        </div>
                        <div className="pt-2">
                          <p className="text-caption text-muted-foreground">
                            Next renewal in 17 days.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MotionDiv>

                <MotionDiv variants={itemVariants}>
                  <Card className="h-full bg-card-alt border border-border-alt shadow-xl hover-lift hover:border-primary/70 transition-all duration-300">
                    <CardHeader className="pb-3 pt-5 px-5">
                      <CardTitle className="text-h3 flex items-center gap-2">
                        <CreditCard className="w-6 h-6 text-primary" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 px-5 pb-5">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full justify-start group border-border-alt hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
                        onClick={handleQuickPurchaseTokens}
                      >
                        <Plus className="w-5 h-5 mr-3 text-primary/80 group-hover:text-primary" />
                        Purchase Tokens
                        <ArrowRight className="w-5 h-5 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full justify-start group border-border-alt hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
                        onClick={handleDownloadReport}
                      >
                        <Download className="w-5 h-5 mr-3 text-primary/80 group-hover:text-primary" />
                        Download Report
                        <ArrowRight className="w-5 h-5 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full justify-start group border-border-alt hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
                        onClick={handleRenewSubscription}
                      >
                        <RefreshCw className="w-5 h-5 mr-3 text-primary/80 group-hover:text-primary" />
                        Manage Subscription
                        <ArrowRight className="w-5 h-5 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Button>
                    </CardContent>
                  </Card>
                </MotionDiv>
              </MotionDiv>

              <MotionDiv
                variants={itemVariants} // Use itemVariants for initial animation
                initial="hidden"
                animate="visible" // This will apply after containerVariants finishes its delayChildren
              >
                <Card className="bg-card-alt border border-border-alt shadow-xl">
                  <CardHeader className="px-6 py-5">
                    <CardTitle className="text-h3 flex items-center gap-2">
                      <ArrowUpRight className="w-6 h-6 text-primary" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-body-std">
                      Your latest token transactions and usage.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-4">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-3 custom-scrollbar">
                      {mockTransactions.slice(0, 4).map((transaction, idx) => (
                        <MotionDiv
                          key={transaction.id}
                          className="flex items-center justify-between border-b border-border-alt pb-3 last:border-b-0 last:pb-0"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }} // Stagger individual items
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2.5 rounded-full ${
                                transaction.type === 'purchase'
                                  ? 'bg-green-500/10 text-green-400'
                                  : transaction.type === 'usage'
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-blue-500/10 text-blue-400'
                              }`}
                            >
                              {transaction.type === 'purchase' && <Plus className="w-5 h-5" />}
                              {transaction.type === 'usage' && <Send className="w-5 h-5" />}
                              {transaction.type === 'refund' && <RefreshCw className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className="font-medium text-body-std text-foreground/90">
                                {transaction.description}
                              </p>
                              <p className="text-caption text-muted-foreground">
                                {formatDate(transaction.date)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold text-body-std ${
                                transaction.amount > 0 ? 'text-green-400' : 'text-red-400' // Changed usage to red for contrast
                              }`}
                            >
                              {transaction.amount > 0 ? '+' : ''}
                              {transaction.amount} {DEFAULT_TOKEN.symbol}
                            </p>
                            <p className="text-caption flex items-center justify-end capitalize text-muted-foreground">
                              {transaction.status === 'completed' ? (
                                <Check className="w-3.5 h-3.5 text-green-400 mr-1" />
                              ) : transaction.status === 'pending' ? (
                                <Clock className="w-3.5 h-3.5 text-amber-400 mr-1 animate-pulse" />
                              ) : (
                                <AlertCircle className="w-3.5 h-3.5 text-red-400 mr-1" />
                              )}
                              {transaction.status}
                            </p>
                          </div>
                        </MotionDiv>
                      ))}
                    </div>
                  </CardContent>
                  {mockTransactions.length > 4 && (
                    <CardFooter className="justify-center pt-4 border-t border-border-alt">
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary hover:bg-primary/10 group"
                        onClick={() => setActiveTab('transactions')}
                      >
                        View All Transactions
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </MotionDiv>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6 mt-8">
              <MotionDiv variants={itemVariants} initial="hidden" animate="visible">
                <Card className="bg-card-alt border border-border-alt shadow-xl">
                  <CardHeader className="px-6 py-5">
                    <CardTitle className="text-h2">Transaction History</CardTitle>
                    <CardDescription className="text-body-std">
                      Complete history of your FlowToken transactions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border-alt">
                          <TableHead className="text-muted-foreground">Date</TableHead>
                          <TableHead className="text-muted-foreground">Description</TableHead>
                          <TableHead className="text-muted-foreground text-center">Type</TableHead>
                          <TableHead className="text-muted-foreground text-right">Amount</TableHead>
                          <TableHead className="text-muted-foreground text-center">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTransactions.map((transaction, idx) => (
                          <MotionTr
                            key={transaction.id}
                            className="border-border-alt hover:bg-card transition-colors"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.05 * idx }}
                          >
                            <TableCell className="py-3 text-foreground/90">
                              {formatDate(transaction.date)}
                            </TableCell>
                            <TableCell className="py-3 text-foreground/90">
                              {transaction.description}
                            </TableCell>
                            <TableCell className="py-3 text-center">
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                  transaction.type === 'purchase'
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                    : transaction.type === 'usage'
                                      ? 'bg-red-500/10 text-red-400 border border-red-500/30' // Changed usage to red
                                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                }`}
                              >
                                {transaction.type}
                              </span>
                            </TableCell>
                            <TableCell
                              className={`py-3 text-right font-semibold ${
                                transaction.amount > 0 ? 'text-green-400' : 'text-red-400' // Changed usage to red
                              }`}
                            >
                              {transaction.amount > 0 ? '+' : ''}
                              {transaction.amount} {DEFAULT_TOKEN.symbol}
                            </TableCell>
                            <TableCell className="py-3 text-center">
                              <div className="flex items-center justify-center capitalize">
                                {transaction.status === 'completed' ? (
                                  <Check className="w-4 h-4 text-green-400 mr-1.5" />
                                ) : transaction.status === 'pending' ? (
                                  <Clock className="w-4 h-4 text-amber-400 mr-1.5 animate-pulse" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-red-400 mr-1.5" />
                                )}
                                <span className="text-foreground/90">{transaction.status}</span>
                              </div>
                            </TableCell>
                          </MotionTr>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </MotionDiv>
            </TabsContent>

            <TabsContent value="purchase" className="space-y-6 mt-8">
              <MotionDiv variants={itemVariants} initial="hidden" animate="visible">
                <Card className="bg-card-alt border border-border-alt shadow-xl">
                  <CardHeader className="px-6 py-5">
                    <CardTitle className="text-h2 flex items-center gap-2">
                      <Coins className="w-7 h-7 text-primary" />
                      Purchase FlowTokens
                    </CardTitle>
                    <CardDescription className="text-body-std">
                      Add tokens to your wallet to use with AI agents and unlock premium features.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                      <div className="lg:col-span-3 space-y-6">
                        <div>
                          <label
                            htmlFor="tokenAmount"
                            className="text-body-std font-medium mb-2 block text-foreground/90"
                          >
                            Select Amount
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            {[100, 500, 1000, 2500].map(amount => (
                              <Button
                                key={amount}
                                variant={purchaseAmount === amount ? 'default' : 'outline'}
                                className={`w-full py-3 text-base ${purchaseAmount === amount ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border-alt hover:border-primary/70 hover:bg-primary/10'}`}
                                onClick={() => setPurchaseAmount(amount)}
                              >
                                {amount}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="customAmount"
                            className="text-body-std font-medium mb-2 block text-foreground/90"
                          >
                            Or Enter Custom Amount
                          </label>
                          <Input
                            id="customAmount"
                            type="number"
                            value={purchaseAmount}
                            onChange={e => setPurchaseAmount(parseInt(e.target.value) || 0)}
                            placeholder="e.g., 750"
                            className="bg-card border-border-alt focus:border-primary focus:ring-primary py-3 text-base"
                          />
                        </div>
                        <div>
                          <label className="text-body-std font-medium mb-2 block text-foreground/90">
                            Payment Method
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button
                              variant={
                                selectedPaymentMethod === 'credit-card' ? 'default' : 'outline'
                              }
                              className={`w-full py-3 text-base justify-start group ${selectedPaymentMethod === 'credit-card' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border-alt hover:border-primary/70 hover:bg-primary/10'}`}
                              onClick={() => setSelectedPaymentMethod('credit-card')}
                            >
                              <CreditCard className="w-5 h-5 mr-3 text-primary/80 group-hover:text-primary" />
                              Credit Card
                            </Button>
                            <Button
                              variant={selectedPaymentMethod === 'crypto' ? 'default' : 'outline'}
                              className={`w-full py-3 text-base justify-start group ${selectedPaymentMethod === 'crypto' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border-alt hover:border-primary/70 hover:bg-primary/10'}`}
                              onClick={() => setSelectedPaymentMethod('crypto')}
                            >
                              <img
                                src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                                className="w-5 h-5 mr-3 filter group-hover:brightness-110"
                                alt="ETH"
                              />
                              Crypto (ETH)
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-card border-border-alt shadow-md">
                          <CardHeader className="p-5 pb-3">
                            <CardTitle className="text-h3">Order Summary</CardTitle>
                          </CardHeader>
                          <CardContent className="p-5 pt-0">
                            <div className="space-y-3 text-body-std">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tokens to Purchase:</span>
                                <span className="font-semibold text-foreground/90">
                                  {purchaseAmount} {DEFAULT_TOKEN.symbol}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Price per Token:</span>
                                <span className="font-semibold text-foreground/90">$0.10 USD</span>
                              </div>
                              <div className="flex justify-between border-t border-border-alt pt-3 mt-3">
                                <span className="text-lg font-semibold text-foreground">
                                  Total Cost:
                                </span>
                                <span className="text-lg font-bold text-primary">
                                  ${(purchaseAmount * 0.1).toFixed(2)} USD
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div>
                          <Button
                            size="lg"
                            className="w-full group text-base"
                            onClick={handlePurchaseTokens}
                            disabled={!selectedPaymentMethod || purchaseAmount <= 0}
                          >
                            <span>Complete Purchase</span>
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                          <p className="text-xs text-muted-foreground text-center mt-3">
                            By proceeding, you agree to our Terms of Service and Privacy Policy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            </TabsContent>
          </Tabs>
        </MotionDiv>
      </MotionMain>
      <Footer />
      <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Token Purchase</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            You are about to purchase{' '}
            <strong>
              {purchaseAmount} {DEFAULT_TOKEN.symbol}
            </strong>
            .
            <br />
            Total cost: <strong>${(purchaseAmount * 0.1).toFixed(2)}</strong>
            {selectedPaymentMethod && (
              <>
                <br />
                Payment method: {selectedPaymentMethod === 'credit-card' ? 'Credit Card' : 'Crypto'}
              </>
            )}
            <br />
            <br />
            Do you want to proceed with this purchase? (This is a simulation)
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPurchaseModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsPurchaseModalOpen(false);
                setTokenBalance(prev => prev + purchaseAmount);
                toast({
                  title: 'Purchase Successful!',
                  description: `${purchaseAmount} ${DEFAULT_TOKEN.symbol} added to your wallet. New balance: ${tokenBalance + purchaseAmount} (Simulated)`,
                });
              }}
            >
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
