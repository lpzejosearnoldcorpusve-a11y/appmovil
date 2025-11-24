import { useRoutes } from "@/hooks/useRoutes"
import { useState } from "react"
import { View } from "react-native"
import { LineDetails } from "./LineDetails"
import { LinesList } from "./LinesList"
import { SindicateList } from "./SindicateList"

type ViewState = "categories" | "routes" | "details"

export function RoutesContainer() {
  const { categories, selectedCategory, setSelectedCategory, selectedRoute, setSelectedRoute } = useRoutes()
  const [currentView, setCurrentView] = useState<ViewState>("categories")

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category)
    setCurrentView("routes")
  }

  const handleSelectRoute = (route: any) => {
    setSelectedRoute(route)
    setCurrentView("details")
  }

  const handleBackFromRoutes = () => {
    setCurrentView("categories")
    setSelectedCategory(null)
  }

  const handleBackFromDetails = () => {
    setCurrentView("routes")
    setSelectedRoute(null)
  }

  return (
    <View style={{ flex: 1 }}>
      {currentView === "categories" && (
        <SindicateList 
          categories={categories} 
          onSelectCategory={handleSelectCategory} 
        />
      )}

      {currentView === "routes" && selectedCategory && (
        <LinesList 
          category={selectedCategory} 
          onSelectRoute={handleSelectRoute} 
          onBack={handleBackFromRoutes} 
        />
      )}

      {currentView === "details" && selectedRoute && (
        <LineDetails 
          route={selectedRoute} 
          onBack={handleBackFromDetails} 
        />
      )}
    </View>
  )
}