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
  const { membership_contact, contact_data, email } = props || {}

  return (
    <div>
      <p>Welcome back: {membership_contact || "team!"}</p>
      <Island
        module={Logbooks}
        props={props}
        membership_contact={membership_contact}
      />
    </div>
  )
}
