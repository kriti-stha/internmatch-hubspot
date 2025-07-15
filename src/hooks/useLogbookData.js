import { useState, useEffect } from "react"
import { LOGBOOKS_PIPELINE } from "../helpers/constants.js"

export const useLogbookData = (contactEmail) => {
  const [logbookData, setLogbookData] = useState({})
  const [pipelineStages, setPipelineStages] = useState({})
  const [logbookTicketsByEmail, setLogbookTicketsByEmail] = useState([])
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

  // New: Fetch tickets by pipeline for the given contactEmail
  const fetchTicketsByEmail = async () => {
    if (!contactEmail) {
      setLogbookTicketsByEmail([])
      return
    }
    setLoading(true)
    try {
      const response = await fetch(
        `/hs/serverless/get-ticket-by-email?email=${contactEmail}`
      )
      const responseData = await response.json()
      setLogbookTicketsByEmail(responseData?.tickets || [])
      setError(null)
    } catch (error) {
      setError(error.message)
      setLogbookTicketsByEmail([])
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
    await Promise.all([
      fetchTicketsByPipelineId(),
      fetchPipelineStages(),
      fetchTicketsByEmail(), // New fetch
    ])
  }

  useEffect(() => {
    refetchData()
  }, [contactEmail]) // Add contactEmail as dependency

  return {
    logbookData,
    pipelineStages,
    logbookTicketsByEmail, // Expose new data
    loading,
    error,
    refetchData,
  }
}
