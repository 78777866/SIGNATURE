'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/builder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Email Signature
              <span className="text-blue-600 block">Generator</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create professional email signatures in minutes. No login required, 
              completely free, with real-time preview.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => router.push('/test')}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3"
              >
                Test Templates
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Generator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Real-Time Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  See your signature update instantly as you type. No waiting, no refreshing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  No Login Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Start creating immediately. Your data is saved locally and never uploaded.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                  Mobile Friendly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Works perfectly on desktop, tablet, and mobile devices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your Signature?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who trust our generator for their email signatures.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700"
          >
            Start Building Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with Next.js, TypeScript, and TailwindCSS
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Developed by Shan • Phase 1: Client-side only • No login required • Data saved locally
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}