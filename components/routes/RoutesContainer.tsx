import { useRoutes, type TeleficoLine } from "@/hooks/useRoutes"
import { useState } from "react"
import { View } from "react-native"
import { LineDetails } from "./LineDetails"
import { LinesList } from "./LinesList"
import { SindicateList } from "./SindicateList"

type ViewState = "sindicates" | "lines" | "details"

export function RoutesContainer() {
  const { sindicates, selectedSindicate, setSelectedSindicate, selectedLine, setSelectedLine } = useRoutes()
  const [currentView, setCurrentView] = useState<ViewState>("sindicates")

  const handleSelectSindicate = (sindicate: any) => {
    setSelectedSindicate(sindicate)
    setCurrentView("lines")
  }

  const handleSelectLine = (line: TeleficoLine) => {
    setSelectedLine(line)
    setCurrentView("details")
  }

  const handleBackFromLines = () => {
    setCurrentView("sindicates")
    setSelectedSindicate(null)
  }

  const handleBackFromDetails = () => {
    setCurrentView("lines")
    setSelectedLine(null)
  }

  return (
    <View style={{ flex: 1 }}>
      {currentView === "sindicates" && (
        <SindicateList 
          sindicates={sindicates} 
          onSelectSindicate={handleSelectSindicate} 
        />
      )}

      {currentView === "lines" && selectedSindicate && (
        <LinesList 
          sindicate={selectedSindicate} 
          onSelectLine={handleSelectLine} 
          onBack={handleBackFromLines} 
        />
      )}

      {currentView === "details" && selectedLine && (
        <LineDetails 
          line={selectedLine} 
          onBack={handleBackFromDetails} 
        />
      )}
    </View>
  )
}