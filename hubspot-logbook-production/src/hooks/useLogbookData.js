import { useState, useEffect } from "react"
import { LOGBOOKS_PIPELINE } from "../helpers/constants.js"

export const useLogbookData = () => {
  const [logbookData, setLogbookData] = useState({})
  const [pipelineStages, setPipelineStages] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTicketsByPipelineId = async () => {
    setLoading(true)
    try {
      const response = await fetch("/hs/serverless/get-ticket-by-pipeline")
      const responseData = await response.json()
      setLogbookData(responseData)
      setError(null)
    } catch (error) {
      setError(error.message)
      setLogbookData({})
    } finally {
      setLoading(false)
    }
  }

  const fetchPipelineStages = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/hs/serverless/get-pipeline-by-id?id=${LOGBOOKS_PIPELINE}`
      )
      const responseData = await response.json()
      setPipelineStages(responseData?.stages)
      setError(null)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setPipelineStages({})
    }
  }

  const refetchData = async () => {
    await Promise.all([fetchTicketsByPipelineId(), fetchPipelineStages()])
  }

  useEffect(() => {
    refetchData()
  }, [])

  return {
    logbookData,
    pipelineStages,
    loading,
    error,
    refetchData,
  }
}
