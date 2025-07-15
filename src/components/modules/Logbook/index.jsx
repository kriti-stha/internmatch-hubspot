import { ModuleFields, TextField } from "@hubspot/cms-components/fields"
import { Island } from "@hubspot/cms-components"
import Logbooks from "../../islands/Logbooks.jsx?island"

export const meta = {
  label: "Logbook",
  icon: "text",
}

export const fields = (
  <ModuleFields>
    <TextField name="logbook" label="logbook" default="logbook" />
  </ModuleFields>
)

export function Component(props) {
  const { membership_contact, contact_data } = props || {}

  return (
    <div>
      <Island module={Logbooks} props={{ membership_contact, contact_data }} />
    </div>
  )
}
