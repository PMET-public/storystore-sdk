import { Container, withMappable, ContainerProperties } from '@adobe/aem-react-editable-components'

const site = process.env.NEXT_PUBLIC_AEM_SITE

export const RESOURCE_TYPE = `${site}/components/experiencefragment`

export const AEMExperienceFragmentConfig = {
  emptyLabel: 'Experience Fragment',
  isEmpty: (props: any) => !props || !props.configured,
  resourceType: RESOURCE_TYPE,
}

export const AEMExperienceFragment = withMappable(Container, AEMExperienceFragmentConfig)
