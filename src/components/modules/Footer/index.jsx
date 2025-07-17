import { Island } from "@hubspot/cms-components"
import { ModuleFields, ImageField } from "@hubspot/cms-components/fields"
import Footer from "../../islands/Footer.jsx?island"

export const meta = {
  label: "Footer",
  icon: "footer",
}

export const fields = (
  <ModuleFields>
    <ImageField
      name="footerImage"
      label="Footer Logo Image"
      default="@project/src/assets/internmatch-footer.png"
    />
  </ModuleFields>
)

export function Component(props) {
  const { fieldValues } = props || {}
  return <Island module={Footer} footerImage={fieldValues?.footerImage} />
}
