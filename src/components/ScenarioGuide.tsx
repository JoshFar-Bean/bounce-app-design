import React, { useState, useEffect } from "react"
import { SCENARIOS, type PrototypeScenario } from "../data/scenarios"
import "./ScenarioGuide.css"

export interface ScenarioGuideProps {
  theme?: "light" | "dark"
  scale?: number
}

/**
 * Global helper to auto-mark a scenario task when user performs the action in the prototype.
 */
export function markScenarioStepComplete(scenarioId: string, stepIndex: number) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("prototype-step-complete", {
        detail: { scenarioId, stepIndex },
      }),
    )
  }
}

export function ScenarioGuide({ theme = "dark", scale = 1 }: ScenarioGuideProps) {
  // Session persistence keys (versioned to avoid stale step state across scenario definition updates)
  const STORAGE_KEY_CHECKED = "bounce_scenario_checked_steps_v4"
  const STORAGE_KEY_COMPLETED = "bounce_scenario_completed_map_v4"
  const STORAGE_KEY_ACTIVE = "bounce_scenario_active_id_v4"
  const STORAGE_KEY_MINIMISED = "bounce_scenario_is_minimised"

  // Active scenario
  const [activeId, setActiveId] = useState<string>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_ACTIVE)
      if (saved && SCENARIOS.some((s) => s.id === saved)) return saved
    } catch { }
    return SCENARIOS[0].id
  })

  // Checked steps map: { [scenarioId]: { [stepIndex]: boolean } }
  const [checkedSteps, setCheckedSteps] = useState<Record<string, Record<number, boolean>>>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_CHECKED)
      if (saved) return JSON.parse(saved)
    } catch { }
    return {}
  })

  // Completed scenarios map: { [scenarioId]: boolean }
  const [completedScenarios, setCompletedScenarios] = useState<Record<string, boolean>>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_COMPLETED)
      if (saved) {
        const parsed = JSON.parse(saved)
        const checkedSaved = sessionStorage.getItem(STORAGE_KEY_CHECKED)
        const parsedChecked = checkedSaved ? JSON.parse(checkedSaved) : {}
        const validated: Record<string, boolean> = {}
        SCENARIOS.forEach((scenario) => {
          if (parsed[scenario.id]) {
            const scenarioChecked = parsedChecked[scenario.id] || {}
            const allTicked = scenario.steps.every((_, idx) => scenarioChecked[idx])
            if (allTicked) validated[scenario.id] = true
          }
        })
        return validated
      }
    } catch { }
    return {}
  })

  // Desktop panel minimise state
  const [isMinimised, setIsMinimised] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_MINIMISED)
      if (saved !== null) return saved === "true"
    } catch { }
    return false
  })

  const handleSetMinimised = (val: boolean) => {
    setIsMinimised(val)
    try {
      sessionStorage.setItem(STORAGE_KEY_MINIMISED, String(val))
    } catch { }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("scenario-guide-minimise-toggle", {
          detail: { isMinimised: val },
        }),
      )
    }
  }

  // Mobile modal card visibility
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  // Recently auto-checked step indicator: { key: `${scenarioId}-${stepIndex}` }
  const [recentlyAutoChecked, setRecentlyAutoChecked] = useState<string | null>(null)

  // Listen for auto-mark events from prototype actions
  useEffect(() => {
    const handleStepComplete = (e: Event) => {
      const customEvent = e as CustomEvent<{ scenarioId: string; stepIndex: number }>
      if (!customEvent.detail) return
      const { scenarioId, stepIndex } = customEvent.detail
      const targetScenario = SCENARIOS.find((s) => s.id === scenarioId)
      if (!targetScenario) return

      // Flash highlight animation on the item
      const key = `${scenarioId}-${stepIndex}`
      setRecentlyAutoChecked(key)
      setTimeout(() => setRecentlyAutoChecked(null), 1400)

      setCheckedSteps((prev) => {
        const scenarioChecked = { ...(prev[scenarioId] || {}) }
        if (scenarioChecked[stepIndex]) return prev // Already checked

        const wasAllTickedBefore = targetScenario.steps.every((_, idx) => scenarioChecked[idx])
        scenarioChecked[stepIndex] = true
        const nextCheckedMap = {
          ...prev,
          [scenarioId]: scenarioChecked,
        }

        // Check if all steps in this scenario are now complete
        const allTicked = targetScenario.steps.every((_, idx) => scenarioChecked[idx])
        if (allTicked) {
          setCompletedScenarios((prevCompleted) => ({
            ...prevCompleted,
            [scenarioId]: true,
          }))

          // Auto move to the next scenario once all the steps in that task are completed
          if (!wasAllTickedBefore) {
            const currentIdx = SCENARIOS.findIndex((s) => s.id === scenarioId)
            if (currentIdx !== -1 && currentIdx < SCENARIOS.length - 1) {
              setTimeout(() => {
                setActiveId(SCENARIOS[currentIdx + 1].id)
              }, 500)
            }
          }
        }

        return nextCheckedMap
      })
    }

    window.addEventListener("prototype-step-complete", handleStepComplete)
    return () => {
      window.removeEventListener("prototype-step-complete", handleStepComplete)
    }
  }, [])

  // Sync to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checkedSteps))
      sessionStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedScenarios))
      sessionStorage.setItem(STORAGE_KEY_ACTIVE, activeId)
      sessionStorage.setItem(STORAGE_KEY_MINIMISED, String(isMinimised))
    } catch { }
  }, [checkedSteps, completedScenarios, activeId, isMinimised])

  // Count completed
  const completedCount = SCENARIOS.filter((s) => completedScenarios[s.id]).length
  const progressPercent = Math.round((completedCount / SCENARIOS.length) * 100)
  const isAllComplete = completedCount === SCENARIOS.length

  // Toggle step checklist
  const handleToggleStep = (scenario: PrototypeScenario, stepIdx: number) => {
    const scenarioChecked = { ...(checkedSteps[scenario.id] || {}) }
    const nextVal = !scenarioChecked[stepIdx]
    scenarioChecked[stepIdx] = nextVal

    const nextCheckedMap = {
      ...checkedSteps,
      [scenario.id]: scenarioChecked,
    }
    setCheckedSteps(nextCheckedMap)

    // Check if all steps in this scenario are ticked
    const allTicked = scenario.steps.every((_, idx) => scenarioChecked[idx])
    setCompletedScenarios((prev) => ({
      ...prev,
      [scenario.id]: allTicked,
    }))

    // Auto move to the next scenario once all steps in this task are completed
    if (allTicked) {
      const currentIdx = SCENARIOS.findIndex((s) => s.id === scenario.id)
      if (currentIdx !== -1 && currentIdx < SCENARIOS.length - 1) {
        setTimeout(() => {
          setActiveId(SCENARIOS[currentIdx + 1].id)
        }, 500)
      }
    }
  }

  // Mark current scenario complete & go to next
  const handleCompleteAndNext = (currentIndex: number) => {
    const currentScenario = SCENARIOS[currentIndex]
    if (!currentScenario) return

    // Mark all steps as ticked
    const allTicked: Record<number, boolean> = {}
    currentScenario.steps.forEach((_, idx) => {
      allTicked[idx] = true
    })

    setCheckedSteps((prev) => ({
      ...prev,
      [currentScenario.id]: allTicked,
    }))

    setCompletedScenarios((prev) => ({
      ...prev,
      [currentScenario.id]: true,
    }))

    // Advance to next scenario if not at end
    if (currentIndex < SCENARIOS.length - 1) {
      setActiveId(SCENARIOS[currentIndex + 1].id)
    }
  }

  // Go to previous scenario
  const handlePrevious = (currentIndex: number) => {
    if (currentIndex > 0) {
      setActiveId(SCENARIOS[currentIndex - 1].id)
    }
  }

  // Reset/Restart progress for a single specific scenario
  const handleResetScenario = (scenarioId: string) => {
    setCheckedSteps((prev) => {
      const next = { ...prev }
      delete next[scenarioId]
      return next
    })
    setCompletedScenarios((prev) => {
      const next = { ...prev }
      delete next[scenarioId]
      return next
    })
    setActiveId(scenarioId)

    // Notify prototype to reset screen & state for this scenario
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("prototype-restart-scenario", {
          detail: { scenarioId },
        }),
      )
    }
  }

  // Reset all scenarios
  const handleReset = () => {
    setCheckedSteps({})
    setCompletedScenarios({})
    setActiveId(SCENARIOS[0].id)
    try {
      sessionStorage.removeItem(STORAGE_KEY_CHECKED)
      sessionStorage.removeItem(STORAGE_KEY_COMPLETED)
      sessionStorage.setItem(STORAGE_KEY_ACTIVE, SCENARIOS[0].id)
    } catch { }

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("prototype-restart-scenario", {
          detail: { scenarioId: SCENARIOS[0].id },
        }),
      )
    }
  }

  // Calculate matching height to the scaled phone on desktop
  const guideHeight = Math.min(
    typeof window !== "undefined" ? window.innerHeight - 36 : 1000,
    Math.round(1044 * (scale || 1)),
  )

  return (
    <div
      className={`scenario-guide-wrapper ${
        isMobileOpen ? "scenario-mobile-modal-active" : ""
      }`}
    >
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="scenario-mobile-backdrop"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close walkthrough guide"
        />
      )}

      {/* Desktop Collapsed Floating Tab (When user minimised the side panel on desktop) */}
      {isMinimised && (
        <button
          type="button"
          className={`scenario-desktop-collapsed-tab theme-${theme}`}
          onClick={() => handleSetMinimised(false)}
          title="Expand Try the Scenarios guide"
          aria-label="Expand scenario guide"
        >
          <span style={{ fontSize: 14 }}>📋</span>
          <span>Try Scenarios</span>
          <span
            className={`scenario-counter-badge ${
              isAllComplete ? "all-done" : ""
            }`}
          >
            {completedCount}/{SCENARIOS.length}
          </span>
        </button>
      )}

      {/* Mobile Floating Pill (Compact button on screens <= 900px) */}
      <button
        type="button"
        className={`scenario-mobile-pill theme-${theme}`}
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open Try the Scenarios guide"
      >
        <span style={{ fontSize: 13 }}>📋</span>
        <span>Try Scenarios</span>
        <span
          className={`scenario-counter-badge ${
            isAllComplete ? "all-done" : ""
          }`}
        >
          {completedCount}/{SCENARIOS.length}
        </span>
      </button>

      {/* Main Scenario Guide Panel (Side Panel on Desktop, Modal Card on Mobile) */}
      {(!isMinimised || isMobileOpen) && (
        <aside
          className={`scenario-guide-panel theme-${theme}`}
          style={{ "--guide-height": `${guideHeight}px` } as React.CSSProperties}
          role="region"
          aria-label="Interactive demo walkthrough scenarios"
        >
          {/* Header */}
          <div className="scenario-header">
            <div className="scenario-header-left">
              <div className="scenario-header-icon-wrap" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <div>
                <h3 className="scenario-header-title">Try the Scenarios</h3>
                <div className="scenario-header-sub">
                  Interactive walkthrough demo script
                </div>
              </div>
            </div>

            <div className="scenario-header-right">
              {completedCount > 0 && (
                <button
                  type="button"
                  className="scenario-header-reset-all-btn"
                  onClick={handleReset}
                  title="Reset all tasks progress"
                >
                  <span>Reset all</span>
                </button>
              )}
              <span
                className={`scenario-counter-badge ${
                  isAllComplete ? "all-done" : ""
                }`}
              >
                {completedCount}/{SCENARIOS.length}
              </span>
              <button
                type="button"
                className="scenario-minimise-btn"
                onClick={() => {
                  if (isMobileOpen) {
                    setIsMobileOpen(false)
                  } else {
                    handleSetMinimised(true)
                  }
                }}
                title={isMobileOpen ? "Close guide" : "Minimise guide"}
                aria-label={isMobileOpen ? "Close guide" : "Minimise guide"}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isMobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <polyline points="4 14 10 14 10 20" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Thin Progress Track */}
          <div
            className="scenario-progress-track"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Walkthrough progress"
          >
            <div
              className="scenario-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Accordion List */}
          <div className="scenario-scroll-area">
            {/* Completion Celebration Card */}
            {isAllComplete && (
              <div className="scenario-completion-banner">
                <div className="scenario-completion-top">
                  <div className="scenario-completion-icon" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="scenario-completion-title">
                    All 5 Scenarios Complete!
                  </h4>
                </div>
                <p className="scenario-completion-text">
                  “All 5 scenarios complete — no arguments, no broken
                  spreadsheets, and everyone’s smiling.”
                </p>
                <button
                  type="button"
                  className="scenario-reset-btn"
                  onClick={handleReset}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span>Reset Walkthrough</span>
                </button>
              </div>
            )}

            {/* 5 Scenario Accordion Cards */}
            {SCENARIOS.map((scenario, index) => {
              const isActive = scenario.id === activeId
              const isDone = Boolean(completedScenarios[scenario.id])
              const scenarioStepChecks = checkedSteps[scenario.id] || {}

              return (
                <div
                  key={scenario.id}
                  className={`scenario-card ${isActive ? "is-active" : ""} ${
                    isDone ? "is-completed" : ""
                  }`}
                >
                  {/* Card Header (Accordion Click Target) */}
                  <div
                    className="scenario-card-header"
                    onClick={() => setActiveId(isActive ? "" : scenario.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setActiveId(isActive ? "" : scenario.id)
                      }
                    }}
                  >
                    <div className="scenario-card-header-left">
                      <div
                        className="scenario-step-indicator"
                        aria-hidden="true"
                      >
                        {isDone ? (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <span>{scenario.number}</span>
                        )}
                      </div>
                      <div className="scenario-card-header-titles">
                        <div className="scenario-card-meta-row">
                          <span className="scenario-tag-badge">
                            {scenario.tag}
                          </span>
                        </div>
                        <h4 className="scenario-card-title">{scenario.title}</h4>
                      </div>
                    </div>

                    <div className="scenario-card-header-right">
                      {(isDone || Object.values(scenarioStepChecks).some(Boolean)) && (
                        <button
                          type="button"
                          className="scenario-card-restart-icon-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleResetScenario(scenario.id)
                          }}
                          title={`Restart Task ${scenario.number}`}
                          aria-label={`Restart Task ${scenario.number}`}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                          </svg>
                        </button>
                      )}
                      <svg
                        className="scenario-chevron-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Body (Expanded Content) */}
                  {isActive && (
                    <div className="scenario-card-body">
                      {/* Context Prompt */}
                      <div className="scenario-prompt-box">
                        {scenario.prompt}
                      </div>

                      {/* Interactive Step Checklist */}
                      <ul
                        className="scenario-checklist"
                        aria-label={`Steps for scenario ${scenario.number}`}
                      >
                        {scenario.steps.map((step, stepIdx) => {
                          const stepText = typeof step === "string" ? step : step.text
                          const stepRemark = typeof step === "string" ? undefined : step.remark
                          const isChecked = Boolean(scenarioStepChecks[stepIdx])
                          return (
                            <li
                              key={stepIdx}
                              className={`scenario-checklist-item ${
                                isChecked ? "is-checked" : ""
                              } ${
                                recentlyAutoChecked === `${scenario.id}-${stepIdx}`
                                  ? "just-auto-checked"
                                  : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleStep(scenario, stepIdx)
                              }}
                              role="checkbox"
                              aria-checked={isChecked}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault()
                                  handleToggleStep(scenario, stepIdx)
                                }
                              }}
                            >
                              <div
                                className="scenario-checkbox-box"
                                aria-hidden="true"
                              >
                                {isChecked && (
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <div className="scenario-step-content">
                                <span className="scenario-step-number">
                                  {stepIdx + 1}.
                                </span>
                                <div className="scenario-step-body">
                                  <span className="scenario-step-text">
                                    {stepText}
                                  </span>
                                  {stepRemark && (
                                    <span className="scenario-step-remark">
                                      {stepRemark}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </li>
                          )
                        })}
                      </ul>

                      {/* "What to notice" UX Payoff Highlight Box */}
                      <div className="scenario-highlight-box">
                        <div className="scenario-highlight-label">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>
                          <span>What to notice</span>
                        </div>
                        <p className="scenario-highlight-text">
                          {scenario.highlight}
                        </p>
                      </div>

                      {/* Action Row */}
                      <div className="scenario-action-row">
                        <div className="scenario-action-left">
                          {index > 0 && (
                            <button
                              type="button"
                              className="scenario-nav-btn"
                              onClick={(e) => {
                                e.stopPropagation()
                                handlePrevious(index)
                              }}
                            >
                              <span>← Previous</span>
                            </button>
                          )}

                          <button
                            type="button"
                            className="scenario-restart-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleResetScenario(scenario.id)
                            }}
                            title={`Restart Task ${scenario.number}`}
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="1 4 1 10 7 10" />
                              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                            </svg>
                            <span>Restart task</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          className="scenario-next-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCompleteAndNext(index)
                          }}
                        >
                          <span>
                            {index === SCENARIOS.length - 1
                              ? "Complete Walkthrough"
                              : "Mark Done & Next →"}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </aside>
      )}
    </div>
  )
}
