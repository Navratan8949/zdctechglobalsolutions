"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Zap,
  IndianRupee,
  Home,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalculationResult {
  capacityKw: number;
  monthlyUnits: number;
  roofAreaSqFt: number;
  subsidyAmount: number;
  estCostMin: number;
  estCostMax: number;
  netCostMin: number;
  netCostMax: number;
  annualSavings: number;
  paybackYears: number;
}

// Calculations based on PM Surya Ghar guidelines & avg DISCOM tariff ₹7.5/unit
export function calculateSolar(billAmount: number): CalculationResult {
  let capacityKw = 2;

  if (billAmount <= 1500) {
    capacityKw = 1;
  } else if (billAmount <= 3000) {
    capacityKw = 2;
  } else if (billAmount <= 5000) {
    capacityKw = 3;
  } else if (billAmount <= 7500) {
    capacityKw = 4;
  } else if (billAmount <= 10000) {
    capacityKw = 5;
  } else if (billAmount <= 15000) {
    capacityKw = 7;
  } else if (billAmount <= 20000) {
    capacityKw = 10;
  } else {
    capacityKw = Math.min(Math.round(billAmount / 2000), 25);
  }

  // 1 kW generates approx 120 - 130 units per month in sunny regions like Rajasthan/North India
  const monthlyUnits = capacityKw * 125;
  // 1 kW requires approx 100 sq ft shadow-free rooftop
  const roofAreaSqFt = capacityKw * 100;

  // PM Surya Ghar Muft Bijli Yojana Central Subsidy:
  // 1 kW: ₹30,000
  // 2 kW: ₹60,000
  // 3 kW and above: ₹78,000 max
  let subsidyAmount = 0;
  if (capacityKw === 1) {
    subsidyAmount = 30000;
  } else if (capacityKw === 2) {
    subsidyAmount = 60000;
  } else if (capacityKw >= 3) {
    subsidyAmount = 78000;
  }

  // Approx cost per kW (₹55,000 - ₹65,000 / kW for Tier-1 Mono PERC TopCon + Smart Inverter)
  const estCostMin = capacityKw * 55000;
  const estCostMax = capacityKw * 65000;

  const netCostMin = Math.max(estCostMin - subsidyAmount, 25000);
  const netCostMax = Math.max(estCostMax - subsidyAmount, 35000);

  // Annual savings: approx 85% of monthly bill saved
  const annualSavings = Math.round(billAmount * 0.85 * 12);
  const avgNetCost = (netCostMin + netCostMax) / 2;
  const paybackYears = Math.max(
    Number((avgNetCost / (annualSavings || 1)).toFixed(1)),
    2.5
  );

  return {
    capacityKw,
    monthlyUnits,
    roofAreaSqFt,
    subsidyAmount,
    estCostMin,
    estCostMax,
    netCostMin,
    netCostMax,
    annualSavings,
    paybackYears,
  };
}

const billPresets = [1500, 3000, 5000, 8000, 12000, 20000];

export function SolarCalculator({
  onSelectSystem,
}: {
  onSelectSystem?: (capacityKw: number, billAmount: number) => void;
}) {
  const [billAmount, setBillAmount] = useState<number>(3000);
  const result = calculateSolar(billAmount);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-500/5 via-white to-sky-500/5 p-6 sm:p-8 lg:p-10 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left Controller Section */}
        <div className="w-full lg:w-5/12 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            PM Surya Ghar Subsidy Calculator
          </div>

          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Calculate Your Solar Savings &amp; Subsidy
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Find out the recommended rooftop capacity, government subsidy, and
              net cost with 25-year bill savings.
            </p>
          </div>

          {/* Current Electricity Bill Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Monthly Electricity Bill
              </label>
              <span className="font-display text-2xl font-black text-[#0ea5e9]">
                ₹{billAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={1000}
              max={30000}
              step={500}
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]"
            />

            {/* Quick Bill Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {billPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBillAmount(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    billAmount === preset
                      ? "bg-[#0ea5e9] text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  ₹{preset.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
              Direct DBT Bank Subsidy
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800/90">
              Eligible under Central Government PM Surya Ghar: Muft Bijli Yojana.
              Subsidy is credited directly into your bank account after net-meter
              installation.
            </p>
          </div>
        </div>

        {/* Right Dynamic Result Cards */}
        <div className="w-full lg:w-7/12 space-y-5">
          {/* Main Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            <motion.div
              key={`capacity-${result.capacityKw}`}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center"
            >
              <div className="inline-flex p-2 rounded-xl bg-amber-50 text-amber-600 mb-2">
                <Sun className="h-5 w-5" />
              </div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Recommended Plant
              </span>
              <p className="font-display text-2xl font-black text-slate-900 mt-0.5">
                {result.capacityKw} kW
              </p>
              <span className="text-[10px] text-slate-400">Rooftop Solar</span>
            </motion.div>

            <motion.div
              key={`units-${result.monthlyUnits}`}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center"
            >
              <div className="inline-flex p-2 rounded-xl bg-sky-50 text-[#0ea5e9] mb-2">
                <Zap className="h-5 w-5" />
              </div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Solar Generation
              </span>
              <p className="font-display text-2xl font-black text-[#0ea5e9] mt-0.5">
                ~{result.monthlyUnits}
              </p>
              <span className="text-[10px] text-slate-400">Units / Month</span>
            </motion.div>

            <motion.div
              key={`area-${result.roofAreaSqFt}`}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center col-span-2 sm:col-span-1"
            >
              <div className="inline-flex p-2 rounded-xl bg-emerald-50 text-emerald-600 mb-2">
                <Home className="h-5 w-5" />
              </div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Rooftop Area
              </span>
              <p className="font-display text-2xl font-black text-emerald-600 mt-0.5">
                {result.roofAreaSqFt}
              </p>
              <span className="text-[10px] text-slate-400">Sq. Ft. Required</span>
            </motion.div>
          </div>

          {/* Subsidy & Investment Breakdown */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                  Government Subsidy (PM Surya Ghar)
                </span>
                <p className="font-display text-2xl sm:text-3xl font-black text-emerald-600 mt-0.5">
                  ₹{result.subsidyAmount.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Net Estimated Investment
                </span>
                <p className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  ₹{result.netCostMin.toLocaleString("en-IN")} - ₹
                  {result.netCostMax.toLocaleString("en-IN")}*
                </p>
                <span className="text-[10px] text-slate-400">
                  (After Govt Subsidy Deduction)
                </span>
              </div>
            </div>

            {/* Savings & Payback Row */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0ea5e9]">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">
                    Estimated Annual Savings
                  </span>
                  <p className="font-bold text-slate-900 text-sm">
                    ₹{result.annualSavings.toLocaleString("en-IN")} / Year
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <IndianRupee className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">
                    Payback Period
                  </span>
                  <p className="font-bold text-slate-900 text-sm">
                    ~{result.paybackYears} Years (Free Power After!)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Quote CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 text-white">
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Ready for Zero Electricity Bills?
              </p>
              <p className="text-[11px] text-slate-300">
                Book a free technical site survey and get formal quote for your roof.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => {
                if (onSelectSystem) {
                  onSelectSystem(result.capacityKw, billAmount);
                } else {
                  const el = document.getElementById("solar-quote-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-xs px-5 py-2.5 shadow-md shrink-0"
            >
              Get Free Site Survey
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

