import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PremiumLogo from '@/components/ui/PremiumLogo';
import { Sparkles, Star, Menu } from 'lucide-react';

const UITest: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">UI Component Test</h1>

        {/* Logo Test */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Logo Test</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <PremiumLogo size="sm" showText={false} />
            <PremiumLogo size="md" showText={true} />
            <PremiumLogo size="lg" showText={true} />
          </div>
        </div>

        {/* Button Test */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Button Test</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Button variant="default">
              <Sparkles className="w-4 h-4 mr-2" />
              Default Button
            </Button>
            <Button variant="outline">
              <Star className="w-4 h-4 mr-2" />
              Outline Button
            </Button>
            <Button variant="ghost">
              <Menu className="w-4 h-4 mr-2" />
              Ghost Button
            </Button>
          </div>
        </div>

        {/* Badge Test */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Badge Test</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Badge variant="default">Default Badge</Badge>
            <Badge variant="secondary">Secondary Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
          </div>
        </div>

        {/* Navigation Test */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Navigation Test</h2>
          <div className="p-4 border rounded-lg bg-card">
            <p className="text-muted-foreground">
              If you can see this page, the React application is mounting correctly. Check the top
              of the page for the navigation bar with the FlowsyAI logo.
            </p>
          </div>
        </div>

        {/* Color Test */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Color Test</h2>
          <div className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
            <div className="h-16 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm">
              Primary
            </div>
            <div className="h-16 bg-secondary rounded flex items-center justify-center text-secondary-foreground text-sm">
              Secondary
            </div>
            <div className="h-16 bg-accent rounded flex items-center justify-center text-accent-foreground text-sm">
              Accent
            </div>
            <div className="h-16 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
              Muted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UITest;
