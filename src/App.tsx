import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"


function App() {

  const { state } = useBudget()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  // Guardar en local Storage
  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <div className="py-8 bg-blue-600 max-h-72">
        <h1 className="text-4xl font-black text-center text-white uppercase">
          Planificador de Gastos
        </h1>
      </div>

      <div className="max-w-3xl p-10 mx-auto mt-10 bg-white rounded-lg shadow-lg">
        { isValidBudget ? <BudgetTracker /> : <BudgetForm /> }
      </div>

      {/* Para evitar el uso de ternarios, sino tenemos algo para la condicion contraria, entonces se usa el && y lo que debe suceder */}
      { isValidBudget && (
        <main className="max-w-3xl py-10 mx-auto">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
      
    </>
  )
}

export default App
