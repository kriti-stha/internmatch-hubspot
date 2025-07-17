import { Island } from "@hubspot/cms-components"
import { ModuleFields, ImageField } from "@hubspot/cms-components/fields"
import Header from "../../islands/Header.jsx?island"

export const meta = {
  label: "Header",
  icon: "header",
}

export const fields = (
  <ModuleFields>
    <ImageField
      name="headerImage"
      label="Header Image"
    />
  </ModuleFields>
)

export function Component(props) {
  const { fieldValues } = props || {}
  return <Island module={Header} headerImage={fieldValues?.headerImage} />
}
