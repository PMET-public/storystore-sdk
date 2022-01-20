import { Container, withMappable } from '@adobe/aem-react-editable-components'

const site = process.env.NEXT_PUBLIC_AEM_SITE

export const RESOURCE_TYPE = `${site}/components/experiencefragment`

export const AEMExperienceFragmentConfig = {
  emptyLabel: 'Experience Fragment',
  isEmpty: (props: any) => {
    console.log('Experience Fragment', { site, props })
    return !props || !props.configured
  },
  resourceType: RESOURCE_TYPE,
}

export const AEMExperienceFragment = withMappable(Container, AEMExperienceFragmentConfig)
