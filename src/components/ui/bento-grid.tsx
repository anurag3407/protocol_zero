"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Shield,
  Zap,
  GitBranch,
  BarChart3,
  Lock,
  Mail,
  Bug,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

// ============================================================================
// BENTO GRID — Glassmorphic feature showcase
// ============================================================================

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export function BentoGrid() {
  return (
    <section id="pricing" className="relative w-full py-24 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <BackgroundRippleEffect rows={8} cols={20} cellSize={56} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-medium mb-6 backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Everything you need</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold text-white mb-5 tracking-tight"
            style={{ fontFamily: 'var(--font-syne), var(--font-space-grotesk), sans-serif' }}
          >
            Built for <span className="italic">Modern</span> Teams
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            A full-stack AI code review platform that works around the clock so your team can ship with confidence.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

          {/* Card 1 — AI Code Review (Large, spans 2 cols) */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 group relative rounded-2xl border border-white/[0.06] bg-zinc-950/50 backdrop-blur-xl overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/[0.07] via-transparent to-transparent" />
            <div className="relative p-8 lg:p-10 flex flex-col h-full min-h-[280px]">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Shield className="w-5 h-5 text-violet-400" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-violet-400/80">
                  Core Feature
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-3" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                AI-Powered Code Review
              </h3>
              <p className="text-zinc-400 leading-relaxed max-w-xl mb-6">
                Every commit analyzed in real-time. Our AI catches security vulnerabilities, performance bottlenecks, and code quality issues before they reach production — automatically.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                {["Security Scanning", "Performance Analysis", "Best Practices"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.06] text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Auto-Fix Engine (Tall) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="row-span-2 group relative rounded-2xl border border-white/[0.06] bg-zinc-950/50 backdrop-blur-xl overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-500/[0.06] via-transparent to-transparent" />
            <div className="relative p-8 flex flex-col h-full min-h-[400px]">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                Auto-Fix Engine
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Don&apos;t just find bugs — fix them. Production-ready patches generated and delivered as PRs, from SQL injections to unhandled promises.
              </p>

              {/* Mini code diff preview */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="rounded-xl border border-white/[0.06] bg-black/40 p-4 text-xs space-y-1.5" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                  <div className="flex items-center gap-2 text-zinc-500 mb-3">
                    <Lock className="w-3 h-3" />
                    <span>auth/login.ts</span>
                  </div>
                  <div className="text-red-400/80">
                    <span className="text-red-500/50 mr-2">-</span>
                    query = `SELECT * FROM ${"{"}input{"}"}`
                  </div>
                  <div className="text-emerald-400/80">
                    <span className="text-emerald-500/50 mr-2">+</span>
                    query = db.query(&quot;SELECT * FROM ?&quot;, [input])
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — GitHub Integration */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative rounded-2xl border border-white/[0.06] bg-zinc-950/50 backdrop-blur-xl overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent" />
            <div className="relative p-8 flex flex-col h-full min-h-[200px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <GitBranch className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                GitHub Native
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Connect any repo in seconds. Works with your existing workflow — no config files, no CI changes.
              </p>
            </div>
          </motion.div>

          {/* Card 4 — Analytics */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative rounded-2xl border border-white/[0.06] bg-zinc-950/50 backdrop-blur-xl overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-transparent" />
            <div className="relative p-8 flex flex-col h-full min-h-[200px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                Real-Time Analytics
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Track code health scores, issue trends, and team performance. Data-driven insights, always up to date.
              </p>
              {/* Mini bar chart */}
              <div className="mt-auto pt-5 flex items-end gap-1.5 h-14">
                {[35, 55, 40, 70, 50, 30, 45, 25, 20, 15, 12, 18].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/30 to-cyan-500/60"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 5 — Email Reports */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative rounded-2xl border border-white/[0.06] bg-zinc-950/50 backdrop-blur-xl overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-transparent" />
            <div className="relative p-8 flex flex-col h-full min-h-[200px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Mail className="w-5 h-5 text-violet-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                Smart Email Reports
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Detailed analysis reports delivered to your inbox after every push. Severity breakdowns, file locations, and suggested fixes.
              </p>
            </div>
          </motion.div>

          {/* Card 6 — Bug Detection (Wide) */}
          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 group relative rounded-2xl border border-white/[0.06] bg-zinc-950/50 backdrop-blur-xl overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/[0.05] via-transparent to-transparent" />
            <div className="relative p-8 lg:p-10 flex flex-col md:flex-row md:items-center gap-6 min-h-[180px]">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                    <Bug className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-2" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                  Vulnerability Detection
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                  Deep security scanning catches SQL injections, XSS, auth bypasses, and 200+ vulnerability patterns across your entire codebase.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "SQL Injection", color: "text-red-400 bg-red-500/10 border-red-500/20" },
                  { label: "XSS", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
                  { label: "Auth Bypass", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                  { label: "CSRF", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
                  { label: "Secrets Leak", color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
                ].map((item) => (
                  <span
                    key={item.label}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${item.color}`}
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-14"
        >
          <Link
            href="/sign-up"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            <span>Start Reviewing for Free</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default BentoGrid;
