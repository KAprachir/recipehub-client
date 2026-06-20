"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button, Input } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
// 💡 BACKEND CALL: Import the query/mutation helpers once defined in lib/api/admin.js and lib/actions/admin.js:
// import { getAdminReports } from "@/lib/api/admin";
// import { dismissReport, takeDownRecipe } from "@/lib/actions/admin";
import {
  AlertTriangle,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Filter,
  ShieldAlert,
} from "lucide-react";
import Swal from "sweetalert2";

export default function AdminReportPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState([]);

  // 💡 BACKEND CALL:
  // To connect reports to your backend:
  // 1. Uncomment the getAdminReports import at the top of this file.
  // 2. In your useEffect, load reports data from database:
  //    const data = await getAdminReports();
  //    setReports(data);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const mockReports = [
          {
            id: "REP-1024",
            recipeName: "Spicy Ghost Pepper Burger",
            recipeId: "rec_01",
            reporter: "John Doe",
            reason: "Dangerous ingredients / Health hazard risk",
            details: "Contains unsafe levels of capsaicin extract without proper warnings for children.",
            status: "Pending",
            date: "June 19, 2026",
            severity: "High",
          },
          {
            id: "REP-1025",
            recipeName: "Grandma's Secret Lemon Tart",
            recipeId: "rec_02",
            reporter: "Alice Smith",
            reason: "Copyright Violation",
            details: "Copied word-for-word from a copyrighted cookbook published in 2021.",
            status: "Pending",
            date: "June 18, 2026",
            severity: "Medium",
          },
          {
            id: "REP-1026",
            recipeName: "Easy 5-Minute Microwave Mug Cake",
            recipeId: "rec_03",
            reporter: "Chef Michael",
            reason: "Spam / Low Quality",
            details: "Just lists 'put flour and sugar in mug' with zero measurements and gibberish steps.",
            status: "Resolved",
            date: "June 15, 2026",
            severity: "Low",
          },
          {
            id: "REP-1027",
            recipeName: "Vibrant Summer Salad",
            recipeId: "rec_04",
            reporter: "Sarah Connor",
            reason: "Harassment / Hate Speech",
            details: "Description contains offensive remarks targeting specific dietary communities.",
            status: "Dismissed",
            date: "June 12, 2026",
            severity: "High",
          },
        ];

        setReports(mockReports);
      } catch (err) {
        console.error("Error fetching system reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Filter reports by activeTab status and searchQuery
  const filteredReports = reports.filter((report) => {
    const matchesTab = activeTab === "All" || report.status === activeTab;
    const matchesSearch =
      report.recipeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Calculate quick metric aggregates
  const totalCount = reports.length;
  const pendingCount = reports.filter((r) => r.status === "Pending").length;
  const resolvedCount = reports.filter((r) => r.status === "Resolved").length;
  const dismissedCount = reports.filter((r) => r.status === "Dismissed").length;

  // 💡 BACKEND CALL:
  // Hook up status change to "Dismissed" on database:
  // 1. Uncomment the dismissReport action import.
  // 2. Inside the isConfirmed block, call:
  //    await dismissReport(reportId);
  const handleDismissReport = async (reportId) => {
    Swal.fire({
      title: "Dismiss Report?",
      text: "This report will be marked as dismissed. No action will be taken against the recipe.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#046A38",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Dismiss it!",
      background: document.documentElement.classList.contains("dark") ? "#18181b" : "#ffffff",
      color: document.documentElement.classList.contains("dark") ? "#f4f4f5" : "#18181b",
    }).then((result) => {
      if (result.isConfirmed) {
        setReports((prev) =>
          prev.map((rep) =>
            rep.id === reportId ? { ...rep, status: "Dismissed" } : rep
          )
        );
        Swal.fire({
          title: "Dismissed!",
          text: "Report has been safely dismissed.",
          icon: "success",
          confirmButtonColor: "#046A38",
          background: document.documentElement.classList.contains("dark") ? "#18181b" : "#ffffff",
          color: document.documentElement.classList.contains("dark") ? "#f4f4f5" : "#18181b",
        });
      }
    });
  };

  // 💡 BACKEND CALL:
  // Hook up DELETE request to remove recipe from database:
  // 1. Uncomment the takeDownRecipe action import.
  // 2. Inside the isConfirmed block, call:
  //    await takeDownRecipe(reportId);
  const handleTakeDownRecipe = async (reportId, recipeName) => {
    Swal.fire({
      title: "Take Down Recipe?",
      text: `Are you sure you want to remove "${recipeName}" from the public catalog? This action is irreversible.`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#71717a",
      confirmButtonText: "Yes, Take Down!",
      background: document.documentElement.classList.contains("dark") ? "#18181b" : "#ffffff",
      color: document.documentElement.classList.contains("dark") ? "#f4f4f5" : "#18181b",
    }).then((result) => {
      if (result.isConfirmed) {
        setReports((prev) =>
          prev.map((rep) =>
            rep.id === reportId ? { ...rep, status: "Resolved" } : rep
          )
        );
        Swal.fire({
          title: "Removed!",
          text: "The recipe has been taken down and the report is resolved.",
          icon: "success",
          confirmButtonColor: "#046A38",
          background: document.documentElement.classList.contains("dark") ? "#18181b" : "#ffffff",
          color: document.documentElement.classList.contains("dark") ? "#f4f4f5" : "#18181b",
        });
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-8 text-zinc-800 dark:text-zinc-200 min-h-screen flex flex-col justify-between"
    >
      <div className="space-y-6">
        {/* ─── HEADER AREA ─── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-900/60 pb-6"
        >
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Flags & Violations Center
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Audit reported contents, evaluate copyright violations, and enforce community standards.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-64">
            <div className="relative flex items-center flex-1">
              <Search size={16} className="absolute left-3 text-zinc-400" />
              <input
                type="text"
                placeholder="Search report logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-800/85 focus:outline-hidden focus:border-[#046A38] focus:ring-1 focus:ring-[#046A38]/50 transition-all shadow-2xs"
              />
            </div>
          </div>
        </motion.div>

        {/* ─── METRIC STATS ROW (4 COLUMNS) ─── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Box 1: Total Reports */}
          <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xs rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Reports</p>
              <p className="text-lg font-black text-zinc-900 dark:text-white mt-1">{loading ? "..." : totalCount}</p>
            </div>
            <div className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 rounded-lg">
              <AlertTriangle size={16} />
            </div>
          </Card>

          {/* Box 2: Pending Review */}
          <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xs rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Pending</p>
              <p className="text-lg font-black text-amber-600 dark:text-amber-500 mt-1">{loading ? "..." : pendingCount}</p>
            </div>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-lg">
              <ShieldAlert size={16} />
            </div>
          </Card>

          {/* Box 3: Resolved */}
          <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xs rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Resolved</p>
              <p className="text-lg font-black text-emerald-600 dark:text-emerald-500 mt-1">{loading ? "..." : resolvedCount}</p>
            </div>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-lg">
              <CheckCircle size={16} />
            </div>
          </Card>

          {/* Box 4: Dismissed */}
          <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xs rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Dismissed</p>
              <p className="text-lg font-black text-zinc-500 mt-1">{loading ? "..." : dismissedCount}</p>
            </div>
            <div className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 rounded-lg">
              <XCircle size={16} />
            </div>
          </Card>
        </motion.div>

        {/* ─── FILTER TABS ─── */}
        <motion.div variants={itemVariants} className="flex gap-1.5 border-b border-zinc-100 dark:border-zinc-900/60 pb-3">
          {["Pending", "Resolved", "Dismissed", "All"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#046A38] text-white shadow-2xs"
                  : "bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
              }`}
            >
              {tab} {tab === "Pending" ? `(${pendingCount})` : ""}
            </button>
          ))}
        </motion.div>

        {/* ─── REPORTS TABLE / LIST ─── */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((placeholder) => (
              <Card key={placeholder} className="p-6 h-28 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredReports.length > 0 ? (
              <motion.div
                variants={containerVariants}
                className="space-y-4"
              >
                {filteredReports.map((report) => (
                  <motion.div
                    key={report.id}
                    variants={itemVariants}
                    layoutId={report.id}
                  >
                    <Card className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-2xs rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-5 group">
                      
                      {/* Left: Info Stack */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md">
                            {report.id}
                          </span>
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            report.severity === "High"
                              ? "bg-red-50 dark:bg-red-950/20 text-red-600"
                              : report.severity === "Medium"
                              ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600"
                              : "bg-teal-50 dark:bg-teal-950/20 text-teal-600"
                          }`}>
                            {report.severity} Priority
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">
                            Reported &bull; {report.date}
                          </span>
                        </div>

                        <h3 className="text-sm font-black text-zinc-900 dark:text-white leading-snug">
                          Recipe: <span className="hover:underline text-[#046A38] dark:text-emerald-400 cursor-pointer">{report.recipeName}</span>
                        </h3>

                        <p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold leading-relaxed">
                          <span className="text-zinc-400 font-bold uppercase text-[9px] tracking-wider block">Reason: {report.reason}</span>
                          {report.details}
                        </p>

                        <div className="text-[10px] text-zinc-400 font-semibold">
                          Reporter: <span className="text-zinc-800 dark:text-zinc-300">{report.reporter}</span>
                        </div>
                      </div>

                      {/* Right: Actions Column */}
                      <div className="flex flex-row md:flex-col items-center justify-end gap-2.5 shrink-0 pt-2 border-t border-zinc-100 dark:border-zinc-900 md:pt-0 md:border-t-0">
                        {report.status === "Pending" ? (
                          <>
                            {/* Take Down Button */}
                            <Button
                              onClick={() => handleTakeDownRecipe(report.id, report.recipeName)}
                              size="sm"
                              className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-bold text-[10px] uppercase rounded-lg hover:bg-red-600 hover:text-white transition-colors cursor-pointer w-full md:w-32 h-8"
                            >
                              <Trash2 size={12} className="mr-1" />
                              Take Down
                            </Button>

                            {/* Dismiss Button */}
                            <Button
                              onClick={() => handleDismissReport(report.id)}
                              size="sm"
                              variant="bordered"
                              className="border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-[10px] uppercase rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer w-full md:w-32 h-8"
                            >
                              <CheckCircle size={12} className="mr-1" />
                              Dismiss
                            </Button>
                          </>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900/80 px-4 py-2 rounded-lg">
                            <span>Status: {report.status}</span>
                          </div>
                        )}
                      </div>

                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-20 flex flex-col items-center justify-center text-center max-w-sm mx-auto"
              >
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/35 border border-zinc-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-600 rounded-2xl mb-4">
                  <CheckCircle size={32} className="text-[#046A38] dark:text-emerald-500" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  All Clean!
                </h3>
                <p className="text-[10px] text-zinc-400 mt-2 leading-relaxed">
                  There are no reported violations in this tab status queue. Sit back, sip some coffee, and enjoy a clean community feed.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* ─── FOOTER AREA ─── */}
      <motion.footer
        variants={itemVariants}
        className="pt-8 mt-12 border-t border-zinc-200/60 dark:border-zinc-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4"
      >
        <div className="space-y-1 text-left">
          <p className="text-sm font-black text-[#046A38] dark:text-emerald-500 tracking-tight">
            RecipeHub
          </p>
          <p className="text-[10px] text-zinc-400 font-medium">
            &copy; 2026 RecipeHub Professional Culinary Systems. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            System Policies
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Moderator Guidelines
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Security Overview
          </Link>
        </div>
      </motion.footer>
    </motion.div>
  );
}
