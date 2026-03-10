import React, { useState, useEffect } from 'react';
import { analyzeContent } from './services/analytic_services';
import { Platform, AnalysisResult, Violation } from './types';
import { RadialScore } from './components/RadialScore';
import { ViolationItem } from './components/ViolationItem';
import { 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  Send, 
  ChevronRight,
  Info,
  CheckCircle,
  Copy,
  Moon,
  Sun,
  Feather,
  Users,
  MessageSquare,
  ArrowRight,
  Zap
} from 'lucide-react';

// Landingpage
const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex flex-col animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            AI-Powered Content Safety
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            Create Content with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Confidence & Clarity</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-10">
            PatrolAI helps bloggers, social media managers, and netizens detect toxicity, bias, and guideline violations before hitting publish.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start Analyzing <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-overlay filter opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-overlay filter opacity-70 animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* Target Audience / Features */}
      <section className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Designed for Modern Creators</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Whatever your platform, keep your content safe and engaging.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Bloggers */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Feather className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Bloggers & Writers</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Ensure your long-form content remains neutral and professional. Avoid subjective bias that could alienate readers.
              </p>
            </div>

            {/* Card 2: Netizens */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-7 h-7 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Active Netizens</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Drafting a hot take? Check for toxicity score before you tweet. Keep your account safe from reports and bans.
              </p>
            </div>

            {/* Card 3: Moderators */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Smart Suggestions</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Don't just delete; rewrite. Get instant, guideline-compliant alternatives that maintain your original message.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Preview */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} PatrolAI. Making the internet a safer place.</p>
      </footer>
    </div>
  );
};

//Dashboard
const Dashboard: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [platform, setPlatform] = useState<Platform>(Platform.TWITTER);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeViolation, setActiveViolation] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setActiveViolation(null);

    try {
      const data = await analyzeContent(inputText, platform);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderHighlightedText = () => {
    if (!result || !inputText) return <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{inputText || "Enter text to analyze..."}</p>;

    if (activeViolation === null) {
      return <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{inputText}</p>;
    }

    const violation = result.violations[activeViolation];
    if (!violation) return <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{inputText}</p>;

    const parts = inputText.split(violation.quote);
    if (parts.length === 1) return <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{inputText}</p>;

    return (
      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="bg-red-200 dark:bg-red-900/50 text-red-900 dark:text-red-100 px-1 rounded border-b-2 border-red-500 font-medium transition-colors">
                {violation.quote}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      {/* Dashboard Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Content Safety Check</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl transition-colors">
          Analyze your drafts against {platform} community guidelines to detect toxicity and bias before you hit publish.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-full min-h-[500px] transition-colors duration-200">
            
            {/* Toolbar */}
            <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3 flex flex-wrap gap-3 items-center justify-between transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Platform:</span>
                <select 
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1.5 transition-colors"
                >
                  {Object.values(Platform).map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={() => setInputText('')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 transition-colors" title="Clear">
                    <RefreshCw className="w-4 h-4" />
                 </button>
              </div>
            </div>

            {/* Text Area / Highlighter View */}
            <div className="relative flex-grow p-4">
              {result && activeViolation !== null ? (
                 <div 
                    className="w-full h-full p-4 text-base overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors"
                    onClick={() => setActiveViolation(null)} // Click away to edit
                 >
                    {renderHighlightedText()}
                    <p className="mt-4 text-xs text-slate-400 text-center">- Click text to return to editor -</p>
                 </div>
              ) : (
                <textarea
                  className="w-full h-full p-5 text-base rounded-xl transition-all resize-none outline-none
                             text-slate-700 dark:text-slate-200 
                             placeholder-slate-400 dark:placeholder-slate-500
                             bg-slate-50/50 dark:bg-slate-950/30
                             border-2 border-slate-200 dark:border-slate-700
                             focus:bg-white dark:focus:bg-slate-800 
                             focus:border-blue-500 dark:focus:border-blue-400 
                             focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10
                             shadow-sm focus:shadow-md"
                  placeholder="Paste your article, tweet, or caption here to start analyzing..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isAnalyzing}
                />
              )}
            </div>

            {/* Action Bar */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center transition-colors">
               <div className="text-xs text-slate-400">
                  {inputText.length} characters
               </div>
               <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition-all ${
                  isAnalyzing || !inputText 
                    ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
               >
                 {isAnalyzing ? (
                   <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Scanning...
                   </>
                 ) : (
                   <>
                      <Send className="w-4 h-4" />
                      Analyze Content
                   </>
                 )}
               </button>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3 transition-colors">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Analysis Failed</h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Results */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {!result && !isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 transition-colors">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4 transition-colors">
                <ShieldCheck className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">Ready to Patrol</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
                Select your platform and paste content to detect policy violations instantly.
              </p>
            </div>
          )}

          {isAnalyzing && (
             <div className="h-full flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse transition-colors">
                <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <h3 className="text-slate-700 dark:text-slate-300 font-medium">Analyzing patterns...</h3>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Checking against {platform} databases</p>
             </div>
          )}

          {result && !isAnalyzing && (
            <>
              {/* Score Cards */}
              {/* Passing the parent theme context would be cleaner, but we are inside Dashboard which is inside App. 
                  We need to know the theme here. 
                  Solution: Check the html class manually or use context. 
                  Simplest: RadialScore checks dark mode via prop. We need to pass it.
                  Let's assume the Dashboard is mounted. We can check class list or pass props.
                  I will modify Dashboard to accept `isDark` prop from App.
              */}
              {/* Note: I will update Dashboard prop signature below in the main App render */}
               <div className="grid grid-cols-2 gap-4">
                  <RadialScore 
                    score={result.toxicityScore} 
                    label="Toxicity" 
                    color={result.toxicityScore > 50 ? '#ef4444' : '#22c55e'} 
                    isDark={document.documentElement.classList.contains('dark')}
                  />
                  <RadialScore 
                    score={result.biasScore} 
                    label="Bias" 
                    color={result.biasScore > 50 ? '#f97316' : '#3b82f6'} 
                    isDark={document.documentElement.classList.contains('dark')}
                  />
                </div>

              {/* Summary */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" /> Analysis Summary
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {result.overallSummary}
                </p>
              </div>

              {/* Violations */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col max-h-[400px] transition-colors">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center transition-colors">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    Violations Detected
                    <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs py-0.5 px-2 rounded-full">
                      {result.violations.length}
                    </span>
                  </h3>
                </div>
                <div className="overflow-y-auto p-4 flex flex-col gap-3">
                  {result.violations.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      No violations found. Great job!
                    </div>
                  ) : (
                    result.violations.map((v, idx) => (
                      <ViolationItem 
                        key={idx} 
                        violation={v} 
                        isActive={activeViolation === idx}
                        onClick={() => setActiveViolation(idx === activeViolation ? null : idx)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Suggestion / Rewrite */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 p-5 shadow-sm transition-colors">
                 <div className="flex justify-between items-center mb-3">
                    <h3 className="text-indigo-900 dark:text-indigo-200 font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                      Suggested Rewrite
                    </h3>
                    <button 
                      onClick={() => copyToClipboard(result.rewrittenContent)}
                      className="text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                      title="Copy Suggestion"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/50 text-slate-700 dark:text-slate-300 text-sm italic leading-relaxed transition-colors">
                    "{result.rewrittenContent}"
                 </div>
                 <div className="mt-3 flex justify-end">
                    <button 
                      onClick={() => {
                        setInputText(result.rewrittenContent);
                        setResult(null); // Clear result as we are effectively resetting with safe content
                      }}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
                    >
                      Apply to Editor <ChevronRight className="w-3 h-3" />
                    </button>
                 </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

//App logic
const App: React.FC = () => {
  // View State
  const [view, setView] = useState<'landing' | 'app'>('landing');
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initial Theme Check
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200">
      {/* Shared Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('landing')}
          >
            <div className="bg-blue-600 p-2 rounded-lg shadow-md">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">PatrolAI</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setView('app')}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              {view === 'landing' ? 'Get Started' : 'Dashboard'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full">
        {view === 'landing' ? (
          <LandingPage onStart={() => setView('app')} />
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
};

export default App;