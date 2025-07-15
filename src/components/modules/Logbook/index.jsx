import { ModuleFields, TextField } from "@hubspot/cms-components/fields"
import { Island, logInfo } from "@hubspot/cms-components"
import Logbooks from "../../islands/Logbooks.jsx?island"

export const meta = {
  label: "Logbook",
  icon: "text",
}

export const fields = (
  <ModuleFields>
    <TextField name="email" label="email" default="test@logbooks.com" />
  </ModuleFields>
)

export function Component(props) {
  const { hublParameters, fieldValues } = props || {}
  const membership_contact = hublParameters?.membership_contact || ""

  return (
    <div>
      <Island
        module={Logbooks}
        fieldValues={fieldValues}
        membership_contact={membership_contact}
      />
    </div>
  )
}
