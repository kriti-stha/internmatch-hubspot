import { ModuleFields, TextField, UrlField } from "@hubspot/cms-components/fields"
import { Island } from "@hubspot/cms-components"
import Logbooks from "../../islands/Logbooks.jsx?island"

export const meta = {
  label: "Logbook",
  icon: "text",
}

export const fields = (
  <ModuleFields>
    <TextField name="email" label="email" default="email" />
    <UrlField
      name="signInLink"
      label="Sign In Link"
      helpText="Paste the sign-in page URL here. This will be used for the 'here' link when a user is not logged in."
    />
  </ModuleFields>
)

export function Component(props) {
  const { hublParameters, fieldValues } = props || {}

  return (
    <div>
      <Island
        module={Logbooks}
        fieldValues={fieldValues}
        hublParameters={hublParameters}
        signInLink={fieldValues?.signInLink}
        props={props}
      />
    </div>
  )
}
