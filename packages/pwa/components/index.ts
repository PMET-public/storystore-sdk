import { MapTo } from '@adobe/aem-react-editable-components'

import {
  AccordionV1,
  AccordionV1IsEmptyFn,
  CarouselV1,
  CarouselV1IsEmptyFn,
  TabsV1,
  TabsV1IsEmptyFn,
} from '@adobe/aem-core-components-react-spa'

import {
  BreadCrumbV2,
  BreadCrumbV2IsEmptyFn,
  ButtonV1,
  ButtonV1IsEmptyFn,
  DownloadV1,
  DownloadV1IsEmptyFn,
  LanguageNavigationV1,
  ListV2,
  ListV2IsEmptyFn,
  NavigationV1,
  SeparatorV1,
  SeparatorV1IsEmptyFn,
  TextV2,
  TextV2IsEmptyFn,
  TitleV2,
  TitleV2IsEmptyFn,
} from '@adobe/aem-core-components-react-base'

import { AEMResponsiveGrid, AEMResponsiveGridConfig } from './AEMResponsiveGrid'
import { AEMExperienceFragment, AEMExperienceFragmentConfig } from './AEMExperienceFragment'
import { AEMTeaser, AEMTeaserConfig } from './AEMTeaser/AEMTeaser'
import { AEMCarousel, AEMCarouselConfig } from './AEMCarousel/AEMCarousel'
import { AEMImage, AEMImageConfig } from './AEMImage/AEMImage'
import { AEMContainer, AEMContainerConfig } from './AEMContainer/AEMContainer'

const site = process.env.NEXT_PUBLIC_AEM_SITE

MapTo(`${site}/components/carousel`)(CarouselV1, { isEmpty: CarouselV1IsEmptyFn })
MapTo(`${site}/components/text`)(TextV2, { isEmpty: TextV2IsEmptyFn })
MapTo<any>(`${site}/components/download`)(DownloadV1, { isEmpty: DownloadV1IsEmptyFn })
MapTo<any>(`${site}/components/list`)(ListV2, { isEmpty: ListV2IsEmptyFn })
MapTo(`${site}/components/separator`)(SeparatorV1, { isEmpty: SeparatorV1IsEmptyFn })
MapTo(`${site}/components/button`)(ButtonV1, { isEmpty: ButtonV1IsEmptyFn })
MapTo<any>(`${site}/components/title`)(TitleV2, { isEmpty: TitleV2IsEmptyFn })
MapTo<any>(`${site}/components/breadcrumb`)(BreadCrumbV2, { isEmpty: BreadCrumbV2IsEmptyFn })
MapTo<any>(`${site}/components/navigation`)(NavigationV1)
MapTo<any>(`${site}/components/languagenavigation`)(LanguageNavigationV1)
MapTo(`${site}/components/tabs`)(TabsV1, { isEmpty: TabsV1IsEmptyFn })
MapTo(`${site}/components/accordion`)(AccordionV1, { isEmpty: AccordionV1IsEmptyFn })

MapTo(AEMResponsiveGridConfig.resourceType)(AEMResponsiveGrid, AEMResponsiveGridConfig)
MapTo(AEMExperienceFragmentConfig.resourceType)(AEMExperienceFragment, AEMExperienceFragmentConfig)
MapTo(AEMTeaserConfig.resourceType)(AEMTeaser, AEMTeaserConfig)
MapTo(AEMCarouselConfig.resourceType)(AEMCarousel, AEMCarouselConfig)
MapTo(AEMImageConfig.resourceType)(AEMImage, AEMImageConfig)
MapTo(AEMContainerConfig.resourceType)(AEMContainer, AEMContainerConfig)
