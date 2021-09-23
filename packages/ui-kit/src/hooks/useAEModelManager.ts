// AEM Remote SPA Model
import { ModelManager, ModelClient } from '@adobe/aem-spa-page-model-manager'
import { useMemo } from 'react'

export const useAEMModelManager = (path = '/content/wknd-adventures/us/en/home') =>
  useMemo(() => {
    const modelClient = new ModelClient(new URL(process.env.NEXT_PUBLIC_URL).origin)
    ModelManager.initializeAsync({ modelClient, path })
  }, [path])
