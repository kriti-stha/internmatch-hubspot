import { ModuleFields, TextField } from "@hubspot/cms-components/fields"
import { Island, logInfo } from "@hubspot/cms-components"
import Logbooks from "../../islands/Logbooks.jsx?island"

export const meta = {
  label: "Logbook",
  icon: "text",
}

export const fields = (
  <ModuleFields>
    <TextField name="email" label="email" default="email" />
  </ModuleFields>
)

export function Component(props) {
  const { hublParameters, fieldValues } = props || {}

  console.log("props==>", props)

  return (
    <div>
      <Island
        module={Logbooks}
        fieldValues={fieldValues}
        hublParameters={hublParameters}
        props={props}
      />
    </div>
  )
}
