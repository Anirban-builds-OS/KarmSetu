// ============================================================
// Time Agent — Conversational & Voice Field Progress Extraction
// ============================================================

import { useState } from 'react';
import {
  MessageSquare, Send, Mic, Sparkles, CheckCircle2,
  ArrowRight, ShieldCheck, Tag, Layers, RefreshCw
} from 'lucide-react';
import { DEMO_TIME_AGENT_MESSAGES } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import type { TimeAgentMessage } from '../types';

export function TimeAgentPage() {
  const { addToast } = useAppStore();
  const [messages, setMessages] = useState<TimeAgentMessage[]>(DEMO_TIME_AGENT_MESSAGES);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePrompts = [
    'Spool P1017 was erected yesterday in Bay 3.',
    'Foundation F-12 excavation completed this morning with 45m3 soil removed.',
    'Started cable pulling for Motor M-101 from MCC-01 today.',
    'Hydrotest on Line 24 delayed due to blind flange unavailability.'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: TimeAgentMessage = {
      id: `ta-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      let extractionData;
      let linkedActivityData;

      if (query.toLowerCase().includes('p1017') || query.toLowerCase().includes('spool')) {
        extractionData = {
          eventType: 'COMPLETED' as const,
          modality: 'PAST_DONE' as const,
          objectText: 'P-1017',
          objectRefs: ['obj-027'],
          eventTime: '2026-09-28',
          area: 'Bay 3' as const,
          confidence: 0.96,
        };
        linkedActivityData = {
          code: 'ACT-EP-1042',
          name: 'Erect Line 24-P-1017',
          confidence: 0.94,
          lane: 'AUTO_COMMIT' as const,
        };
      } else if (query.toLowerCase().includes('f-12') || query.toLowerCase().includes('foundation')) {
        extractionData = {
          eventType: 'COMPLETED' as const,
          modality: 'PAST_DONE' as const,
          objectText: 'F-12',
          objectRefs: ['obj-012'],
          eventTime: '2026-09-29',
          area: 'Bay 3' as const,
          confidence: 0.93,
        };
        linkedActivityData = {
          code: 'ACT-CIV-039',
          name: 'Foundation F-12 Excavation',
          confidence: 0.91,
          lane: 'AUTO_COMMIT' as const,
        };
      } else {
        extractionData = {
          eventType: 'STARTED' as const,
          modality: 'ONGOING' as const,
          objectText: 'Motor M-101 / MCC-01',
          objectRefs: ['obj-055'],
          eventTime: '2026-09-29',
          area: 'Utility Area' as const,
          confidence: 0.88,
        };
        linkedActivityData = {
          code: 'ACT-EL-055',
          name: 'Cable Pulling – MCC-01 to Motor M-101',
          confidence: 0.86,
          lane: 'ONE_TAP' as const,
        };
      }

      const agentMsg: TimeAgentMessage = {
        id: `ta-resp-${Date.now()}`,
        role: 'system',
        content: `I analyzed your field update. I extracted an observation for ${extractionData.objectText} with modality ${extractionData.modality} and successfully mapped it to schedule activity ${linkedActivityData.code}.`,
        timestamp: new Date().toISOString(),
        extraction: extractionData,
        linkedActivity: linkedActivityData,
      };

      setMessages(prev => [...prev, agentMsg]);
      setIsProcessing(false);
      addToast(`Time Agent mapped "${extractionData.objectText}" to ${linkedActivityData.code} (${Math.round(linkedActivityData.confidence * 100)}%)`, 'success');
    }, 900);
  };

  const toggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      addToast('Listening... Speak your site update.', 'info');
      setTimeout(() => {
        setIsRecording(false);
        handleSend('Spool P1017 was erected yesterday in Bay 3.');
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-300">
              <MessageSquare size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Natural Language Engine</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Time Agent &mdash; Voice &amp; Chat Ingestion</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Report in free text or speech. KarmSetu automatically parses verbs, dates, tags, and creates verifiable P6 links.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMessages(DEMO_TIME_AGENT_MESSAGES)}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 self-start sm:self-auto"
        >
          <RefreshCw size={13} /> Reset Demo Dialogue
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles size={13} className="text-accent-400" /> Quick test:
        </span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-xl text-xs bg-navy-900 border border-navy-700/80 text-slate-300 hover:text-white hover:border-accent-500/50 whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Thread */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-4 min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent-600 text-white shadow-md'
                    : 'bg-navy-950/90 border border-navy-800 text-slate-200 shadow-md'
                }`}
              >
                <div className="font-medium">{msg.content}</div>

                {/* Structured Extraction Card inside Assistant Response */}
                {msg.extraction && msg.linkedActivity && (
                  <div className="mt-3 pt-3 border-t border-navy-800/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Tag size={12} className="text-cyan-400" />
                        Target: <strong className="text-cyan-300">{msg.extraction.objectText}</strong>
                      </span>
                      <span className="text-slate-400">
                        Date: <strong className="text-slate-200">{msg.extraction.eventTime}</strong>
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-navy-900 border border-navy-700/80">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers size={14} className="text-accent-400" />
                          <span className="font-mono font-bold text-accent-300 text-xs">
                            {msg.linkedActivity.code}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          msg.linkedActivity.lane === 'AUTO_COMMIT'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {msg.linkedActivity.lane.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-white text-xs font-semibold mt-1">
                        {msg.linkedActivity.name}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-navy-800">
                        <span>Hybrid Match Score: <strong className="text-emerald-400 font-mono">{Math.round(msg.linkedActivity.confidence * 100)}%</strong></span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <ShieldCheck size={12} /> Auto-Ledgered (Hash SHA-256)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-500 mt-1 px-1 font-mono">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-accent-400 p-3 rounded-xl bg-navy-950/60 border border-navy-800 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-ping"></span>
              Time Agent extracting claims &amp; querying scope graph...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-navy-800">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleMic}
              className={`p-3 rounded-xl border transition-all ${
                isRecording
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse shadow-lg shadow-rose-600/30'
                  : 'bg-navy-800 text-slate-400 hover:text-white border-navy-700 hover:border-slate-600'
              }`}
              title="Voice Input (Speech-to-Text)"
            >
              <Mic size={18} />
            </button>

            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="e.g. Spool P1017 was erected yesterday in Bay 3 or hydrotest done on line 24..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-accent-500 transition-colors"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-1.5 shadow transition-all"
            >
              <span>Process</span>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
